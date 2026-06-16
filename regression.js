// Regression guard: locks in naturalness fixes so they cannot silently return.
// Two layers: (1) deterministic assertions on the rule functions, (2) a scan of
// many generated sentences for forbidden verb+context combinations.
// Run: node tools/regression.js   (exit code 1 on any failure)
const fs = require("fs"), vm = require("vm"), path = require("path");
const noop = () => {}; const store = {};
globalThis.localStorage = { getItem: k => k in store ? store[k] : null, setItem: (k,v)=>{store[k]=String(v)}, removeItem: k=>{delete store[k]} };
globalThis.navigator = { userAgent:"node", maxTouchPoints:0 }; globalThis.screen = { width:1920, height:1080 }; globalThis.location = { protocol:"file:" };
function fakeEl(){ return new Proxy(function(){}, { get:(t,p)=>{ if(p==="classList") return {add:noop,remove:noop,toggle:noop,contains:()=>false}; if(p==="style") return {}; if(["addEventListener","removeEventListener","setAttribute","appendChild","focus","click","remove"].includes(p)) return noop; if(["children","options","selectedOptions"].includes(p)) return []; return fakeEl(); }, apply:()=>fakeEl() }); }
globalThis.document = { body:fakeEl(), documentElement:fakeEl(), head:fakeEl(), getElementById:()=>fakeEl(), querySelector:()=>fakeEl(), querySelectorAll:()=>[], createElement:()=>fakeEl(), addEventListener:noop };
globalThis.window = globalThis; globalThis.addEventListener = noop;

// resolve app.js whether this script sits in tools/ or next to app.js
function findApp(){
  for(const p of [path.join(__dirname, "..", "app.js"), path.join(__dirname, "app.js"), path.join(process.cwd(), "app.js")]){
    if(fs.existsSync(p)) return p;
  }
  throw new Error("app.js not found near " + __dirname);
}
const src = fs.readFileSync(findApp(), "utf8");
vm.runInThisContext(src + "\nglobalThis.__R={DATA,TENSE_KEYS,SENTENCE_COMPLEMENTS,SENTENCE_CLOSERS,startWorksWithComplement,closerWorksWithSentence,enrichSentenceComplement,sentenceComplementFor,sentencePromptFor,correctFor};", "app.js");
const R = globalThis.__R;

let pass = 0, fail = 0;
function check(desc, cond){ if(cond){ pass++; } else { fail++; console.log("  ✗ FAIL: " + desc); } }
function comp(inf, match){
  const list = R.SENTENCE_COMPLEMENTS[inf] || [];
  const raw = list.find(c => (c.es || c.tpl || "").includes(match)) || list[0];
  return R.enrichSentenceComplement(inf, raw);
}
function closer(match){ return R.SENTENCE_CLOSERS.find(c => (c.es||"").includes(match)); }

// ---- (1) deterministic rule assertions ----
console.log("\n[1] Reguły (deterministyczne):");
// stative verbs reject sudden/punctual starts
check("vivir ⊘ 'De repente'", R.startWorksWithComplement("vivir","De repente","indefinido",comp("vivir","Madrid")) === false);
check("vivir ⊘ 'Antes de salir'", R.startWorksWithComplement("vivir","Antes de salir","indefinido",comp("vivir","Madrid")) === false);
check("vivir ⊘ 'En el último minuto'", R.startWorksWithComplement("vivir","En el último minuto","indefinido",comp("vivir","Madrid")) === false);
check("ser ⊘ 'De repente'", R.startWorksWithComplement("ser","De repente","indefinido",comp("ser","{adj}")) === false);
check("estar ⊘ 'En el último minuto'", R.startWorksWithComplement("estar","En el último minuto","indefinido",comp("estar","{adj}")) === false);
check("vivir ⊘ 'Hace un rato'", R.startWorksWithComplement("vivir","Hace un rato","indefinido",comp("vivir","Madrid")) === false);
check("costar ⊘ 'Hace dos días'", R.startWorksWithComplement("costar","Hace dos días","indefinido",comp("costar","euros")) === false);
// non-repeatable verbs reject " otra vez"
check("vivir ⊘ closer 'otra vez'", R.closerWorksWithSentence("vivir","Ayer",comp("vivir","Madrid"),closer("otra vez"),"indefinido") === false);
check("nacer ⊘ closer 'otra vez'", R.closerWorksWithSentence("nacer","Ayer",comp("nacer","España"),closer("otra vez"),"indefinido") === false);
check("costar ⊘ closer 'otra vez'", R.closerWorksWithSentence("costar","Ayer",comp("costar","euros"),closer("otra vez"),"indefinido") === false);
check("valer ⊘ closer 'otra vez'", R.closerWorksWithSentence("valer","Ayer",comp("valer","dinero"),closer("otra vez"),"indefinido") === false);
check("'En el último minuto' ⊘ closer 'otra vez'", R.closerWorksWithSentence("trabajar","En el último minuto",comp("trabajar","oficina"),closer("otra vez"),"indefinido") === false);
// "con mucho cuidado" only for active/physical verbs
check("comer ⊘ closer 'con mucho cuidado'", R.closerWorksWithSentence("comer","Ayer",comp("comer","ensalada"),closer("con mucho cuidado"),"indefinido") === false);
check("ver ⊘ closer 'con mucho cuidado'", R.closerWorksWithSentence("ver","Ayer",comp("ver","película"),closer("con mucho cuidado"),"indefinido") === false);
check("conducir ✓ closer 'con mucho cuidado'", R.closerWorksWithSentence("conducir","Ayer",comp("conducir","coche"),closer("con mucho cuidado"),"indefinido") === true);
// scene clashes stay blocked
check("En la fiesta ⊘ ahorrar(money)", R.startWorksWithComplement("ahorrar","En la fiesta","indefinido",comp("ahorrar","dinero")) === false);
check("En la reunión ⊘ bailar(leisure)", R.startWorksWithComplement("bailar","En la reunión","indefinido",comp("bailar","salsa")) === false);

// ---- (2) generated-sample scan ----
console.log("[2] Skan wygenerowanych zdań:");
const PERSON_3SG = /\b(Lucía|el camarero|la vecina|el profesor|mi hermano|mi amiga|mi padre|mi madre|la doctora)\b/;
const FORBIDDEN = [
  { test:(inf,f)=> ["vivir","nacer","morir","costar","valer"].includes(inf) && /\botra vez\b/.test(f), label:"non-repeatable + 'otra vez'" },
  { test:(inf,f)=> ["comer","beber","cenar","desayunar","almorzar","ver","oír","pensar","creer","saber","sentir","ser","estar","vivir"].includes(inf) && /con mucho cuidado/.test(f), label:"stative/perception/food + 'con mucho cuidado'" },
  { test:(inf,f)=> inf==="vivir" && /^(De repente|Antes de salir|En el último minuto|Hace un rato|Anoche|Hace dos días|En aquel momento)\b/.test(f), label:"vivir + sudden/punctual start" },
  { test:(inf,f)=> ["costar","valer"].includes(inf) && PERSON_3SG.test(f), label:"costar/valer + person subject" },
];
function persons(t){ return t==="imperativo" ? ["tú","vos","ustedes","vosotros"] : ["yo","tú","él/ella","nosotros","vosotros","ellos/ellas"]; }
const hits = new Map(); let scanned = 0;
for(const tense of R.TENSE_KEYS) for(const v of R.DATA[tense].verbs) for(const pr of persons(tense)){
  const q = { verb:v, pronoun:pr, tense }; let c; try { c = R.correctFor(q); } catch(e){ continue; } if(!c) continue;
  for(let i=0;i<15;i++){ const f = R.sentencePromptFor(q,c).full; scanned++;
    for(const rule of FORBIDDEN){ if(rule.test(v.inf, f)){ hits.set(rule.label,(hits.get(rule.label)||0)+1); if((hits.get(rule.label))<=2) console.log("  ✗ ["+rule.label+"] "+f); } }
  }
}
for(const rule of FORBIDDEN){ const n = hits.get(rule.label)||0; check("brak: "+rule.label+" (znaleziono "+n+")", n===0); }

console.log(`\nWynik: ${pass} PASS, ${fail} FAIL  (przeskanowano ${scanned} zdań)`);
process.exit(fail ? 1 : 0);

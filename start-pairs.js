// Dev-only: for each situational start, list every verb+complement pair the
// compatibility rules currently ALLOW, so implausible combos can be spotted.
// Run: node tools/start-pairs.js
const fs = require("fs"), vm = require("vm"), path = require("path");
const noop = () => {}; const store = {};
globalThis.localStorage = { getItem: k => k in store ? store[k] : null, setItem: (k,v)=>{store[k]=String(v)}, removeItem: k=>{delete store[k]} };
globalThis.navigator = { userAgent:"node", maxTouchPoints:0 }; globalThis.screen = { width:1920, height:1080 }; globalThis.location = { protocol:"file:" };
function fakeEl(){ return new Proxy(function(){}, { get:(t,p)=>{ if(p==="classList") return {add:noop,remove:noop,toggle:noop,contains:()=>false}; if(p==="style") return {}; if(["addEventListener","removeEventListener","setAttribute","appendChild","focus","click","remove"].includes(p)) return noop; if(["children","options","selectedOptions"].includes(p)) return []; return fakeEl(); }, apply:()=>fakeEl() }); }
globalThis.document = { body:fakeEl(), documentElement:fakeEl(), head:fakeEl(), getElementById:()=>fakeEl(), querySelector:()=>fakeEl(), querySelectorAll:()=>[], createElement:()=>fakeEl(), addEventListener:noop };
globalThis.window = globalThis; globalThis.addEventListener = noop;
const src = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
vm.runInThisContext(src + "\nglobalThis.__S={DATA,TENSE_KEYS,SENTENCE_COMPLEMENTS,startWorksWithComplement,enrichSentenceComplement,startTagsFor,SENTENCE_BANK};", "app.js");
const S = globalThis.__S;

// situational starts worth scrutinising, with the tense bank they live in
const TARGETS = {
  "En la fiesta": "indefinido", "En el aeropuerto": "indefinido", "En la reunión": "indefinido",
  "Durante la cena": "indefinido", "En el restaurante": "indefinido", "En el tren": "indefinido",
  "Al llegar al hotel": "indefinido", "Durante el viaje": "indefinido",
  "En la biblioteca": "presente", "En la cocina": "presente", "En el trabajo": "presente", "En clase": "presente",
  "En la universidad": "imperfecto", "Antes de la reunión": "imperfecto", "Durante el descanso": "presente",
  "Después de clase": "indefinido", "Después del trabajo": "imperfecto", "Antes de dormir": "presente", "Al volver a casa": "indefinido"
};

let out = "";
for(const [start, tense] of Object.entries(TARGETS)){
  out += "\n================ " + start + "  [" + tense + "] ================\n";
  const verbs = S.DATA[tense].verbs;
  for(const v of verbs){
    const comps = (S.SENTENCE_COMPLEMENTS[v.inf] || []);
    const allowed = [];
    for(const raw of comps){
      const c = S.enrichSentenceComplement(v.inf, raw);
      if(S.startWorksWithComplement(v.inf, start, tense, c)) allowed.push((c.es || c.tpl || "").trim());
    }
    if(allowed.length) out += "  " + v.inf + " (" + (v.en||"") + "): " + allowed.join("  |  ") + "\n";
  }
}
fs.writeFileSync(path.join(__dirname, "_pairs.txt"), out, "utf8");
console.log("written tools/_pairs.txt");

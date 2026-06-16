// Dev-only audit harness: loads the real app.js under browser shims and
// exercises the actual sentence generator across every tense x verb x person,
// then flags suspicious output. Run: node tools/sentence-audit.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// --- minimal browser shims so app.js can load in Node ---
const noop = () => {};
const fakeStore = {};
globalThis.localStorage = {
  getItem: k => (k in fakeStore ? fakeStore[k] : null),
  setItem: (k, v) => { fakeStore[k] = String(v); },
  removeItem: k => { delete fakeStore[k]; }
};
globalThis.navigator = { userAgent: "node", maxTouchPoints: 0, serviceWorker: undefined };
globalThis.screen = { width: 1920, height: 1080 };
globalThis.location = { protocol: "file:" };
function fakeEl(){
  return new Proxy(function(){}, {
    get: (t, p) => {
      if(p === "classList") return { add: noop, remove: noop, toggle: noop, contains: () => false };
      if(p === "style") return {};
      if(p === "dataset") return {};
      if(p === "addEventListener" || p === "removeEventListener" || p === "setAttribute" ||
         p === "appendChild" || p === "focus" || p === "blur" || p === "click" || p === "remove") return noop;
      if(p === "getContext") return () => ({});
      if(p === "children" || p === "options" || p === "selectedOptions") return [];
      return fakeEl();
    },
    apply: () => fakeEl()
  });
}
globalThis.document = {
  body: fakeEl(), documentElement: fakeEl(), head: fakeEl(),
  getElementById: () => fakeEl(), querySelector: () => fakeEl(), querySelectorAll: () => [],
  createElement: () => fakeEl(), addEventListener: noop, removeEventListener: noop,
  getElementsByClassName: () => [], getElementsByTagName: () => []
};
globalThis.window = globalThis;
globalThis.addEventListener = noop;
globalThis.setTimeout = setTimeout;
globalThis.clearTimeout = clearTimeout;

// --- load app.js + an export tail in one lexical scope ---
const src = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const tail = `
globalThis.__AUDIT = {
  DATA, TENSE_KEYS, SENTENCE_BANK, SENTENCE_COMPLEMENTS, SENTENCE_CLOSERS,
  sentencePromptFor, correctFor, subjectsForVerb, isPerfecto, isImperativo,
  pronouns, spainPronouns, sentenceVariantCount,
  setSpainMode: v => { spainMode = v; },
  setTense: v => { currentTense = v; }
};
`;
vm.runInThisContext(src + tail, { filename: "app.js" });
const A = globalThis.__AUDIT;

// --- which persons apply to each tense ---
function personsFor(tense){
  if(tense === "imperativo") return ["tú", "vos", "ustedes", "vosotros"];
  return ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"];
}

// --- heuristic problem detectors on the generated Spanish string ---
const SOFT = new Set(["en","de","a","con","la","el","los","las","un","una","por","que","y","se","lo","le","mi","tu","su","al","del","más","muy",
  "mis","tus","sus","nos","les","te","me",
  "dos","tres","cuatro","cinco","seis","diez","veinte","cien","mil"]);
function tokens(s){ return s.toLowerCase().replace(/[.,]/g," ").split(/\s+/).filter(Boolean); }

const PREPS = new Set(["en","de","a","con","por","que","para","sin","sobre","entre","hasta"]);
function detect(full, pl, tense){
  const issues = [];
  const low = " " + full.toLowerCase() + " ";
  if(/\s\s/.test(full)) issues.push("double-space");
  if(/\s\./.test(full)) issues.push("space-before-period");
  // repeated content word (naturalness): same non-function token twice
  const toks = tokens(full);
  // doubled preposition via adjacency (accent-safe; avoids \b + non-ASCII bug)
  for(let i = 1; i < toks.length; i++){
    if(toks[i] === toks[i-1] && PREPS.has(toks[i])) issues.push("doubled-preposition:" + toks[i]);
  }
  const seen = new Map();
  for(const t of toks){
    if(SOFT.has(t) || t.length <= 2) continue;
    seen.set(t, (seen.get(t) || 0) + 1);
  }
  for(const [t, n] of seen){ if(n >= 2){ issues.push("repeat-word:" + t); } }
  // repeated multiword chunks like "en casa ... en casa", "por la mañana ... por la"
  for(const chunk of ["en casa","en clase","con amigos","con mis amigos","por la mañana","por la tarde","por la noche","con calma","con cuidado","para practicar","sin problema","otra vez","en el centro","en el trabajo"]){
    const re = new RegExp(chunk.replace(/ /g, "\\s+"), "g");
    if((low.match(re) || []).length >= 2) issues.push("repeat-chunk:" + chunk);
  }
  // PL sanity
  if(!pl || /·\s*·/.test(pl) || /·\s*$/.test(pl) || /^\s*·/.test(pl)) issues.push("pl-empty-piece");
  return issues;
}

// --- run ---
const REPS = 40; // random draws per (tense, verb, person) to surface rule gaps
const tally = new Map();          // issue-type -> count
const examples = new Map();       // issue-type -> sample sentences (max 6)
let total = 0;

for(const tense of A.TENSE_KEYS){
  const verbs = A.DATA[tense].verbs;
  for(const verb of verbs){
    for(const pronoun of personsFor(tense)){
      const q = { verb, pronoun, tense };
      let correct;
      try { correct = A.correctFor(q); } catch(e){ continue; }
      if(!correct) continue;
      for(let i = 0; i < REPS; i++){
        let s;
        try { s = A.sentencePromptFor(q, correct); } catch(e){
          bump("THROW:" + (e.message || e), `${tense}/${verb.inf}/${pronoun}`);
          continue;
        }
        total++;
        const issues = detect(s.full, s.pl, tense);
        for(const iss of issues){
          const key = iss.split(":")[0];
          bump(key, `[${tense}/${verb.inf}/${pronoun}] ${s.full}  ||  ${s.pl}`);
        }
      }
    }
  }
}

function bump(key, example){
  tally.set(key, (tally.get(key) || 0) + 1);
  const arr = examples.get(key) || [];
  if(arr.length < 6) { arr.push(example); examples.set(key, arr); }
}

// --- report ---
console.log(`\n=== SENTENCE AUDIT ===`);
console.log(`Wygenerowano zdań: ${total}  (REPS=${REPS} na kombinację)`);
console.log(`Teoretyczna liczba wariantów (sentenceVariantCount): ${A.sentenceVariantCount().toLocaleString("pl-PL")}`);
const sorted = [...tally.entries()].sort((a,b) => b[1]-a[1]);
const totalIssues = sorted.reduce((s,[,n]) => s+n, 0);
console.log(`\nSuma flag: ${totalIssues}  (${(100*totalIssues/total).toFixed(2)}% zdań z co najmniej jedną flagą — z grubsza)\n`);
for(const [key, n] of sorted){
  console.log(`\n### ${key}  —  ${n}x  (${(100*n/total).toFixed(2)}%)`);
  for(const ex of examples.get(key)) console.log("   • " + ex);
}
console.log("\n=== KONIEC ===");

function applyDeviceLayout(){
  const looksMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && Math.min(screen.width, screen.height) <= 820);
  document.body.classList.toggle("mobile-ui", looksMobile);
  document.body.classList.toggle("narrow-ui", looksMobile && Math.min(window.innerWidth, screen.width) <= 380);
}
applyDeviceLayout();
window.addEventListener("resize", applyDeviceLayout);

const pronouns = ["yo","tú","él/ella","nosotros","ellos/ellas"];
const spainPronouns = ["yo","tú","él/ella","nosotros","vosotros","ellos/ellas"];

const DATA = {
  indefinido: {
    label: "Pretérito indefinido",
    desc: "co zrobiłem / co się stało",
    color: "green",
    verbs: [
      {inf:"hablar",en:"mówić",c:{yo:"hablé",tú:"hablaste","él/ella":"habló",nosotros:"hablamos","ellos/ellas":"hablaron"}},
      {inf:"comer",en:"jeść",c:{yo:"comí",tú:"comiste","él/ella":"comió",nosotros:"comimos","ellos/ellas":"comieron"}},
      {inf:"vivir",en:"żyć / mieszkać",c:{yo:"viví",tú:"viviste","él/ella":"vivió",nosotros:"vivimos","ellos/ellas":"vivieron"}},
      {inf:"ser",en:"być",c:{yo:"fui",tú:"fuiste","él/ella":"fue",nosotros:"fuimos","ellos/ellas":"fueron"}},
      {inf:"ir",en:"iść / jechać",c:{yo:"fui",tú:"fuiste","él/ella":"fue",nosotros:"fuimos","ellos/ellas":"fueron"}},
      {inf:"tener",en:"mieć",c:{yo:"tuve",tú:"tuviste","él/ella":"tuvo",nosotros:"tuvimos","ellos/ellas":"tuvieron"}},
      {inf:"estar",en:"być (gdzieś/w stanie)",c:{yo:"estuve",tú:"estuviste","él/ella":"estuvo",nosotros:"estuvimos","ellos/ellas":"estuvieron"}},
      {inf:"hacer",en:"robić",c:{yo:"hice",tú:"hiciste","él/ella":"hizo",nosotros:"hicimos","ellos/ellas":"hicieron"}},
      {inf:"poder",en:"móc",c:{yo:"pude",tú:"pudiste","él/ella":"pudo",nosotros:"pudimos","ellos/ellas":"pudieron"}},
      {inf:"querer",en:"chcieć / kochać",c:{yo:"quise",tú:"quisiste","él/ella":"quiso",nosotros:"quisimos","ellos/ellas":"quisieron"}},
      {inf:"saber",en:"wiedzieć / umieć",c:{yo:"supe",tú:"supiste","él/ella":"supo",nosotros:"supimos","ellos/ellas":"supieron"}},
      {inf:"venir",en:"przychodzić",c:{yo:"vine",tú:"viniste","él/ella":"vino",nosotros:"vinimos","ellos/ellas":"vinieron"}},
      {inf:"decir",en:"mówić / powiedzieć",c:{yo:"dije",tú:"dijiste","él/ella":"dijo",nosotros:"dijimos","ellos/ellas":"dijeron"}},
      {inf:"dar",en:"dawać",c:{yo:"di",tú:"diste","él/ella":"dio",nosotros:"dimos","ellos/ellas":"dieron"}},
      {inf:"ver",en:"widzieć / oglądać",c:{yo:"vi",tú:"viste","él/ella":"vio",nosotros:"vimos","ellos/ellas":"vieron"}},
      {inf:"poner",en:"kłaść / stawiać",c:{yo:"puse",tú:"pusiste","él/ella":"puso",nosotros:"pusimos","ellos/ellas":"pusieron"}},
      {inf:"traer",en:"przynosić",c:{yo:"traje",tú:"trajiste","él/ella":"trajo",nosotros:"trajimos","ellos/ellas":"trajeron"}},
      {inf:"andar",en:"chodzić",c:{yo:"anduve",tú:"anduviste","él/ella":"anduvo",nosotros:"anduvimos","ellos/ellas":"anduvieron"}},
      {inf:"leer",en:"czytać",c:{yo:"leí",tú:"leíste","él/ella":"leyó",nosotros:"leímos","ellos/ellas":"leyeron"}},
      {inf:"escribir",en:"pisać",c:{yo:"escribí",tú:"escribiste","él/ella":"escribió",nosotros:"escribimos","ellos/ellas":"escribieron"}},
      {inf:"salir",en:"wychodzić",c:{yo:"salí",tú:"saliste","él/ella":"salió",nosotros:"salimos","ellos/ellas":"salieron"}},
      {inf:"llegar",en:"przyjeżdżać",c:{yo:"llegué",tú:"llegaste","él/ella":"llegó",nosotros:"llegamos","ellos/ellas":"llegaron"}},
      {inf:"dormir",en:"spać",c:{yo:"dormí",tú:"dormiste","él/ella":"durmió",nosotros:"dormimos","ellos/ellas":"durmieron"}},
      {inf:"pedir",en:"prosić / zamawiać",c:{yo:"pedí",tú:"pediste","él/ella":"pidió",nosotros:"pedimos","ellos/ellas":"pidieron"}},
      {inf:"sentir",en:"czuć",c:{yo:"sentí",tú:"sentiste","él/ella":"sintió",nosotros:"sentimos","ellos/ellas":"sintieron"}},
      {inf:"conducir",en:"prowadzić (auto)",c:{yo:"conduje",tú:"condujiste","él/ella":"condujo",nosotros:"condujimos","ellos/ellas":"condujeron"}},
      {inf:"caer",en:"upadać",c:{yo:"caí",tú:"caíste","él/ella":"cayó",nosotros:"caímos","ellos/ellas":"cayeron"}},
      {inf:"oír",en:"słyszeć",c:{yo:"oí",tú:"oíste","él/ella":"oyó",nosotros:"oímos","ellos/ellas":"oyeron"}},
      {inf:"construir",en:"budować",c:{yo:"construí",tú:"construiste","él/ella":"construyó",nosotros:"construimos","ellos/ellas":"construyeron"}},
      {inf:"reír",en:"śmiać się",c:{yo:"reí",tú:"reíste","él/ella":"rió",nosotros:"reímos","ellos/ellas":"rieron"}},
      {inf:"morir",en:"umierać",c:{yo:"morí",tú:"moriste","él/ella":"murió",nosotros:"morimos","ellos/ellas":"murieron"}},
      {inf:"seguir",en:"podążać",c:{yo:"seguí",tú:"seguiste","él/ella":"siguió",nosotros:"seguimos","ellos/ellas":"siguieron"}},
      {inf:"elegir",en:"wybierać",c:{yo:"elegí",tú:"elegiste","él/ella":"eligió",nosotros:"elegimos","ellos/ellas":"eligieron"}},
      {inf:"servir",en:"służyć / podawać",c:{yo:"serví",tú:"serviste","él/ella":"sirvió",nosotros:"servimos","ellos/ellas":"sirvieron"}},
      {inf:"volver",en:"wracać",c:{yo:"volví",tú:"volviste","él/ella":"volvió",nosotros:"volvimos","ellos/ellas":"volvieron"}},
      {inf:"empezar",en:"zaczynać",c:{yo:"empecé",tú:"empezaste","él/ella":"empezó",nosotros:"empezamos","ellos/ellas":"empezaron"}},
      {inf:"buscar",en:"szukać",c:{yo:"busqué",tú:"buscaste","él/ella":"buscó",nosotros:"buscamos","ellos/ellas":"buscaron"}},
      {inf:"pagar",en:"płacić",c:{yo:"pagué",tú:"pagaste","él/ella":"pagó",nosotros:"pagamos","ellos/ellas":"pagaron"}},
      {inf:"jugar",en:"grać",c:{yo:"jugué",tú:"jugaste","él/ella":"jugó",nosotros:"jugamos","ellos/ellas":"jugaron"}},
      {inf:"creer",en:"wierzyć / sądzić",c:{yo:"creí",tú:"creíste","él/ella":"creyó",nosotros:"creímos","ellos/ellas":"creyeron"}},
      {inf:"nacer",en:"urodzić się",c:{yo:"nací",tú:"naciste","él/ella":"nació",nosotros:"nacimos","ellos/ellas":"nacieron"}},
      {inf:"trabajar",en:"pracować",c:{yo:"trabajé",tú:"trabajaste","él/ella":"trabajó",nosotros:"trabajamos","ellos/ellas":"trabajaron"}},
      {inf:"estudiar",en:"uczyć się",c:{yo:"estudié",tú:"estudiaste","él/ella":"estudió",nosotros:"estudiamos","ellos/ellas":"estudiaron"}},
      {inf:"comprar",en:"kupować",c:{yo:"compré",tú:"compraste","él/ella":"compró",nosotros:"compramos","ellos/ellas":"compraron"}},
      {inf:"viajar",en:"podróżować",c:{yo:"viajé",tú:"viajaste","él/ella":"viajó",nosotros:"viajamos","ellos/ellas":"viajaron"}},
    ]
  },
  imperfecto: {
    label: "Pretérito imperfecto",
    desc: "co robiłem (w przeszłości, zwyczajowo)",
    color: "amber",
    verbs: [
      {inf:"hablar",en:"mówić",c:{yo:"hablaba",tú:"hablabas","él/ella":"hablaba",nosotros:"hablábamos","ellos/ellas":"hablaban"}},
      {inf:"comer",en:"jeść",c:{yo:"comía",tú:"comías","él/ella":"comía",nosotros:"comíamos","ellos/ellas":"comían"}},
      {inf:"vivir",en:"żyć / mieszkać",c:{yo:"vivía",tú:"vivías","él/ella":"vivía",nosotros:"vivíamos","ellos/ellas":"vivían"}},
      {inf:"ser",en:"być",c:{yo:"era",tú:"eras","él/ella":"era",nosotros:"éramos","ellos/ellas":"eran"}},
      {inf:"ir",en:"iść / jechać",c:{yo:"iba",tú:"ibas","él/ella":"iba",nosotros:"íbamos","ellos/ellas":"iban"}},
      {inf:"ver",en:"widzieć / oglądać",c:{yo:"veía",tú:"veías","él/ella":"veía",nosotros:"veíamos","ellos/ellas":"veían"}},
      {inf:"tener",en:"mieć",c:{yo:"tenía",tú:"tenías","él/ella":"tenía",nosotros:"teníamos","ellos/ellas":"tenían"}},
      {inf:"estar",en:"być (gdzieś/w stanie)",c:{yo:"estaba",tú:"estabas","él/ella":"estaba",nosotros:"estábamos","ellos/ellas":"estaban"}},
      {inf:"hacer",en:"robić",c:{yo:"hacía",tú:"hacías","él/ella":"hacía",nosotros:"hacíamos","ellos/ellas":"hacían"}},
      {inf:"poder",en:"móc",c:{yo:"podía",tú:"podías","él/ella":"podía",nosotros:"podíamos","ellos/ellas":"podían"}},
      {inf:"querer",en:"chcieć / kochać",c:{yo:"quería",tú:"querías","él/ella":"quería",nosotros:"queríamos","ellos/ellas":"querían"}},
      {inf:"saber",en:"wiedzieć / umieć",c:{yo:"sabía",tú:"sabías","él/ella":"sabía",nosotros:"sabíamos","ellos/ellas":"sabían"}},
      {inf:"venir",en:"przychodzić",c:{yo:"venía",tú:"venías","él/ella":"venía",nosotros:"veníamos","ellos/ellas":"venían"}},
      {inf:"decir",en:"mówić / powiedzieć",c:{yo:"decía",tú:"decías","él/ella":"decía",nosotros:"decíamos","ellos/ellas":"decían"}},
      {inf:"poner",en:"kłaść / stawiać",c:{yo:"ponía",tú:"ponías","él/ella":"ponía",nosotros:"poníamos","ellos/ellas":"ponían"}},
      {inf:"salir",en:"wychodzić",c:{yo:"salía",tú:"salías","él/ella":"salía",nosotros:"salíamos","ellos/ellas":"salían"}},
      {inf:"trabajar",en:"pracować",c:{yo:"trabajaba",tú:"trabajabas","él/ella":"trabajaba",nosotros:"trabajábamos","ellos/ellas":"trabajaban"}},
      {inf:"estudiar",en:"uczyć się",c:{yo:"estudiaba",tú:"estudiabas","él/ella":"estudiaba",nosotros:"estudiábamos","ellos/ellas":"estudiaban"}},
      {inf:"comprar",en:"kupować",c:{yo:"compraba",tú:"comprabas","él/ella":"compraba",nosotros:"comprábamos","ellos/ellas":"compraban"}},
      {inf:"viajar",en:"podróżować",c:{yo:"viajaba",tú:"viajabas","él/ella":"viajaba",nosotros:"viajábamos","ellos/ellas":"viajaban"}},
      {inf:"dormir",en:"spać",c:{yo:"dormía",tú:"dormías","él/ella":"dormía",nosotros:"dormíamos","ellos/ellas":"dormían"}},
      {inf:"leer",en:"czytać",c:{yo:"leía",tú:"leías","él/ella":"leía",nosotros:"leíamos","ellos/ellas":"leían"}},
      {inf:"escribir",en:"pisać",c:{yo:"escribía",tú:"escribías","él/ella":"escribía",nosotros:"escribíamos","ellos/ellas":"escribían"}},
      {inf:"jugar",en:"grać",c:{yo:"jugaba",tú:"jugabas","él/ella":"jugaba",nosotros:"jugábamos","ellos/ellas":"jugaban"}},
      {inf:"beber",en:"pić",c:{yo:"bebía",tú:"bebías","él/ella":"bebía",nosotros:"bebíamos","ellos/ellas":"bebían"}},
    {inf:"traer",en:"przynosić",c:{yo:"traía",tú:"traías","él/ella":"traía",nosotros:"traíamos","ellos/ellas":"traían"}},
    {inf:"pedir",en:"prosić / zamawiać",c:{yo:"pedía",tú:"pedías","él/ella":"pedía",nosotros:"pedíamos","ellos/ellas":"pedían"}},
    {inf:"nacer",en:"urodzić się",c:{yo:"nacía",tú:"nacías","él/ella":"nacía",nosotros:"nacíamos","ellos/ellas":"nacían"}},
    {inf:"reír",en:"śmiać się",c:{yo:"reía",tú:"reías","él/ella":"reía",nosotros:"reíamos","ellos/ellas":"reían"}},
      {inf:"vivir",en:"żyć / mieszkać",c:{yo:"vivía",tú:"vivías","él/ella":"vivía",nosotros:"vivíamos","ellos/ellas":"vivían"}},
      {inf:"conocer",en:"znać / poznać",c:{yo:"conocía",tú:"conocías","él/ella":"conocía",nosotros:"conocíamos","ellos/ellas":"conocían"}},
      {inf:"creer",en:"wierzyć",c:{yo:"creía",tú:"creías","él/ella":"creía",nosotros:"creíamos","ellos/ellas":"creían"}},
      {inf:"llevar",en:"nosić / zabrać",c:{yo:"llevaba",tú:"llevabas","él/ella":"llevaba",nosotros:"llevábamos","ellos/ellas":"llevaban"}},
      {inf:"llamar",en:"dzwonić / nazywać",c:{yo:"llamaba",tú:"llamabas","él/ella":"llamaba",nosotros:"llamábamos","ellos/ellas":"llamaban"}},
      {inf:"pasar",en:"mijać / spędzać",c:{yo:"pasaba",tú:"pasabas","él/ella":"pasaba",nosotros:"pasábamos","ellos/ellas":"pasaban"}},
      {inf:"dar",en:"dawać",c:{yo:"daba",tú:"dabas","él/ella":"daba",nosotros:"dábamos","ellos/ellas":"daban"}},
      {inf:"pensar",en:"myśleć",c:{yo:"pensaba",tú:"pensabas","él/ella":"pensaba",nosotros:"pensábamos","ellos/ellas":"pensaban"}},
      {inf:"sentir",en:"czuć",c:{yo:"sentía",tú:"sentías","él/ella":"sentía",nosotros:"sentíamos","ellos/ellas":"sentían"}},
      {inf:"seguir",en:"podążać",c:{yo:"seguía",tú:"seguías","él/ella":"seguía",nosotros:"seguíamos","ellos/ellas":"seguían"}},
    ]
  },
  futuro: {
    label: "Futuro imperfecto",
    desc: "co zrobię / co się stanie",
    color: "blue",
    verbs: [
      {inf:"hablar",en:"mówić",c:{yo:"hablaré",tú:"hablarás","él/ella":"hablará",nosotros:"hablaremos","ellos/ellas":"hablarán"}},
      {inf:"comer",en:"jeść",c:{yo:"comeré",tú:"comerás","él/ella":"comerá",nosotros:"comeremos","ellos/ellas":"comerán"}},
      {inf:"vivir",en:"żyć / mieszkać",c:{yo:"viviré",tú:"vivirás","él/ella":"vivirá",nosotros:"viviremos","ellos/ellas":"vivirán"}},
      {inf:"tener",en:"mieć",c:{yo:"tendré",tú:"tendrás","él/ella":"tendrá",nosotros:"tendremos","ellos/ellas":"tendrán"}},
      {inf:"ser",en:"być",c:{yo:"seré",tú:"serás","él/ella":"será",nosotros:"seremos","ellos/ellas":"serán"}},
      {inf:"ir",en:"iść / jechać",c:{yo:"iré",tú:"irás","él/ella":"irá",nosotros:"iremos","ellos/ellas":"irán"}},
      {inf:"hacer",en:"robić",c:{yo:"haré",tú:"harás","él/ella":"hará",nosotros:"haremos","ellos/ellas":"harán"}},
      {inf:"poder",en:"móc",c:{yo:"podré",tú:"podrás","él/ella":"podrá",nosotros:"podremos","ellos/ellas":"podrán"}},
      {inf:"querer",en:"chcieć / kochać",c:{yo:"querré",tú:"querrás","él/ella":"querrá",nosotros:"querremos","ellos/ellas":"querrán"}},
      {inf:"saber",en:"wiedzieć / umieć",c:{yo:"sabré",tú:"sabrás","él/ella":"sabrá",nosotros:"sabremos","ellos/ellas":"sabrán"}},
      {inf:"venir",en:"przychodzić",c:{yo:"vendré",tú:"vendrás","él/ella":"vendrá",nosotros:"vendremos","ellos/ellas":"vendrán"}},
      {inf:"decir",en:"mówić / powiedzieć",c:{yo:"diré",tú:"dirás","él/ella":"dirá",nosotros:"diremos","ellos/ellas":"dirán"}},
      {inf:"poner",en:"kłaść / stawiać",c:{yo:"pondré",tú:"pondrás","él/ella":"pondrá",nosotros:"pondremos","ellos/ellas":"pondrán"}},
      {inf:"salir",en:"wychodzić",c:{yo:"saldré",tú:"saldrás","él/ella":"saldrá",nosotros:"saldremos","ellos/ellas":"saldrán"}},
      {inf:"valer",en:"być wartym",c:{yo:"valdré",tú:"valdrás","él/ella":"valdrá",nosotros:"valdremos","ellos/ellas":"valdrán"}},
      {inf:"caber",en:"mieścić się",c:{yo:"cabré",tú:"cabrás","él/ella":"cabrá",nosotros:"cabremos","ellos/ellas":"cabrán"}},
      {inf:"haber",en:"być (aux.)",c:{yo:"habré",tú:"habrás","él/ella":"habrá",nosotros:"habremos","ellos/ellas":"habrán"}},
      {inf:"estar",en:"być (gdzieś/w stanie)",c:{yo:"estaré",tú:"estarás","él/ella":"estará",nosotros:"estaremos","ellos/ellas":"estarán"}},
      {inf:"trabajar",en:"pracować",c:{yo:"trabajaré",tú:"trabajarás","él/ella":"trabajará",nosotros:"trabajaremos","ellos/ellas":"trabajarán"}},
      {inf:"estudiar",en:"uczyć się",c:{yo:"estudiaré",tú:"estudiarás","él/ella":"estudiará",nosotros:"estudiaremos","ellos/ellas":"estudiarán"}},
      {inf:"comprar",en:"kupować",c:{yo:"compraré",tú:"comprarás","él/ella":"comprará",nosotros:"compraremos","ellos/ellas":"comprarán"}},
      {inf:"viajar",en:"podróżować",c:{yo:"viajaré",tú:"viajarás","él/ella":"viajará",nosotros:"viajaremos","ellos/ellas":"viajarán"}},
      {inf:"dormir",en:"spać",c:{yo:"dormiré",tú:"dormirás","él/ella":"dormirá",nosotros:"dormiremos","ellos/ellas":"dormirán"}},
      {inf:"escribir",en:"pisać",c:{yo:"escribiré",tú:"escribirás","él/ella":"escribirá",nosotros:"escribiremos","ellos/ellas":"escribirán"}},
      {inf:"leer",en:"czytać",c:{yo:"leeré",tú:"leerás","él/ella":"leerá",nosotros:"leeremos","ellos/ellas":"leerán"}},
      {inf:"abrir",en:"otwierać",c:{yo:"abriré",tú:"abrirás","él/ella":"abrirá",nosotros:"abriremos","ellos/ellas":"abrirán"}},
      {inf:"seguir",en:"podążać",c:{yo:"seguiré",tú:"seguirás","él/ella":"seguirá",nosotros:"seguiremos","ellos/ellas":"seguirán"}},
      {inf:"ver",en:"widzieć / oglądać",c:{yo:"veré",tú:"verás","él/ella":"verá",nosotros:"veremos","ellos/ellas":"verán"}},
      {inf:"dar",en:"dawać",c:{yo:"daré",tú:"darás","él/ella":"dará",nosotros:"daremos","ellos/ellas":"darán"}},
      {inf:"llegar",en:"przyjeżdżać",c:{yo:"llegaré",tú:"llegarás","él/ella":"llegará",nosotros:"llegaremos","ellos/ellas":"llegarán"}},
    ]
  },
  subjuntivo: {
    label: "Subjuntivo presente",
    desc: "życzenia, wątpliwości, emocje",
    color: "purple",
    verbs: [
      {inf:"hablar",en:"mówić",c:{yo:"hable",tú:"hables","él/ella":"hable",nosotros:"hablemos","ellos/ellas":"hablen"}},
      {inf:"comer",en:"jeść",c:{yo:"coma",tú:"comas","él/ella":"coma",nosotros:"comamos","ellos/ellas":"coman"}},
      {inf:"vivir",en:"żyć / mieszkać",c:{yo:"viva",tú:"vivas","él/ella":"viva",nosotros:"vivamos","ellos/ellas":"vivan"}},
      {inf:"ser",en:"być",c:{yo:"sea",tú:"seas","él/ella":"sea",nosotros:"seamos","ellos/ellas":"sean"}},
      {inf:"estar",en:"być (gdzieś/w stanie)",c:{yo:"esté",tú:"estés","él/ella":"esté",nosotros:"estemos","ellos/ellas":"estén"}},
      {inf:"ir",en:"iść / jechać",c:{yo:"vaya",tú:"vayas","él/ella":"vaya",nosotros:"vayamos","ellos/ellas":"vayan"}},
      {inf:"tener",en:"mieć",c:{yo:"tenga",tú:"tengas","él/ella":"tenga",nosotros:"tengamos","ellos/ellas":"tengan"}},
      {inf:"hacer",en:"robić",c:{yo:"haga",tú:"hagas","él/ella":"haga",nosotros:"hagamos","ellos/ellas":"hagan"}},
      {inf:"poder",en:"móc",c:{yo:"pueda",tú:"puedas","él/ella":"pueda",nosotros:"podamos","ellos/ellas":"puedan"}},
      {inf:"querer",en:"chcieć / kochać",c:{yo:"quiera",tú:"quieras","él/ella":"quiera",nosotros:"queramos","ellos/ellas":"quieran"}},
      {inf:"saber",en:"wiedzieć / umieć",c:{yo:"sepa",tú:"sepas","él/ella":"sepa",nosotros:"sepamos","ellos/ellas":"sepan"}},
      {inf:"venir",en:"przychodzić",c:{yo:"venga",tú:"vengas","él/ella":"venga",nosotros:"vengamos","ellos/ellas":"vengan"}},
      {inf:"decir",en:"mówić / powiedzieć",c:{yo:"diga",tú:"digas","él/ella":"diga",nosotros:"digamos","ellos/ellas":"digan"}},
      {inf:"dar",en:"dawać",c:{yo:"dé",tú:"des","él/ella":"dé",nosotros:"demos","ellos/ellas":"den"}},
      {inf:"ver",en:"widzieć / oglądać",c:{yo:"vea",tú:"veas","él/ella":"vea",nosotros:"veamos","ellos/ellas":"vean"}},
      {inf:"poner",en:"kłaść / stawiać",c:{yo:"ponga",tú:"pongas","él/ella":"ponga",nosotros:"pongamos","ellos/ellas":"pongan"}},
      {inf:"salir",en:"wychodzić",c:{yo:"salga",tú:"salgas","él/ella":"salga",nosotros:"salgamos","ellos/ellas":"salgan"}},
      {inf:"traer",en:"przynosić",c:{yo:"traiga",tú:"traigas","él/ella":"traiga",nosotros:"traigamos","ellos/ellas":"traigan"}},
      {inf:"conocer",en:"znać / poznać",c:{yo:"conozca",tú:"conozcas","él/ella":"conozca",nosotros:"conozcamos","ellos/ellas":"conozcan"}},
      {inf:"conducir",en:"prowadzić (auto)",c:{yo:"conduzca",tú:"conduzcas","él/ella":"conduzca",nosotros:"conduzcamos","ellos/ellas":"conduzcan"}},
      {inf:"dormir",en:"spać",c:{yo:"duerma",tú:"duermas","él/ella":"duerma",nosotros:"durmamos","ellos/ellas":"duerman"}},
      {inf:"pedir",en:"prosić / zamawiać",c:{yo:"pida",tú:"pidas","él/ella":"pida",nosotros:"pidamos","ellos/ellas":"pidan"}},
      {inf:"sentir",en:"czuć",c:{yo:"sienta",tú:"sientas","él/ella":"sienta",nosotros:"sintamos","ellos/ellas":"sientan"}},
      {inf:"seguir",en:"podążać",c:{yo:"siga",tú:"sigas","él/ella":"siga",nosotros:"sigamos","ellos/ellas":"sigan"}},
      {inf:"elegir",en:"wybierać",c:{yo:"elija",tú:"elijas","él/ella":"elija",nosotros:"elijamos","ellos/ellas":"elijan"}},
      {inf:"volver",en:"wracać",c:{yo:"vuelva",tú:"vuelvas","él/ella":"vuelva",nosotros:"volvamos","ellos/ellas":"vuelvan"}},
      {inf:"poder",en:"móc",c:{yo:"pueda",tú:"puedas","él/ella":"pueda",nosotros:"podamos","ellos/ellas":"puedan"}},
      {inf:"hablar",en:"mówić",c:{yo:"hable",tú:"hables","él/ella":"hable",nosotros:"hablemos","ellos/ellas":"hablen"}},
      {inf:"trabajar",en:"pracować",c:{yo:"trabaje",tú:"trabajes","él/ella":"trabaje",nosotros:"trabajemos","ellos/ellas":"trabajen"}},
      {inf:"escribir",en:"pisać",c:{yo:"escriba",tú:"escribas","él/ella":"escriba",nosotros:"escribamos","ellos/ellas":"escriban"}},
      {inf:"leer",en:"czytać",c:{yo:"lea",tú:"leas","él/ella":"lea",nosotros:"leamos","ellos/ellas":"lean"}},
      {inf:"abrir",en:"otwierać",c:{yo:"abra",tú:"abras","él/ella":"abra",nosotros:"abramos","ellos/ellas":"abran"}},
      {inf:"buscar",en:"szukać",c:{yo:"busque",tú:"busques","él/ella":"busque",nosotros:"busquemos","ellos/ellas":"busquen"}},
      {inf:"llegar",en:"przyjeżdżać",c:{yo:"llegue",tú:"llegues","él/ella":"llegue",nosotros:"lleguemos","ellos/ellas":"lleguen"}},
      {inf:"pagar",en:"płacić",c:{yo:"pague",tú:"pagues","él/ella":"pague",nosotros:"paguemos","ellos/ellas":"paguen"}},
      {inf:"empezar",en:"zaczynać",c:{yo:"empiece",tú:"empieces","él/ella":"empiece",nosotros:"empecemos","ellos/ellas":"empiecen"}},
      {inf:"jugar",en:"grać",c:{yo:"juegue",tú:"juegues","él/ella":"juegue",nosotros:"juguemos","ellos/ellas":"jueguen"}},
      {inf:"haber",en:"być (aux.)",c:{yo:"haya",tú:"hayas","él/ella":"haya",nosotros:"hayamos","ellos/ellas":"hayan"}},
    ]
  }
};

const SUPPLEMENTAL_VERBS = {
  indefinido: [
    {inf:"haber",en:"być (aux.)",c:{yo:"hube",tú:"hubiste","él/ella":"hubo",nosotros:"hubimos","ellos/ellas":"hubieron"}},
    {inf:"valer",en:"być wartym",c:{yo:"valí",tú:"valiste","él/ella":"valió",nosotros:"valimos","ellos/ellas":"valieron"}},
    {inf:"caber",en:"mieścić się",c:{yo:"cupe",tú:"cupiste","él/ella":"cupo",nosotros:"cupimos","ellos/ellas":"cupieron"}},
    {inf:"conocer",en:"znać / poznać",c:{yo:"conocí",tú:"conociste","él/ella":"conoció",nosotros:"conocimos","ellos/ellas":"conocieron"}},
    {inf:"abrir",en:"otwierać",c:{yo:"abrí",tú:"abriste","él/ella":"abrió",nosotros:"abrimos","ellos/ellas":"abrieron"}},
    {inf:"beber",en:"pić",c:{yo:"bebí",tú:"bebiste","él/ella":"bebió",nosotros:"bebimos","ellos/ellas":"bebieron"}},
    {inf:"pensar",en:"myśleć",c:{yo:"pensé",tú:"pensaste","él/ella":"pensó",nosotros:"pensamos","ellos/ellas":"pensaron"}},
    {inf:"perder",en:"tracić / gubić",c:{yo:"perdí",tú:"perdiste","él/ella":"perdió",nosotros:"perdimos","ellos/ellas":"perdieron"}},
    {inf:"entender",en:"rozumieć",c:{yo:"entendí",tú:"entendiste","él/ella":"entendió",nosotros:"entendimos","ellos/ellas":"entendieron"}},
    {inf:"encontrar",en:"znajdować",c:{yo:"encontré",tú:"encontraste","él/ella":"encontró",nosotros:"encontramos","ellos/ellas":"encontraron"}},
    {inf:"preferir",en:"woleć",c:{yo:"preferí",tú:"preferiste","él/ella":"prefirió",nosotros:"preferimos","ellos/ellas":"prefirieron"}},
    {inf:"conseguir",en:"osiągać / zdobywać",c:{yo:"conseguí",tú:"conseguiste","él/ella":"consiguió",nosotros:"conseguimos","ellos/ellas":"consiguieron"}},
    {inf:"mantener",en:"utrzymywać",c:{yo:"mantuve",tú:"mantuviste","él/ella":"mantuvo",nosotros:"mantuvimos","ellos/ellas":"mantuvieron"}},
    {inf:"traducir",en:"tłumaczyć",c:{yo:"traduje",tú:"tradujiste","él/ella":"tradujo",nosotros:"tradujimos","ellos/ellas":"tradujeron"}},
    {inf:"producir",en:"produkować",c:{yo:"produje",tú:"produjiste","él/ella":"produjo",nosotros:"produjimos","ellos/ellas":"produjeron"}},
    {inf:"ofrecer",en:"oferować",c:{yo:"ofrecí",tú:"ofreciste","él/ella":"ofreció",nosotros:"ofrecimos","ellos/ellas":"ofrecieron"}},
    {inf:"aparecer",en:"pojawiać się",c:{yo:"aparecí",tú:"apareciste","él/ella":"apareció",nosotros:"aparecimos","ellos/ellas":"aparecieron"}},
    {inf:"reconocer",en:"rozpoznawać / przyznawać",c:{yo:"reconocí",tú:"reconociste","él/ella":"reconoció",nosotros:"reconocimos","ellos/ellas":"reconocieron"}}
  ],
  imperfecto: [
    {inf:"haber",en:"być (aux.)",c:{yo:"había",tú:"habías","él/ella":"había",nosotros:"habíamos","ellos/ellas":"habían"}},
    {inf:"valer",en:"być wartym",c:{yo:"valía",tú:"valías","él/ella":"valía",nosotros:"valíamos","ellos/ellas":"valían"}},
    {inf:"caber",en:"mieścić się",c:{yo:"cabía",tú:"cabías","él/ella":"cabía",nosotros:"cabíamos","ellos/ellas":"cabían"}},
    {inf:"abrir",en:"otwierać",c:{yo:"abría",tú:"abrías","él/ella":"abría",nosotros:"abríamos","ellos/ellas":"abrían"}},
    {inf:"buscar",en:"szukać",c:{yo:"buscaba",tú:"buscabas","él/ella":"buscaba",nosotros:"buscábamos","ellos/ellas":"buscaban"}},
    {inf:"llegar",en:"przyjeżdżać",c:{yo:"llegaba",tú:"llegabas","él/ella":"llegaba",nosotros:"llegábamos","ellos/ellas":"llegaban"}},
    {inf:"pagar",en:"płacić",c:{yo:"pagaba",tú:"pagabas","él/ella":"pagaba",nosotros:"pagábamos","ellos/ellas":"pagaban"}},
    {inf:"perder",en:"tracić / gubić",c:{yo:"perdía",tú:"perdías","él/ella":"perdía",nosotros:"perdíamos","ellos/ellas":"perdían"}},
    {inf:"entender",en:"rozumieć",c:{yo:"entendía",tú:"entendías","él/ella":"entendía",nosotros:"entendíamos","ellos/ellas":"entendían"}},
    {inf:"encontrar",en:"znajdować",c:{yo:"encontraba",tú:"encontrabas","él/ella":"encontraba",nosotros:"encontrábamos","ellos/ellas":"encontraban"}},
    {inf:"preferir",en:"woleć",c:{yo:"prefería",tú:"preferías","él/ella":"prefería",nosotros:"preferíamos","ellos/ellas":"preferían"}},
    {inf:"elegir",en:"wybierać",c:{yo:"elegía",tú:"elegías","él/ella":"elegía",nosotros:"elegíamos","ellos/ellas":"elegían"}},
    {inf:"servir",en:"służyć / podawać",c:{yo:"servía",tú:"servías","él/ella":"servía",nosotros:"servíamos","ellos/ellas":"servían"}},
    {inf:"volver",en:"wracać",c:{yo:"volvía",tú:"volvías","él/ella":"volvía",nosotros:"volvíamos","ellos/ellas":"volvían"}},
    {inf:"empezar",en:"zaczynać",c:{yo:"empezaba",tú:"empezabas","él/ella":"empezaba",nosotros:"empezábamos","ellos/ellas":"empezaban"}},
    {inf:"conseguir",en:"osiągać / zdobywać",c:{yo:"conseguía",tú:"conseguías","él/ella":"conseguía",nosotros:"conseguíamos","ellos/ellas":"conseguían"}},
    {inf:"mantener",en:"utrzymywać",c:{yo:"mantenía",tú:"mantenías","él/ella":"mantenía",nosotros:"manteníamos","ellos/ellas":"mantenían"}},
    {inf:"traducir",en:"tłumaczyć",c:{yo:"traducía",tú:"traducías","él/ella":"traducía",nosotros:"traducíamos","ellos/ellas":"traducían"}},
    {inf:"producir",en:"produkować",c:{yo:"producía",tú:"producías","él/ella":"producía",nosotros:"producíamos","ellos/ellas":"producían"}},
    {inf:"ofrecer",en:"oferować",c:{yo:"ofrecía",tú:"ofrecías","él/ella":"ofrecía",nosotros:"ofrecíamos","ellos/ellas":"ofrecían"}},
    {inf:"aparecer",en:"pojawiać się",c:{yo:"aparecía",tú:"aparecías","él/ella":"aparecía",nosotros:"aparecíamos","ellos/ellas":"aparecían"}},
    {inf:"reconocer",en:"rozpoznawać / przyznawać",c:{yo:"reconocía",tú:"reconocías","él/ella":"reconocía",nosotros:"reconocíamos","ellos/ellas":"reconocían"}}
  ],
  futuro: [
    {inf:"pensar",en:"myśleć",c:{yo:"pensaré",tú:"pensarás","él/ella":"pensará",nosotros:"pensaremos","ellos/ellas":"pensarán"}},
    {inf:"sentir",en:"czuć",c:{yo:"sentiré",tú:"sentirás","él/ella":"sentirá",nosotros:"sentiremos","ellos/ellas":"sentirán"}},
    {inf:"pedir",en:"prosić / zamawiać",c:{yo:"pediré",tú:"pedirás","él/ella":"pedirá",nosotros:"pediremos","ellos/ellas":"pedirán"}},
    {inf:"traer",en:"przynosić",c:{yo:"traeré",tú:"traerás","él/ella":"traerá",nosotros:"traeremos","ellos/ellas":"traerán"}},
    {inf:"nacer",en:"urodzić się",c:{yo:"naceré",tú:"nacerás","él/ella":"nacerá",nosotros:"naceremos","ellos/ellas":"nacerán"}},
    {inf:"reír",en:"śmiać się",c:{yo:"reiré",tú:"reirás","él/ella":"reirá",nosotros:"reiremos","ellos/ellas":"reirán"}},
    {inf:"elegir",en:"wybierać",c:{yo:"elegiré",tú:"elegirás","él/ella":"elegirá",nosotros:"elegiremos","ellos/ellas":"elegirán"}},
    {inf:"servir",en:"służyć / podawać",c:{yo:"serviré",tú:"servirás","él/ella":"servirá",nosotros:"serviremos","ellos/ellas":"servirán"}},
    {inf:"volver",en:"wracać",c:{yo:"volveré",tú:"volverás","él/ella":"volverá",nosotros:"volveremos","ellos/ellas":"volverán"}},
    {inf:"empezar",en:"zaczynać",c:{yo:"empezaré",tú:"empezarás","él/ella":"empezará",nosotros:"empezaremos","ellos/ellas":"empezarán"}},
    {inf:"buscar",en:"szukać",c:{yo:"buscaré",tú:"buscarás","él/ella":"buscará",nosotros:"buscaremos","ellos/ellas":"buscarán"}},
    {inf:"pagar",en:"płacić",c:{yo:"pagaré",tú:"pagarás","él/ella":"pagará",nosotros:"pagaremos","ellos/ellas":"pagarán"}},
    {inf:"jugar",en:"grać",c:{yo:"jugaré",tú:"jugarás","él/ella":"jugará",nosotros:"jugaremos","ellos/ellas":"jugarán"}},
    {inf:"creer",en:"wierzyć / sądzić",c:{yo:"creeré",tú:"creerás","él/ella":"creerá",nosotros:"creeremos","ellos/ellas":"creerán"}},
    {inf:"conocer",en:"znać / poznać",c:{yo:"conoceré",tú:"conocerás","él/ella":"conocerá",nosotros:"conoceremos","ellos/ellas":"conocerán"}},
    {inf:"perder",en:"tracić / gubić",c:{yo:"perderé",tú:"perderás","él/ella":"perderá",nosotros:"perderemos","ellos/ellas":"perderán"}},
    {inf:"entender",en:"rozumieć",c:{yo:"entenderé",tú:"entenderás","él/ella":"entenderá",nosotros:"entenderemos","ellos/ellas":"entenderán"}},
    {inf:"encontrar",en:"znajdować",c:{yo:"encontraré",tú:"encontrarás","él/ella":"encontrará",nosotros:"encontraremos","ellos/ellas":"encontrarán"}},
    {inf:"preferir",en:"woleć",c:{yo:"preferiré",tú:"preferirás","él/ella":"preferirá",nosotros:"preferiremos","ellos/ellas":"preferirán"}},
    {inf:"conseguir",en:"osiągać / zdobywać",c:{yo:"conseguiré",tú:"conseguirás","él/ella":"conseguirá",nosotros:"conseguiremos","ellos/ellas":"conseguirán"}},
    {inf:"mantener",en:"utrzymywać",c:{yo:"mantendré",tú:"mantendrás","él/ella":"mantendrá",nosotros:"mantendremos","ellos/ellas":"mantendrán"}},
    {inf:"traducir",en:"tłumaczyć",c:{yo:"traduciré",tú:"traducirás","él/ella":"traducirá",nosotros:"traduciremos","ellos/ellas":"traducirán"}},
    {inf:"producir",en:"produkować",c:{yo:"produciré",tú:"producirás","él/ella":"producirá",nosotros:"produciremos","ellos/ellas":"producirán"}},
    {inf:"ofrecer",en:"oferować",c:{yo:"ofreceré",tú:"ofrecerás","él/ella":"ofrecerá",nosotros:"ofreceremos","ellos/ellas":"ofrecerán"}},
    {inf:"aparecer",en:"pojawiać się",c:{yo:"apareceré",tú:"aparecerás","él/ella":"aparecerá",nosotros:"apareceremos","ellos/ellas":"aparecerán"}},
    {inf:"reconocer",en:"rozpoznawać / przyznawać",c:{yo:"reconoceré",tú:"reconocerás","él/ella":"reconocerá",nosotros:"reconoceremos","ellos/ellas":"reconocerán"}}
  ],
  subjuntivo: [
    {inf:"valer",en:"być wartym",c:{yo:"valga",tú:"valgas","él/ella":"valga",nosotros:"valgamos","ellos/ellas":"valgan"}},
    {inf:"caber",en:"mieścić się",c:{yo:"quepa",tú:"quepas","él/ella":"quepa",nosotros:"quepamos","ellos/ellas":"quepan"}},
    {inf:"escribir",en:"pisać",c:{yo:"escriba",tú:"escribas","él/ella":"escriba",nosotros:"escribamos","ellos/ellas":"escriban"}},
    {inf:"pensar",en:"myśleć",c:{yo:"piense",tú:"pienses","él/ella":"piense",nosotros:"pensemos","ellos/ellas":"piensen"}},
    {inf:"perder",en:"tracić / gubić",c:{yo:"pierda",tú:"pierdas","él/ella":"pierda",nosotros:"perdamos","ellos/ellas":"pierdan"}},
    {inf:"entender",en:"rozumieć",c:{yo:"entienda",tú:"entiendas","él/ella":"entienda",nosotros:"entendamos","ellos/ellas":"entiendan"}},
    {inf:"encontrar",en:"znajdować",c:{yo:"encuentre",tú:"encuentres","él/ella":"encuentre",nosotros:"encontremos","ellos/ellas":"encuentren"}},
    {inf:"preferir",en:"woleć",c:{yo:"prefiera",tú:"prefieras","él/ella":"prefiera",nosotros:"prefiramos","ellos/ellas":"prefieran"}},
    {inf:"creer",en:"wierzyć / sądzić",c:{yo:"crea",tú:"creas","él/ella":"crea",nosotros:"creamos","ellos/ellas":"crean"}},
    {inf:"morir",en:"umierać",c:{yo:"muera",tú:"mueras","él/ella":"muera",nosotros:"muramos","ellos/ellas":"mueran"}},
    {inf:"nacer",en:"urodzić się",c:{yo:"nazca",tú:"nazcas","él/ella":"nazca",nosotros:"nazcamos","ellos/ellas":"nazcan"}},
    {inf:"reír",en:"śmiać się",c:{yo:"ría",tú:"rías","él/ella":"ría",nosotros:"riamos","ellos/ellas":"rían"}},
    {inf:"conseguir",en:"osiągać / zdobywać",c:{yo:"consiga",tú:"consigas","él/ella":"consiga",nosotros:"consigamos","ellos/ellas":"consigan"}},
    {inf:"mantener",en:"utrzymywać",c:{yo:"mantenga",tú:"mantengas","él/ella":"mantenga",nosotros:"mantengamos","ellos/ellas":"mantengan"}},
    {inf:"traducir",en:"tłumaczyć",c:{yo:"traduzca",tú:"traduzcas","él/ella":"traduzca",nosotros:"traduzcamos","ellos/ellas":"traduzcan"}},
    {inf:"producir",en:"produkować",c:{yo:"produzca",tú:"produzcas","él/ella":"produzca",nosotros:"produzcamos","ellos/ellas":"produzcan"}},
    {inf:"ofrecer",en:"oferować",c:{yo:"ofrezca",tú:"ofrezcas","él/ella":"ofrezca",nosotros:"ofrezcamos","ellos/ellas":"ofrezcan"}},
    {inf:"aparecer",en:"pojawiać się",c:{yo:"aparezca",tú:"aparezcas","él/ella":"aparezca",nosotros:"aparezcamos","ellos/ellas":"aparezcan"}},
    {inf:"reconocer",en:"rozpoznawać / przyznawać",c:{yo:"reconozca",tú:"reconozcas","él/ella":"reconozca",nosotros:"reconozcamos","ellos/ellas":"reconozcan"}}
  ]
};

Object.entries(SUPPLEMENTAL_VERBS).forEach(([tense, verbs]) => {
  const existing = new Set(DATA[tense].verbs.map(v => v.inf));
  verbs.forEach(v => { if(!existing.has(v.inf)) DATA[tense].verbs.push(v); });
});
DATA.perfecto = {
  label: "Pretérito perfecto",
  desc: "imiesłów: abrir → abierto",
  color: "pink",
  verbs: [
    {inf:"abrir",en:"otwierać",part:"abierto"}, {inf:"decir",en:"mówić / powiedzieć",part:"dicho"}, {inf:"hacer",en:"robić",part:"hecho"}, {inf:"poner",en:"kłaść / stawiać",part:"puesto"}, {inf:"ver",en:"widzieć / oglądać",part:"visto"},
    {inf:"volver",en:"wracać",part:"vuelto"}, {inf:"escribir",en:"pisać",part:"escrito"}, {inf:"morir",en:"umierać",part:"muerto"}, {inf:"romper",en:"łamać / psuć",part:"roto"}, {inf:"cubrir",en:"zakrywać",part:"cubierto"},
    {inf:"descubrir",en:"odkrywać",part:"descubierto"}, {inf:"freír",en:"smażyć",part:"frito"}, {inf:"resolver",en:"rozwiązywać",part:"resuelto"}, {inf:"devolver",en:"oddawać",part:"devuelto"}, {inf:"imprimir",en:"drukować",part:"impreso"},
    {inf:"ser",en:"być",part:"sido"}, {inf:"estar",en:"być (gdzieś/w stanie)",part:"estado"}, {inf:"tener",en:"mieć",part:"tenido"}, {inf:"ir",en:"iść / jechać",part:"ido"}, {inf:"poder",en:"móc",part:"podido"},
    {inf:"querer",en:"chcieć / kochać",part:"querido"}, {inf:"saber",en:"wiedzieć / umieć",part:"sabido"}, {inf:"venir",en:"przychodzić",part:"venido"}, {inf:"dar",en:"dawać",part:"dado"}, {inf:"salir",en:"wychodzić",part:"salido"},
    {inf:"traer",en:"przynosić",part:"traído"}, {inf:"leer",en:"czytać",part:"leído"}, {inf:"caer",en:"upadać",part:"caído"}, {inf:"oír",en:"słyszeć",part:"oído"}, {inf:"creer",en:"wierzyć / sądzić",part:"creído"},
    {inf:"dormir",en:"spać",part:"dormido"}, {inf:"pedir",en:"prosić / zamawiać",part:"pedido"}, {inf:"sentir",en:"czuć",part:"sentido"}, {inf:"seguir",en:"podążać",part:"seguido"}, {inf:"elegir",en:"wybierać",part:"elegido"},
    {inf:"conducir",en:"prowadzić (auto)",part:"conducido"}, {inf:"conocer",en:"znać / poznać",part:"conocido"}, {inf:"mantener",en:"utrzymywać",part:"mantenido"}, {inf:"traducir",en:"tłumaczyć",part:"traducido"}, {inf:"producir",en:"produkować",part:"producido"}
  ]
};
function addAccentToLastVowel(text){
  const accents = {a:"á", e:"é", i:"í", o:"ó", u:"ú"};
  for(let i = text.length - 1; i >= 0; i--){
    const ch = text[i].toLowerCase();
    if(accents[ch]) return text.slice(0, i) + accents[ch] + text.slice(i + 1);
  }
  return text;
}
function imperfectSubjunctiveFromPreterite(verb){
  const ellos = verb.c?.["ellos/ellas"];
  if(!ellos || !ellos.endsWith("ron")) return null;
  const stem = ellos.slice(0, -3);
  return {
    inf: verb.inf,
    en: verb.en,
    c: {
      yo: stem + "ra",
      tú: stem + "ras",
      "él/ella": stem + "ra",
      nosotros: addAccentToLastVowel(stem) + "ramos",
      vosotros: stem + "rais",
      "ellos/ellas": stem + "ran"
    }
  };
}
DATA.subjuntivo_imperfecto = {
  label: "Subjuntivo imperfecto",
  desc: "gdyby / żeby w przeszłości",
  color: "indigo",
  verbs: DATA.indefinido.verbs.map(imperfectSubjunctiveFromPreterite).filter(Boolean)
};
const DIFFICULTIES = {
  easy: {
    label: "Łatwy",
    formCount: 15,
    desc: "najczęstsze czasowniki i formy"
  },
  normal: {
    label: "Średni",
    formCount: 15,
    desc: "częste, trochę trudniejsze"
  },
  hard: {
    label: "Trudny",
    formCount: 15,
    desc: "problemowe nieregularności"
  }
};
const TENSE_LEVEL_VERBS = {
  indefinido: {
    easy: ["ser","ir","tener","estar","hacer","poder","querer","decir","saber","venir","dar","ver","poner","salir","dormir","pedir","hablar","comer"],
    normal: ["traer","andar","leer","oír","caer","creer","sentir","seguir","elegir","servir","morir","volver","empezar","jugar","buscar","pagar","llegar","escribir"],
    hard: ["conducir","construir","caber","mantener","traducir","producir","preferir","conseguir","reír","nacer","conocer","perder","entender","encontrar","ofrecer","aparecer","reconocer","abrir"]
  },
  imperfecto: {
    easy: ["ser","ir","ver","tener","estar","hacer","poder","querer","saber","venir","decir","poner","salir","dormir","hablar","comer","vivir","trabajar"],
    normal: ["haber","traer","leer","creer","reír","sentir","seguir","pedir","dar","jugar","conocer","llevar","llamar","pasar","pensar","escribir","comprar","viajar"],
    hard: ["caber","valer","conseguir","mantener","traducir","producir","ofrecer","aparecer","reconocer","preferir","elegir","servir","volver","empezar","perder","entender","encontrar","abrir"]
  },
  futuro: {
    easy: ["tener","hacer","poder","querer","saber","venir","decir","poner","salir","haber","ser","ir","estar","ver","dar","hablar","comer","vivir"],
    normal: ["valer","caber","mantener","pensar","sentir","pedir","traer","dormir","escribir","leer","abrir","seguir","volver","jugar","creer","conocer","perder","entender"],
    hard: ["conseguir","traducir","producir","preferir","encontrar","elegir","servir","empezar","buscar","pagar","llegar","nacer","reír","ofrecer","aparecer","reconocer","comprar","viajar"]
  },
  subjuntivo: {
    easy: ["ser","estar","ir","tener","hacer","poder","querer","saber","venir","decir","dar","ver","poner","salir","haber","hablar","comer","vivir"],
    normal: ["traer","conocer","conducir","dormir","pedir","sentir","seguir","elegir","volver","empezar","jugar","buscar","llegar","pagar","escribir","leer","abrir","pensar"],
    hard: ["caber","valer","perder","entender","encontrar","preferir","creer","morir","nacer","reír","conseguir","mantener","traducir","producir","ofrecer","aparecer","reconocer","trabajar"]
  },
  subjuntivo_imperfecto: {
    easy: ["ser","ir","tener","estar","hacer","poder","querer","saber","venir","decir","dar","ver","poner","salir","haber","hablar","comer","vivir"],
    normal: ["traer","andar","leer","oír","caer","creer","dormir","pedir","sentir","seguir","elegir","servir","morir","volver","empezar","jugar","buscar","pagar"],
    hard: ["conducir","construir","caber","mantener","traducir","producir","preferir","conseguir","reír","nacer","conocer","perder","entender","encontrar","ofrecer","aparecer","reconocer","abrir"]
  },
  perfecto: {
    easy: ["abrir","decir","hacer","poner","ver","volver","escribir","morir","ser","estar","tener","ir","poder","querer","dar"],
    normal: ["romper","cubrir","descubrir","resolver","devolver","imprimir","saber","venir","salir","traer","leer","caer","oír","creer","dormir"],
    hard: ["freír","pedir","sentir","seguir","elegir","conducir","conocer","mantener","traducir","producir","cubrir","descubrir","resolver","devolver","imprimir"]
  }
};
function inferVosotros(tense, verb){
  if(!verb.c || verb.c.vosotros) return;
  if(tense === "indefinido" && verb.c["tú"]) verb.c.vosotros = verb.c["tú"] + "is";
  if(tense === "imperfecto"){
    const yo = verb.c.yo || "";
    if(verb.inf === "ser") verb.c.vosotros = "erais";
    else if(verb.inf === "ir") verb.c.vosotros = "ibais";
    else if(verb.inf === "ver") verb.c.vosotros = "veíais";
    else if(yo.endsWith("aba")) verb.c.vosotros = yo.slice(0, -3) + "abais";
    else if(yo.endsWith("ía")) verb.c.vosotros = yo.slice(0, -2) + "íais";
  }
  if(tense === "futuro" && verb.c.yo?.endsWith("é")) verb.c.vosotros = verb.c.yo.slice(0, -1) + "éis";
  if(tense === "subjuntivo"){
    const nos = verb.c.nosotros || "";
    if(verb.inf === "dar") verb.c.vosotros = "deis";
    else if(nos.endsWith("emos")) verb.c.vosotros = nos.slice(0, -4) + "éis";
    else if(nos.endsWith("amos")) verb.c.vosotros = nos.slice(0, -4) + "áis";
  }
}
Object.entries(DATA).forEach(([tense, data]) => {
  if(tense !== "perfecto") data.verbs.forEach(v => inferVosotros(tense, v));
});
const STATS_KEY = "spanishConjugationStats.v2";
const FAVORITES_KEY = "spanishConjugationFavorites.v1";
const SUSPENDED_VERBS_KEY = "spanishSuspendedVerbs.v1";
const SUSPENDED_ACCENTS_KEY = "spanishSuspendedAccents.v1";
const ACCENT_STATS_KEY = "spanishAccentStats.v1";
const ACCENT_HARD_KEY = "spanishAccentHardWords.v1";
const ACCENT_TOTAL = 15;
const ACCENT_WORDS = [
  {plain:"tambien",word:"también",pl:"też"}, {plain:"ademas",word:"además",pl:"ponadto"}, {plain:"despues",word:"después",pl:"potem"}, {plain:"aqui",word:"aquí",pl:"tutaj"}, {plain:"alli",word:"allí",pl:"tam"}, {plain:"ahi",word:"ahí",pl:"tam / właśnie tam"}, {plain:"asi",word:"así",pl:"tak / w ten sposób"}, {plain:"mas",word:"más",pl:"więcej"}, {plain:"si",word:"sí",pl:"tak"}, {plain:"aun",word:"aún",pl:"jeszcze"},
  {plain:"como",word:"cómo",pl:"jak"}, {plain:"que",word:"qué",pl:"co / jaki"}, {plain:"quien",word:"quién",pl:"kto"}, {plain:"quienes",word:"quiénes",pl:"kto (liczba mnoga)"}, {plain:"cual",word:"cuál",pl:"który"}, {plain:"cuales",word:"cuáles",pl:"które"}, {plain:"cuando",word:"cuándo",pl:"kiedy"}, {plain:"donde",word:"dónde",pl:"gdzie"}, {plain:"cuanto",word:"cuánto",pl:"ile"}, {plain:"cuanta",word:"cuánta",pl:"ile (r. żeński)"},
  {plain:"cuantos",word:"cuántos",pl:"ilu / ile"}, {plain:"cuantas",word:"cuántas",pl:"ile (r. żeński mn.)"}, {plain:"porque",word:"porqué",pl:"powód"}, {plain:"dia",word:"día",pl:"dzień"}, {plain:"dias",word:"días",pl:"dni"}, {plain:"pais",word:"país",pl:"kraj"}, {plain:"paises",word:"países",pl:"kraje"}, {plain:"ciudadania",word:"ciudadanía",pl:"obywatelstwo"}, {plain:"guia",word:"guía",pl:"przewodnik"}, {plain:"cafe",word:"café",pl:"kawa / kawiarnia"},
  {plain:"te",word:"té",pl:"herbata"}, {plain:"ingles",word:"inglés",pl:"angielski"}, {plain:"frances",word:"francés",pl:"francuski"}, {plain:"aleman",word:"alemán",pl:"niemiecki"}, {plain:"japones",word:"japonés",pl:"japoński"}, {plain:"portugues",word:"portugués",pl:"portugalski"}, {plain:"compas",word:"compás",pl:"rytm / kompas"}, {plain:"menu",word:"menú",pl:"menu"}, {plain:"sofa",word:"sofá",pl:"sofa"}, {plain:"bebe",word:"bebé",pl:"dziecko"},
  {plain:"mama",word:"mamá",pl:"mama"}, {plain:"papa",word:"papá",pl:"tata"}, {plain:"arbol",word:"árbol",pl:"drzewo"}, {plain:"lapiz",word:"lápiz",pl:"ołówek"}, {plain:"facil",word:"fácil",pl:"łatwy"}, {plain:"dificil",word:"difícil",pl:"trudny"}, {plain:"util",word:"útil",pl:"użyteczny"}, {plain:"inutil",word:"inútil",pl:"bezużyteczny"}, {plain:"rapido",word:"rápido",pl:"szybki"}, {plain:"rapidamente",word:"rápidamente",pl:"szybko"},
  {plain:"ultimo",word:"último",pl:"ostatni"}, {plain:"unico",word:"único",pl:"jedyny"}, {plain:"proximo",word:"próximo",pl:"następny / bliski"}, {plain:"publico",word:"público",pl:"publiczny"}, {plain:"musica",word:"música",pl:"muzyka"}, {plain:"numero",word:"número",pl:"liczba / numer"}, {plain:"telefono",word:"teléfono",pl:"telefon"}, {plain:"camara",word:"cámara",pl:"aparat / kamera"}, {plain:"pagina",word:"página",pl:"strona"}, {plain:"maquina",word:"máquina",pl:"maszyna"},
  {plain:"medico",word:"médico",pl:"lekarz"}, {plain:"periodico",word:"periódico",pl:"gazeta"}, {plain:"pelicula",word:"película",pl:"film"}, {plain:"practica",word:"práctica",pl:"praktyka"}, {plain:"tecnica",word:"técnica",pl:"technika"}, {plain:"economia",word:"economía",pl:"ekonomia"}, {plain:"policia",word:"policía",pl:"policja"}, {plain:"energia",word:"energía",pl:"energia"}, {plain:"alegria",word:"alegría",pl:"radość"}, {plain:"compania",word:"compañía",pl:"towarzystwo / firma"},
  {plain:"todavia",word:"todavía",pl:"jeszcze"}, {plain:"linea",word:"línea",pl:"linia"}, {plain:"area",word:"área",pl:"obszar"}, {plain:"mayoria",word:"mayoría",pl:"większość"}, {plain:"minoria",word:"minoría",pl:"mniejszość"}, {plain:"teoria",word:"teoría",pl:"teoria"}, {plain:"geografia",word:"geografía",pl:"geografia"}, {plain:"biologia",word:"biología",pl:"biologia"}, {plain:"filosofia",word:"filosofía",pl:"filozofia"}, {plain:"fotografia",word:"fotografía",pl:"fotografia"},
  {plain:"situacion",word:"situación",pl:"sytuacja"}, {plain:"informacion",word:"información",pl:"informacja"}, {plain:"educacion",word:"educación",pl:"edukacja"}, {plain:"relacion",word:"relación",pl:"relacja"}, {plain:"decision",word:"decisión",pl:"decyzja"}, {plain:"opinion",word:"opinión",pl:"opinia"}, {plain:"atencion",word:"atención",pl:"uwaga"}, {plain:"direccion",word:"dirección",pl:"adres / kierunek"}, {plain:"habitacion",word:"habitación",pl:"pokój"}, {plain:"estacion",word:"estación",pl:"stacja / pora roku"},
  {plain:"corazon",word:"corazón",pl:"serce"}, {plain:"razon",word:"razón",pl:"racja / powód"}, {plain:"cancion",word:"canción",pl:"piosenka"}, {plain:"avion",word:"avión",pl:"samolot"}, {plain:"camion",word:"camión",pl:"ciężarówka"}, {plain:"reunion",word:"reunión",pl:"spotkanie"}, {plain:"television",word:"televisión",pl:"telewizja"}, {plain:"ocasion",word:"ocasión",pl:"okazja"}, {plain:"solucion",word:"solución",pl:"rozwiązanie"}, {plain:"conversacion",word:"conversación",pl:"rozmowa"},
  {plain:"accion",word:"acción",pl:"akcja"}, {plain:"nacion",word:"nación",pl:"naród"}, {plain:"region",word:"región",pl:"region"}, {plain:"union",word:"unión",pl:"unia / związek"}, {plain:"comun",word:"común",pl:"wspólny"}, {plain:"jovenes",word:"jóvenes",pl:"młodzi ludzie"}, {plain:"imagenes",word:"imágenes",pl:"obrazy"}, {plain:"examenes",word:"exámenes",pl:"egzaminy"}, {plain:"origenes",word:"orígenes",pl:"pochodzenia"}, {plain:"caracter",word:"carácter",pl:"charakter"},
  {plain:"facilmente",word:"fácilmente",pl:"łatwo"}, {plain:"ultimamente",word:"últimamente",pl:"ostatnio"}, {plain:"basicamente",word:"básicamente",pl:"zasadniczo"}, {plain:"unicamente",word:"únicamente",pl:"wyłącznie"}, {plain:"politica",word:"política",pl:"polityka"}, {plain:"logica",word:"lógica",pl:"logika"}, {plain:"fisica",word:"física",pl:"fizyka"}, {plain:"quimica",word:"química",pl:"chemia"}, {plain:"matematicas",word:"matemáticas",pl:"matematyka"}, {plain:"gramatica",word:"gramática",pl:"gramatyka"},
  {plain:"trafico",word:"tráfico",pl:"ruch uliczny"}, {plain:"plastico",word:"plástico",pl:"plastik"}, {plain:"clasico",word:"clásico",pl:"klasyczny"}, {plain:"metodo",word:"método",pl:"metoda"}, {plain:"america",word:"América",pl:"Ameryka"}, {plain:"mexico",word:"México",pl:"Meksyk"}, {plain:"peru",word:"Perú",pl:"Peru"}, {plain:"panama",word:"Panamá",pl:"Panama"}, {plain:"bogota",word:"Bogotá",pl:"Bogota"}, {plain:"cordoba",word:"Córdoba",pl:"Kordoba"},
  {plain:"angel",word:"ángel",pl:"anioł"}, {plain:"azucar",word:"azúcar",pl:"cukier"}, {plain:"carcel",word:"cárcel",pl:"więzienie"}, {plain:"cesped",word:"césped",pl:"trawa"}, {plain:"tunel",word:"túnel",pl:"tunel"}, {plain:"album",word:"álbum",pl:"album"}, {plain:"lider",word:"líder",pl:"lider"}, {plain:"futbol",word:"fútbol",pl:"piłka nożna"}, {plain:"record",word:"récord",pl:"rekord"}, {plain:"poster",word:"póster",pl:"plakat"},
  {plain:"comodo",word:"cómodo",pl:"wygodny"}, {plain:"incomodo",word:"incómodo",pl:"niewygodny"}, {plain:"calido",word:"cálido",pl:"ciepły"}, {plain:"frio",word:"frío",pl:"zimno / zimny"}, {plain:"rio",word:"río",pl:"rzeka"}, {plain:"mio",word:"mío",pl:"mój"}, {plain:"tio",word:"tío",pl:"wujek"}, {plain:"tia",word:"tía",pl:"ciocia"}, {plain:"sonrie",word:"sonríe",pl:"uśmiecha się"}, {plain:"oir",word:"oír",pl:"słyszeć"},
  {plain:"adios",word:"adiós",pl:"do widzenia"}, {plain:"quizas",word:"quizás",pl:"może"}, {plain:"quiza",word:"quizá",pl:"może"}, {plain:"jamas",word:"jamás",pl:"nigdy"}, {plain:"detras",word:"detrás",pl:"z tyłu"}, {plain:"atras",word:"atrás",pl:"wstecz / z tyłu"}, {plain:"segun",word:"según",pl:"według"}, {plain:"algun",word:"algún",pl:"jakiś"}, {plain:"ningun",word:"ningún",pl:"żaden"}, {plain:"demas",word:"demás",pl:"pozostali"},
  {plain:"sabado",word:"sábado",pl:"sobota"}, {plain:"miercoles",word:"miércoles",pl:"środa"}, {plain:"autobus",word:"autobús",pl:"autobus"}, {plain:"balon",word:"balón",pl:"piłka"}, {plain:"jardin",word:"jardín",pl:"ogród"}, {plain:"salon",word:"salón",pl:"salon / pokój"}, {plain:"rincon",word:"rincón",pl:"kąt"}, {plain:"sillon",word:"sillón",pl:"fotel"}, {plain:"oceano",word:"océano",pl:"ocean"}, {plain:"heroe",word:"héroe",pl:"bohater"},
  {plain:"heroes",word:"héroes",pl:"bohaterowie"}, {plain:"poesia",word:"poesía",pl:"poezja"}, {plain:"raiz",word:"raíz",pl:"korzeń"}, {plain:"baul",word:"baúl",pl:"kufer"}, {plain:"maiz",word:"maíz",pl:"kukurydza"}, {plain:"oido",word:"oído",pl:"słuch / ucho wewnętrzne"}, {plain:"caida",word:"caída",pl:"upadek"}, {plain:"reir",word:"reír",pl:"śmiać się"}, {plain:"buho",word:"búho",pl:"sowa"}, {plain:"envio",word:"envío",pl:"wysyłka"},
  {plain:"profesion",word:"profesión",pl:"zawód"}, {plain:"presion",word:"presión",pl:"presja"}, {plain:"version",word:"versión",pl:"wersja"}, {plain:"mision",word:"misión",pl:"misja"}, {plain:"vision",word:"visión",pl:"wizja"}, {plain:"impresion",word:"impresión",pl:"wrażenie"}, {plain:"expresion",word:"expresión",pl:"wyrażenie"}, {plain:"investigacion",word:"investigación",pl:"badanie"}, {plain:"organizacion",word:"organización",pl:"organizacja"}, {plain:"comunicacion",word:"comunicación",pl:"komunikacja"},
  {plain:"poblacion",word:"población",pl:"populacja"}, {plain:"tradicion",word:"tradición",pl:"tradycja"}, {plain:"eleccion",word:"elección",pl:"wybór"}, {plain:"emocion",word:"emoción",pl:"emocja"}, {plain:"obligacion",word:"obligación",pl:"obowiązek"}, {plain:"participacion",word:"participación",pl:"udział"}, {plain:"condicion",word:"condición",pl:"warunek"}, {plain:"posicion",word:"posición",pl:"pozycja"}, {plain:"produccion",word:"producción",pl:"produkcja"}, {plain:"construccion",word:"construcción",pl:"budowa / konstrukcja"},
  {plain:"administracion",word:"administración",pl:"administracja"}, {plain:"practicamente",word:"prácticamente",pl:"praktycznie"}, {plain:"dificilmente",word:"difícilmente",pl:"z trudem"}, {plain:"tecnologia",word:"tecnología",pl:"technologia"}, {plain:"psicologia",word:"psicología",pl:"psychologia"}, {plain:"categoria",word:"categoría",pl:"kategoria"}, {plain:"secretaria",word:"secretaría",pl:"sekretariat"}, {plain:"garantia",word:"garantía",pl:"gwarancja"}, {plain:"melodia",word:"melodía",pl:"melodia"}, {plain:"simpatia",word:"simpatía",pl:"sympatia"}
];
const DIFFICULTY_KEYS = ["easy", "normal", "hard"];
function loadSelectedDifficulties(){
  try {
    const saved = JSON.parse(localStorage.getItem("spanishConjugationDifficulties") || "null");
    if(Array.isArray(saved)){
      const valid = saved.filter(level => DIFFICULTY_KEYS.includes(level));
      if(valid.length) return valid;
    }
  } catch(e){}
  const legacy = localStorage.getItem("spanishConjugationDifficulty") || "normal";
  return DIFFICULTY_KEYS.includes(legacy) ? [legacy] : ["normal"];
}
let selectedDifficulties = loadSelectedDifficulties();
let selectedPracticeMode = localStorage.getItem("spanishPracticeMode") || "indefinido";
let spainMode = localStorage.getItem("spanishSpainMode") === "true";
let sentenceMode = localStorage.getItem("spanishSentenceMode") === "true";
let selectedAccentDifficulty = localStorage.getItem("spanishAccentDifficulty") || "easy";
let currentTense = null, queue = [], current = 0, score = 0, checked = false, sessionWrong = [];
let accentQueue = [], accentCurrent = 0, accentScore = 0, accentChecked = false, accentSessionWrong = [];

function shuffle(a){
  const copy = [...a];
  for(let i = copy.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function normalize(s){ return s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""); }
function cleanText(s){ return s.trim().toLowerCase(); }
function hasAccentDifference(answer, correct){ return normalize(answer) === normalize(correct) && cleanText(answer) !== cleanText(correct); }
function randomPick(items){ return items[Math.floor(Math.random() * items.length)]; }
function getPronouns(tense = currentTense){ return spainMode && tense !== "perfecto" ? spainPronouns : pronouns; }
function isPerfecto(tense = currentTense){ return tense === "perfecto"; }
function correctFor(q){ return isPerfecto(q.tense) ? q.verb.part : q.verb.c[q.pronoun]; }
function subjectFor(pronoun){ return {yo:"yo", tú:"tú", "él/ella":"ella", nosotros:"nosotros", vosotros:"vosotros", "ellos/ellas":"ellos"}[pronoun] || pronoun; }
const SENTENCE_SUBJECTS = {
  yo: ["yo"],
  tú: ["tú"],
  "él/ella": ["él", "ella", "mi hermano", "mi amiga", "el profesor", "la vecina", "mi padre", "mi madre", "Carlos", "Lucía", "la doctora", "el camarero"],
  nosotros: ["nosotros", "nosotras", "mi familia y yo", "mis amigos y yo", "mi clase y yo", "mi hermana y yo", "mi equipo y yo"],
  vosotros: ["vosotros", "vosotras", "tú y tus amigos", "tú y tu familia", "tú y tu hermano", "vosotros dos"],
  "ellos/ellas": ["ellos", "ellas", "mis amigos", "los estudiantes", "mis padres", "los vecinos", "las chicas", "los niños", "los profesores", "las familias"]
};
const SENTENCE_SUBJECT_PL = {
  yo: "ja", tú: "ty", él: "on", ella: "ona", "mi hermano": "mój brat", "mi amiga": "moja przyjaciółka", "el profesor": "nauczyciel", "la vecina": "sąsiadka", "mi padre": "mój tata", "mi madre": "moja mama", Carlos: "Carlos", Lucía: "Lucía", "la doctora": "lekarka", "el camarero": "kelner",
  nosotros: "my", nosotras: "my", "mi familia y yo": "moja rodzina i ja", "mis amigos y yo": "moi przyjaciele i ja", "mi clase y yo": "moja klasa i ja", "mi hermana y yo": "moja siostra i ja", "mi equipo y yo": "moja drużyna i ja",
  vosotros: "wy", vosotras: "wy", "tú y tus amigos": "ty i twoi przyjaciele", "tú y tu familia": "ty i twoja rodzina", "tú y tu hermano": "ty i twój brat", "vosotros dos": "wy dwaj",
  ellos: "oni", ellas: "one", "mis amigos": "moi przyjaciele", "los estudiantes": "uczniowie", "mis padres": "moi rodzice", "los vecinos": "sąsiedzi", "las chicas": "dziewczyny", "los niños": "dzieci", "los profesores": "nauczyciele", "las familias": "rodziny"
};
const SENTENCE_START_PL = {
  "Ayer":"wczoraj", "Anoche":"wczoraj wieczorem", "El lunes":"w poniedziałek", "La semana pasada":"w zeszłym tygodniu", "Hace dos días":"dwa dni temu", "Esta mañana":"dziś rano", "El verano pasado":"zeszłego lata", "En aquel momento":"w tamtym momencie", "Después de clase":"po lekcji", "Durante el viaje":"podczas podróży", "Al final":"na końcu", "De repente":"nagle", "Hace un rato":"przed chwilą", "En la reunión":"na spotkaniu", "Antes de salir":"przed wyjściem", "Por la tarde":"po południu", "El fin de semana":"w weekend", "En Madrid":"w Madrycie", "En casa":"w domu", "En la fiesta":"na imprezie", "En el aeropuerto":"na lotnisku", "Durante la cena":"podczas kolacji", "Al volver a casa":"po powrocie do domu", "En el último minuto":"w ostatniej chwili",
  "Antes":"wcześniej", "De joven":"w młodości", "En la infancia":"w dzieciństwie", "Todos los días":"codziennie", "Cada verano":"każdego lata", "Normalmente":"zwykle", "A menudo":"często", "Muchas veces":"wiele razy", "En aquella época":"w tamtym okresie", "Durante las vacaciones":"podczas wakacji", "Por las tardes":"popołudniami", "En la antigua escuela":"w dawnej szkole", "Los domingos":"w niedziele", "Cuando había tiempo":"kiedy był czas", "Siempre":"zawsze", "Casi nunca":"prawie nigdy", "Cada mañana":"każdego ranka", "En invierno":"zimą", "Durante el año":"w ciągu roku", "En casa de los abuelos":"u dziadków", "En el barrio":"w dzielnicy", "Después de comer":"po jedzeniu", "Antes de dormir":"przed snem", "Cuando llovía":"kiedy padał deszcz",
  "Mañana":"jutro", "La próxima semana":"w przyszłym tygodniu", "El año que viene":"w przyszłym roku", "Pronto":"wkrótce", "Después":"potem", "Esta tarde":"dziś po południu", "El lunes":"w poniedziałek", "Más tarde":"później", "Si todo va bien":"jeśli wszystko pójdzie dobrze", "Dentro de poco":"niedługo", "En vacaciones":"w wakacje", "Esta noche":"dziś wieczorem", "El próximo verano":"przyszłego lata", "Después del examen":"po egzaminie", "Cuando termine la clase":"kiedy skończy się lekcja", "En el futuro":"w przyszłości", "El fin de semana":"w weekend", "Antes de la cena":"przed kolacją", "En unos minutos":"za kilka minut", "Al llegar a casa":"po przyjściu do domu", "Durante el viaje":"podczas podróży", "En la reunión":"na spotkaniu", "Después de practicar":"po ćwiczeniu", "Cuando sea posible":"kiedy będzie to możliwe",
  "Quiero que":"chcę, żeby", "Espero que":"mam nadzieję, że", "Es posible que":"możliwe, że", "Dudo que":"wątpię, że", "Ojalá que":"oby", "Es importante que":"ważne, żeby", "Me alegra que":"cieszę się, że", "No creo que":"nie sądzę, żeby", "Prefiero que":"wolę, żeby", "Necesito que":"potrzebuję, żeby", "Tal vez":"być może", "Puede que":"możliwe, że", "Antes de que":"zanim", "Aunque":"chociaż", "Cuando sea necesario que":"kiedy będzie konieczne, żeby", "Es mejor que":"lepiej, żeby", "Me sorprende que":"dziwi mnie, że", "No parece que":"nie wygląda na to, żeby", "Es normal que":"to normalne, że", "Me gusta que":"podoba mi się, że", "Es probable que":"prawdopodobne, że", "No es seguro que":"nie jest pewne, że", "Me preocupa que":"martwi mnie, że", "Es una pena que":"szkoda, że",
  "Quería que":"chciałem/am, żeby", "Esperaba que":"miałem/am nadzieję, że", "Era posible que":"było możliwe, że", "Dudaba que":"wątpiłem/am, że", "Ojalá":"oby", "Era importante que":"było ważne, żeby", "Me alegró que":"ucieszyło mnie, że", "No creía que":"nie sądziłem/am, żeby", "Prefería que":"wolałem/am, żeby", "Necesitaba que":"potrzebowałem/am, żeby", "Fue mejor que":"było lepiej, żeby", "Me sorprendió que":"zdziwiło mnie, że", "No parecía que":"nie wyglądało na to, żeby", "Era normal que":"było normalne, że", "Me gustaba que":"podobało mi się, że", "Era probable que":"było prawdopodobne, że", "No era seguro que":"nie było pewne, że", "Me preocupaba que":"martwiło mnie, że", "Fue una pena que":"szkoda było, że", "Después de que":"po tym, jak",
  "Hoy he":"dzisiaj", "Esta semana he":"w tym tygodniu", "Este mes he":"w tym miesiącu", "Ya he":"już", "Nunca he":"nigdy", "Todavía no he":"jeszcze nie", "Últimamente he":"ostatnio", "Esta mañana he":"dziś rano", "En mi vida he":"w życiu", "Por fin he":"w końcu", "Después de mucho tiempo he":"po długim czasie", "Hace poco he":"niedawno", "En clase he":"na lekcji", "En casa he":"w domu", "Durante el viaje he":"podczas podróży", "Antes de salir he":"przed wyjściem", "Al final he":"na końcu", "Para practicar he":"dla praktyki", "Con calma he":"spokojnie", "Otra vez he":"znowu", "Esta tarde he":"dziś po południu", "En la reunión he":"na spotkaniu", "Después de estudiar he":"po nauce", "Sin ayuda he":"bez pomocy"
};
const SENTENCE_COMPLEMENTS = {
  hablar:[{es:" con Ana.",pl:"z Aną"},{es:" en clase.",pl:"na lekcji"},{es:" por teléfono.",pl:"przez telefon"}],
  comer:[{es:" una ensalada.",pl:"sałatkę"},{es:" en casa.",pl:"w domu"},{es:" algo rápido.",pl:"coś szybkiego"}],
  vivir:[{es:" en Madrid.",pl:"w Madrycie"},{es:" cerca del centro.",pl:"blisko centrum"},{es:" con la familia.",pl:"z rodziną"}],
  ser:[{es:" sincero.",pl:"szczery"},{es:" muy amable.",pl:"bardzo miły"},{es:" importante.",pl:"ważny"}],
  estar:[{es:" en casa.",pl:"w domu"},{es:" tranquilo.",pl:"spokojny"},{es:" en la escuela.",pl:"w szkole"}],
  ir:[{es:" a clase.",pl:"na lekcję"},{es:" al centro.",pl:"do centrum"},{es:" a casa.",pl:"do domu"}],
  tener:[{es:" tiempo.",pl:"czas"},{es:" una idea.",pl:"pomysł"},{es:" mucha suerte.",pl:"dużo szczęścia"}],
  hacer:[{es:" la tarea.",pl:"zadanie"},{es:" una pregunta.",pl:"pytanie"},{es:" algo importante.",pl:"coś ważnego"}],
  poder:[{es:" ayudar.",pl:"pomóc"},{es:" venir.",pl:"przyjść"},{es:" terminar a tiempo.",pl:"skończyć na czas"}],
  querer:[{es:" ayudar.",pl:"pomóc"},{es:" aprender más.",pl:"nauczyć się więcej"},{es:" salir temprano.",pl:"wyjść wcześniej"}],
  decir:[{es:" la verdad.",pl:"prawdę"},{es:" algo importante.",pl:"coś ważnego"},{es:" una frase nueva.",pl:"nowe zdanie"}],
  saber:[{es:" la respuesta.",pl:"odpowiedź"},{es:" mucho.",pl:"dużo"},{es:" qué hacer.",pl:"co zrobić"}],
  venir:[{es:" a casa.",pl:"do domu"},{es:" a la reunión.",pl:"na spotkanie"},{es:" con nosotros.",pl:"z nami"}],
  dar:[{es:" un regalo.",pl:"prezent"},{es:" una respuesta.",pl:"odpowiedź"},{es:" una explicación.",pl:"wyjaśnienie"}],
  ver:[{es:" la película.",pl:"film"},{es:" el mensaje.",pl:"wiadomość"},{es:" a unos amigos.",pl:"kilku przyjaciół"}],
  poner:[{es:" la mesa.",pl:"stół"},{es:" el libro aquí.",pl:"książkę tutaj"},{es:" atención.",pl:"uwagę"}],
  salir:[{es:" de casa.",pl:"z domu"},{es:" temprano.",pl:"wcześnie"},{es:" con amigos.",pl:"z przyjaciółmi"}],
  traer:[{es:" el libro.",pl:"książkę"},{es:" una mochila.",pl:"plecak"},{es:" buenas noticias.",pl:"dobre wiadomości"}],
  dormir:[{es:" ocho horas.",pl:"osiem godzin"},{es:" bien.",pl:"dobrze"},{es:" en el hotel.",pl:"w hotelu"}],
  pedir:[{es:" ayuda.",pl:"pomoc"},{es:" un café.",pl:"kawę"},{es:" más tiempo.",pl:"więcej czasu"}],
  leer:[{es:" el libro.",pl:"książkę"},{es:" el mensaje.",pl:"wiadomość"},{es:" en voz alta.",pl:"na głos"}],
  escribir:[{es:" una carta.",pl:"list"},{es:" el mensaje.",pl:"wiadomość"},{es:" una respuesta.",pl:"odpowiedź"}],
  llegar:[{es:" a tiempo.",pl:"na czas"},{es:" tarde.",pl:"późno"},{es:" a la estación.",pl:"na stację"}],
  sentir:[{es:" alegría.",pl:"radość"},{es:" miedo.",pl:"strach"},{es:" mucho estrés.",pl:"dużo stresu"}],
  seguir:[{es:" el camino.",pl:"drogę"},{es:" las instrucciones.",pl:"instrukcje"},{es:" adelante.",pl:"dalej"}],
  volver:[{es:" a casa.",pl:"do domu"},{es:" al trabajo.",pl:"do pracy"},{es:" muy tarde.",pl:"bardzo późno"}],
  empezar:[{es:" la clase.",pl:"lekcję"},{es:" el proyecto.",pl:"projekt"},{es:" temprano.",pl:"wcześnie"}],
  jugar:[{es:" al fútbol.",pl:"w piłkę nożną"},{es:" con amigos.",pl:"z przyjaciółmi"},{es:" en el parque.",pl:"w parku"}],
  oír:[{es:" la música.",pl:"muzykę"},{es:" una voz.",pl:"głos"},{es:" el ruido.",pl:"hałas"}],
  caer:[{es:" al suelo.",pl:"na ziemię"},{es:" de la silla.",pl:"z krzesła"},{es:" en la calle.",pl:"na ulicy"}],
  creer:[{es:" la historia.",pl:"w tę historię"},{es:" en otras personas.",pl:"w innych ludzi"},{es:" que era posible.",pl:"że to było możliwe"}],
  conocer:[{es:" a una persona nueva.",pl:"nową osobę"},{es:" la ciudad.",pl:"miasto"},{es:" bien el tema.",pl:"dobrze temat"}],
  conducir:[{es:" el coche.",pl:"samochód"},{es:" hasta el centro.",pl:"do centrum"},{es:" con cuidado.",pl:"ostrożnie"}],
  construir:[{es:" una casa.",pl:"dom"},{es:" una solución.",pl:"rozwiązanie"},{es:" un puente.",pl:"most"}],
  elegir:[{es:" una opción.",pl:"jedną opcję"},{es:" el camino correcto.",pl:"właściwą drogę"},{es:" un tema.",pl:"temat"}],
  servir:[{es:" la comida.",pl:"jedzenie"},{es:" café.",pl:"kawę"},{es:" de ejemplo.",pl:"jako przykład"}],
  morir:[{es:" de risa.",pl:"ze śmiechu"},{es:" en la historia.",pl:"w tej historii"},{es:" en la novela.",pl:"w powieści"}],
  valer:[{es:" mucho.",pl:"dużo"},{es:" la pena.",pl:"zachodu"},{es:" cien euros.",pl:"sto euro"}],
  caber:[{es:" en el coche.",pl:"w samochodzie"},{es:" en la sala.",pl:"w sali"},{es:" junto a la ventana.",pl:"przy oknie"}],
  andar:[{es:" por el parque.",pl:"po parku"},{es:" mucho.",pl:"dużo"},{es:" hasta casa.",pl:"aż do domu"}],
  pensar:[{es:" en el problema.",pl:"o problemie"},{es:" en el futuro.",pl:"o przyszłości"},{es:" demasiado.",pl:"za dużo"}],
  perder:[{es:" las llaves.",pl:"klucze"},{es:" el tren.",pl:"pociąg"},{es:" una oportunidad.",pl:"okazję"}],
  entender:[{es:" la explicación.",pl:"wyjaśnienie"},{es:" el problema.",pl:"problem"},{es:" la pregunta.",pl:"pytanie"}],
  encontrar:[{es:" una solución.",pl:"rozwiązanie"},{es:" el teléfono.",pl:"telefon"},{es:" a un amigo.",pl:"przyjaciela"}],
  preferir:[{es:" el café.",pl:"kawę"},{es:" quedarse en casa.",pl:"zostać w domu"},{es:" estudiar solo.",pl:"uczyć się samemu"}],
  conseguir:[{es:" el trabajo.",pl:"pracę"},{es:" una entrada.",pl:"bilet"},{es:" buenos resultados.",pl:"dobre wyniki"}],
  mantener:[{es:" la calma.",pl:"spokój"},{es:" el contacto.",pl:"kontakt"},{es:" la promesa.",pl:"obietnicę"}],
  traducir:[{es:" el texto.",pl:"tekst"},{es:" la frase.",pl:"zdanie"},{es:" una palabra difícil.",pl:"trudne słowo"}],
  producir:[{es:" un cambio.",pl:"zmianę"},{es:" mucha energía.",pl:"dużo energii"},{es:" un resultado.",pl:"wynik"}],
  ofrecer:[{es:" ayuda.",pl:"pomoc"},{es:" una solución.",pl:"rozwiązanie"},{es:" café.",pl:"kawę"}],
  aparecer:[{es:" en la pantalla.",pl:"na ekranie"},{es:" de repente.",pl:"nagle"},{es:" en la lista.",pl:"na liście"}],
  reconocer:[{es:" el error.",pl:"błąd"},{es:" a un amigo.",pl:"przyjaciela"},{es:" la voz.",pl:"głos"}],
  abrir:[{es:" la puerta.",pl:"drzwi"},{es:" el correo.",pl:"maila"},{es:" la ventana.",pl:"okno"}],
  beber:[{es:" agua.",pl:"wodę"},{es:" un café.",pl:"kawę"},{es:" demasiado.",pl:"za dużo"}],
  trabajar:[{es:" en la oficina.",pl:"w biurze"},{es:" mucho.",pl:"dużo"},{es:" con paciencia.",pl:"cierpliwie"}],
  estudiar:[{es:" español.",pl:"hiszpański"},{es:" para el examen.",pl:"do egzaminu"},{es:" en la biblioteca.",pl:"w bibliotece"}],
  comprar:[{es:" pan.",pl:"chleb"},{es:" un regalo.",pl:"prezent"},{es:" comida.",pl:"jedzenie"}],
  viajar:[{es:" a España.",pl:"do Hiszpanii"},{es:" en tren.",pl:"pociągiem"},{es:" con la familia.",pl:"z rodziną"}],
  nacer:[{es:" en España.",pl:"w Hiszpanii"},{es:" en verano.",pl:"latem"},{es:" en una ciudad pequeña.",pl:"w małym mieście"}],
  reír:[{es:" mucho.",pl:"dużo"},{es:" con amigos.",pl:"z przyjaciółmi"},{es:" de la broma.",pl:"z żartu"}],
  buscar:[{es:" las llaves.",pl:"klucze"},{es:" una respuesta.",pl:"odpowiedź"},{es:" trabajo.",pl:"pracy"}],
  pagar:[{es:" la cuenta.",pl:"rachunek"},{es:" el billete.",pl:"bilet"},{es:" en efectivo.",pl:"gotówką"}],
  haber:[{es:" terminado el trabajo.",pl:"skończyć pracę"},{es:" estudiado mucho.",pl:"dużo się uczyć"},{es:" llegado antes.",pl:"przyjść wcześniej"}],
  romper:[{es:" el vaso.",pl:"szklankę"},{es:" la regla.",pl:"zasadę"},{es:" el papel.",pl:"papier"}],
  cubrir:[{es:" la mesa.",pl:"stół"},{es:" el tema.",pl:"temat"},{es:" la caja.",pl:"pudełko"}],
  descubrir:[{es:" la verdad.",pl:"prawdę"},{es:" un lugar nuevo.",pl:"nowe miejsce"},{es:" la respuesta.",pl:"odpowiedź"}],
  freír:[{es:" las patatas.",pl:"ziemniaki"},{es:" un huevo.",pl:"jajko"},{es:" la comida.",pl:"jedzenie"}],
  resolver:[{es:" el problema.",pl:"problem"},{es:" la duda.",pl:"wątpliwość"},{es:" el ejercicio.",pl:"ćwiczenie"}],
  devolver:[{es:" el libro.",pl:"książkę"},{es:" el dinero.",pl:"pieniądze"},{es:" la llamada.",pl:"telefon"}],
  imprimir:[{es:" el documento.",pl:"dokument"},{es:" la página.",pl:"stronę"},{es:" el billete.",pl:"bilet"}]
};
const SENTENCE_EXTRA_COMPLEMENTS = {
  hablar:[{es:" con el profesor.",pl:"z nauczycielem"},{es:" de los planes.",pl:"o planach"},{es:" en español.",pl:"po hiszpańsku"},{es:" con calma.",pl:"spokojnie"},{es:" durante la reunión.",pl:"podczas spotkania"}],
  comer:[{es:" con la familia.",pl:"z rodziną"},{es:" en el restaurante.",pl:"w restauracji"},{es:" demasiado rápido.",pl:"zbyt szybko"},{es:" después de clase.",pl:"po lekcji"},{es:" una sopa caliente.",pl:"ciepłą zupę"}],
  vivir:[{es:" en un piso pequeño.",pl:"w małym mieszkaniu"},{es:" cerca de la playa.",pl:"blisko plaży"},{es:" en otra ciudad.",pl:"w innym mieście"},{es:" sin problemas.",pl:"bez problemów"},{es:" con dos compañeros.",pl:"z dwoma współlokatorami"}],
  ser:[{es:" una buena idea.",pl:"dobrym pomysłem"},{es:" bastante difícil.",pl:"dość trudny"},{es:" muy importante para todos.",pl:"bardzo ważny dla wszystkich"},{es:" el primero.",pl:"pierwszy"},{es:" una persona paciente.",pl:"cierpliwą osobą"}],
  estar:[{es:" cansado.",pl:"zmęczony"},{es:" listo.",pl:"gotowy"},{es:" cerca de la puerta.",pl:"blisko drzwi"},{es:" de buen humor.",pl:"w dobrym humorze"},{es:" ocupado.",pl:"zajęty"}],
  ir:[{es:" al supermercado.",pl:"do supermarketu"},{es:" a la biblioteca.",pl:"do biblioteki"},{es:" al médico.",pl:"do lekarza"},{es:" con prisa.",pl:"w pośpiechu"},{es:" en autobús.",pl:"autobusem"}],
  tener:[{es:" una reunión.",pl:"spotkanie"},{es:" dolor de cabeza.",pl:"ból głowy"},{es:" razón.",pl:"rację"},{es:" muchas preguntas.",pl:"wiele pytań"},{es:" ganas de aprender.",pl:"ochotę się uczyć"}],
  hacer:[{es:" la compra.",pl:"zakupy"},{es:" ejercicio.",pl:"ćwiczenia"},{es:" una llamada.",pl:"telefon"},{es:" un favor.",pl:"przysługę"},{es:" todo lo posible.",pl:"wszystko, co możliwe"}],
  poder:[{es:" descansar un poco.",pl:"trochę odpocząć"},{es:" entender la pregunta.",pl:"zrozumieć pytanie"},{es:" pagar la cuenta.",pl:"zapłacić rachunek"},{es:" entrar sin problema.",pl:"wejść bez problemu"},{es:" hablar con el jefe.",pl:"porozmawiać z szefem"}],
  querer:[{es:" un café.",pl:"kawę"},{es:" descansar.",pl:"odpocząć"},{es:" probar algo nuevo.",pl:"spróbować czegoś nowego"},{es:" hablar contigo.",pl:"porozmawiać z tobą"},{es:" cambiar de plan.",pl:"zmienić plan"}],
  decir:[{es:" que no.",pl:"że nie"},{es:" la respuesta correcta.",pl:"poprawną odpowiedź"},{es:" una opinión.",pl:"opinię"},{es:" una cosa importante.",pl:"ważną rzecz"},{es:" lo mismo.",pl:"to samo"}],
  saber:[{es:" dónde estaba la estación.",pl:"gdzie była stacja"},{es:" cómo resolverlo.",pl:"jak to rozwiązać"},{es:" el nombre.",pl:"imię"},{es:" la fecha.",pl:"datę"},{es:" hablar un poco de español.",pl:"mówić trochę po hiszpańsku"}],
  venir:[{es:" a la fiesta.",pl:"na imprezę"},{es:" más tarde.",pl:"później"},{es:" en tren.",pl:"pociągiem"},{es:" para ayudar.",pl:"żeby pomóc"},{es:" con buenas noticias.",pl:"z dobrymi wiadomościami"}],
  dar:[{es:" las gracias.",pl:"podziękowania"},{es:" una oportunidad.",pl:"szansę"},{es:" un consejo.",pl:"radę"},{es:" dinero a un amigo.",pl:"pieniądze przyjacielowi"},{es:" una clase.",pl:"lekcję"}],
  ver:[{es:" una serie nueva.",pl:"nowy serial"},{es:" el partido.",pl:"mecz"},{es:" la diferencia.",pl:"różnicę"},{es:" una foto antigua.",pl:"stare zdjęcie"},{es:" el resultado.",pl:"wynik"}],
  poner:[{es:" la mochila en la silla.",pl:"plecak na krześle"},{es:" música.",pl:"muzykę"},{es:" el móvil en silencio.",pl:"telefon na tryb cichy"},{es:" una nota en la mesa.",pl:"notatkę na stole"},{es:" todo en orden.",pl:"wszystko w porządku"}],
  salir:[{es:" de la oficina.",pl:"z biura"},{es:" al balcón.",pl:"na balkon"},{es:" a caminar.",pl:"na spacer"},{es:" después de la cena.",pl:"po kolacji"},{es:" sin paraguas.",pl:"bez parasola"}],
  traer:[{es:" la comida.",pl:"jedzenie"},{es:" los documentos.",pl:"dokumenty"},{es:" un paraguas.",pl:"parasolkę"},{es:" la respuesta.",pl:"odpowiedź"},{es:" algo para beber.",pl:"coś do picia"}],
  dormir:[{es:" poco.",pl:"mało"},{es:" profundamente.",pl:"głęboko"},{es:" en el sofá.",pl:"na kanapie"},{es:" hasta tarde.",pl:"do późna"},{es:" sin despertarse.",pl:"bez budzenia się"}],
  pedir:[{es:" perdón.",pl:"przebaczenie"},{es:" una mesa para dos.",pl:"stolik dla dwóch osób"},{es:" la cuenta.",pl:"rachunek"},{es:" consejo.",pl:"radę"},{es:" permiso.",pl:"pozwolenie"}],
  leer:[{es:" el periódico.",pl:"gazetę"},{es:" una novela.",pl:"powieść"},{es:" las instrucciones.",pl:"instrukcje"},{es:" antes de dormir.",pl:"przed snem"},{es:" cada página con atención.",pl:"każdą stronę uważnie"}],
  escribir:[{es:" un correo.",pl:"maila"},{es:" en el cuaderno.",pl:"w zeszycie"},{es:" una lista.",pl:"listę"},{es:" una historia corta.",pl:"krótką historię"},{es:" con muchos errores.",pl:"z wieloma błędami"}],
  llegar:[{es:" antes que todos.",pl:"przed wszystkimi"},{es:" sin avisar.",pl:"bez uprzedzenia"},{es:" al aeropuerto.",pl:"na lotnisko"},{es:" justo a tiempo.",pl:"dokładnie na czas"},{es:" con retraso.",pl:"z opóźnieniem"}],
  sentir:[{es:" un poco de miedo.",pl:"trochę strachu"},{es:" mucha alegría.",pl:"dużo radości"},{es:" frío.",pl:"zimno"},{es:" curiosidad.",pl:"ciekawość"},{es:" alivio.",pl:"ulgę"}],
  seguir:[{es:" trabajando.",pl:"pracować dalej"},{es:" estudiando.",pl:"uczyć się dalej"},{es:" el consejo.",pl:"radę"},{es:" al guía.",pl:"za przewodnikiem"},{es:" la conversación.",pl:"rozmowę"}],
  volver:[{es:" al mismo lugar.",pl:"w to samo miejsce"},{es:" después de una hora.",pl:"po godzinie"},{es:" con una sonrisa.",pl:"z uśmiechem"},{es:" a intentarlo.",pl:"spróbować ponownie"},{es:" antes de la cena.",pl:"przed kolacją"}],
  empezar:[{es:" a estudiar.",pl:"uczyć się"},{es:" a trabajar.",pl:"pracować"},{es:" la reunión.",pl:"spotkanie"},{es:" con una pregunta.",pl:"od pytania"},{es:" sin miedo.",pl:"bez strachu"}],
  jugar:[{es:" al tenis.",pl:"w tenisa"},{es:" una partida.",pl:"partię"},{es:" con el perro.",pl:"z psem"},{es:" en línea.",pl:"online"},{es:" después de clase.",pl:"po lekcji"}],
  oír:[{es:" una canción.",pl:"piosenkę"},{es:" pasos en la calle.",pl:"kroki na ulicy"},{es:" la alarma.",pl:"alarm"},{es:" una noticia extraña.",pl:"dziwną wiadomość"},{es:" a alguien en la cocina.",pl:"kogoś w kuchni"}],
  caer:[{es:" mal.",pl:"źle"},{es:" bien a todos.",pl:"dobrze wszystkim"},{es:" por las escaleras.",pl:"ze schodów"},{es:" en una trampa.",pl:"w pułapkę"},{es:" durante el partido.",pl:"podczas meczu"}],
  creer:[{es:" en el proyecto.",pl:"w projekt"},{es:" cada palabra.",pl:"każdemu słowu"},{es:" en la explicación.",pl:"w wyjaśnienie"},{es:" que todo saldría bien.",pl:"że wszystko pójdzie dobrze"},{es:" en la suerte.",pl:"w szczęście"}],
  conocer:[{es:" el camino.",pl:"drogę"},{es:" a la profesora.",pl:"nauczycielkę"},{es:" un restaurante nuevo.",pl:"nową restaurację"},{es:" la respuesta.",pl:"odpowiedź"},{es:" a mucha gente.",pl:"wielu ludzi"}],
  conducir:[{es:" por la ciudad.",pl:"po mieście"},{es:" de noche.",pl:"nocą"},{es:" hasta la playa.",pl:"aż na plażę"},{es:" demasiado rápido.",pl:"zbyt szybko"},{es:" con mucha atención.",pl:"bardzo uważnie"}],
  construir:[{es:" una relación.",pl:"relację"},{es:" un plan.",pl:"plan"},{es:" una idea nueva.",pl:"nowy pomysł"},{es:" una escuela.",pl:"szkołę"},{es:" una mesa.",pl:"stół"}],
  elegir:[{es:" el menú.",pl:"menu"},{es:" la mejor respuesta.",pl:"najlepszą odpowiedź"},{es:" otro camino.",pl:"inną drogę"},{es:" un vestido.",pl:"sukienkę"},{es:" la fecha.",pl:"datę"}],
  servir:[{es:" la cena.",pl:"kolację"},{es:" agua fría.",pl:"zimną wodę"},{es:" a los clientes.",pl:"klientom"},{es:" para explicar la regla.",pl:"do wyjaśnienia zasady"},{es:" de ayuda.",pl:"jako pomoc"}],
  morir:[{es:" de risa.",pl:"ze śmiechu"},{es:" en la novela.",pl:"w powieści"},{es:" en la historia.",pl:"w historii"},{es:" antes del final.",pl:"przed końcem"},{es:" por dentro.",pl:"w środku"}],
  valer:[{es:" menos de lo esperado.",pl:"mniej niż oczekiwano"},{es:" mucho dinero.",pl:"dużo pieniędzy"},{es:" el esfuerzo.",pl:"wysiłku"},{es:" más que antes.",pl:"więcej niż wcześniej"},{es:" para el examen.",pl:"na egzamin"}],
  caber:[{es:" perfectamente.",pl:"idealnie"},{es:" en el coche.",pl:"w samochodzie"},{es:" en la sala.",pl:"w sali"},{es:" sin problema.",pl:"bez problemu"},{es:" al lado de la ventana.",pl:"obok okna"}],
  andar:[{es:" despacio.",pl:"powoli"},{es:" por la playa.",pl:"po plaży"},{es:" sin rumbo.",pl:"bez celu"},{es:" con cuidado.",pl:"ostrożnie"},{es:" durante una hora.",pl:"przez godzinę"}],
  pensar:[{es:" en la respuesta.",pl:"o odpowiedzi"},{es:" en cambiar de trabajo.",pl:"o zmianie pracy"},{es:" en voz alta.",pl:"na głos"},{es:" en otras personas.",pl:"o innych osobach"},{es:" antes de responder.",pl:"przed odpowiedzią"}],
  perder:[{es:" la paciencia.",pl:"cierpliwość"},{es:" el móvil.",pl:"telefon"},{es:" el camino.",pl:"drogę"},{es:" mucho tiempo.",pl:"dużo czasu"},{es:" contra el otro equipo.",pl:"z drugą drużyną"}],
  entender:[{es:" casi todo.",pl:"prawie wszystko"},{es:" la regla.",pl:"zasadę"},{es:" el chiste.",pl:"żart"},{es:" a la profesora.",pl:"nauczycielkę"},{es:" por fin.",pl:"w końcu"}],
  encontrar:[{es:" la salida.",pl:"wyjście"},{es:" una buena excusa.",pl:"dobrą wymówkę"},{es:" el error.",pl:"błąd"},{es:" un piso barato.",pl:"tanie mieszkanie"},{es:" paz.",pl:"spokój"}],
  preferir:[{es:" té.",pl:"herbatę"},{es:" otra opción.",pl:"inną opcję"},{es:" trabajar por la mañana.",pl:"pracować rano"},{es:" hablar después.",pl:"porozmawiać później"},{es:" el camino corto.",pl:"krótką drogę"}],
  conseguir:[{es:" ayuda.",pl:"pomoc"},{es:" terminar el proyecto.",pl:"skończyć projekt"},{es:" una beca.",pl:"stypendium"},{es:" resolverlo.",pl:"rozwiązać to"},{es:" una mesa libre.",pl:"wolny stolik"}],
  mantener:[{es:" la puerta abierta.",pl:"drzwi otwarte"},{es:" una conversación larga.",pl:"długą rozmowę"},{es:" el equilibrio.",pl:"równowagę"},{es:" la atención.",pl:"uwagę"},{es:" una promesa.",pl:"obietnicę"}],
  traducir:[{es:" una canción.",pl:"piosenkę"},{es:" el menú.",pl:"menu"},{es:" el correo.",pl:"maila"},{es:" una noticia.",pl:"wiadomość"},{es:" todo al polaco.",pl:"wszystko na polski"}],
  producir:[{es:" una película.",pl:"film"},{es:" ruido.",pl:"hałas"},{es:" muchos cambios.",pl:"wiele zmian"},{es:" comida local.",pl:"lokalne jedzenie"},{es:" una reacción fuerte.",pl:"silną reakcję"}],
  ofrecer:[{es:" un asiento.",pl:"miejsce"},{es:" una disculpa.",pl:"przeprosiny"},{es:" trabajo.",pl:"pracę"},{es:" apoyo.",pl:"wsparcie"},{es:" una alternativa.",pl:"alternatywę"}],
  aparecer:[{es:" en una foto.",pl:"na zdjęciu"},{es:" al final.",pl:"na końcu"},{es:" en la puerta.",pl:"w drzwiach"},{es:" en internet.",pl:"w internecie"},{es:" sin explicación.",pl:"bez wyjaśnienia"}],
  reconocer:[{es:" la culpa.",pl:"winę"},{es:" el problema.",pl:"problem"},{es:" la canción.",pl:"piosenkę"},{es:" el lugar.",pl:"miejsce"},{es:" el esfuerzo.",pl:"wysiłek"}],
  abrir:[{es:" la tienda.",pl:"sklep"},{es:" una cuenta.",pl:"konto"},{es:" el paquete.",pl:"paczkę"},{es:" el archivo.",pl:"plik"},{es:" los ojos.",pl:"oczy"}],
  beber:[{es:" agua fría.",pl:"zimną wodę"},{es:" té.",pl:"herbatę"},{es:" un zumo.",pl:"sok"},{es:" con calma.",pl:"spokojnie"},{es:" durante la cena.",pl:"podczas kolacji"}],
  trabajar:[{es:" desde casa.",pl:"z domu"},{es:" todo el día.",pl:"cały dzień"},{es:" con un equipo nuevo.",pl:"z nową drużyną"},{es:" en silencio.",pl:"w ciszy"},{es:" para ahorrar dinero.",pl:"żeby oszczędzać pieniądze"}],
  estudiar:[{es:" gramática.",pl:"gramatykę"},{es:" vocabulario.",pl:"słownictwo"},{es:" con una aplicación.",pl:"z aplikacją"},{es:" por la noche.",pl:"nocą"},{es:" cada día.",pl:"codziennie"}],
  comprar:[{es:" una chaqueta.",pl:"kurtkę"},{es:" billetes de tren.",pl:"bilety na pociąg"},{es:" fruta.",pl:"owoce"},{es:" algo barato.",pl:"coś taniego"},{es:" un cuaderno.",pl:"zeszyt"}],
  viajar:[{es:" a México.",pl:"do Meksyku"},{es:" por trabajo.",pl:"służbowo"},{es:" sin maleta.",pl:"bez walizki"},{es:" con amigos.",pl:"z przyjaciółmi"},{es:" durante dos semanas.",pl:"przez dwa tygodnie"}],
  nacer:[{es:" en primavera.",pl:"wiosną"},{es:" en Polonia.",pl:"w Polsce"},{es:" en una familia grande.",pl:"w dużej rodzinie"},{es:" el mismo día.",pl:"tego samego dnia"},{es:" muy lejos de aquí.",pl:"bardzo daleko stąd"}],
  reír:[{es:" en voz alta.",pl:"głośno"},{es:" hasta llorar.",pl:"aż do łez"},{es:" durante la película.",pl:"podczas filmu"},{es:" sin parar.",pl:"bez przerwy"},{es:" con alegría.",pl:"z radością"}],
  buscar:[{es:" una solución.",pl:"rozwiązanie"},{es:" el pasaporte.",pl:"paszport"},{es:" una dirección.",pl:"adres"},{es:" información.",pl:"informacje"},{es:" un hotel barato.",pl:"tani hotel"}],
  pagar:[{es:" con tarjeta.",pl:"kartą"},{es:" por internet.",pl:"przez internet"},{es:" demasiado.",pl:"za dużo"},{es:" la entrada.",pl:"bilet wejściowy"},{es:" el alquiler.",pl:"czynsz"}],
  haber:[{es:" una razón.",pl:"powód"},{es:" mucha gente.",pl:"dużo ludzi"},{es:" problemas.",pl:"problemy"},{es:" una solución.",pl:"rozwiązanie"},{es:" tiempo suficiente.",pl:"wystarczająco czasu"}],
  romper:[{es:" una promesa.",pl:"obietnicę"},{es:" el silencio.",pl:"ciszę"},{es:" el ordenador.",pl:"komputer"},{es:" una taza.",pl:"kubek"},{es:" la puerta.",pl:"drzwi"}],
  cubrir:[{es:" los gastos.",pl:"koszty"},{es:" la noticia.",pl:"wiadomość"},{es:" la comida.",pl:"jedzenie"},{es:" todo el suelo.",pl:"całą podłogę"},{es:" la cara.",pl:"twarz"}],
  descubrir:[{es:" un secreto.",pl:"sekret"},{es:" un error.",pl:"błąd"},{es:" una canción nueva.",pl:"nową piosenkę"},{es:" un restaurante.",pl:"restaurację"},{es:" otra forma de estudiar.",pl:"inny sposób nauki"}],
  freír:[{es:" pescado.",pl:"rybę"},{es:" verduras.",pl:"warzywa"},{es:" demasiado aceite.",pl:"za dużo oleju"},{es:" algo rápido.",pl:"coś szybkiego"},{es:" la cena.",pl:"kolację"}],
  resolver:[{es:" el misterio.",pl:"zagadkę"},{es:" la situación.",pl:"sytuację"},{es:" el conflicto.",pl:"konflikt"},{es:" todo solo.",pl:"wszystko samemu"},{es:" la tarea difícil.",pl:"trudne zadanie"}],
  devolver:[{es:" el favor.",pl:"przysługę"},{es:" las llaves.",pl:"klucze"},{es:" el paquete.",pl:"paczkę"},{es:" la chaqueta.",pl:"kurtkę"},{es:" el mensaje.",pl:"wiadomość"}],
  imprimir:[{es:" las fotos.",pl:"zdjęcia"},{es:" el formulario.",pl:"formularz"},{es:" todo en color.",pl:"wszystko w kolorze"},{es:" la reserva.",pl:"rezerwację"},{es:" el contrato.",pl:"umowę"}]
};
Object.entries(SENTENCE_EXTRA_COMPLEMENTS).forEach(([inf, items]) => {
  SENTENCE_COMPLEMENTS[inf] = [...(SENTENCE_COMPLEMENTS[inf] || []), ...items];
});
SENTENCE_COMPLEMENTS.ser = [
  {tpl:" {adj}.", adj:"sincer", type:"o", pl:"szczery/a"},
  {tpl:" muy {adj}.", adj:"amable", type:"e", pl:"bardzo miły/a"},
  {tpl:" {adj} para todos.", adj:"importante", type:"e", pl:"ważny/a dla wszystkich"},
  {tpl:" bastante {adj}.", forms:{ms:"difícil",fs:"difícil",mp:"difíciles",fp:"difíciles"}, pl:"dość trudny/a"},
  {tpl:" {adj}.", adj:"paciente", type:"e", pl:"cierpliwy/a"},
  {tpl:" {adj}.", adj:"responsable", type:"e", pl:"odpowiedzialny/a"},
  {tpl:" {adj}.", adj:"puntual", type:"consonant", pl:"punktualny/a"},
  {tpl:" {adj}.", adj:"divertid", type:"o", pl:"zabawny/a"},
  {tpl:" {adj}.", forms:{ms:"útil",fs:"útil",mp:"útiles",fp:"útiles"}, pl:"użyteczny/a"},
  {tpl:" {adj} con los demás.", adj:"honest", type:"o", pl:"uczciwy/a wobec innych"}
];
SENTENCE_COMPLEMENTS.estar = [
  {tpl:" {adj}.", adj:"cansad", type:"o", pl:"zmęczony/a"},
  {tpl:" {adj}.", adj:"list", type:"o", pl:"gotowy/a"},
  {es:" cerca de la puerta.", pl:"blisko drzwi"},
  {es:" de buen humor.", pl:"w dobrym humorze"},
  {tpl:" {adj}.", adj:"ocupad", type:"o", pl:"zajęty/a"},
  {tpl:" {adj}.", adj:"tranquil", type:"o", pl:"spokojny/a"},
  {tpl:" muy {adj}.", adj:"content", type:"o", pl:"bardzo zadowolony/a"},
  {tpl:" {adj} de aprender.", adj:"orgullos", type:"o", pl:"dumny/a z nauki"},
  {es:" en el centro.", pl:"w centrum"},
  {es:" con amigos.", pl:"z przyjaciółmi"}
];
SENTENCE_COMPLEMENTS.haber = [
  {es:" terminado el trabajo.", pl:"skończyć pracę", tags:["auxiliary","work"]},
  {es:" llegado a tiempo.", pl:"przyjść na czas", tags:["auxiliary","movement"]},
  {es:" estudiado mucho.", pl:"dużo się uczyć", tags:["auxiliary","study"]},
  {es:" entendido la explicación.", pl:"zrozumieć wyjaśnienie", tags:["auxiliary","study"]},
  {es:" hablado con calma.", pl:"porozmawiać spokojnie", tags:["auxiliary","communication","manner"]},
  {es:" hecho todo lo posible.", pl:"zrobić wszystko, co możliwe", tags:["auxiliary","work"]},
  {es:" vuelto temprano.", pl:"wrócić wcześnie", tags:["auxiliary","movement"]},
  {es:" resuelto el problema.", pl:"rozwiązać problem", tags:["auxiliary","study"]},
  {es:" escrito una respuesta.", pl:"napisać odpowiedź", tags:["auxiliary","study"]},
  {es:" visto el mensaje.", pl:"zobaczyć wiadomość", tags:["auxiliary","perception"]}
];
const SENTENCE_ACTION_PL = {
  hablar:"rozmawiać", comer:"jeść", vivir:"mieszkać", ser:"być", estar:"być / znajdować się", ir:"iść / jechać", tener:"mieć", hacer:"robić", poder:"móc", querer:"chcieć", decir:"powiedzieć", saber:"wiedzieć / umieć", venir:"przyjść", dar:"dać", ver:"zobaczyć", poner:"położyć / włączyć", salir:"wyjść", traer:"przynieść", dormir:"spać", pedir:"poprosić", leer:"czytać", escribir:"napisać", llegar:"przyjść / dotrzeć", sentir:"czuć", seguir:"kontynuować / iść za", volver:"wrócić", empezar:"zacząć", jugar:"grać", oír:"usłyszeć", caer:"upaść / wypaść", creer:"wierzyć", conocer:"poznać / znać", conducir:"prowadzić", construir:"budować", elegir:"wybrać", servir:"podać / służyć", morir:"umrzeć", valer:"być wartym", caber:"zmieścić się", andar:"chodzić", pensar:"myśleć", perder:"zgubić / stracić", entender:"rozumieć", encontrar:"znaleźć", preferir:"woleć", conseguir:"zdobyć / osiągnąć", mantener:"utrzymać", traducir:"tłumaczyć", producir:"produkować / powodować", ofrecer:"zaoferować", aparecer:"pojawić się", reconocer:"rozpoznać / przyznać", abrir:"otworzyć", beber:"pić", trabajar:"pracować", estudiar:"uczyć się", comprar:"kupić", viajar:"podróżować", nacer:"urodzić się", reír:"śmiać się", buscar:"szukać", pagar:"zapłacić", haber:"być / istnieć", romper:"złamać / zepsuć", cubrir:"zakryć", descubrir:"odkryć", freír:"smażyć", resolver:"rozwiązać", devolver:"oddać", imprimir:"wydrukować"
};
const SENTENCE_BANK = {
  indefinido: {
    starts: ["Ayer", "Anoche", "El lunes", "La semana pasada", "Hace dos días", "Esta mañana", "El verano pasado", "En aquel momento", "Después de clase", "Durante el viaje", "Al final", "De repente", "Hace un rato", "En la reunión", "Antes de salir", "Por la tarde", "El fin de semana", "En Madrid", "En casa", "En la fiesta", "En el aeropuerto", "Durante la cena", "Al volver a casa", "En el último minuto"],
    ends: [".", " muy rápido.", " sin problema.", " con mis amigos.", " en casa.", " en la escuela.", " en el trabajo.", " durante la clase.", " antes de cenar.", " después de comer.", " por la mañana.", " por la noche.", " en el centro.", " con calma.", " por primera vez.", " otra vez.", " muy bien.", " con cuidado.", " en el hotel.", " durante el examen."]
  },
  imperfecto: {
    starts: ["Antes", "De joven", "En la infancia", "Todos los días", "Cada verano", "Normalmente", "A menudo", "Muchas veces", "En aquella época", "Durante las vacaciones", "Por las tardes", "En la antigua escuela", "Los domingos", "Cuando había tiempo", "Siempre", "Casi nunca", "Cada mañana", "En invierno", "Durante el año", "En casa de los abuelos", "En el barrio", "Después de comer", "Antes de dormir", "Cuando llovía"],
    ends: [".", " mucho.", " con frecuencia.", " en casa.", " con mi familia.", " en la escuela.", " después de clase.", " antes de dormir.", " cada semana.", " sin prisa.", " por la tarde.", " cuando llovía.", " con mis amigos.", " en el barrio.", " durante horas.", " muy bien.", " todos juntos.", " en silencio.", " con alegría.", " tranquilamente."]
  },
  futuro: {
    starts: ["Mañana", "La próxima semana", "El año que viene", "Pronto", "Después", "Esta tarde", "El lunes", "Más tarde", "Si todo va bien", "Dentro de poco", "En vacaciones", "Esta noche", "El próximo verano", "Después del examen", "Cuando termine la clase", "En el futuro", "El fin de semana", "Antes de la cena", "En unos minutos", "Al llegar a casa", "Durante el viaje", "En la reunión", "Después de practicar", "Cuando sea posible"],
    ends: [".", " sin problema.", " con mis amigos.", " en casa.", " en la escuela.", " en el trabajo.", " después de comer.", " antes de dormir.", " con calma.", " por la tarde.", " por la noche.", " muy bien.", " cuando llegue.", " si todo va bien.", " durante el viaje.", " en el centro.", " otra vez.", " con cuidado.", " rápidamente.", " para practicar."]
  },
  subjuntivo: {
    starts: ["Quiero que", "Espero que", "Es posible que", "Dudo que", "Ojalá que", "Es importante que", "Me alegra que", "No creo que", "Prefiero que", "Necesito que", "Tal vez", "Puede que", "Aunque", "Cuando sea necesario que", "Es mejor que", "Me sorprende que", "No parece que", "Es normal que", "Me gusta que", "Es probable que", "No es seguro que", "Me preocupa que", "Es una pena que"],
    ends: [".", " hoy.", " mañana.", " pronto.", " en casa.", " con nosotros.", " en la clase.", " sin problema.", " con cuidado.", " antes de salir.", " después de comer.", " por la mañana.", " por la tarde.", " esta vez.", " durante la reunión.", " para aprender.", " si puede.", " cuando llegue.", " con más calma.", " correctamente."]
  },
  subjuntivo_imperfecto: {
    starts: ["Quería que", "Esperaba que", "Era posible que", "Dudaba que", "Ojalá", "Era importante que", "Me alegró que", "No creía que", "Prefería que", "Necesitaba que", "Fue mejor que", "Me sorprendió que", "No parecía que", "Era normal que", "Me gustaba que", "Era probable que", "No era seguro que", "Me preocupaba que", "Fue una pena que"],
    ends: [".", " ayer.", " entonces.", " en casa.", " con nosotros.", " en la clase.", " sin problema.", " con cuidado.", " antes de salir.", " después de comer.", " por la mañana.", " por la tarde.", " aquella vez.", " durante la reunión.", " para aprender.", " cuando llegara.", " con más calma.", " correctamente.", " en aquel momento.", " durante el viaje."]
  },
  perfecto: {
    starts: ["Hoy he", "Esta semana he", "Este mes he", "Ya he", "Nunca he", "Todavía no he", "Últimamente he", "Esta mañana he", "En mi vida he", "Por fin he", "Después de mucho tiempo he", "Hace poco he", "En clase he", "En casa he", "Durante el viaje he", "Antes de salir he", "Al final he", "Para practicar he", "Con calma he", "Otra vez he", "Esta tarde he", "En la reunión he", "Después de estudiar he", "Sin ayuda he"],
    ends: [".", " todo.", " mucho.", " esto.", " algo importante.", " la tarea.", " el mensaje.", " la puerta.", " el problema.", " la respuesta.", " con cuidado.", " muy rápido.", " en casa.", " en clase.", " durante la semana.", " antes de comer.", " después de estudiar.", " sin ayuda.", " por primera vez.", " otra vez."]
  }
};
Object.assign(SENTENCE_START_PL, {
  "En el trabajo":"w pracy",
  "En la biblioteca":"w bibliotece",
  "En el restaurante":"w restauracji",
  "En el tren":"w pociągu",
  "Al llegar al hotel":"po przyjściu do hotelu",
  "Después del trabajo":"po pracy",
  "En la universidad":"na uniwersytecie",
  "Durante el descanso":"podczas przerwy",
  "En la cocina":"w kuchni",
  "Antes de la reunión":"przed spotkaniem",
  "Era necesario que":"było konieczne, żeby",
  "Si fuera posible que":"gdyby było możliwe, żeby",
  "Aunque fuera difícil que":"chociaż byłoby trudno, żeby",
  "Después de que terminara la clase":"po tym, jak skończyłaby się lekcja",
  "En el trabajo he":"w pracy",
  "En la biblioteca he":"w bibliotece",
  "Durante el descanso he":"podczas przerwy",
  "Después del trabajo he":"po pracy"
});
const SENTENCE_EXTRA_STARTS = {
  indefinido: ["En el trabajo", "En la biblioteca", "En el restaurante", "En el tren", "Al llegar al hotel"],
  imperfecto: ["Después del trabajo", "En la universidad", "Durante el descanso", "En la cocina", "Antes de la reunión"],
  futuro: ["Después del trabajo", "En la biblioteca", "En el restaurante", "En el tren", "Antes de la reunión"],
  subjuntivo: ["Es probable que", "No es seguro que", "Me preocupa que", "Es una pena que"],
  subjuntivo_imperfecto: ["Era necesario que", "Si fuera posible que", "Aunque fuera difícil que", "Después de que terminara la clase"],
  perfecto: ["En el trabajo he", "En la biblioteca he", "Durante el descanso he", "Después del trabajo he"]
};
Object.entries(SENTENCE_EXTRA_STARTS).forEach(([tense, starts]) => {
  if(!SENTENCE_BANK[tense]) return;
  starts.forEach(start => {
    if(!SENTENCE_BANK[tense].starts.includes(start)) SENTENCE_BANK[tense].starts.push(start);
  });
});
function sentenceVariantCount(){
  const complements = Object.values(SENTENCE_COMPLEMENTS).reduce((sum, items) => sum + items.length, 0);
  const closers = SENTENCE_CLOSERS.length || 1;
  return Object.values(SENTENCE_BANK).reduce((sum, bank) => sum + (bank.starts.length * complements * closers), 0);
}
const SENTENCE_CLOSERS = [
  {es:"", pl:"", tags:["neutral"]},
  {es:" sin problema", pl:"bez problemu", tags:["manner"]},
  {es:" con calma", pl:"spokojnie", tags:["manner"]},
  {es:" otra vez", pl:"znowu", tags:["repeat"]},
  {es:" antes de salir", pl:"przed wyjściem", tags:["time","sequence","departure"]},
  {es:" después de clase", pl:"po lekcji", tags:["time","school","sequence"]},
  {es:" por la mañana", pl:"rano", tags:["time","morning"]},
  {es:" por la tarde", pl:"po południu", tags:["time","afternoon"]},
  {es:" en casa", pl:"w domu", tags:["place","home"]},
  {es:" con amigos", pl:"z przyjaciółmi", tags:["social","person"]},
  {es:" con mucho cuidado", pl:"bardzo ostrożnie", tags:["manner"]},
  {es:" para practicar", pl:"żeby poćwiczyć", tags:["purpose","study"]},
  {es:" sin prisa", pl:"bez pośpiechu", tags:["manner"]},
  {es:" con atención", pl:"uważnie", tags:["manner","study"]},
  {es:" en silencio", pl:"w ciszy", tags:["manner"]},
  {es:" durante el descanso", pl:"podczas przerwy", tags:["time","break"]},
  {es:" después del trabajo", pl:"po pracy", tags:["time","work","sequence"]}
];
const SENTENCE_START_TAGS = {
  "Ayer":["time","past","day"], "Anoche":["time","past","night"], "El lunes":["time","day"], "La semana pasada":["time","past"], "Hace dos días":["time","past"], "Esta mañana":["time","morning"], "El verano pasado":["time","past","summer"], "En aquel momento":["time","moment"], "Después de clase":["time","school","sequence"], "Durante el viaje":["time","travel"], "Al final":["time","sequence"], "De repente":["time","moment"], "Hace un rato":["time","past"], "En la reunión":["time","work","meeting"], "Antes de salir":["time","departure","sequence"], "Por la tarde":["time","afternoon"], "El fin de semana":["time","weekend"], "En Madrid":["place","city"], "En casa":["place","home"], "En la fiesta":["place","social","party"], "En el aeropuerto":["place","travel"], "Durante la cena":["time","meal","evening"], "Al volver a casa":["time","home","sequence"], "En el último minuto":["time","urgency"],
  "Antes":["time","habit"], "De joven":["time","habit","past"], "En la infancia":["time","habit","past"], "Todos los días":["time","habit"], "Cada verano":["time","habit","summer"], "Normalmente":["time","habit"], "A menudo":["time","habit"], "Muchas veces":["time","habit"], "En aquella época":["time","habit","past"], "Durante las vacaciones":["time","travel","holiday"], "Por las tardes":["time","habit","afternoon"], "En la antigua escuela":["place","school","past"], "Los domingos":["time","habit","weekend"], "Cuando había tiempo":["time","habit"], "Siempre":["time","habit"], "Casi nunca":["time","habit"], "Cada mañana":["time","habit","morning"], "En invierno":["time","season"], "Durante el año":["time","habit"], "En casa de los abuelos":["place","home","family"], "En el barrio":["place"], "Después de comer":["time","meal","sequence"], "Antes de dormir":["time","sleep","sequence"], "Cuando llovía":["time","weather"],
  "Mañana":["time","future","day"], "La próxima semana":["time","future"], "El año que viene":["time","future"], "Pronto":["time","future"], "Después":["time","sequence"], "Esta tarde":["time","afternoon"], "Más tarde":["time","future"], "Si todo va bien":["condition"], "Dentro de poco":["time","future"], "En vacaciones":["time","holiday","travel"], "Esta noche":["time","night"], "El próximo verano":["time","future","summer"], "Después del examen":["time","school","sequence"], "Cuando termine la clase":["time","school","sequence"], "En el futuro":["time","future"], "Antes de la cena":["time","meal","sequence"], "En unos minutos":["time","future"], "Al llegar a casa":["time","home","sequence"], "Después de practicar":["time","study","sequence"], "Cuando sea posible":["time","condition"],
  "Quiero que":["subjunctive","trigger"], "Espero que":["subjunctive","trigger"], "Es posible que":["subjunctive","trigger"], "Dudo que":["subjunctive","trigger"], "Ojalá que":["subjunctive","trigger"], "Es importante que":["subjunctive","trigger"], "Me alegra que":["subjunctive","trigger"], "No creo que":["subjunctive","trigger"], "Prefiero que":["subjunctive","trigger"], "Necesito que":["subjunctive","trigger"], "Tal vez":["subjunctive","trigger"], "Puede que":["subjunctive","trigger"], "Antes de que":["subjunctive","trigger","sequence"], "Aunque":["subjunctive","trigger"], "Cuando sea necesario que":["subjunctive","trigger"], "Es mejor que":["subjunctive","trigger"], "Me sorprende que":["subjunctive","trigger"], "No parece que":["subjunctive","trigger"], "Es normal que":["subjunctive","trigger"], "Me gusta que":["subjunctive","trigger"], "Es probable que":["subjunctive","trigger"], "No es seguro que":["subjunctive","trigger"], "Me preocupa que":["subjunctive","trigger"], "Es una pena que":["subjunctive","trigger"],
  "Quería que":["subjunctive","trigger","past"], "Esperaba que":["subjunctive","trigger","past"], "Era posible que":["subjunctive","trigger","past"], "Dudaba que":["subjunctive","trigger","past"], "Ojalá":["subjunctive","trigger"], "Era importante que":["subjunctive","trigger","past"], "Me alegró que":["subjunctive","trigger","past"], "No creía que":["subjunctive","trigger","past"], "Prefería que":["subjunctive","trigger","past"], "Necesitaba que":["subjunctive","trigger","past"], "Fue mejor que":["subjunctive","trigger","past"], "Me sorprendió que":["subjunctive","trigger","past"], "No parecía que":["subjunctive","trigger","past"], "Era normal que":["subjunctive","trigger","past"], "Me gustaba que":["subjunctive","trigger","past"], "Era probable que":["subjunctive","trigger","past"], "No era seguro que":["subjunctive","trigger","past"], "Me preocupaba que":["subjunctive","trigger","past"], "Fue una pena que":["subjunctive","trigger","past"], "Después de que":["subjunctive","trigger","sequence"],
  "Hoy he":["time","today"], "Esta semana he":["time"], "Este mes he":["time"], "Ya he":["time"], "Nunca he":["time"], "Todavía no he":["time"], "Últimamente he":["time"], "Esta mañana he":["time","morning"], "En mi vida he":["time"], "Por fin he":["time"], "Después de mucho tiempo he":["time"], "Hace poco he":["time"], "En clase he":["place","school"], "En casa he":["place","home"], "Durante el viaje he":["time","travel"], "Antes de salir he":["time","departure","sequence"], "Para practicar he":["purpose","study"], "Con calma he":["manner"], "Otra vez he":["repeat"], "En el trabajo he":["place","work"], "En la biblioteca he":["place","school"], "Durante el descanso he":["time","break"], "Después del trabajo he":["time","work","sequence"]
};
const SENTENCE_VERB_TAGS = {
  hablar:["communication"], decir:["communication"], preguntar:["communication"],
  comer:["food"], beber:["food"], freír:["food"],
  ir:["movement"], venir:["movement"], llegar:["movement"], volver:["movement"], salir:["movement"], viajar:["movement","travel"], andar:["movement"], conducir:["movement","travel"], traer:["movement"],
  trabajar:["work"], producir:["work"], ofrecer:["work"], mantener:["work"],
  estudiar:["study"], leer:["study"], escribir:["study"], traducir:["study"], entender:["study"], saber:["knowledge"],
  dormir:["sleep","home"], vivir:["place"], estar:["state"], ser:["state"],
  jugar:["social"], ver:["perception"], oír:["perception"], pensar:["mental"], creer:["mental"], sentir:["feeling"],
  comprar:["shopping"], pagar:["shopping"], pedir:["request"], dar:["exchange"], poner:["home"], abrir:["home"], cerrar:["home"],
  nacer:["life"], morir:["life"], caer:["movement"], encontrar:["search"], buscar:["search"], conseguir:["achievement"]
};
const TIME_OF_DAY_TAGS = ["morning", "afternoon", "night", "evening", "meal"];
const BIRTH_SUBJUNCTIVE_STARTS = new Set(["Es posible que", "Puede que", "Tal vez", "No parece que", "Es probable que", "No es seguro que", "Era posible que", "No parecía que", "Era probable que", "No era seguro que"]);
const DEATH_SUBJUNCTIVE_STARTS = new Set(["Es posible que", "Puede que", "Tal vez", "Dudo que", "No creo que", "No parece que", "Me preocupa que", "Es probable que", "No es seguro que", "Era posible que", "Dudaba que", "No creía que", "No parecía que", "Me preocupaba que", "Era probable que", "No era seguro que"]);
function tagsFrom(...sources){
  const tags = new Set();
  sources.flat().filter(Boolean).forEach(tag => tags.add(tag));
  return [...tags];
}
function textForSentenceItem(item){ return ((item && (item.es || item.tpl)) || "").toLowerCase(); }
function hasTag(tags, tag){ return (tags || []).includes(tag); }
function hasAnyTag(tags, needed){ return needed.some(tag => hasTag(tags, tag)); }
function firstTimeOfDay(tags){ return TIME_OF_DAY_TAGS.find(tag => hasTag(tags, tag)); }
function hasTimeConflict(tagsA, tagsB){
  const a = firstTimeOfDay(tagsA), b = firstTimeOfDay(tagsB);
  return Boolean(a && b && a !== b);
}
function hasRepeatedTimeOfDay(tagsA, tagsB){
  const a = firstTimeOfDay(tagsA), b = firstTimeOfDay(tagsB);
  return Boolean(a && b && a === b);
}
function startTagsFor(start, tense){
  const text = start.toLowerCase();
  const tags = new Set([tense]);
  (SENTENCE_START_TAGS[start] || []).forEach(tag => tags.add(tag));
  if(text.includes("mañana")) tags.add("morning");
  if(text.includes("tarde")) tags.add("afternoon");
  if(text.includes("noche") || text.includes("anoche")) tags.add("night");
  if(text.includes("cena")) { tags.add("meal"); tags.add("evening"); }
  if(text.includes("clase") || text.includes("escuela") || text.includes("biblioteca") || text.includes("examen")) tags.add("school");
  if(text.includes("trabajo") || text.includes("reunión")) tags.add("work");
  if(text.includes("restaurante") || text.includes("cocina")) { tags.add("food"); tags.add("meal"); }
  if(text.includes("viaje") || text.includes("tren") || text.includes("aeropuerto") || text.includes("hotel")) tags.add("travel");
  if(text.includes("casa") || text.includes("cocina")) tags.add("home");
  if(text.startsWith("en ")) tags.add("place");
  if(text.includes("durante") || text.includes("después") || text.includes("antes") || text.includes("ayer") || text.includes("hoy") || text.includes("esta ") || text.includes("cada ") || text.includes("siempre") || text.includes("nunca")) tags.add("time");
  return [...tags];
}
function inferComplementTags(inf, item){
  const text = textForSentenceItem(item);
  const tags = new Set([...(item.tags || []), ...(SENTENCE_VERB_TAGS[inf] || [])]);
  if(/\b(cena|comida|comer|ensalada|sopa|restaurante|café|agua|té|zumo|pan|fruta|patatas|huevo|pescado|verduras|aceite)\b/.test(text)) tags.add("food");
  if(/\b(clase|escuela|profesor|profesora|tarea|examen|biblioteca|gramática|vocabulario|cuaderno|instrucciones|regla)\b/.test(text)) tags.add("school");
  if(/\b(oficina|trabajo|jefe|proyecto|documentos|reunión|clientes|contrato|equipo)\b/.test(text)) tags.add("work");
  if(/\b(casa|cocina|sofá|balcón|puerta|mesa|ventana|silla|armario|habitación)\b/.test(text)) tags.add("home");
  if(/\b(madrid|españa|méxico|ciudad|centro|aeropuerto|estación|playa|tren|autobús|hotel|calle|parque|supermercado|médico|camino|sala)\b/.test(text)) tags.add("place");
  if(/\b(a casa|a clase|a la reunión|al centro|al supermercado|al médico|a la biblioteca|a españa|a méxico|hasta|al aeropuerto|a caminar|al balcón|camino)\b/.test(text)) tags.add("destination");
  if(/\b(con |a unos amigos|a un amigo|a una persona|a la profesora|a los clientes|con nosotros|con la familia)\b/.test(text)) tags.add("social");
  if(/\b(por la mañana|cada mañana)\b/.test(text)) { tags.add("time"); tags.add("morning"); }
  if(/\b(por la tarde|esta tarde)\b/.test(text)) { tags.add("time"); tags.add("afternoon"); }
  if(/\b(por la noche|de noche)\b/.test(text)) { tags.add("time"); tags.add("night"); }
  if(/\b(durante|después|antes|hasta tarde|cada día|cada semana|todo el día|dos semanas|una hora)\b/.test(text)) tags.add("time");
  if(/\b(sin problema|con calma|con cuidado|despacio|rápido|lentamente|en silencio|con atención|profundamente)\b/.test(text)) tags.add("manner");
  if(/\b(tiempo|suerte|razón|idea|preguntas|ganas|oportunidad|opción|miedo|alegría|curiosidad|alivio|paciencia|estrés|frío|calor|dolor|dinero|euros|esfuerzo)\b/.test(text)) tags.add("abstract");
  if(inf === "dar" && text.includes("una clase")) { tags.add("school"); tags.add("lesson"); }
  if(inf === "dormir") tags.add("sleep");
  if(inf === "nacer" || inf === "morir") tags.add("life-event");
  return [...tags];
}
function enrichSentenceComplement(inf, item){
  const tags = inferComplementTags(inf, item);
  const text = textForSentenceItem(item);
  const avoidStartTags = [...(item.avoidStartTags || [])];
  const avoidCloserTags = [...(item.avoidCloserTags || [])];
  if(hasAnyTag(tags, ["school", "work"]) && !hasTag(tags, "food")) {
    avoidStartTags.push("meal");
    avoidCloserTags.push("meal");
  }
  if(hasTag(tags, "destination") || hasTag(tags, "place")) avoidCloserTags.push("place", "home");
  if(hasTag(tags, "social")) avoidCloserTags.push("social", "place", "home");
  if(hasTag(tags, "sleep")) avoidCloserTags.push("social", "purpose", "study", "work");
  if(hasAnyTag(tags, ["abstract", "life-event"])) avoidCloserTags.push("place", "home", "social", "purpose", "study");
  if(inf === "vivir") avoidCloserTags.push("manner", "morning", "afternoon", "night", "evening", "meal");
  if(inf === "tener") avoidCloserTags.push("manner", "place", "home", "social");
  if(inf === "saber") avoidCloserTags.push("manner", "place", "home", "social");
  if(inf === "valer") avoidCloserTags.push("manner", "place", "home", "social", "purpose", "study");
  if(hasAnyTag(tags, ["morning", "afternoon", "night", "meal"])) avoidCloserTags.push("morning", "afternoon", "night", "meal");
  if(text.includes("con calma") || text.includes("con cuidado") || text.includes("despacio")) avoidCloserTags.push("manner");
  return {...item, tags, avoidStartTags: tagsFrom(avoidStartTags), avoidCloserTags: tagsFrom(avoidCloserTags)};
}
function startWorksWithComplement(inf, start, tense, complement){
  const st = startTagsFor(start, tense);
  const ct = complement.tags || [];
  const startText = start.toLowerCase();
  const compText = textForSentenceItem(complement);
  if(hasTimeConflict(st, ct)) return false;
  if(hasRepeatedTimeOfDay(st, ct)) return false;
  if(startText && compText.includes(startText)) return false;
  if(complement.avoidStartTags?.some(tag => hasTag(st, tag))) return false;
  if(hasTag(st, "manner") && hasTag(ct, "manner")) return false;
  if(hasTag(st, "time") && hasTag(ct, "time")) return false;
  if(hasTag(st, "purpose") && hasTag(st, "study") && !hasAnyTag(ct, ["study", "school", "communication", "perception", "mental", "knowledge", "work"])) return false;
  if(hasTag(ct, "life-event") && hasTag(st, "subjunctive")){
    const allowedStarts = inf === "morir" ? DEATH_SUBJUNCTIVE_STARTS : BIRTH_SUBJUNCTIVE_STARTS;
    if(!allowedStarts.has(start)) return false;
  }
  if(hasTag(st, "meal") && hasAnyTag(ct, ["school", "work"]) && !hasTag(ct, "food")) return false;
  if(hasAnyTag(st, ["party", "food"]) && hasAnyTag(ct, ["school", "work"]) && !hasTag(ct, "food")) return false;
  if(hasTag(st, "travel") && hasTag(ct, "work") && inf !== "trabajar") return false;
  if(hasAnyTag(st, ["school", "work"]) && hasTag(ct, "sleep")) return false;
  if(inf === "dormir" && hasTag(st, "place") && hasTag(ct, "place")) return false;
  if(hasTag(st, "home") && hasTag(ct, "home")) return false;
  if(inf === "vivir" && hasTag(ct, "place") && hasAnyTag(st, TIME_OF_DAY_TAGS)) return false;
  if(hasTag(st, "home") && hasTag(ct, "destination") && hasTag(ct, "movement")) return false;
  if(hasTag(st, "travel") && hasTag(ct, "home") && ["vivir", "estar", "dormir"].includes(inf)) return false;
  if(hasTag(st, "place") && hasTag(ct, "place") && !hasTag(ct, "destination") && !["vivir", "estar", "ser"].includes(inf)) return false;
  return true;
}
function closerWorksWithSentence(inf, start, complement, closer, tense = currentTense || ""){
  const st = startTagsFor(start, tense);
  const ct = complement.tags || [];
  const xt = closer.tags || [];
  const base = (complement.es || "").toLowerCase();
  const extra = (closer.es || "").toLowerCase();
  if(!closer.es) return true;
  if(hasTimeConflict(st, xt) || hasTimeConflict(ct, xt)) return false;
  if(hasRepeatedTimeOfDay(st, xt) || hasRepeatedTimeOfDay(ct, xt)) return false;
  if(hasTag(st, "time") && hasTag(xt, "time")) return false;
  if(hasTag(ct, "time") && hasTag(xt, "time")) return false;
  if(complement.avoidCloserTags?.some(tag => hasTag(xt, tag))) return false;
  if(hasTag(st, "party") && hasAnyTag(xt, TIME_OF_DAY_TAGS)) return false;
  if(hasTag(st, "manner") && hasTag(xt, "manner")) return false;
  if(hasTag(st, "repeat") && hasTag(xt, "repeat")) return false;
  if(hasTag(st, "purpose") && hasTag(xt, "purpose")) return false;
  if((extra.trim() && base.includes(extra.trim())) || (base.includes(" con ") && extra.startsWith(" con ")) || (base.includes(" en casa") && extra.includes("en casa")) || (base.includes(" por la ") && extra.startsWith(" por la "))) return false;
  if(hasAnyTag(ct, ["place", "destination"]) && hasAnyTag(xt, ["place", "home"])) return false;
  if(hasTag(st, "place") && hasAnyTag(xt, ["place", "home"])) return false;
  if(hasTag(st, "travel") && hasTag(xt, "home")) return false;
  if(hasTag(ct, "social") && hasTag(xt, "social")) return false;
  if(hasTag(xt, "social") && !hasAnyTag(ct, ["social", "food", "movement", "travel", "communication"]) && !["jugar", "salir", "viajar", "venir", "ir", "comer", "hablar", "reír", "estar", "trabajar", "estudiar", "andar"].includes(inf)) return false;
  if(hasAnyTag(ct, ["school", "work"]) && hasTag(xt, "meal")) return false;
  if(hasTag(xt, "purpose") && hasTag(xt, "study") && !hasAnyTag(ct, ["study", "school", "work", "communication", "perception", "search", "mental", "knowledge"])) return false;
  if(extra.includes("con atención") && !hasAnyTag(ct, ["study", "school", "work", "communication", "perception", "search", "travel", "movement"])) return false;
  if(hasTag(ct, "abstract") && hasAnyTag(xt, ["manner", "place", "home", "social"])) return false;
  if(hasTag(ct, "state") && hasTag(xt, "manner")) return false;
  if(hasTag(ct, "life-event") && hasTag(xt, "manner")) return false;
  if(inf === "salir" && (hasTag(xt, "departure") || extra.includes("salir"))) return false;
  if(inf === "llegar" && hasTag(xt, "departure")) return false;
  if(["vivir", "reír"].includes(inf) && hasTag(xt, "manner")) return false;
  if(["nacer", "morir"].includes(inf) && hasAnyTag(xt, ["repeat", "purpose", "school", "work"])) return false;
  return true;
}
function sentenceComplementFor(inf){
  return enrichSentenceComplement(inf, randomPick(SENTENCE_COMPLEMENTS[inf] || [{es:".", pl:""}]));
}
function subjectGrammar(pronoun, subject){
  const s = subject || "";
  const plural = ["nosotros","vosotros","ellos/ellas"].includes(pronoun) || /(^los |^las |^mis | y |familias|profesores|estudiantes|vecinos|niños|chicas|padres|amigos|vosotras|nosotras|ellos|ellas)/.test(s);
  const feminine = /(^la |^las |Lucía|madre|amiga|vecina|doctora|hermana|familias|chicas|nosotras|vosotras|ellas)/.test(s);
  return {plural, feminine};
}
function adjectiveForm(spec, pronoun, subject){
  const g = subjectGrammar(pronoun, subject);
  const key = (g.feminine ? "f" : "m") + (g.plural ? "p" : "s");
  if(spec.forms) return spec.forms[key] || spec.forms.ms;
  if(spec.type === "e") return spec.adj + (g.plural ? "s" : "");
  if(spec.type === "consonant") return spec.adj + (g.plural ? "es" : "");
  return spec.adj + (g.feminine ? "a" : "o") + (g.plural ? "s" : "");
}
function renderComplementForSubject(complement, pronoun, subject){
  if(!complement.tpl) return complement;
  return {
    ...complement,
    es: complement.tpl.replace("{adj}", adjectiveForm(complement, pronoun, subject)),
    pl: complement.pl
  };
}
function sentenceComplementForSubject(inf, pronoun, subject){
  return renderComplementForSubject(sentenceComplementFor(inf), pronoun, subject);
}
function sentenceStartFor(tense, inf, complement = null){
  const bank = SENTENCE_BANK[tense] || SENTENCE_BANK.indefinido;
  const avoid = {
    vivir: ["Cuando vivía allí"],
    estudiar: ["Mientras estudiaba"],
    llegar: ["Cuando llegué"],
    poder: ["Cuando pueda"]
  }[inf] || [];
  const starts = bank.starts.filter(start => !avoid.includes(start) && (!complement || startWorksWithComplement(inf, start, tense, complement)));
  return randomPick(starts.length ? starts : bank.starts);
}
function addSentenceCloser(complement, start, inf, tense){
  if(!complement.es.endsWith(".")) return complement;
  if(Math.random() < 0.55) return complement;
  const closers = SENTENCE_CLOSERS.filter(closer => closerWorksWithSentence(inf, start, complement, closer, tense));
  const closer = randomPick(closers.length ? closers : [{es:"", pl:"", tags:["neutral"]}]);
  if(!closer.es) return complement;
  return {
    ...complement,
    es: complement.es.replace(/\.$/, "") + " " + closer.es + ".",
    pl: [complement.pl, closer.pl].filter(Boolean).join(", ")
  };
}
function sentenceTranslation(start, subject, verb, complement, tense){
  const startPl = SENTENCE_START_PL[start] || start.toLowerCase();
  const subjectPl = subject ? (SENTENCE_SUBJECT_PL[subject] || subject) : "";
  const action = SENTENCE_ACTION_PL[verb.inf] || verb.en.replace(/\s*\/\s*/g, " / ");
  const what = [action, complement.pl].filter(Boolean).join(" ");
  if(isPerfecto(tense)) return [startPl, what].filter(Boolean).join(" · ");
  return [startPl, subjectPl, what].filter(Boolean).join(" · ");
}
function sentencePromptFor(q, correct){
  const tense = q.tense || currentTense;
  if(isPerfecto(tense)){
    const baseComplement = sentenceComplementForSubject(q.verb.inf, "yo", "yo");
    const start = sentenceStartFor(tense, q.verb.inf, baseComplement);
    const complement = addSentenceCloser(baseComplement, start, q.verb.inf, tense);
    return {
      blank: `${start} <span class="blank"></span>${complement.es}`,
      full: `${start} ${correct}${complement.es}`,
      pl: sentenceTranslation(start, "", q.verb, complement, tense)
    };
  }
  const subject = randomPick(SENTENCE_SUBJECTS[q.pronoun] || [subjectFor(q.pronoun)]);
  const baseComplement = sentenceComplementForSubject(q.verb.inf, q.pronoun, subject);
  const start = sentenceStartFor(tense, q.verb.inf, baseComplement);
  const complement = addSentenceCloser(baseComplement, start, q.verb.inf, tense);
  return {
    blank: `${start} ${subject} <span class="blank"></span>${complement.es}`,
    full: `${start} ${subject} ${correct}${complement.es}`,
    pl: sentenceTranslation(start, subject, q.verb, complement, tense)
  };
}
function exampleFor(q, correct){
  if(isPerfecto(q.tense)){
    return randomPick([
      "He " + correct + " la puerta.",
      "Ya he " + correct + " esto antes.",
      "Hoy he " + correct + " mucho.",
      "Esta semana he " + correct + " algo importante.",
      "Nunca he " + correct + " así."
    ]);
  }
  const subject = subjectFor(q.pronoun);
  const tense = q.tense || currentTense;
  const sets = {
    indefinido: ["Ayer " + subject + " " + correct + ".", "La semana pasada " + subject + " " + correct + ".", "En ese momento " + subject + " " + correct + ".", "Anoche " + subject + " " + correct + ".", "De repente " + subject + " " + correct + "."],
    imperfecto: ["Antes " + subject + " " + correct + " a menudo.", "De niño, " + subject + " " + correct + ".", "Cada verano " + subject + " " + correct + ".", "Normalmente " + subject + " " + correct + ".", "Mientras tanto, " + subject + " " + correct + "."],
    futuro: ["Mañana " + subject + " " + correct + ".", "El próximo año " + subject + " " + correct + ".", "Después " + subject + " " + correct + ".", "Pronto " + subject + " " + correct + ".", "Esta tarde " + subject + " " + correct + "."],
    subjuntivo: ["Es posible que " + subject + " " + correct + ".", "Quiero que " + subject + " " + correct + ".", "Dudo que " + subject + " " + correct + ".", "Ojalá que " + subject + " " + correct + ".", "Es importante que " + subject + " " + correct + "."],
    subjuntivo_imperfecto: ["Quería que " + subject + " " + correct + ".", "Esperaba que " + subject + " " + correct + ".", "Dudaba que " + subject + " " + correct + ".", "Ojalá " + subject + " " + correct + ".", "Era importante que " + subject + " " + correct + "."]
  };
  return randomPick(sets[tense] || [subject + " " + correct + "."]);
}
function showExample(q, correct){
  const box = document.getElementById("example-line");
  if(box) box.innerHTML = q.sentence ? "<span>Zdanie:</span> " + q.sentence.full + "<br><span>Sens:</span> " + q.sentence.pl : "<span>Przykład:</span> " + exampleFor(q, correct);
}
function statKey(tense, inf){ return `${tense}::${inf}`; }
function getFavorites(){
  try { return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []; }
  catch(e){ return []; }
}
function saveFavorites(items){ localStorage.setItem(FAVORITES_KEY, JSON.stringify(items)); }
function isFavorite(inf){ return getFavorites().includes(inf); }
function toggleFavorite(inf){
  const favs = getFavorites();
  const next = favs.includes(inf) ? favs.filter(v => v !== inf) : [...favs, inf];
  saveFavorites(next);
  document.querySelectorAll(`[data-fav-inf="${inf}"]`).forEach(btn => {
    btn.classList.toggle("active", next.includes(inf));
    btn.setAttribute("aria-pressed", String(next.includes(inf)));
  });
}
function getSuspendedVerbs(){
  try { return JSON.parse(localStorage.getItem(SUSPENDED_VERBS_KEY)) || []; }
  catch(e){ return []; }
}
function saveSuspendedVerbs(items){ localStorage.setItem(SUSPENDED_VERBS_KEY, JSON.stringify(items)); }
function verbSuspendKey(tense, level, inf){ return `${tense}::${level}::${inf}`; }
function isVerbSuspended(tense, level, inf){ return getSuspendedVerbs().includes(verbSuspendKey(tense, level, inf)); }
function toggleVerbSuspended(tense, level, inf){
  const key = verbSuspendKey(tense, level, inf);
  const current = getSuspendedVerbs();
  const next = current.includes(key) ? current.filter(item => item !== key) : [...current, key];
  saveSuspendedVerbs(next);
  renderVerbList();
}
function getSuspendedAccents(){
  try { return JSON.parse(localStorage.getItem(SUSPENDED_ACCENTS_KEY)) || []; }
  catch(e){ return []; }
}
function saveSuspendedAccents(items){ localStorage.setItem(SUSPENDED_ACCENTS_KEY, JSON.stringify(items)); }
function accentSuspendKey(level, word){ return `${level}::${word}`; }
function isAccentSuspended(level, word){ return getSuspendedAccents().includes(accentSuspendKey(level, word)); }
function toggleAccentSuspended(level, word){
  const key = accentSuspendKey(level, word);
  const current = getSuspendedAccents();
  const next = current.includes(key) ? current.filter(item => item !== key) : [...current, key];
  saveSuspendedAccents(next);
  renderAccentList();
}
function getStats(){
  try { return JSON.parse(localStorage.getItem(STATS_KEY)) || {}; }
  catch(e){ return {}; }
}
function saveStats(stats){ localStorage.setItem(STATS_KEY, JSON.stringify(stats)); }
function getSelectedDifficulties(){ return selectedDifficulties.filter(level => DIFFICULTIES[level]); }
function selectedDifficultyLabel(){
  return getSelectedDifficulties().map(level => DIFFICULTIES[level].label).join(" + ");
}
function selectedFormCount(){
  return Math.max(...getSelectedDifficulties().map(level => DIFFICULTIES[level].formCount));
}
function saveSelectedDifficulties(){
  localStorage.setItem("spanishConjugationDifficulties", JSON.stringify(getSelectedDifficulties()));
  localStorage.setItem("spanishConjugationDifficulty", getSelectedDifficulties()[0]);
}
function normalizeLevels(level = null){
  if(Array.isArray(level)) return level.filter(item => DIFFICULTIES[item]);
  if(level && DIFFICULTIES[level]) return [level];
  return [];
}
function getUniqueVerbs(tense, level = null, includeSuspended = false){
  if(!DATA[tense]) return [];
  const seen = new Set();
  const levels = normalizeLevels(level);
  const allowed = levels.length && TENSE_LEVEL_VERBS[tense] ? new Set(levels.flatMap(lvl => TENSE_LEVEL_VERBS[tense][lvl] || [])) : null;
  return DATA[tense].verbs.filter(v => {
    if(allowed && !allowed.has(v.inf)) return false;
    if(levels.length && !includeSuspended && levels.every(lvl => isVerbSuspended(tense, lvl, v.inf))) return false;
    if(seen.has(v.inf)) return false;
    seen.add(v.inf);
    if(isPerfecto(tense)) return Boolean(v.part);
    return getPronouns(tense).every(p => Object.prototype.hasOwnProperty.call(v.c, p));
  });
}
function buildQueueFromVerbs(verbs, tense = currentTense){
  if(isPerfecto(tense)) return shuffle(verbs).map(v => ({verb:v, pronoun:null, tense}));
  const people = getPronouns(tense);
  const groups = shuffle(verbs).map(v => ({
    inf: v.inf,
    items: shuffle(people).map(p => ({verb:v, pronoun:p, tense}))
  }));
  const queue = [];
  while(groups.some(g => g.items.length)){
    const lastInf = queue.length ? queue[queue.length - 1].verb.inf : null;
    let candidates = groups
      .filter(g => g.items.length && g.inf !== lastInf)
      .sort((a, b) => b.items.length - a.items.length);
    if(!candidates.length) candidates = groups.filter(g => g.items.length);
    const bestSize = candidates[0]?.items.length || 0;
    const best = candidates.filter(g => g.items.length === bestSize);
    const chosen = randomPick(best);
    queue.push(chosen.items.pop());
  }
  return queue;
}
function buildRandomFormQueue(verbs, count = 15, tense = currentTense){
  if(isPerfecto(tense)) return shuffle(verbs).slice(0, count).map(v => ({verb:v, pronoun:null, tense}));
  const people = getPronouns(tense);
  const remaining = shuffle(verbs.flatMap(v => people.map(p => ({verb:v, pronoun:p, tense}))));
  const queue = [];
  while(queue.length < count && remaining.length){
    const lastInf = queue.length ? queue[queue.length - 1].verb.inf : null;
    const candidates = remaining.filter(item => item.verb.inf !== lastInf);
    const pool = candidates.length ? candidates : remaining;
    const chosen = randomPick(pool);
    queue.push(chosen);
    remaining.splice(remaining.indexOf(chosen), 1);
  }
  return queue;
}
function recordAnswer(q, ok){
  const stats = getStats();
  const tense = q.tense || currentTense;
  const key = statKey(tense, q.verb.inf);
  const item = stats[key] || { tense, inf: q.verb.inf, en: q.verb.en, attempts: 0, correct: 0, wrong: 0 };
  item.attempts += 1;
  if(ok) item.correct += 1; else item.wrong += 1;
  item.lastPracticed = Date.now();
  stats[key] = item;
  saveStats(stats);
  if(!ok && !sessionWrong.some(item => item.verb.inf === q.verb.inf && item.pronoun === q.pronoun && item.tense === tense)){
    sessionWrong.push({verb: q.verb, pronoun: q.pronoun, tense});
  }
  renderStats();
}
function getWorstStats(limit = 5, tense = null){
  return Object.values(getStats())
    .filter(s => s.attempts > 0 && (!tense || s.tense === tense))
    .map(s => ({...s, accuracy: s.correct / s.attempts}))
    .sort((a,b) => (a.accuracy - b.accuracy) || (b.wrong - a.wrong) || (b.attempts - a.attempts))
    .slice(0, limit);
}

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if(id === "page-home"){ renderStats(); renderAccentStats(); }
}

function goHome(){ showPage("page-home"); }

function showHomeTab(tab){
  document.querySelectorAll(".home-section").forEach(section => section.classList.remove("active"));
  document.querySelectorAll(".home-tab").forEach(btn => btn.classList.remove("active"));
  document.getElementById(tab === "accents" ? "home-accents" : "home-verbs").classList.add("active");
  document.getElementById(tab === "accents" ? "tab-accents" : "tab-verbs").classList.add("active");
  if(tab === "accents") renderAccentStats();
}

function renderDifficultyOptions(){
  const wrap = document.getElementById("difficulty-options");
  if(!wrap) return;
  const activeLevels = getSelectedDifficulties();
  wrap.innerHTML = Object.entries(DIFFICULTIES).map(([key, d]) => `
    <button type="button" class="difficulty-option ${activeLevels.includes(key) ? "active" : ""}" onclick="toggleDifficulty('${key}')" aria-pressed="${activeLevels.includes(key)}">
      <span class="difficulty-name">${d.label}</span>
      <span class="difficulty-meta">${d.desc}</span>
    </button>`).join("");
}
function renderPracticeSelection(){
  document.querySelectorAll(".tense-card[data-mode]").forEach(card => {
    const active = card.dataset.mode === selectedPracticeMode;
    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", String(active));
  });
  const tenseSelect = document.getElementById("tense-select");
  if(tenseSelect) tenseSelect.value = selectedPracticeMode;
  const toggle = document.getElementById("spain-mode-toggle");
  if(toggle) toggle.checked = spainMode;
  const sentenceToggle = document.getElementById("sentence-mode-toggle");
  if(sentenceToggle) sentenceToggle.checked = sentenceMode;
  const note = document.getElementById("selection-note");
  if(note){
    const label = selectedPracticeMode === "mix" ? "Mix czasów" : selectedPracticeMode === "favorites" ? "Moje trudne" : DATA[selectedPracticeMode]?.label;
    const region = spainMode && selectedPracticeMode !== "perfecto" ? " · z vosotros" : "";
    const sentences = sentenceMode ? ` · zdania (${sentenceVariantCount()}+ wariantów)` : "";
    note.textContent = `${selectedDifficultyLabel()} · ${label}${region}${sentences}`;
  }
}
function selectPracticeMode(mode){
  selectedPracticeMode = mode;
  localStorage.setItem("spanishPracticeMode", mode);
  renderPracticeSelection();
  renderVerbList();
}
const ACCENT_DIFFICULTIES = {
  easy: { label: "Prosty", desc: "częste krótkie słowa", start: 0, end: 70 },
  normal: { label: "Średni", desc: "więcej rzeczowników i pytań", start: 70, end: 140 },
  hard: { label: "Trudny", desc: "dłuższe słowa i końcówki -ción/-ía", start: 140, end: ACCENT_WORDS.length }
};
function getAccentPool(){
  const d = ACCENT_DIFFICULTIES[selectedAccentDifficulty] || ACCENT_DIFFICULTIES.easy;
  return ACCENT_WORDS.slice(d.start, d.end).filter(item => !isAccentSuspended(selectedAccentDifficulty, item.word));
}
function renderAccentDifficultyOptions(){
  const wrap = document.getElementById("accent-difficulty-options");
  if(!wrap) return;
  wrap.innerHTML = Object.entries(ACCENT_DIFFICULTIES).map(([key, d]) => `
    <button type="button" class="difficulty-option ${selectedAccentDifficulty === key ? "active" : ""}" onclick="setAccentDifficulty('${key}')" aria-pressed="${selectedAccentDifficulty === key}">
      <span class="difficulty-name">${d.label}</span>
      <span class="difficulty-meta">${d.desc}</span>
    </button>`).join("");
}
function setAccentDifficulty(level){
  selectedAccentDifficulty = level;
  localStorage.setItem("spanishAccentDifficulty", level);
  renderAccentDifficultyOptions();
}
function renderVerbList(){
  const panel = document.getElementById("verb-list-panel");
  if(!panel) return;
  const mode = DATA[selectedPracticeMode] ? selectedPracticeMode : "indefinido";
  panel.innerHTML = getSelectedDifficulties().map(level => {
    const verbs = getUniqueVerbs(mode, level, true);
    return `
      <div class="verb-list-level">
        <div class="verb-list-title">${DATA[mode].label} · ${DIFFICULTIES[level].label}</div>
        <div class="verb-chip-list">${verbs.map(v => {
          const suspended = isVerbSuspended(mode, level, v.inf);
          return `<button type="button" class="verb-chip ${suspended ? "suspended" : ""}" onclick="toggleVerbSuspended('${mode}', '${level}', '${v.inf.replace(/'/g,"\\'")}')" aria-pressed="${suspended}" title="Kliknij, aby ${suspended ? "przywrócić" : "zawiesić"}">${v.inf}</button>`;
        }).join("")}</div>
      </div>`;
  }).join("");
}
function toggleVerbList(){
  const panel = document.getElementById("verb-list-panel");
  const toggle = document.getElementById("verb-list-toggle");
  const arrow = document.getElementById("verb-list-arrow");
  if(!panel || !toggle || !arrow) return;
  const open = panel.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  arrow.textContent = open ? "−" : "+";
}
function renderAccentList(){
  const panel = document.getElementById("accent-list-panel");
  if(!panel) return;
  panel.innerHTML = Object.entries(ACCENT_DIFFICULTIES).map(([level, d]) => {
    const words = ACCENT_WORDS.slice(d.start, d.end);
    return `
    <div class="verb-list-level">
      <div class="verb-list-title">${d.label}</div>
      <div class="verb-chip-list">${words.map(item => {
        const suspended = isAccentSuspended(level, item.word);
        return `<button type="button" class="verb-chip ${suspended ? "suspended" : ""}" onclick="toggleAccentSuspended('${level}', '${item.word.replace(/'/g,"\\'")}')" aria-pressed="${suspended}" title="Kliknij, aby ${suspended ? "przywrócić" : "zawiesić"}">${item.word}</button>`;
      }).join("")}</div>
    </div>`;
  }).join("");
}
function toggleAccentList(){
  const panel = document.getElementById("accent-list-panel");
  const toggle = document.getElementById("accent-list-toggle");
  const arrow = document.getElementById("accent-list-arrow");
  if(!panel || !toggle || !arrow) return;
  const open = panel.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  arrow.textContent = open ? "−" : "+";
}
function toggleDifficulty(level){
  if(!DIFFICULTIES[level]) return;
  const active = getSelectedDifficulties();
  selectedDifficulties = active.includes(level)
    ? (active.length > 1 ? active.filter(item => item !== level) : active)
    : DIFFICULTY_KEYS.filter(item => active.includes(item) || item === level);
  saveSelectedDifficulties();
  renderDifficultyOptions();
  renderPracticeSelection();
  renderVerbList();
}
function setSpainMode(enabled){
  spainMode = enabled;
  localStorage.setItem("spanishSpainMode", String(enabled));
  renderPracticeSelection();
  renderVerbList();
}
function setSentenceMode(enabled){
  sentenceMode = enabled;
  localStorage.setItem("spanishSentenceMode", String(enabled));
  renderPracticeSelection();
}

function getAccentStats(){
  try { return JSON.parse(localStorage.getItem(ACCENT_STATS_KEY)) || {}; }
  catch(e){ return {}; }
}
function saveAccentStats(stats){ localStorage.setItem(ACCENT_STATS_KEY, JSON.stringify(stats)); }
function getAccentHard(){
  try { return JSON.parse(localStorage.getItem(ACCENT_HARD_KEY)) || []; }
  catch(e){ return []; }
}
function saveAccentHard(words){ localStorage.setItem(ACCENT_HARD_KEY, JSON.stringify(words)); }
function isAccentHard(word){ return getAccentHard().includes(word); }
function toggleAccentHard(word){
  const hard = getAccentHard();
  const next = hard.includes(word) ? hard.filter(w => w !== word) : [...hard, word];
  saveAccentHard(next);
  document.querySelectorAll(`[data-accent-word="${word}"]`).forEach(btn => {
    btn.classList.toggle("active", next.includes(word));
    btn.setAttribute("aria-pressed", String(next.includes(word)));
  });
  renderAccentStats();
}
function recordAccentAnswer(item, ok){
  const stats = getAccentStats();
  const row = stats[item.word] || { word: item.word, plain: item.plain, pl: item.pl, attempts: 0, correct: 0, wrong: 0 };
  row.attempts += 1;
  if(ok) row.correct += 1; else row.wrong += 1;
  row.lastPracticed = Date.now();
  stats[item.word] = row;
  saveAccentStats(stats);
  if(!ok && !accentSessionWrong.some(w => w.word === item.word)) accentSessionWrong.push(item);
  renderAccentStats();
}
function getAccentWorst(limit = 5){
  return Object.values(getAccentStats())
    .filter(s => s.attempts > 0)
    .map(s => ({...s, accuracy: s.correct / s.attempts}))
    .sort((a,b) => (a.accuracy - b.accuracy) || (b.wrong - a.wrong) || (b.attempts - a.attempts))
    .slice(0, limit);
}
function renderAccentStats(){
  const summary = document.getElementById("accent-stats-summary");
  const worstBox = document.getElementById("accent-worst-words");
  const hardBox = document.getElementById("accent-hard-words");
  if(!summary || !worstBox || !hardBox) return;
  const all = Object.values(getAccentStats());
  const attempts = all.reduce((sum, s) => sum + s.attempts, 0);
  const correct = all.reduce((sum, s) => sum + s.correct, 0);
  const wrong = all.reduce((sum, s) => sum + s.wrong, 0);
  const pct = attempts ? Math.round((correct / attempts) * 100) : 0;
  summary.innerHTML = attempts ? `
    <div class="stats-grid">
      <div class="stat-box"><span class="stat-num">${attempts}</span><span class="stat-label">odpowiedzi</span></div>
      <div class="stat-box"><span class="stat-num">${pct}%</span><span class="stat-label">poprawnych</span></div>
      <div class="stat-box"><span class="stat-num">${wrong}</span><span class="stat-label">do powtórki</span></div>
    </div>` : `<p class="muted-note">Statystyki akcentów pojawią się po pierwszej odpowiedzi.</p>`;

  const worst = getAccentWorst(5);
  worstBox.innerHTML = worst.length ? `<div class="worst-list">${worst.map(s => `
    <div class="worst-item">
      <div><div class="worst-name">${s.word}</div><div class="worst-meta">${s.pl}: ${Math.round(s.accuracy * 100)}% (${s.correct}/${s.attempts})</div></div>
      <button class="btn" onclick="startAccentQuiz([ACCENT_WORDS.find(w => w.word === '${s.word.replace(/'/g,"\\'")}')], 'Powtórka: ${s.word.replace(/'/g,"\\'")}')">Powtórz</button>
    </div>`).join("")}</div>` : `<p class="muted-note">Na razie nie ma słabych słów z akcentami.</p>`;

  const hard = getAccentHard().map(word => ACCENT_WORDS.find(w => w.word === word)).filter(Boolean);
  hardBox.innerHTML = hard.length ? `
    <div class="worst-list">${hard.map(w => `
      <div class="worst-item">
        <div><div class="worst-name">${w.word}</div><div class="worst-meta">${w.pl}</div></div>
        <button class="btn" onclick="toggleAccentHard('${w.word.replace(/'/g,"\\'")}')">Usuń</button>
      </div>`).join("")}</div>
    <div class="actions" style="position:static;margin:10px 0 0;padding:0;background:transparent;border:0;">
      <button class="btn btn-amber" onclick="startAccentHardQuiz()">Ćwicz trudne</button>
    </div>` : `<p class="muted-note">Oznacz słowo gwiazdką w trybie Akcenty, a pojawi się tutaj.</p>`;
}

function renderStats(){
  const summary = document.getElementById("stats-summary");
  const worstBox = document.getElementById("worst-verbs");
  if(!summary || !worstBox) return;
  const all = Object.values(getStats());
  const attempts = all.reduce((sum, s) => sum + s.attempts, 0);
  const correct = all.reduce((sum, s) => sum + s.correct, 0);
  const wrong = all.reduce((sum, s) => sum + s.wrong, 0);
  const pct = attempts ? Math.round((correct / attempts) * 100) : 0;
  summary.innerHTML = attempts ? `
    <div class="stats-grid">
      <div class="stat-box"><span class="stat-num">${attempts}</span><span class="stat-label">odpowiedzi</span></div>
      <div class="stat-box"><span class="stat-num">${pct}%</span><span class="stat-label">poprawnych</span></div>
      <div class="stat-box"><span class="stat-num">${wrong}</span><span class="stat-label">do powtórki</span></div>
    </div>` : `<p class="muted-note">Statystyki pojawią się po pierwszej sprawdzonej odpowiedzi.</p>`;

  const worst = getWorstStats(5);
  worstBox.innerHTML = worst.length ? `<div class="worst-list">${worst.map(s => {
    const acc = Math.round(s.accuracy * 100);
    return `<div class="worst-item">
      <div><div class="worst-name">${s.inf}</div><div class="worst-meta">${DATA[s.tense].label}: ${acc}% (${s.correct}/${s.attempts})</div></div>
      <button class="btn" onclick="repeatWorst('${s.tense}', '${s.inf.replace(/'/g,"\\'")}')">Powtórz</button>
    </div>`;
  }).join("")}</div>` : `<p class="muted-note">Na razie nie ma słabych punktów. Zrób rundę, a tu pojawią się czasowniki z największą liczbą pomyłek.</p>`;
}

function startSelectedPractice(){
  if(selectedPracticeMode === "mix"){ startMixedTense(); return; }
  if(selectedPracticeMode === "favorites"){ startFavoritesMix(); return; }
  startTense(selectedPracticeMode);
}

function startTense(tense, customVerbs = null, customTitle = null, customDesc = null){
  currentTense = tense;
  const d = DATA[tense];
  document.getElementById("ex-title").textContent = customTitle || d.label;
  document.getElementById("ex-sub").textContent = customDesc || (customVerbs ? "Powtórka wybranych czasowników" : `${d.desc} · ${selectedDifficultyLabel()}`);
  const pf = document.getElementById("progress");
  pf.className = "progress-fill pf-" + tense;

  const btnClass = { indefinido:"btn-green", futuro:"btn-blue", imperfecto:"btn-amber", subjuntivo:"btn-purple", subjuntivo_imperfecto:"btn-purple", perfecto:"btn-purple" }[tense];
  window._btnClass = btnClass;

  const available = getUniqueVerbs(tense, getSelectedDifficulties());
  const verbs = customVerbs || available;
  if(!verbs.length){
    alert("W tym zakresie wszystkie elementy są zawieszone. Przywróć coś na liście albo wybierz inny poziom.");
    return;
  }
  queue = customVerbs ? buildQueueFromVerbs(verbs, tense) : buildRandomFormQueue(verbs, selectedFormCount(), tense);
  current = 0; score = 0; checked = false; sessionWrong = [];
  showPage("page-exercise");
  renderExercise();
}

function repeatWorst(tense = currentTense, inf = null){
  const unique = getUniqueVerbs(tense);
  const verbs = inf ? unique.filter(v => v.inf === inf) : getWorstStats(3, tense).map(s => unique.find(v => v.inf === s.inf)).filter(Boolean);
  if(!verbs.length) return;
  startTense(tense, verbs, "Powtórka: najsłabsze czasowniki", "Powtórka czasowników, które mają najniższą skuteczność");
}

function buildMixedForms(filterFavorites = false){
  const favs = getFavorites();
  return Object.keys(DATA).flatMap(tense => {
    const verbs = getUniqueVerbs(tense, getSelectedDifficulties()).filter(v => !filterFavorites || favs.includes(v.inf));
    if(isPerfecto(tense)) return verbs.map(v => ({verb:v, pronoun:null, tense}));
    return verbs.flatMap(v => getPronouns(tense).map(p => ({verb:v, pronoun:p, tense})));
  });
}

function startMixedTense(){
  currentTense = "mix";
  document.getElementById("ex-title").textContent = "Mix czasów";
  document.getElementById("ex-sub").textContent = "15 losowych form ze wszystkich czasów · " + selectedDifficultyLabel();
  const pf = document.getElementById("progress");
  pf.className = "progress-fill";
  pf.style.background = "#D8527A";
  window._btnClass = "btn-purple";
  queue = shuffle(buildMixedForms(false)).slice(0, 15);
  current = 0; score = 0; checked = false; sessionWrong = [];
  showPage("page-exercise");
  renderExercise();
}

function startFavoritesMix(){
  const favs = getFavorites();
  if(!favs.length){
    alert("Najpierw oznacz czasownik gwiazdką podczas ćwiczenia.");
    return;
  }
  const forms = buildMixedForms(true);
  if(!forms.length){
    alert("Oznaczone czasowniki nie są dostępne w aktualnym poziomie.");
    return;
  }
  currentTense = "favorites";
  document.getElementById("ex-title").textContent = "Moje trudne";
  document.getElementById("ex-sub").textContent = "15 losowych form z czasowników oznaczonych gwiazdką";
  const pf = document.getElementById("progress");
  pf.className = "progress-fill";
  pf.style.background = "#B7791F";
  window._btnClass = "btn-amber";
  queue = shuffle(forms).slice(0, 15);
  current = 0; score = 0; checked = false; sessionWrong = [];
  showPage("page-exercise");
  renderExercise();
}

function conjugationTableHtml(q){
  const tense = q.tense || currentTense;
  const title = DATA[tense]?.label || "";
  if(isPerfecto(tense)){
    return `
    <div class="conj-table-wrap" id="conj-table-wrap">
      <table class="conj-table" aria-label="Participio ${q.verb.inf}">
        <tbody>
          <tr><th>Bezokolicznik</th><td>${q.verb.inf}</td></tr>
          <tr><th>Participio</th><td>${q.verb.part}</td></tr>
        </tbody>
      </table>
    </div>`;
  }
  const people = getPronouns(tense);
  return `
    <div class="conj-table-wrap" id="conj-table-wrap">
      <table class="conj-table" aria-label="Odmiana ${q.verb.inf}">
        <tbody>
          <tr><th colspan="2">${q.verb.inf} · ${title}</th></tr>
          ${people.map(p => `<tr><th>${p}</th><td>${q.verb.c[p]}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>`;
}

function toggleConjugationTable(){
  const table = document.getElementById("conj-table-wrap");
  if(table) table.classList.toggle("open");
}

function startWrongReview(){
  if(!sessionWrong.length) return;
  const wrongQueue = shuffle(sessionWrong);
  document.getElementById("ex-title").textContent = "Powtórka: błędne formy";
  document.getElementById("ex-sub").textContent = "Powtórka tylko tych form, które były błędne w ostatniej rundzie";
  queue = wrongQueue;
  current = 0; score = 0; checked = false; sessionWrong = [];
  showPage("page-exercise");
  renderExercise();
}

function startAccentQuiz(customWords = null, title = "Akcenty"){
  currentTense = "accent";
  const source = customWords || getAccentPool();
  if(!source.length){
    alert("W tym poziomie wszystkie słowa są zawieszone. Przywróć coś na liście albo wybierz inny poziom.");
    return;
  }
  accentQueue = shuffle(source).slice(0, Math.min(source.length, ACCENT_TOTAL));
  accentCurrent = 0; accentScore = 0; accentChecked = false; accentSessionWrong = [];
  document.getElementById("ex-title").textContent = title;
  document.getElementById("ex-sub").textContent = "Wpisz hiszpańskie słowo z poprawnym akcentem" + (customWords ? "" : " · " + ACCENT_DIFFICULTIES[selectedAccentDifficulty].label);
  const pf = document.getElementById("progress");
  pf.className = "progress-fill";
  pf.style.background = "#C0447A";
  window._btnClass = "btn-purple";
  showPage("page-exercise");
  renderAccentExercise();
}

function startAccentHardQuiz(){
  const hard = getAccentHard().map(word => ACCENT_WORDS.find(w => w.word === word)).filter(Boolean);
  if(!hard.length){
    alert("Najpierw oznacz trudne słowa gwiazdką w trybie Akcenty.");
    return;
  }
  startAccentQuiz(hard, "Akcenty: trudne słowa");
}

function renderAccentExercise(){
  if(accentCurrent >= accentQueue.length){ renderAccentScore(); return; }
  const item = accentQueue[accentCurrent];
  accentChecked = false;
  document.getElementById("counter").textContent = `Pytanie ${accentCurrent+1} / ${accentQueue.length}`;
  document.getElementById("progress").style.width = `${(accentCurrent/accentQueue.length)*100}%`;
  document.getElementById("exercise-area").innerHTML = `
    <div class="card">
      <div class="verb-head">
        <div class="verb-name">${item.plain}<small>${item.pl}</small></div>
        <button class="fav-btn ${isAccentHard(item.word) ? "active" : ""}" data-accent-word="${item.word}" onclick="toggleAccentHard('${item.word.replace(/'/g,"\\'")}')" aria-pressed="${isAccentHard(item.word)}" title="Oznacz jako trudne">★</button>
      </div>
      <div class="session-note">Przepisz słowo po hiszpańsku z poprawnym akcentem.</div>
      <div class="pronoun-row">
        <span class="pronoun">akcent</span>
        <input class="inp" id="accent-ans" type="text" placeholder="wpisz z akcentem..." autocomplete="off" autocorrect="off" spellcheck="false"/>
        <span class="hint" id="accent-hint"></span>
      </div>
      <div class="actions">
        <button class="btn ${window._btnClass}" id="accent-check-btn" onclick="checkAccentAnswer()">Sprawdź</button>
        <button class="btn" onclick="skipAccentQ()">Pomiń →</button>
      </div>
    </div>`;
  const inp = document.getElementById("accent-ans");
  inp.focus();
  inp.addEventListener("keydown", e => { if(e.key==="Enter") accentChecked ? nextAccentQ() : checkAccentAnswer(); });
}

function checkAccentAnswer(){
  if(accentChecked) return;
  accentChecked = true;
  const item = accentQueue[accentCurrent];
  const inp = document.getElementById("accent-ans");
  const hint = document.getElementById("accent-hint");
  const btn = document.getElementById("accent-check-btn");
  const ok = cleanText(inp.value) === cleanText(item.word);
  if(ok){
    inp.classList.add("correct");
    hint.textContent = "✓ dobrze!";
    hint.className = "hint show-correct";
    accentScore++;
  } else {
    inp.classList.add("wrong");
    hint.textContent = item.word;
    hint.className = "hint show-wrong";
  }
  recordAccentAnswer(item, ok);
  btn.textContent = "Dalej →";
  btn.onclick = nextAccentQ;
}

function skipAccentQ(){
  if(!accentChecked){
    accentChecked = true;
    const item = accentQueue[accentCurrent];
    document.getElementById("accent-ans").classList.add("wrong");
    document.getElementById("accent-hint").textContent = item.word;
    document.getElementById("accent-hint").className = "hint show-wrong";
    const btn = document.getElementById("accent-check-btn");
    btn.textContent = "Dalej →";
    btn.onclick = nextAccentQ;
    recordAccentAnswer(item, false);
  } else nextAccentQ();
}

function nextAccentQ(){ accentCurrent++; renderAccentExercise(); }

function startAccentWrongReview(){
  if(!accentSessionWrong.length) return;
  startAccentQuiz(accentSessionWrong, "Akcenty: błędne słowa");
}

function renderAccentScore(){
  document.getElementById("progress").style.width = "100%";
  document.getElementById("counter").textContent = "";
  const total = accentQueue.length;
  const pct = Math.round((accentScore/total)*100);
  const msg = pct >= 80 ? "Świetnie z akcentami!" : pct >= 50 ? "Niezłe, parę akcentów do powtórki." : "Warto powtórzyć te słowa.";
  const retryWrong = accentSessionWrong.length ? `<button class="btn" onclick="startAccentWrongReview()">Powtórz błędne (${accentSessionWrong.length})</button>` : "";
  document.getElementById("exercise-area").innerHTML = `
    <div class="card score-card">
      <div class="score-num score-pink">${accentScore}/${total}</div>
      <div class="score-label">${pct}% poprawnych<br><span style="font-size:15px;color:var(--color-text-primary)">${msg}</span></div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
        <button class="btn btn-purple" onclick="startAccentQuiz()">Jeszcze raz</button>
        ${retryWrong}
        <button class="btn" onclick="goHome()">Inne ćwiczenie</button>
      </div>
    </div>`;
}

function renderExercise(){
  if(current >= queue.length){ renderScore(); return; }
  const q = queue[current];
  const v = q.verb, p = q.pronoun;
  const qTense = q.tense || currentTense;
  const tenseNote = currentTense === "mix" || currentTense === "favorites" ? `<small>${v.en} · ${DATA[qTense].label}</small>` : `<small>${v.en}</small>`;
  const isParticiple = isPerfecto(qTense);
  const correct = correctFor(q);
  q.sentence = sentenceMode ? sentencePromptFor(q, correct) : null;
  checked = false;
  document.getElementById("counter").textContent = `Pytanie ${current+1} / ${queue.length}`;
  document.getElementById("progress").style.width = `${(current/queue.length)*100}%`;
  document.getElementById("exercise-area").innerHTML = `
    <div class="card">
      <div class="verb-head">
        <div class="verb-name">${v.inf}${tenseNote}</div>
        <button class="fav-btn ${isFavorite(v.inf) ? "active" : ""}" data-fav-inf="${v.inf}" onclick="toggleFavorite('${v.inf.replace(/'/g,"\\'")}')" aria-pressed="${isFavorite(v.inf)}" title="Oznacz jako trudny">★</button>
      </div>
      <div class="session-note">${sentenceMode ? "Uzupełnij zdanie poprawną formą czasownika." : isParticiple ? "Wpisz participio, np. abrir → abierto." : `Losowe formy z wybranego zakresu${spainMode ? ", z vosotros." : ", bez vosotros."}`}</div>
      ${sentenceMode ? `<div class="sentence-card">${q.sentence.blank}<small>${isParticiple ? "Wpisz participio." : "Forma dla: " + p}</small></div>` : ""}
      <div class="pronoun-row">
        <span class="pronoun">${isParticiple ? "participio" : p}</span>
        <input class="inp" id="ans" type="text" placeholder="${isParticiple ? "wpisz imiesłów..." : "wpisz formę..."}" autocomplete="off" autocorrect="off" spellcheck="false"/>
        <span class="hint" id="hint"></span>
      </div>
      <div class="translation-box" id="tbox"><strong>${v.inf}</strong> = ${v.en}<div class="example-line" id="example-line"></div><button class="btn" style="margin-top:10px;" onclick="toggleConjugationTable()">${isParticiple ? "Pokaż participio" : "Pokaż odmianę"}</button>${conjugationTableHtml(q)}</div>
      <div class="actions">
        <button class="btn ${window._btnClass}" id="check-btn" onclick="checkAnswer()">Sprawdź</button>
        <button class="btn" onclick="skipQ()">Pomiń →</button>
      </div>
    </div>`;
  const inp = document.getElementById("ans");
  inp.focus();
  inp.addEventListener("keydown", e => { if(e.key==="Enter") checked ? nextQ() : checkAnswer(); });
}

function checkAnswer(){
  if(checked) return;
  checked = true;
  const q = queue[current], correct = correctFor(q);
  const inp = document.getElementById("ans");
  const hint = document.getElementById("hint");
  const btn = document.getElementById("check-btn");
  const ok = normalize(inp.value) === normalize(correct);
  const accentIssue = ok && hasAccentDifference(inp.value, correct);
  if(accentIssue){
    inp.classList.add("accent-warning");
    hint.textContent = "✓ zaliczone, akcent: " + correct;
    hint.className = "hint show-accent";
    score++;
  } else if(ok){
    inp.classList.add("correct");
    hint.textContent="✓ dobrze!";
    hint.className="hint show-correct";
    score++;
  } else {
    inp.classList.add("wrong");
    hint.textContent=correct;
    hint.className="hint show-wrong";
  }
  recordAnswer(q, ok);
  showExample(q, correct);
  document.getElementById("tbox").style.display="block";
  btn.textContent="Dalej →";
  btn.onclick=nextQ;
}

function skipQ(){
  if(!checked){
    checked=true;
    const q = queue[current];
    const correct=correctFor(q);
    const inp=document.getElementById("ans");
    inp.classList.add("wrong");
    document.getElementById("hint").textContent=correct;
    document.getElementById("hint").className="hint show-wrong";
    showExample(q, correct);
    document.getElementById("tbox").style.display="block";
    const btn=document.getElementById("check-btn");
    btn.textContent="Dalej →"; btn.onclick=nextQ;
    recordAnswer(q, false);
  } else nextQ();
}

function nextQ(){ current++; renderExercise(); }

function renderScore(){
  document.getElementById("progress").style.width="100%";
  document.getElementById("counter").textContent="";
  const total = queue.length;
  const pct=Math.round((score/total)*100);
  const msg=pct>=80?"¡Muy bien!":pct>=50?"Niezłe, ćwicz dalej!":"Warto powtórzyć materiał.";
  const sc = { indefinido:"score-green", futuro:"score-blue", imperfecto:"score-amber", subjuntivo:"score-purple", subjuntivo_imperfecto:"score-indigo", perfecto:"score-pink", mix:"score-purple", favorites:"score-amber" }[currentTense] || "score-green";
  const retryWrong = sessionWrong.length ? `<button class="btn" onclick="startWrongReview()">Powtórz błędne (${sessionWrong.length})</button>` : "";
  const retryWorst = DATA[currentTense] && getWorstStats(3, currentTense).length ? `<button class="btn" onclick="repeatWorst('${currentTense}')">Powtórz najsłabsze</button>` : "";
  const againAction = currentTense === "mix" ? "startMixedTense()" : currentTense === "favorites" ? "startFavoritesMix()" : `startTense('${currentTense}')`;
  document.getElementById("exercise-area").innerHTML=`
    <div class="card score-card">
      <div class="score-num ${sc}">${score}/${total}</div>
      <div class="score-label">${pct}% poprawnych<br><span style="font-size:15px;color:var(--color-text-primary)">${msg}</span></div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
        <button class="btn ${window._btnClass}" onclick="${againAction}">Jeszcze raz</button>
        ${retryWrong}
        ${retryWorst}
        <button class="btn" onclick="goHome()">Inne ćwiczenie</button>
      </div>
    </div>`;
}

renderVerbList();
renderAccentList();
renderDifficultyOptions();
renderPracticeSelection();
renderAccentDifficultyOptions();
renderStats();
renderAccentStats();
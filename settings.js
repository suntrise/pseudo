//获取字符库
fetch('character.json')    
.then(response => response.json())
.then(jsonData => {charLib = jsonData;
  let keys = Object.keys(charLib);
  for(i=0; i < keys.length; ++i){
    if(keys[i].length == 1 && /[A-Za-z]/.test(keys[i])){
      pslibs.innerHTML += keys[i] +": " +charLib[keys[i]] +"<br>";
    }
  }
})

//默认语言设置
fetch('lang.json')    
  .then(response => response.json())
  .then(jsonData => {
    langLib = jsonData;
    if (navigator.language == "zh-CN") {
      setzh()
      }
      else if (navigator.language != "zh-CN") {
      seten()
      }
    })

function xabcheck() {
  if(enXA.checked) {
      psshow.placeholder = resph; 
      psshow.style.textAlign="left";
      psshow.innerHTML="";
      RTL = false
    }
  else if(enXB.checked){
    psshow.placeholder = resph.split('').reverse().join(''); 
    psshow.style.textAlign="right";
    psshow.innerHTML="";
    RTL = true;
  }
}

function frontChk(){
    if(front.checked){
      hashdiv.style.display="block";
    }
    else if(front.checked == ""){
      hashdiv.style.display="none";
    }
}

function sufcheck(){
  if(suffix.value == "4"){
    prscus.style.display="block";
  }
  else if(suffix.value != "4"){
    prscus.style.display="none";
  }
  if (Math.floor(cusexpn.value)!=cusexpn.value) {
    cusexpn.value=""
  }
}

function setzh() {
  zh.style.color = "#fff";
  zh.style.background = "#07d";
  bkhome.style.display = "block";
  en.style.color = "#000";
  en.style.background = "#f5f5f5";
  lang = langLib["zh-CN"]
  setLang(lang)
}
function seten() {
  zh.style.color = "#000";
  zh.style.background = "#f5f5f5";
  zh.innerHTML = "Chinese"
  en.style.color = "#fff";
  en.style.background = "#07d";
  en.innerHTML = "English"
  bkhome.style.display = "none";
  resph="Translation Results"  
  lang = langLib["en"]
  setLang(lang)
}

function setLang(lang) {
  resph = lang["resph"]; 
  xabcheck()
  zh.innerHTML = lang["langZh"]
  en.innerHTML = lang["langEn"]
  title.innerHTML = lang["title"]
  pageTitle.innerHTML = lang["pageTitle"] +" " +langLib["ver"] +" By " +langLib["author"]
  hmtext.innerHTML = lang["hmtext"]
  what.innerHTML = lang["what"]
  uplog.innerHTML = lang["uplog"]
  pjhome.innerHTML = lang["pjhome"]
  exever.innerHTML = lang["exever"]
  pstype.placeholder = lang["pstype"]
  psbtn.innerHTML = lang["psbtn"]
  hisbtn.innerHTML = lang["hisbtn"]
  chrbtn.innerHTML = lang["chrbtn"]
  opttxt.innerHTML = lang["opttxt"]
  prstxt.innerHTML = lang["prstxt"]
  prs0.innerHTML = lang["prs0"]
  prs1.innerHTML = lang["prs1"]
  prs2.innerHTML = lang["prs2"]
  prs3.innerHTML = lang["prs3"]
  prs4.innerHTML = lang["prs4"]
  cuset.innerHTML = lang["cuset"]
  cusnt.innerHTML = lang["cusnt"]
  hashtxt.innerHTML = lang["hashtxt"]
  hashdit.innerHTML = lang["hashdit"];
  dbvtxt.innerHTML = lang["dbvtxt"];
  dbv1.innerHTML = lang["dbv1"];
  nctxt.innerHTML = lang["nctxt"];;
  esctxt.innerHTML = lang["esctxt"];
  clear.innerHTML = lang["clear"];
  whattxt.innerHTML = lang["whattxt"];
  logtxt.innerHTML = lang["logtxt"];
}

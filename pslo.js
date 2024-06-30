pstype = document.getElementById("pstype")
psshow = document.getElementById("psshow")
prscus = document.getElementById("prscus")
var pshist = ""
//获取字符库
fetch('character.json')    
.then(response => response.json())
.then(jsonData => {charLib = jsonData})

//主函数
function pseudoLocalize() {
  origin = pstype.value;
  result = "";
  oriLength = origin.length;
  if (origin!="") {
  if (enXA.checked) {
    for (let i = 0; i < origin.length; ++i){
        if(origin[i]=="\\" && keepEsc.checked == true){
          if(origin[i+1]=="x"){
           result += origin[i]+origin.slice(i+1,i+4)
           i+=3
          }
          else if(origin[i+1]=="u"){
            result += origin[i]+origin.slice(i+1,i+6)
            i+=5
          }
          else{            
            result += origin[i]+origin[i+1]
            i+=1 
          }
        }
        if(/[A-Za-z]/.test(origin[i])){
          random = Math.floor(Math.random()*charLib[origin[i]].length)
          //检测元音
          if ("aeiouAEIOU".includes(origin[i]) && dbvowel.checked) {
          j=0
          while(j<=vowelnum.value){
              j++
              result += charLib[origin[i]][random]
          }
          }
          else{
            result += charLib[origin[i]][random]
          }
        }
        else{
          result += origin[i]
        }
      }
    }
    else if(enXB.checked){
          result = origin.split('').reverse().join("");
        }
    //是否替换数字
    if (numcir.checked) {
          result = result.replace(/1/g, "①").replace(/2/g, "②").replace(/3/g, "③").replace(/4/g, "④").replace(/5/g, "⑤").replace(/6/g, "⑥").replace(/7/g, "⑦").replace(/8/g, "⑧").replace(/9/g, "⑨");
          } 
    //添加前后缀
    addSuffix();
    //添加伪 Hash ID
    if (front.checked) {
      addHashID()
    }
    console.log(result)
    psshow.innerHTML = result;
    pshist += pstype.value +" → " +result +"<br>";
    pshiss.innerHTML = pshist;
  }  
}      

//判断前后缀方式
function addSuffix(result){ 
  switch (suffix.value) {
    case "1":
          suffixMS();
          break
    case "2":
          suffixA();
          break
    case "3":
          suffixNum();
          break
    case "4":
          suffixCus();
          break
        }   
}
//微软式后缀
function suffixMS() {
  let n = 0, suf = "";
   while(oriLength>2 && n<(oriLength/7)){
        n++
        suf=suf+"!"  
        if (n%3==0 && n!=(Math.floor(oriLength/7)+1)) {
          suf=suf+" ";
        } 
        } 
    result = "["+ result +" " +suf +"]";  
    n=0;
    suf="";
    return result;
}

//安卓式后缀
function suffixA(){
  let n = 0, suf = "";
   while(n<(oriLength/7)){
        n++
        suf = suf+charLib["enNumber"][(n-1)%20]+" " 
        } 
    result = "["+ result +" " +suf +"]";  
    n=0;
    suf="";
    return result;
}

//数字式后缀
function suffixNum() {
    let n = 0, suf = "";
    while(n<(oriLength/7)){
        n++
        suf += n
        } 
    result = "["+ result +" " +suf +"]";  
    n=0;
    suf="";
}

//自定义后缀
function suffixCus() {
    let n = 0, suf = "";
    while(n<=(oriLength/cusexpn.value)){
        n++
        suf += cusexp.value+" "
        } 
        if (cusexp.value != "") {
        result = cuspre.value + result +" " +suf +cussuf.value; 
        } 
        else{
        result = cuspre.value + result +" " +cussuf.value; 
        }
    n=0;
    suf="";
}

//添加伪 Hash ID
function addHashID(){
    let m = 0, hashid = "";
        while(m<hashids.value){
          m++
          hashid = hashid + charLib["alphabet"][Math.floor(Math.random()*62)]
        }
    result="[" + hashid +"]" +result;  
    hashid="";
    m=0;
    return result;
      }

function hisclear() {
    pshist = ""
    pshiss.innerHTML = pshist;
}

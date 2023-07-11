var str = ""
var all = "";
var result = "";
var suf="";
var hashid=""
var vow="";
var pshist=""
var m=n=j=0;
var arra=["ä","ā","á","ǎ","à","ă","å","ǻ","ã","ǟ","ǡ","ǻ","ȁ","ȃ","ȧ","ᶏ","ḁ","ẚ","ạ","ả","ấ","ầ","ẩ","ẫ","ậ","ắ","ằ","ẳ","ẵ","ặ","ɑ","α","ά","ὰ","ἀ","ἁ","ἂ","ἃ","ἆ","ἇ","ᾂ","ᾃ","ᾰ","ᾱ","ᾲ","ᾳ","ᾴ","ᾶ","ᾷ","ⱥ","𐓘","𐓙","𐓚"]
var arraa=["Ā","Á","Ǎ","À","Â","Ã","Ä","Å","Ǻ","Ά","Ă","Δ","Λ","Д","Ą"]
var arrb=["b","ь","в","Ъ","Б","б","β","ƀ","ƃ","ɓ","ᵬ","ᶀ","ḃ","ḅ","ḇ","ꞗ"]
var arrbb=["ß","฿"]
var arrc=["c","ç","ς","ĉ","č","ċ","ć","ĉ","ċ","ƈ","ȼ","¢","ɕ","ḉ","ꞓ","ꞔ"]
var arrcc=["Č","Ç","Ĉ","Ć","€"]
var arrd=["d","ď","đ","₫","ð","δ"]
var arrdd=["Ď","Ð"]
var arre=["e","ē","é","ě","è","ê","ĕ","ė","ë","ę","з","ε","έ","э","℮"]
var arree=["E","Ē","É","Ě","È","Ĕ","Ё","Σ","Έ","Є","Э","З"]
var arrf=["f","ƒ"]
var arrff=["F","₣"]
var arrg=["ḡ","ģ","ǧ","ĝ","ğ","ġ","ǥ","ǵ","ɠ","ᶃ","ꞡ"]
var arrgg=["Ḡ","Ǵ","Ǧ","Ĝ","Ğ","Ģ","Ġ","Ɠ","Ǥ","Ꞡ"]
var arrh=["ĥ","ħ","ђ","н"]
var arrhh=["H","Ĥ","Ħ"]
var arri=["ı","ī","í","ǐ","ì","ĭ","î","ï","ί","į","ΐ","ι"]
var arrii=["Ī","Í","Ǐ","Ì","Î","Ï","Ĭ","Ί"]
var arrj=["j"]
var arrjj=["J","Ĵ"]
var arrk=["ƙ","κ"]
var arrkk=["К"]
var arrl=["ŀ","ļ","ℓ","ĺ","ļ","ľ","ł"]
var arrll=["Ŀ","£","Ļ","Ł","Ĺ"]
var arrm=["m","₥","м"]
var arrmm=["M"]
var arrn=["ń","ň","ŉ","η","ή","и","й","ñ","л","п","π"]
var arrnn=["Ń","Ň","И","Й","Π","Л"]
var arro=["ō","ó","ŏ","ò","ô","õ","ö","ő","σ","ø","ǿ"]
var arroo=["Ō","Ó","Ǒ","Ò","Ô","Õ","Ö","Ό","Θ","Ǿ"]
var arrp=["p","ρ","ƥ","φ"]
var arrpp=["P","Þ","₽"]
var arrq=["q","ʠ", "ɋ"]
var arrqq=["Q","Ɋ"]
var arrr=["ř","ŗ","г","ѓ","ґ","я"]
var arrrr=["Ř","Я","Г","Ґ"]
var arrs=["ś","š","ŝ","ș","ş","ƨ"]
var arrss=["Š","Ş","Ș","§"]
var arrt=["ț","ţ","ť","ŧ","т","τ"]
var arrtt=["Ť","Ţ","Ț","Ŧ"]
var arru=["ū","ú","ǔ","ù","û","ũ","ů","ų","ü","ǖ","ǘ","ǚ","ǜ","ύ","ϋ","ΰ","µ","ц","џ"]
var arruu=["Ū","Ǔ","Ǖ","Ǘ","Ǚ","Ǜ","Ц"]
var arrv=["ν"]
var arrvv=["V","V","Ṽ","Ṿ","Ꝟ"]
var arrw=["ẃ","ẁ","ẅ","ŵ","ш","щ","ω","ώ"]
var arrww=["Ẁ","Ẃ","Ẅ","Ŵ","Ш","Щ"]
var arrx=["x","ж","×"]
var arrxx=["X","Ж","χ"]
var arry=["y","ỳ","ŷ","ч","γ"]
var arryy=["Ϋ","Ÿ","Ŷ","Ỳ","Ύ","Ψ","￥","У","Ў","Ч"]
var arrz=["z","ź","ż","ž","ƶ","ȥ","ʐ","ᵶ","ᶎ","ẑ","ẓ","ẕ","ⱬ"]
var arrzz=["Z","Ź","Ż","Ž","Ƶ","Ȥ","Ẓ","Ẕ","Ẑ","Ⱬ"]
// var arr2=["↊"] 字体缺少
// var arr3=["↋"] 字体缺少
var arral=["A","a","B","b","C","c","D","d","E","e","F","f","G","g","H","h","I","i","J","j","K","k","L","l","M","m","N","n","O","o","P","p","Q","q","R","r","S","s","T","t","U","u","V","v","W","w","X","x","Y","y","Z","z","1","2","3","4","5","6","7","8","9","0"]
var arrba=["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"]
var xab=setInterval(xabcheck,1)

//判断伪本地化方式
function xabcheck() {
if(enXA.checked) {
    xaoptions.style.display="block";
    psshow.placeholder=resph
  }
else if(enXB.checked){
  xaoptions.style.display="none";
  psshow.placeholder=resph.split('').reverse().join("");
}
if(suffix.value == 4){
  prscus.style.display="block";
}
else if(suffix.value != 4){
  prscus.style.display="none";
}
if (Math.floor(cusexpn.value)!=cusexpn.value) {
  cusexpn.value=""
}
if(front.checked){
  hashdiv.style.display="block";
}
else if(front.checked == ""){
  hashdiv.style.display="none";
}
pslibs.innerHTML = "A: "+arraa +"<br>a: "+arra 
+"<br>B: "+arrbb +"<br>b: "+arrb 
+"<br>C: "+arrcc +"<br>c: "+arrc 
+"<br>D: "+arrdd +"<br>d: "+arrd 
+"<br>E: "+arree +"<br>e: "+arre
+"<br>F: "+arrff +"<br>f: "+arrf
+"<br>G: "+arrgg +"<br>g: "+arrg
+"<br>H: "+arrhh +"<br>h: "+arrh
+"<br>I: "+arrhh +"<br>i: "+arri
+"<br>J: "+arrjj +"<br>j: "+arrj
+"<br>K: "+arrkk +"<br>k: "+arrk
+"<br>L: "+arrll +"<br>l: "+arrl
+"<br>M: "+arrmm +"<br>m: "+arrm
+"<br>N: "+arrnn +"<br>n: "+arrn
+"<br>O: "+arroo +"<br>o: "+arro
+"<br>P: "+arrpp +"<br>p: "+arrp
+"<br>Q: "+arrqq +"<br>q: "+arrq
+"<br>R: "+arrrr +"<br>r: "+arrr
+"<br>S: "+arrss +"<br>s: "+arrs
+"<br>T: "+arrtt +"<br>t: "+arrt
+"<br>U: "+arruu +"<br>u: "+arru
+"<br>V: "+arrvv +"<br>v: "+arrv
+"<br>W: "+arrww +"<br>w: "+arrw
+"<br>X: "+arrxx +"<br>x: "+arrx
+"<br>Y: "+arryy +"<br>y: "+arry
+"<br>Z: "+arrzz +"<br>z: "+arrz
;
}
//en-XA 伪本地化
function psloca() {
  all="";
  i=0;
  str = pstype.value
if (str!="") {
if (enXA.checked) {
    for (let i in str) {
        var al = str[i];
        if(al=="a"){
          al=arra[Math.floor(Math.random()*53)]
          if (dbvowel.checked) {
        while(j<=vowelnum.value){
          j++
            vow+=al
          }
          al=vow
          }
          j=0
          vow=""
        }
        if(al=="A"){
          al=arraa[Math.floor(Math.random()*15)]
          if (dbvowel.checked) {
        while(j<=vowelnum.value){
          j++
            vow+=al
          }
          al=vow
          }
          j=0
          vow=""                
        }
        if(al=="b"){
          al=arrb[Math.floor(Math.random()*16)]
        }
        if(al=="B"){
          al=arrbb[Math.floor(Math.random()*2)]
        }
        if(al=="c"){
          al=arrc[Math.floor(Math.random()*16)]
        }
        if(al=="C"){
          al=arrcc[Math.floor(Math.random()*5)]
        }
        if(al=="d"){
          al=arrd[Math.floor(Math.random()*6)]
        }
        if(al=="D"){
          al=arrdd[Math.floor(Math.random()*1)]
        }
        if(al=="e"){
          al=arre[Math.floor(Math.random()*15)]
          if (dbvowel.checked) {
        while(j<=vowelnum.value){
          j++
            vow+=al
          }
          al=vow
          }
          j=0
          vow=""
        }
        if(al=="E"){
          al=arree[Math.floor(Math.random()*11)]
          if (dbvowel.checked) {
        while(j<=vowelnum.value){
          j++
            vow+=al
          }
          al=vow
          }
          j=0
          vow=""
        }
        if(al=="f"){
          al=arrf[Math.floor(Math.random()*2)]
        }
        if(al=="F"){
          al=arrff[Math.floor(Math.random()*2)]
        }
        if(al=="g"){
          al=arrg[Math.floor(Math.random()*11)]
        }
        if(al=="G"){
          al=arrgg[Math.floor(Math.random()*10)]
        }
        if(al=="h"){
          al=arrh[Math.floor(Math.random()*4)]
        }
        if(al=="H"){
          al=arrhh[Math.floor(Math.random()*3)]
        }
        if(al=="i"){
          al=arri[Math.floor(Math.random()*11)]
          if (dbvowel.checked) {
        while(j<=vowelnum.value){
          j++
            vow+=al
          }
          al=vow
          }
          j=0
          vow=""
        }
        if(al=="I"){
          al=arrii[Math.floor(Math.random()*8)]
          if (dbvowel.checked) {
        while(j<=vowelnum.value){
          j++
            vow+=al
          }
          al=vow
          }
          j=0
          vow=""
        }
        if(al=="j"){
          al=arrj[Math.floor(Math.random()*1)]
        }
        if(al=="J"){
          al=arrjj[Math.floor(Math.random()*2)]
        }
        if(al=="k"){
          al=arrk[Math.floor(Math.random()*2)]
        }
        if(al=="K"){
          al=arrkk[Math.floor(Math.random()*1)]
        }
        if(al=="l"){
          al=arrl[Math.floor(Math.random()*7)]
        }
        if(al=="L"){
          al=arrll[Math.floor(Math.random()*4)]
        }
        if(al=="m"){
          al=arrm[Math.floor(Math.random()*3)]
        }
        if(al=="M"){
          al=arrmm[Math.floor(Math.random()*1)]
        }
        if(al=="n"){
          al=arrn[Math.floor(Math.random()*11)]
        }
        if(al=="N"){
          al=arrnn[Math.floor(Math.random()*6)]
        }
        if(al=="o"){
          al=arro[Math.floor(Math.random()*11)]
          if (dbvowel.checked) {
        while(j<=vowelnum.value){
          j++
            vow+=al
          }
          al=vow
          }
          j=0
          vow=""
        }
        if(al=="O"){
          al=arroo[Math.floor(Math.random()*10)]
          if (dbvowel.checked) {
        while(j<=vowelnum.value){
          j++
            vow+=al
          }
          al=vow
          }
          j=0
          vow=""
        }
        if(al=="p"){
          al=arrp[Math.floor(Math.random()*4)]
        }
        if(al=="P"){
          al=arrpp[Math.floor(Math.random()*3)]
        }
        if(al=="q"){
          al=arrq[Math.floor(Math.random()*3)]
        }
        if(al=="Q"){
          al=arrqq[Math.floor(Math.random()*2)]
        }
        if(al=="r"){
          al=arrr[Math.floor(Math.random()*6)]
        }
        if(al=="R"){
          al=arrrr[Math.floor(Math.random()*4)]
        }
        if(al=="s"){
          al=arrs[Math.floor(Math.random()*6)]
        }
        if(al=="S"){
          al=arrss[Math.floor(Math.random()*4)]
        }
        if(al=="t"){
          al=arrt[Math.floor(Math.random()*6)]
        }
        if(al=="T"){
          al=arrtt[Math.floor(Math.random()*4)]
        }
        if(al=="u"){
          al=arru[Math.floor(Math.random()*19)]
          if (dbvowel.checked) {
        while(j<=vowelnum.value){
          j++
            vow+=al
          }
          al=vow
          }
          j=0
          vow=""
        }
        if(al=="U"){
          al=arruu[Math.floor(Math.random()*7)]
          if (dbvowel.checked) {
        while(j<=vowelnum.value){
          j++
            vow+=al
          }
          al=vow
          }
          j=0
          vow=""
        }
        if(al=="v"){
          al=arrv[Math.floor(Math.random()*1)]
        }
        if(al=="V"){
          al=arrvv[Math.floor(Math.random()*5)]
        }
        if(al=="w"){
          al=arrw[Math.floor(Math.random()*7)]
        }
        if(al=="W"){
          al=arrww[Math.floor(Math.random()*6)]
        }
        if(al=="x"){
          al=arrx[Math.floor(Math.random()*3)]
        }
        if(al=="X"){
          al=arrxx[Math.floor(Math.random()*3)]
        }
        if(al=="y"){
          al=arry[Math.floor(Math.random()*5)]
        }
        if(al=="Y"){
          al=arryy[Math.floor(Math.random()*10)]
        }
        if(al=="z"){
          al=arrz[Math.floor(Math.random()*13)]
        }
        if(al=="Z"){
          al=arrzz[Math.floor(Math.random()*10)]
        }
        if (numcir.checked) {
          numyi = new RegExp("1","g");
          numer = new RegExp("2","g");
          numsan = new RegExp("3","g");
          numsi = new RegExp("4","g");
          numwu = new RegExp("5","g");
          numliu = new RegExp("6","g");
          numqi = new RegExp("7","g");
          numba = new RegExp("8","g");
          numjiu = new RegExp("9","g");
          al = al.replace(numyi, "①").replace(numer, "②").replace(numsan, "③").replace(numsi, "④").replace(numwu, "⑤").replace(numliu, "⑥").replace(numqi, "⑦").replace(numba, "⑧").replace(numjiu, "⑨");
          }          
        all += al; 
    result = all;
        

//微软式后缀
function suffixMS() {
   while(i>2 && n<(i/7)){
        n++
        suf=suf+"!"  
        if (n%3==0 && n!=(Math.floor(i/7)+1)) {
          suf=suf+" ";
        } 
        } 
        result = "["+ all +" " +suf +"]";  
        n=0;
        suf="";
}

//安卓式后缀
function suffixA() {
   while(n<(i/7)){
        n++
        suf = suf+arrba[(n-1)%20]+" " 
        } 
        result = "["+ all +" " +suf +"]";  
        n=0;
        suf="";
}
//数字式后缀
function suffixNum() {
   while(n<(i/7)){
        n++
        suf += n
        } 
        result = "["+ all +" " +suf +"]";  
        n=0;
        suf="";
}
//自定义后缀
function suffixCus() {
   while(n<=(i/cusexpn.value)){
        n++
        suf += cusexp.value+" "
        } 
        if (cusexp.value != "") {
        result = cuspre.value + all +" " +suf +cussuf.value; 
        } 
        else{
        result = cuspre.value + all +" " +cussuf.value; 
        }
        n=0;
        suf="";
}
//判断添加后缀方式
        if (suffix.value=="1") {
          suffixMS()
        }
        if (suffix.value=="2") {
          suffixA()
        }
        if (suffix.value=="3") {
          suffixNum()
        }
         if (suffix.value=="4") {
          suffixCus()
        }
//添加伪 Hash ID
        if (front.checked) {
        while(m<hashids.value){
          m++
          hashid = hashid + arral[Math.floor(Math.random()*62)]
        }
        result="[" + hashid +"]" +result;  
        hashid="";
        m=0;
        }
        else{
          result=result;
        }
      }
    }

//en-XB 字符串倒序伪本地化
else if(enXB.checked){
  result=str.split('').reverse().join("");
}
        psshow.innerHTML = result;
        pshist += pstype.value +" → " +result +"<br>";
        pshiss.innerHTML = pshist;

}
}
function hisclear() {
    pshist = ""
    pshiss.innerHTML = pshist;
}

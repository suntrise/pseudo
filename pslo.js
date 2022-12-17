var all = "";
var alll = "";
var str = ""
var gth="";
var hashid=""
var m=n=0;
var arra=["ä","ā","á","ǎ","à","ă","å","ǻ","ǟ","ǡ","ǻ","ȁ","ȃ","ȧ","ᶏ","ḁ","ẚ","ạ","ả","ấ","ầ","ẩ","ẫ","ậ","ắ","ằ","ẳ","ẵ","ặ","ɑ","α","ά","ὰ","ἀ","ἁ","ἂ","ἃ","ἆ","ἇ","ᾂ","ᾃ","ᾰ","ᾱ","ᾲ","ᾳ","ᾴ","ᾶ","ᾷ","ⱥ","𐓘","𐓙","𐓚"]
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
var arrx=["x","ж"]
var arrxx=["X","Ж"]
var arry=["y","ỳ","ŷ","ч","γ"]
var arryy=["Ϋ","Ÿ","Ŷ","Ỳ","Ύ","Ψ","￥","У","Ў","Ч"]
var arrz=["z","ź","ż","ž","ƶ","ȥ","ʐ","ᵶ","ᶎ","ẑ","ẓ","ẕ","ⱬ"]
var arrzz=["Z","Ź","Ż","Ž","Ƶ","Ȥ","Ẓ","Ẕ","Ẑ","Ⱬ"]
// var arr2=["↊"] 字体缺少
// var arr3=["↋"] 字体缺少
var arral=["A","a","B","b","C","c","D","d","E","e","F","f","G","g","H","h","I","i","J","j","K","k","L","l","M","m","N","n","O","o","P","p","Q","q","R","r","S","s","T","t","U","u","V","v","W","w","X","x","Y","y","Z","z","1","2","3","4","5","6","7","8","9","0"]

function psloca() {
  all="";
  i=0;
  str = pstype.value;
    for (let i in str) {
        var al = str[i];
        if(al=="a"){
          al=arra[Math.floor(Math.random()*52)]
        }
        if(al=="A"){
          al=arraa[Math.floor(Math.random()*15)]
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
        }
        if(al=="E"){
          al=arree[Math.floor(Math.random()*11)]
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
        }
        if(al=="I"){
          al=arrii[Math.floor(Math.random()*8)]
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
        }
        if(al=="O"){
          al=arroo[Math.floor(Math.random()*10)]
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
        }
        if(al=="U"){
          al=arruu[Math.floor(Math.random()*7)]
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
          al=arrx[Math.floor(Math.random()*2)]
        }
        if(al=="X"){
          al=arrxx[Math.floor(Math.random()*2)]
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
        if(al=="\n"){
          al="<br>"
        }
        all += al; 
        alll = all;
function bracketfun() {
   while(n<(i/7)){
        n++
        gth=gth+"!"  
        if (n%3==0 && n!=(Math.floor(i/7)+1)) {
          gth=gth+" ";
        } 
        } 
        alll = "["+ all +" " +gth +"]";  
        n=0;
        gth="";
}
        if (bracket.checked) {
          bracketfun()
        }
        if (front.checked) {
        bracketfun()
        while(m<5){
          m++
          hashid = hashid + arral[Math.floor(Math.random()*62)]
        }
        alll="[" + hashid +"]" +alll;  
        hashid="";
        m=0;
        }
        else{
          alll=alll;
        }
        psshow.innerHTML = alll;
      }
}

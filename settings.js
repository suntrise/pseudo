var lang = 0;
var ver = "v6.0h"
//默认语言设置
check()
function check(){
  if (navigator.language == "zh-CN") {
  setzh()
  }
    else if (navigator.language != "zh-CN") {
  seten()
  }
}

function setzh() {
  zh.style.color = "#fff";
  zh.style.background = "#07d";
  zh.innerHTML = "中文"
  en.style.color = "#000";
  en.style.background = "#f5f5f5";
  en.innerHTML = "英文"
  resph="结果会显示在这里~"
  title.innerHTML = "伪本地化演示"
  title1.innerHTML = "伪本地化演示 "+ver +" By STR"
  bkhome.style.display = "block";
  hmtext.innerHTML = "← 回到主页"
  what.innerHTML = "什么是伪本地化？"
  uplog.innerHTML = "更新日志"
  pjhome.innerHTML = "项目主页"
  exever.innerHTML = "程序(EXE)版"
  pstype.placeholder = "在这里输入要翻译的内容~"
  psbtn.innerHTML = "翻译成伪语言"
  hisbtn.innerHTML = "历史记录"
  chrbtn.innerHTML = "字符库"
  opttxt.innerHTML = "选项："
  prstxt.innerHTML = "前后缀："
  prs0.innerHTML = "不添加前后缀"
  prs1.innerHTML = "[中括号+感叹号括起来（微软式伪本地化） !!!]"
  prs2.innerHTML = "[中括号+在语段后添加英文基数词（安卓式伪本地化） one two three]"
  prs3.innerHTML = "[中括号+在语段后添加阿拉伯数字 12345]"
  prs4.innerHTML = "自定义"
  cuset.innerHTML = "在语段后重复添加 "
  cusnt.innerHTML = "每隔多少个字符重复一次："
  hashtxt.innerHTML = "[Abc12]添加伪 Hash ID (资源标识符)(由一定位数的字母+数字所构成的字符串)"
  hashdit.innerHTML = "位数："
  dbvtxt.innerHTML = "元音重复书写次数："
  dbv1.innerHTML = "1（即双写）"
  nctxt.innerHTML = "将数字 1-9 用带圆圈的数字 ①-⑨ 代替。"
  clear.innerHTML = "清空";
  whattxt.innerHTML = "伪本地化（pseudo-localization，语言环境名称为 qps-ploc, qps-plocm, qps-ploca, en-XA, en-XB），是通过模拟本地化过程，以有效地调查在本地化中出现的问题（如字符无法正常显示，或因字符串过长而导致语段显示不完整等）。<br>在伪本地化过程中，英文字母会被替换为来自其他语言的重音符号和字符。（例如，字母 a 可以被 αäáàāāǎǎăăåå 中的任何一个替换。），还会添加分隔符等以增加字符串长度。<br>举例：“Windows Photo Gallery（Windows 照片库）”→“ [1iaT9][ Ẅĭпðøωś Þнôтŏ Ģάŀļєяÿ !!! !] ”<br>更多信息：<a href='https://docs.microsoft.com/zh-cn/globalization/methodology/pseudolocalization')' target='_blank'>https://docs.microsoft.com/zh-cn/globalization/methodology/pseudolocalization</a><br><a href='https://zhuanlan.zhihu.com/p/613293858' target='_blank'>https://zhuanlan.zhihu.com/p/613293858</a><br><br>该网页演示了伪本地化的一部分，即用不同的字符替换英文字母和添加分隔符。<br>更多功能将在之后更新，感谢大家的支持！"
  logtxt.innerHTML = "更新日志<h3>v6.0h</h3>修改界面为 MDL 样式<h3>v5.7h</h3>修改微软式伪本地化规则<h3>v5.6h</h3>新增字符库<h3>v2.2h</h3>新增安卓式伪本地化<h3>v5.5h</h3><ol><li>新增在语段后重复数字的伪本地化（如[test 123]）；</li><li>新增可自定义前后缀和语段后重复字段的伪本地化；</li><li>伪 Hash ID（资源标识符）支持自定义位数（3-10位）；</li><li>新增重复书写元音且能自定义重复次数；</li><li>新增将数字1-9翻译为①-⑨；</li><li>新增历史记录；</li></ol>"
}
function seten() {
  zh.style.color = "#000";
  zh.style.background = "#f5f5f5";
  zh.innerHTML = "Chinese"
  en.style.color = "#fff";
  en.style.background = "#07d";
  en.innerHTML = "English"
  resph="Translation Results"
  title.innerHTML = "Pseudo-Localization Translator Demo"
  title1.innerHTML = "Pseudo-Localization Translator Demo " +ver +" By STR"
  bkhome.style.display = "none";
  what.innerHTML = "What is pseudo-localization?"
  uplog.innerHTML = "Update log"
  pjhome.innerHTML = "Github"
  exever.innerHTML = "EXE Version"
  pstype.placeholder = "Type Here"
  psbtn.innerHTML = "Pseudo-Localize!"
  hisbtn.innerHTML = "History"
  chrbtn.innerHTML = "Character library"
  opttxt.innerHTML = "Options: "
  prstxt.innerHTML = "Prefix and suffix:"
  prs0.innerHTML = "Do not add prefix or suffix"
  prs1.innerHTML = "[Brackets + exclamation marks after the result (Microsoft style) !!!]"
  prs2.innerHTML = "[Brackets + English cardinal numbers after the result (Android Style) (e.g.: one two three)]"
  prs3.innerHTML = "[Brackets + add digits after the result (e.g.: 12345)]"
  prs4.innerHTML = "Custom"
  cuset.innerHTML = "Text to add repeatedly after the result: "
  cusnt.innerHTML = "Repeat after: (Characters)"
  hashtxt.innerHTML = "[Abc12]Add a pseudo Hash ID (Resource Identifier) (a string of letters + numbers with a certain number of digits)"
  hashdit.innerHTML = "Number of digits: "
  dbvtxt.innerHTML = "Vowel repeated times: "
  dbv1.innerHTML = "1 (Doubled vowels)"
  nctxt.innerHTML = "Replace digits 1-9 with circled digits ①-⑨"
  clear.innerHTML = "Clear"
  whattxt.innerHTML = "Pseudolocalization (or qps-ploc, qps-plocm, qps-ploca, en-XA, en-XB) is a way to simulate the localization process. By doing so, the localization team will be able to effectively investigate issues that might occur during localization process (incorrect display of characters due to string length, etc.)<br>During pseudo-localization, English letters are replaced with accents and characters from other scripts. (For example, the letter a is replaced by any one of αäáàāāǎǎăăåå selected at random. ), separators etc. are also added to increase the string length.<br>For Example：“Windows Photo Gallery” → “ [1iaT9][ Ẅĭпðøωś Þнôтŏ Ģάŀļєяÿ !!! !] ”<br>More information: <a href='https://docs.microsoft.com/en-us/globalization/methodology/pseudolocalization' target='_blank'>https://docs.microsoft.com/en-us/globalization/methodology/pseudolocalization</a><br><br>More features are on the way. Thanks for your support!"
  logtxt.innerHTML = "";
}

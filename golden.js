/*watergold xiao 1.0*/

define(function(){
		/*1.设置cookie方法*/
		function setCookie(name, value, seconds) {
			seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。  
			var expires = "";
			if (seconds != 0) { //设置cookie生存时间
				var date = new Date();
				date.setTime(date.getTime() + (seconds * 1000));
				expires = "; expires=" + date.toGMTString();
			}
			document.cookie = name + "=" + escape(value) + expires + "; path=/"; //转码并赋值
		};

		/*2.获取cookie方法*/
		function getCookie(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';'); //把cookie分割成组    
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i]; //取得字符串    
				while (c.charAt(0) == ' ') { //判断一下字符串有没有前导空格    
					c = c.substring(1, c.length); //有的话，从第二位开始取    
				}
				if (c.indexOf(nameEQ) == 0) { //如果含有我们要的name    
					return unescape(c.substring(nameEQ.length, c.length)); //解码并截取我们要值    
				}
			}
			return false;
		};
		console.log("获取cookie方法");

		/*3.清除所有Cookie*/
		function clearCookie() { 
			var cookies = document.cookie.split(";");
			var len = cookies.length;
			for (var i = 0; i < len; i++) {
				var cookie = cookies[i];
				var eqPos = cookie.indexOf("=");
				var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
				name = name.replace(/^\s*|\s*$/, "");
				document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
			}
		}
		console.log("清除所有Cookie方法");

		/*4.8进制加密*/
		function EnEight(charStr) {
			var monyer = new Array();
			for (var i = 0; i < charStr.length; i++) {
				monyer += "\\" + charStr.charCodeAt(i).toString(8);
			}
			return monyer;
		}
		console.log("8进制加密"+EnEight("123阿萨德asd"));

		/*5.8进制解密*/
		function DeEight(charStr) {
			var monyer = new Array();
			var i;
			var s = charStr.split("\\");
			for (i = 1; i < s.length; i++)
				monyer += String.fromCharCode(parseInt(s[i], 8));
			return monyer;
		}
		console.log("8进制解密"+DeEight(" \\61\\62\\63\\113077\\102050\\57667\\141\\163\\144 "));

		/*
		 * 日期差
		 * day1：日期（字符串：2015/01/06）
		 * day1：日期（字符串：2015/01/06）
		 * 6.返回相差天数
		 */
		function dateDiff(day1, day2) {
			if (typeof(day1) == "string") {
				day1 = new Date(day1.replace(/-/g,"/"));
			}
			if (typeof(day2) == "string") {
				day2 = new Date(day2.replace(/-/g,"/"));
			}

			var minsec = Date.parse(day1) - Date.parse(day2);
			var days = minsec / 1000 / 60 / 60 / 24;
			return days;
		}
		console.log("2016-10-10到2015-10-10 相差"+dateDiff("2016-10-10","2015-10-10"));

		/*
		 *日期天数加减计算
		 * type:计算为加/减  （1——加； 2——减）
		 * day：需要计算的日期（字符串：2015/01/06）
		 * num：天数 (数字)
		 * 7.返回计算后最新时间
		 */
		function dateABAP(type, day, num) {
			if (typeof(day) == "string") {
				day = new Date(day);
			}
			var newDate;
			if (type == 1) {
				newDate = day.valueOf() + num * 24 * 60 * 60 * 1000
			} else {
				newDate = day.valueOf() - num * 24 * 60 * 60 * 1000
			}
			newDate = new Date(newDate);
			return newDate;
		}
		console.log("2016-10-14加10天是"+dateABAP(1,"2016-10-14",10));

		/*
		 * 8.日期转换为2位数格式的字符串
		 * dateTime：日期
		 */
		function dateFormat(dateTime) {
			if (typeof(dateTime) == "string") {
				dateTime = new Date(dateTime.replace(/-/g,'/'));
			}
			var strDate = "";
			if (!!dateTime) {
				var year = dateTime.getFullYear();
				var month = dateTime.getMonth() + 1;
				var day = dateTime.getDate();
				strDate = year + '-' + ((month > 9) ? month : '0' + month) + '-' + ((day > 9) ? day : '0' + day);
			}
			return strDate;
		}
		console.log("当前时间转换成字符串"+dateFormat(new Date()));

		/*
		 *9.根据年月返回当月最大天数
		 *year
		 *month
		 */
		function dateMonthMaxDay(year, month) {
			var day;
			if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
				day = "31";
			} else if (month == 4 || month == 6 || month == 9 || month == 11) {
				day = "30";
			} else if (month == 2) {
				if ((year % 400 == 0) || (year % 4 == 0) && (year % 100 != 0)) {
					day = "29"; //闰年
				} else {
					day = "28";
				}
			}
			return day;
		}
		console.log("2016年10月返回当月最大天数"+dateMonthMaxDay("2016","10"));

		//10.当月开始结束日期  例如： 2015-01-01 ~ 2015-01-31
		function nowMonthMinDayMaxDay(symbolChar) {
			var minDayMaxDay = {
				minDate: null,
				maxDate: null
			}
			if (!symbolChar) {
				symbolChar = "-";
			}
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth() + 1;
			var maxDay = dateMonthMaxDay(year, month);
			var yearMonth = year + symbolChar + ((String(month).length == 2) ? month : '0' + month);

			function dateMonthMaxDay(year, month) {
				var day;
				if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
					day = "31";
				} else if (month == 4 || month == 6 || month == 9 || month == 11) {
					day = "30";
				} else if (month == 2) {
					if ((year % 400 == 0) || (year % 4 == 0) && (year % 100 != 0)) {
						day = "29"; //闰年
					} else {
						day = "28";
					}
				}
				return day;
			}

			minDayMaxDay.minDate = yearMonth + symbolChar + '01';
			minDayMaxDay.maxDate = yearMonth + symbolChar + maxDay;
			return minDayMaxDay;
		}
		console.log("返回当月开始结束日期：");
		console.log(nowMonthMinDayMaxDay());

		//11.获取url地址栏参数
		function getQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null){
				return unescape(r[2]);
			}else{
				return null;
			}
		}
		console.log("返回url地址栏参数："+getQueryString("function"));

		/*12.随机a-b之间的数*/
		function randomM(a,b){
			var c=arguments[1]||0;
			return Math.floor(Math.random()*(a-b)+1+c);
		}
		console.log("返回0到10之间的随机数"+randomM(0,10));

		/*13.截取指定长度字符*/
		function cutstr(str, len) {
			var temp;
			var icount = 0;
			var patrn = /[^\x00-\xff]/;
			var strre = "";
			for (var i = 0; i < str.length; i++) {
			    if (icount < len - 1) {
			        temp = str.substr(i, 1);
			        if (patrn.exec(temp) == null) {
			            icount = icount + 1
			        } else {
			            icount = icount + 2
			        }
			        strre += temp
			    } else {
			        break
			    }
			}
			return strre + "...";
		}
		console.log("返回指定长度的字符"+cutstr("123456789",3));

		/*14.是否为数字类型*/
		function isDigit(value) {
			var patrn = /^[0-9]*$/;
			if (patrn.exec(value) == null || value == "") {
				return false;
			} else {
				return true;
			}
		}
		console.log("返回是否是数字类型"+isDigit("123"));

		/*15.加入收藏夹*/
		function AddFavorite(sURL, sTitle) {
			try {
				window.external.addFavorite(sURL, sTitle);
			} catch(e) {
				try {
					window.sidebar.addPanel(sTitle, sURL, "");
				} catch(e) {
					alert("加入收藏失败，请使用Ctrl+D进行添加");
				}
			}
		}
		//console.log("加入收藏夹功能"+AddFavorite("http://www.73111222.com", "肖申"));

		/*16.设为首页*/
		function setHomepage() {
		    if (document.all) {
		        document.body.style.behavior = 'url(#default#homepage)';
		        document.body.setHomePage('http://www.73111222.com');
		    } else if (window.sidebar) {
		        if (window.netscape) {
		            try {
		                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
		            } catch(e) {
		                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true")
		            }
		        }
		        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
		        prefs.setCharPref('肖申', 'http://www.73111222.com')
		    }
		}
		//console.log("设为首页"+setHomepage());

		/*17.insertAfter方法实现*/
		function insertAfter(newChild,refChild){
			var parElem=refChild.parentNode;
			if(parElem.lastChild==refChild){
				refChild.appendChild(newChild);
			}else{
				parElem.insertBefore(newChild,refChild.nextSibling);
			}
		}
		console.log("insertAfter方法实现"+"insertAfter()");

		/*18.兼容浏览器绑定元素事件*/
		function addEventSamp(obj,evt,fn){
			if (obj.addEventListener) {
				obj.addEventListener(evt, fn, false);
			}else if(obj.attachEvent){
				obj.attachEvent('on'+evt,fn);
			}
		}
		console.log("兼容浏览器绑定元素事件addEventSamp(obj,evt,fn)");

		/*19.IP地址转成整型*/
		function ipToint(ip){
			var num = 0;
			ip = ip.split(".");
			num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
			num = num >>> 0;
			return num;
		}
		console.log("IP地址转成整型"+ipToint("192.168.0.1"));

		/*20.整型转为IP地址*/
		function intToiP(num){
			var str;
			var tt = new Array();
			tt[0] = (num >>> 24) >>> 0;
			tt[1] = ((num << 8) >>> 24) >>> 0;
			tt[2] = (num << 16) >>> 24;
			tt[3] = (num << 24) >>> 24;
			str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
			return str;
		}
		console.log("整型转为IP地址"+intToiP(123456789));

		/*21.checkbox全选与全不选*/
		function checkAll(ID,CLASS) {
			var selectall = document.getElementById(ID);
			var allbox = document.getElementsByClassName(CLASS);
			if (selectall.checked) {
				for (var i = 0; i < allbox.length; i++) {
					allbox[i].checked = true;
				}
			} else {
				for (var i = 0; i < allbox.length; i++) {
					allbox[i].checked = false;
				}
			}
		}
		/*
		var all = document.getElementById("all");
		addEventSamp(all,"click",function(){checkAll("all","check");console.log(document.getElementsByClassName("check")[0].checked);});
		*/
		console.log("checkbox全选功能checkAll(ID,CLASS)");
		
		/*22.判断是否移动设备访问*/
		function isMobileUserAgent(){
			return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
		}
		console.log("判断是否移动设备访问"+isMobileUserAgent());

		/*23.判断是否为网址*/
		function IsURL(strUrl) {
		    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
		    if (regular.test(strUrl)) {
		        return true;
		    }
		    else {
		        return false;
		    }
		}
		console.log("判断是否为网址"+IsURL("73111222.com"));

		/*24.返回顶部*/
		function toTop(){
			var rTop = setInterval(function(){
				var bdScroll = document.documentElement.scrollTop || document.body.scrollTop;
				var bs = Math.floor(-bdScroll / 3);
				document.documentElement.scrollTop = document.body.scrollTop = bdScroll + bs;
				if (bdScroll <= 0) {
					clearInterval(rTop);
				}
			},100);
		}
		console.log("返回顶部toTop()");

		/*25.获得URL中GET参数值*/
		function get_get(){
			var querystr = window.location.href.split("?")
			if(querystr[1]){
				var GETs = querystr[1].split("&");
				var GET =new Array()
				for(i=0;i<GETs.length;i++){
					tmp_arr = GETs[i].split("=");
					key=tmp_arr[0];
					GET[key] = tmp_arr[1];
				}
			}
			return querystr[1];
		}
		console.log("获得URL中GET参数值"+get_get());

		/*26.是否有列表中的危险字符*/
		function isValidReg(chars){
			var re=/<|>|\[|\]|\{|\}|『|』|※|○|●|◎|§|△|▲|☆|★|◇|◆|□|▼|㊣|﹋|⊕|⊙|〒|ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|ㄙ|ㄚ|ㄛ|ㄜ|ㄝ|ㄞ|ㄟ|ㄢ|ㄣ|ㄤ|ㄥ|ㄦ|ㄧ|ㄨ|ㄩ|■|▄|▆|\*|@|#|\^|\\/;
			if (re.test( chars) == true) {
				return false;
			}else{
				return true;
			}
		}
		console.log("是否有列表中的危险字符"+isValidReg("a"));

		/*27.判断字符串是否为整数*/
		function isNumber( chars ) {
			var re=/^\d*$/;
			if (chars.match(re) == null){
				return false;
			}else{
				return true;
			}
		}
		console.log("判断字符串是否为整数"+isNumber("123"));

		/*28.金额大写转换*/
		function transform(tranvalue) {
			//拆分整数与小数
			function splits(tranvalue) {
				var value = new Array('', '');
				var temp = tranvalue.split(".");
				for (var i = 0; i < temp.length; i++) {
					value[i] = temp[i];
				}
				return value;
			}

			try {
				var i = 1;
				var dw2 = new Array("", "万", "亿"); //大单位
				var dw1 = new Array("拾", "佰", "仟"); //小单位
				var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用
				//以下是小写转换成大写显示在合计大写的文本框中
				//分离整数与小数
				var source = splits(tranvalue);
				var num = source[0];
				var dig = source[1];
				//转换整数部分
				var k1 = 0; //计小单位
				var k2 = 0; //计大单位
				var sum = 0;
				var str = "";
				var len = source[0].length; //整数的长度
				for (i = 1; i <= len; i++) {
					var n = source[0].charAt(len - i); //取得某个位数上的数字
					var bn = 0;
					if (len - i - 1 >= 0) {
						bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
					}
					sum = sum + Number(n);
					if (sum != 0) {
						str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
						if (n == '0') sum = 0;
					}
					if (len - i - 1 >= 0) { //在数字范围内
						if (k1 != 3) { //加小单位
							if (bn != 0) {
								str = dw1[k1].concat(str);
							}
							k1++;
						} else { //不加小单位，加大单位
							k1 = 0;
							var temp = str.charAt(0);
							if (temp == "万" || temp == "亿"){ //若大单位前没有数字则舍去大单位
								str = str.substr(1, str.length - 1);
								str = dw2[k2].concat(str);
								sum = 0;
							}
						}
					}
					if (k1 == 3){ //小单位到千则大单位进一
						k2++;
					}
				}
				//转换小数部分
				var strdig = "";
				if (dig != "") {
					var n = dig.charAt(0);
					if (n != 0) {
					strdig += dw[Number(n)] + "角"; //加数字
				}
				var n = dig.charAt(1);
				if (n != 0) {
					strdig += dw[Number(n)] + "分"; //加数字
				}
				}
				str += "元" + strdig;
			} catch(e) {
				return "0元";
			}
			return str;
		}		
		console.log("金额大写转换："+transform("1215.12"));

		//29.判断输入的字符是否为中文 
		function IsChinese(str){ 
			if(str.length!=0){ 
				reg=/^[\u0391-\uFFE5]+$/; 
				if(!reg.test(str)){ 
					return "no"; 
				} 
			}
			return "yes"; 
		}
		console.log("判断输入的字符是否为中文"+IsChinese("啊"));

		//30.浮点数精确运算(加法) 
		function accAdd(arg1,arg2){ 
			var r1,r2,m,n; 
			try{
				r1=arg1.toString().split(".")[1].length;
			}catch(e){
				r1=0;
			} 
			try{
				r2=arg2.toString().split(".")[1].length
			}catch(e){
				r2=0
			} 
			m=Math.pow(10,Math.max(r1,r2)); 
			n=(r1>=r2)?r1:r2;
			return ((arg1*m+arg2*m)/m).toFixed(n); 
		}
		console.log("浮点数精确运算(加法)"+accAdd(0.1,0.2));

		//31.浮点数精确运算(减法) 
		function accSub(arg1,arg2){ 
			var r1,r2,m,n; 
			try{
				r1=arg1.toString().split(".")[1].length;
			}catch(e){
				r1=0;
			} 
			try{
				r2=arg2.toString().split(".")[1].length
			}catch(e){
				r2=0
			} 
			m=Math.pow(10,Math.max(r1,r2)); 
			n=(r1>=r2)?r1:r2;
			return ((arg1*m-arg2*m)/m).toFixed(n); 
		}
		console.log("浮点数精确运算(减法)"+accSub(0.1,0.2));

		//32.浮点数精确运算(乘法) 
		function accMul(arg1,arg2){ 
			var m=0,
				s1=arg1.toString(),
				s2=arg2.toString(); 
			try{
				m+=s1.split(".")[1].length;
			}catch(e){

			} 
			try{
				m+=s2.split(".")[1].length;
			}catch(e){	

			} 
			return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
		}
		console.log("浮点数精确运算(乘法)"+accMul(0.1,0.2));

		//33.浮点数精确运算(除法) 
		function accDiv(arg1,arg2){ 
			var t1=0,t2=0,r1,r2; 
			try{
				t1=arg1.toString().split(".")[1].length
			}catch(e){

			} 
			try{
				t2=arg2.toString().split(".")[1].length
			}catch(e){

			} 
			with(Math){ 
				r1=Number(arg1.toString().replace(".",""))
				r2=Number(arg2.toString().replace(".","")) 
				return (r1/r2)*pow(10,t2-t1); 
			} 
		}

		//34.获取移动设备类型
		function getDevType() {
			var getUa = navigator.userAgent.toLowerCase();
			var devType = 'android';
			if (getUa.match(/(iphone|ipad|ipod)/i)) {
				devType = 'ios';
			} else {
				devType = 'android';
			}
			return devType;
		}

		//35.刷新页面功能
		function refresh() {
		    window.location.reload();
		}

		//36.判断是否是微信浏览
		function isWeixin() {
		    var ua = navigator.userAgent.toLowerCase();
		    if (ua.match(/MicroMessenger/i) == "micromessenger") {
		        return true;
		    } else {
		        return false;
		    }
		}

		//37.检查是否是手机
		function checkMobile(){  
			var isiPad = navigator.userAgent.match(/iPad/i) != null;  
			if(isiPad){  
				return false;  
			}
			var isMobile=navigator.userAgent.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i)!= null;  
			if(isMobile){  
				return true;  
			}else{
				return false;
			}
		}

		//38.拖拽函数，传入参数第一个参数为父级元素的 ID，如果要全屏移动可以直接选择传入body，第二个参数是要拖动的元素的 ID
		function Drag(parent,div){
			this.parent = arguments[0] == "body" ? document.documentElement||document.body : document.getElementById(parent);
			this.div = document.getElementById(div);
			this.init();
		}
		Drag.prototype = {
			init:function(){
				this.parent.style.position = "relative";
				this.div.style.position = "absolute";
				this.move();
			},
			move:function(){
				var self = this;
				this.div.onmousedown = function(eve){
					var eve = eve || window.event;
					var a = eve.clientX - self.div.offsetLeft;
					var b = eve.clientY - self.div.offsetTop;

					document.onmousemove = function(e){
						var e = e || window.event;
						var x = e.clientX - a;
						var y = e.clientY - b;

						if(x < 0){
							x = 0;
						}else if(x > self.parent.clientWidth - self.div.offsetWidth){
							x = self.parent.clientWidth - self.div.offsetWidth;
						}

						if(y < 0){
							y = 0;
						}else if(y > self.parent.clientHeight - self.div.offsetHeight){
							y = self.parent.clientHeight - self.div.offsetHeight;
						}

						self.div.style.left = x + "px";
						self.div.style.top = y + "px";					
					};
				};

				document.onmouseup = function(){
					document.onmousemove = null;
				};
			}
		};

		//39.获取非行间样式
		function getStyle(obj, attr){
		    if(obj.currentStyle){
		        return obj.currentStyle[attr];
		    }
		    else{
		        return getComputedStyle(obj, false)[attr];
		    }
		}

		//40.原生运动函数 第一个参数是对象 	第二个参数是json格式的属性键值对 第三个参数是回调函数
		function moveT(obj,json,fn){
		    var flag = true;
		    clearInterval(obj.timer);
		    obj.timer = setInterval(function(){
		        for(var attr in json){
		            var icur = 0;
		            if(attr == "opacity"){
		                icur = Math.round(parseFloat(getStyle(obj,attr)) * 100);
		            }else{
		                icur = parseInt(getStyle(obj,attr));
		            }
		            var speed = (json[attr] - icur) / 10;
		            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		            if(icur != json[attr]){
		                flag = false;
		            }else{
		                flag = true;
		            }
		            if(attr == "opacity"){
		                obj.style.filter = "alpha(opacity:" + icur + speed +")";
		                obj.style.opacity = (icur + speed)/100; 
		            }else{
		                obj.style[attr] = icur + speed + 'px';
		            }
		        }            
		        if(flag){
		            clearInterval(obj.timer);
		            if(fn){
		                fn();
		            }
		        }
		    },20);
		}

		//41.第一个随机颜色函数
		function randomColor1(){
			return "#" + Math.random().toString(16).slice(2,8);
		}

		//42.第二个随机颜色函数
		function randomColor2(){
			var color = "#";
			var randomColor = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
			var len=6;
			for(var i=0;i<len;i++){
				color += randomColor[parseInt(Math.random()*randomColor.length)];
			}
			return color;
		}

		//43.使元素上下或左右摆动 attr是left或者top
		function shake(obj,attr){
			if (obj.onoff) {return};//加开关修复抖函数
			obj.onoff=true;
			obj.style.position = "relative";
			var arr = [];
			var num = 0;
			var k=null;
			for(var i=20;i>0;i-=2){
				arr.push(i,-i);
			}
			arr.push(0);
			clearInterval(shake.timer)
			shake.timer=setInterval(function(){
				obj.style[attr]= arr[num]+"px";
				num++;
				if (num==arr.length){
					clearInterval(shake.timer)
					obj.onoff = false;
				}
			},100);
		}

		//44.输入当前日期的前多少天，返回那一天的年月日
		function intervalDate(day){
	        var dat = new Date(new Date().getTime() - (86400000*day));
	        var year = dat.getFullYear();
	        var month = dat.getMonth()+1;
	        var date = dat.getDate();
	        if(month < 10){
	            month = "0" + month;
	        }
	        if(date < 10){
	            date = "0" + date;
	        }
	        return year + '-' + month + '-' + date;
	    }


		return {
			setCookie:setCookie,
			getCookie:getCookie,
			clearCookie:clearCookie,
			EnEight:EnEight,
			DeEight:DeEight,
			dateDiff:dateDiff,
			dateABAP:dateABAP,
			dateFormat:dateFormat,
			dateMonthMaxDay:dateMonthMaxDay,
			nowMonthMinDayMaxDay:nowMonthMinDayMaxDay,
			getQueryString:getQueryString,
			randomM:randomM,
			cutstr:cutstr,
			isDigit:isDigit,
			AddFavorite:AddFavorite,
			setHomepage:setHomepage,
			insertAfter:insertAfter,
			addEventSamp:addEventSamp,
			ipToint:ipToint,
			intToiP:intToiP,
			checkAll:checkAll,
			isMobileUserAgent:isMobileUserAgent,
			IsURL:IsURL,
			toTop:toTop,
			get_get:get_get,
			isValidReg:isValidReg,
			isNumber:isNumber,
			transform:transform,
			IsChinese:IsChinese,
			accAdd:accAdd,
			accSub:accSub,
			accMul:accMul,
			accDiv:accDiv,
			getDevType:getDevType,
			refresh:refresh,
			isWeixin:isWeixin,
			checkMobile:checkMobile,
			Drag:Drag,
			getStyle:getStyle,
			moveT:moveT,
			randomColor1:randomColor1,
			randomColor2:randomColor2,
			shake:shake,
			intervalDate:intervalDate
		}
})
/****************遮罩插件***************/
/*
第一个参数是触发的标签id
第二个参数是关闭的标签class
第三个参数是要现实的内容可以用字符串拼接然后自己编辑样式，父级的大小是400*300
第四个参数是需要触发的事件
*/

define(function(){

	var Prompt = function (openId,closeClass,showcontent,event){
		this.open = document.getElementById(openId);//需要触发事件的对象
		this.doc = document.body || document.documentElement;
		this.showcontent = showcontent;//显示由自己编辑样式和内容
		this.mask;//遮罩层
		this.interact;//显示交互层

		var _this = this;
		this.open.addEventListener(event,function(){
			_this.init();
		},false);

		this.init = function(){
			this.show();
			this.hide();
			this.resizing();
			this.scrolling();
			console.log(this.doc.clientHeight);
		};
		/*触发事件时显示*/
		this.show = function(){
			this.mask = document.createElement("div");
			this.interact = document.createElement("div");

			this.mask.id = "mask";
			this.mask.style.backgroundColor = "#000";
			this.mask.style.opacity = "0.5";
			this.mask.style.width = this.doc.clientWidth + "px";
			this.mask.style.height = this.doc.clientHeight + 10 + "px";
			this.mask.style.position = "absolute";
			this.mask.style.top = "0";
			this.mask.style.left = "0";
			this.mask.style.zIndex = 100000;

			this.interact.id = "tip";
			this.interact.innerHTML = this.showcontent;
			this.interact.style.cursor = "crosshair";
			this.interact.style.position = "fixed";
			this.interact.style.width = "400px";
			this.interact.style.height = "300px";
			this.interact.style.top = "50%";
			this.interact.style.left = "50%";
			this.interact.style.marginLeft = -200 + "px";
			this.interact.style.marginTop = -150 + "px";
			this.interact.style.zIndex = 100001;

			this.doc.appendChild(this.mask);
			this.doc.appendChild(this.interact);
		};
		/*点击时关闭*/
		this.hide = function(){
			var a = document.getElementsByClassName(closeClass);
			var b = document.getElementById("mask");
			var c = document.getElementById("tip");

			for(var i = 0; i < a.length; i++){
				a[i].addEventListener("click",function(){
					_this.doc.removeChild(b);
					_this.doc.removeChild(c);
				},false);
			}
		};
		/*调整窗口大小*/
		this.resizing = function(){
			window.addEventListener("resize",function(){
				_this.mask.style.width = _this.doc.clientWidth + "px";
			 	_this.mask.style.height = _this.doc.clientHeight + 10 + "px";
			});
		};
		/*滚动窗口时*/
		this.scrolling = function(){
			window.addEventListener("scroll",function(){
				var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
			});
		};
	}

	return {
		Prompt:Prompt
	}
})
/***************翻页插件*******************/
//第一个参数是要展示内容的区域的ID
//第二个参数是数据，传递形式最好是json的数组格式，要展现的地方this.show可以再自己写
define(function(){


	function Pagination(id,data){
		/*要显示内容区域的ID*/
		this.id = document.getElementById(id);
		/*要显示具体数据的DIV*/
		this.cDiv = this.id.getElementsByTagName("div");
		/*显示具体数据DIV的个数*/
		this.cDivLength = this.cDiv.length;
		/*接受来的数据*/
		this.data = data;
		/*一页要展示的内容的个数*/
		this.count = this.cDivLength;
		/*数据的个数，后面的data数据根据传递的不同更改*/
		//this.length = this.data.data.length;
		this.length = this.count != null ? Math.ceil(this.data.length / this.count) : 1;
		/*当前active在哪个LI下面对应的INDEX*/
		this.index;

		this.create();
		this.style();
		this.event();

		/*先获取一下active在哪个LI下*/
		this.which();

		/*最开始显示的数据内容*/
		this.show(1);
	}

	Pagination.prototype = {
		/*根据个数创建翻页区域*/
		create:function(){
			/*创建DIV*/
			this.div = document.createElement("div");
			/*创建UL*/
			this.ul = document.createElement("ul");
			/*创建第一个LI*/
			this.li = document.createElement("li");
			/*LI的内容，可以更改*/
			this.li.innerHTML = "←";
			/*把第一个LI放入UL*/
			this.ul.appendChild(this.li);

			/*创建片段 防止回流*/
			this.frag = document.createDocumentFragment();
			for(var i = 0; i < this.length; i++){
				this.li = document.createElement("li");
				this.li.innerHTML = i + 1;
				this.frag.appendChild(this.li);
			}
			this.ul.appendChild(this.frag);

			/*创建最后一个LI*/
			this.li = document.createElement("li");
			this.li.innerHTML = "→";
			/*把最后一个LI放入UL*/
			this.ul.appendChild(this.li);

			/*把整个UL放入DIV内*/
			this.div.appendChild(this.ul);
			document.body.appendChild(this.div);

			/*
			if(this.length > 6){
				var span = document.createElement("span");
				span.innerHTML = "…";
				this.ul.insertBefore(span,this.li);
			}
			*/
		},
		/*样式*/
		style:function(){
			/*DIV的样式*/
			this.div.style.width = "750px";
			this.div.style.height = "50px";
			this.div.style.backgroundColor = "";
			this.div.style.position = "relative";
			this.div.style.left = "50%";
			this.div.style.top = "0px";
			this.div.style.marginLeft = "-375px";
			this.div.style.webkitUserSelect = "none";
			this.div.style.mozUserSelect = "none";
			this.div.style.msUserSelect = "none";
			this.div.style.userSelect = "none";

			/*UL的样式*/
			this.ul = this.div.getElementsByTagName("ul")[0];
			this.ul.style.listStyle = "none";
			this.ul.style.padding = "0";
			this.ul.style.margin = "0 auto";
			this.ul.style.textAlign = "center";

			/*LI的样式*/
			this.li = this.ul.getElementsByTagName("li");
			for(var i = 0; i < this.li.length; i++){
				this.li[i].style.display = "inline-block";
				this.li[i].style.listStyle = "none";
				this.li[i].style.width = "40px";
				this.li[i].style.height = "40px";
				this.li[i].style.lineHeight = "40px";
				this.li[i].style.padding = "0px";
				this.li[i].style.margin = "5px 0 0 5px";
				this.li[i].style.border = "1px solid #333";
				this.li[i].style.cursor = "pointer";
			}
		},
		/*事件*/
		event:function(){
			var _this = this;
			/*遍历每个LI*/
			for(var j = 1; j <= this.length; j++){
				/*给每个LI加上INDEX 为了后面能确认active在哪个下面*/
				this.li[j].index = j;

				/*给每个LI加上事件*/
				this.li[j].addEventListener("click",function(){
					/*重新格式化每个LI的样式*/
					_this.init();
					/*点击每一格LI就传递每个的INDEX去展示数据*/
					_this.show(this.index);

					/*改变当前LI的样式和其它LI的样式*/
					this.style.backgroundColor = "#333";
					this.style.color = "#fff";
					this.className = "active";
				},false);

				/*最开始的active位置*/
				this.li[1].style.backgroundColor = "#333";
				this.li[1].style.color = "#fff";
				this.li[1].className = "active";
			}

			/*前一页*/
			this.li[0].addEventListener("click",function(){
				/*获取当前active在哪个LI下面 并存入一个变量*/
				var tIndex = _this.which();
				/*如果active在第二个LI下面时就返回*/
				if(_this.which() <= 1){
					return;
				}else{
					/*正常情况下就重新初始化LI*/
					_this.init();
					/*正常情况下就把当前的前一个加上样式*/
					_this.li[tIndex - 1].style.backgroundColor = "#333";
					_this.li[tIndex - 1].style.color = "#fff";
					_this.li[tIndex - 1].className = "active";

					/*并展示数据*/
					_this.show(tIndex - 1);
				}
			},false);

			/*后一页*/
			this.li[this.length + 1].addEventListener("click",function(){
				/*获取当前active在哪个LI下面 并存入一个变量*/
				var dIndex = _this.which();
				/*如果active在倒数第二个LI下面时就返回*/
				if(dIndex >= _this.length){
					return;
				}else{
					/*正常情况下就重新初始化LI*/
					_this.init();
					/*正常情况下就把当前的后一个加上样式*/
					_this.li[dIndex + 1].style.backgroundColor = "#333";
					_this.li[dIndex + 1].style.color = "#fff";
					_this.li[dIndex + 1].className = "active";

					/*并展示数据*/
					_this.show(dIndex + 1);
				}
			},false);
		},
		/*确认当前的active在哪个LI下面*/
		which:function(){
			for (var l = 0; l <= this.length; l++) {
				if(this.li[l].className == "active"){
					this.index = this.li[l].index;
				}
			}
			return this.index;
		},
		/*每次都初始化一下li的样式*/
		init:function(){
			var _this = this;
			/*把所有的LI的样式都清除*/
			for(var k = 1; k <= _this.length; k++){
				_this.li[k].style.backgroundColor = "";
				_this.li[k].style.color = "#333";
				_this.li[k].className = "";
			}
		},
		/*展示数据*/
		show:function(index){
			var _this = this;
			if(this.count != null){

				/*清空原来div的内容*/
				for(var o = 0; o < this.count; o++){
					this.id.getElementsByTagName("div")[o].innerHTML = "";
				}

				/*让翻页后实际没有数据也不会报错*/
				try{
					/*把数据的每个属性存入一个数组*/
					var y = [];
					for(var p in this.data[0]){
						y.push(p);
					}
					
					for(var n = 0; n < this.count; n++){
						//var x = "";
						/*x += this.data[((index - 1) * this.count ) + n].title + "-----";
						x += this.data[((index - 1) * this.count ) + n].recommend_image + "-----";
						x += this.data[((index - 1) * this.count ) + n].video + "-----";
						x += '<img src="' + this.data[((index - 1) * this.count ) + n].avatar + '" alt="123" />';*/

						var x = "";
						for(var q = 0; q < y.length; q++){
							x += y[q] + ":" + this.data[((index - 1) * this.count ) + n][y[q]] + ";";
						}

						x += '<img src="' + this.data[((index - 1) * this.count ) + n].avatar + '" alt="123" />';
						x += "<hr>";

						this.id.getElementsByTagName("div")[n].innerHTML = x;
					}
				}catch(e){
					console.log("超出边界！");
				}

			}else{
				this.id.getElementsByTagName("div")[0].innerHTML = "数据加载中...";
			}
		}
	};

	return {
		Pagination:Pagination
	}


})

/**************** BANNER 轮播图插件 ****************/
var Banner = function (id,params) {
	this.setting = typeof params === 'object' ? params : {};
	this.count  = this.setting.count == null ? true : this.setting.count;
	this.autoP  = this.setting.autoP == null ? true : this.setting.autoP;
	this.pause  = this.setting.pause == null ? true : this.setting.pause;
	this.controls  = this.setting.controls || false;
	this.speed = this.setting.speed || 3000;
	this.type = this.setting.type || "upDown";
	this.sEvent = this.setting.sEvent || "mouseover";
	this.AnimationSpeed = this.setting.AnimationSpeed || 20;
    
    this.init(id);
};

Banner.prototype = {
	init: function (id)
	{
		//this.oBox = getId(id);
		this.oBox = document.getElementById(id);
		//this.oUl = getTag("ul", this.oBox)[0];
		this.oUl = this.oBox.getElementsByTagName("ul")[0];
		//this.oLi = getTag("li", this.oUl);
		this.oLi = this.oUl.getElementsByTagName("li");
		//this.aImg = getTag("img", this.oBox);
		this.aImg = this.oBox.getElementsByTagName("img");
		this.timer = null;
		this.autoTimer = null;
		this.iNow = 0;
        
        if(this.oLi.length>0) {
	        this.count && this.creatBtn();		
			this.controls && this.creatBtn2();						
			this.toggle();
			this.autoP && this.autoPlay();
		}		
	},
	//自动播放
	autoPlay: function()
	{
		var oThis = this;
		clearInterval(this.autoTimer);
        this.autoTimer = setInterval(function ()
		{
			oThis.next()
		}, this.speed);	
		if(this.pause)
		{
			this.oBox.onmouseover = function ()
			{
				clearInterval(oThis.autoTimer)
			};
			this.oBox.onmouseout = function ()
			{
				oThis.autoTimer = setInterval(function ()
				{
					oThis.next()
				}, oThis.speed)	
			};
		};	
	},
	//创建序号按钮
	creatBtn: function ()
	{   
		var oThis = this;
		this.oCount = document.createElement("ul");
		this.oFrag = document.createDocumentFragment();
		this.oCount.className = "dyj_count";
		for (var i = 0; i < this.oLi.length; i++)
		{
			var oLi2 = document.createElement("li");
			oLi2.innerHTML = i + 1;
			this.oFrag.appendChild(oLi2);
			oLi2.className = "li_" + i;
		}
		this.oCount.appendChild(this.oFrag);
		this.oBox.appendChild(this.oCount);
        //this.aBtn = getTag("li", this.oCount);
        this.aBtn =  this.oCount.getElementsByTagName("li");
        this.fnHandler = function()
		{   
			if(oThis.iNow == this.index){return}else{
				oThis.iNow = this.index;
				oThis.toggle();
				oThis.autoP && !oThis.pause && oThis.autoPlay();
		    }
		}
		for (var i = 0; i < this.aBtn.length; i++)
		{
			this.aBtn[i].index = i;
			//EventUtil.addHandler(this.aBtn[i],this.sEvent,this.fnHandler);
			this.aBtn[i].addEventListener(this.sEvent,this.fnHandler);	
		}
	},
	//创建左右控制按钮
	creatBtn2: function()
	{
		var oThis = this;
		this.oPrev = document.createElement("p");
		this.oNext = document.createElement("p");
		this.oPrev.className = "prev";
		this.oPrev.innerHTML = "&laquo;";
		this.oNext.className = "next";
		this.oNext.innerHTML = "&raquo;";
		this.oBox.appendChild(this.oPrev);
		this.oBox.appendChild(this.oNext);
		this.oNext.onclick = function ()
		{
			oThis.iNow+=1;
			oThis.iNow == oThis.oLi.length && (oThis.iNow = 0);
			oThis.toggle();
			oThis.autoP && !oThis.pause && oThis.autoPlay();	
		}
		this.oPrev.onclick = function ()
		{
			oThis.iNow-=1;
			oThis.iNow == -1 && (oThis.iNow = oThis.oLi.length-1);
			oThis.toggle();
			oThis.autoP && !oThis.pause && oThis.autoPlay();	
		}		
	},
	toggle: function ()
	{
		for (var i=0;i<this.oLi.length;i++) this.oLi[i].className = this.oLi[i].className.replace(/\s?active/,"");
		this.oLi[this.iNow].className += " active";
		if(this.count)
		{
			for (var i = 0; i < this.aBtn.length; i++) this.aBtn[i].className = this.aBtn[i].className.replace(/\s?current/,"");
		    this.aBtn[this.iNow].className += " current";
	    }	    
	    this.doMove(this.type)
	},
	next: function ()
	{	
		this.iNow++;
		this.iNow == this.oLi.length && (this.iNow = 0);
		this.toggle()
	},
	//创建动画
	doMove: function (d)
	{
		var oThis = this;
		var alpha = 0;
		clearInterval(oThis.timer);
        oThis.timer = setInterval(function () 
		{   
			var upDown = function()
			{
                var iTarget = -(oThis.iNow * oThis.oLi[0].offsetHeight);
				var iSpeed = (iTarget - oThis.oUl.offsetTop) / 5;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				oThis.oUl.offsetTop == iTarget ? clearInterval(oThis.timer) : (oThis.oUl.style.top = oThis.oUl.offsetTop + iSpeed + "px")
			};
			var leftRight = function ()
			{
				var iTarget = -(oThis.iNow * oThis.oLi[0].offsetWidth);
				var iSpeed = (iTarget - oThis.oUl.offsetLeft) / 5;
				oThis.oUl.style.width = oThis.oLi[0].offsetWidth * oThis.oLi.length + "px";
				for(var i=0;i<oThis.oLi.length;i++){oThis.oLi[i].style.float = "left"}
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				oThis.oUl.offsetLeft == iTarget ? clearInterval(oThis.timer) : (oThis.oUl.style.left = oThis.oUl.offsetLeft + iSpeed + "px")
			};
            var fadeInOut = function()
            {             	
            	for (var i=0;i<oThis.oLi.length;i++)
				{
					oThis.oLi[i].style.opacity = 0;
					oThis.oLi[i].style.filter = "alpha(opacity=0)";	
					oThis.oLi[i].style.position = "absolute";
				}
				alpha += 2;
				alpha > 100 && (alpha =100);
				oThis.oLi[oThis.iNow].style.opacity = alpha / 100;
				oThis.oLi[oThis.iNow].style.filter = "alpha(opacity = " + alpha + ")";
				alpha == 100 && clearInterval(oThis.timer)
            }

			switch(d)
		    {
	        case "upDown": 
	            upDown();
	            break;
	        case "leftRight": 
	            leftRight();
	            break;
	        case "fadeInOut": 
	            fadeInOut();
	            break;
	        }
		}, this.AnimationSpeed);	   
	}
	
};
// JavaScript Document
window.onload=function (){
	var oUl=document.getElementById('ul1');
	var aLi=oUl.getElementsByTagName('li');
	var aSpan=document.getElementsByTagName('span');
	for (var i=0; i<aLi.length; i++){
		enter(aLi[i]);
		leave(aLi[i]);	
	}
	function enter(obj){
		var oSpan=obj.getElementsByTagName('span')[0];
		var oImg=obj.getElementsByTagName('img')[0];
		obj.onmouseenter=function (ev){
			var oEvent=ev || event;
			var n=getN(obj, oEvent);
			move(oImg, {width:200,height:200,'margin-left':-10,'margin-top':-10});
			switch (n){
				case 0:
					oSpan.style.left='180px';
					oSpan.style.top=0;
					break;
				case 1:
					oSpan.style.left=0;
					oSpan.style.top='180px';
					break;
				case 2:
					oSpan.style.left='-180px';
					oSpan.style.top=0;
					break;
				case 3:
					oSpan.style.left=0;
					oSpan.style.top='-180px';
					break;	
			}
			move(oSpan,{'left':0,'top':0});	
		};
	}
	function leave(obj){
		var oSpan=obj.getElementsByTagName('span')[0];
		var oImg=obj.getElementsByTagName('img')[0];
		obj.onmouseleave=function (ev){
			var oEvent=ev || event;
			var n=getN(obj, oEvent);
			move(oImg, {width:180,height:180,'margin-left':0,'margin-top':0});
			switch (n){
				case 0:
					var left=180;
					var top=0;
					break;
				case 1:
					var left=0;
					var top=180;
					break;
				case 2:
					var left=-180;
					var top=0;
					break;
				case 3:
					var left=0;
					var top=-180;
					break;	
			}
			move(oSpan,{'left':left,'top':top});	
		};
	}
	
	function getN(obj,ev){
		var nScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var nScrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
		var a=getPos(obj).left+obj.offsetWidth/2-ev.clientX-nScrollLeft;
		var b=getPos(obj).top+obj.offsetHeight/2-ev.clientY-nScrollTop;
		return Math.round((Math.atan2(b,a)*180/(Math.PI)+180)/90)%4;
	}

	
	
	function getPos(obj){
		var left=0;
		var top=0;
		while (obj){
			left+=obj.offsetLeft;
			top+=obj.offsetTop;
			obj=obj.offsetParent;	
		}
		return {'left':left,'top':top};	
	}
	//nav部分
	;(function(){
		var oNav=document.getElementById('nav');
		var aLi=getByClass(oNav,'li1');
		var oActive=document.getElementById('active');
		var aPos=getByClass(document,'pos');
		
		for(var i=0;i<aLi.length;i++){					
			aLi[i].index=i;
			aLi[i].onclick=function(){
				for(var i=0;i<aLi.length;i++){
					aLi[i].className='li1';	
				}
				var _this=this;
				var timer=setTimeout(function(){
					_this.className='li1 show';
					},300);
				
				move(oActive,{left:this.offsetLeft},{duration:300});
				
				switch (this.index){
					case 0:
						var scrollTop=0;					
						break;
					case 1:
						var scrollTop=getPos(aPos[this.index],'top').top-80;	
						break;	
					case 2:
						var scrollTop=getPos(aPos[this.index],'top').top-80;	
						break;
				};
				
				var start=document.documentElement.scrollTop || document.body.scrollTop;
				var dis=scrollTop-start;
				var count=Math.floor(300/30);
				var n=0;
				var timer=null;
				clearInterval(timer);
				timer=setInterval(function (){
					n++;
					
					var cur=start+dis*n/count;
					document.body.scrollTop=cur;
					document.documentElement.scrollTop=cur;
					
					if (n == count)
					{
						clearInterval(timer);
					}
				}, 30);
			};
	  	};
	})();
	//时间
	var oTime=document.getElementById('time');
	time(oTime);
	
	//回到顶部
	;(function (){
		var oBtn=document.getElementById('top');
		var timer=null;
		var userScroll=false;
		var oHd=document.getElementById('hd');
		var aSkill=document.getElementById('skill').getElementsByTagName('div');
		
		window.onscroll=function (){
			var scrollH=document.documentElement.scrollTop || document.body.scrollTop;
			
			if (scrollH > 70){
				oHd.className='hd nav-fixed';	
			}
			else{
				oHd.className='hd';	
			}
			
			if (scrollH > 700){
				move(aSkill[0],{left:0,opacity:1},{duration:500,complete:function (){
					move(aSkill[1],{left:0,opacity:1},{duration:500,complete:function (){
						move(aSkill[2],{left:0,opacity:1},{duration:500,complete:function (){
							move(aSkill[3],{left:0,opacity:1},{duration:500,complete:function (){
								move(aSkill[4],{left:0,opacity:1},{duration:500,complete:function (){
									move(aSkill[5],{left:0,opacity:1},{duration:500});	
								}});	
							}});	
						}});	
					}});	
				}});
			}
				
			
			if (scrollH > 0){
				oBtn.style.display='block';
			}
			else if(scrollH == 0){
				oBtn.style.display='none';	
			}
			// 用户
			if (userScroll)
			{
				clearInterval(timer);
			}
			
			userScroll=true;
		};
		
		oBtn.onclick=function (){
			// start+dis*n/count
			var start=document.documentElement.scrollTop || document.body.scrollTop;
			var dis=0-start;
			var count=Math.floor(1000/30);
			var n=0;
			clearInterval(timer);
			timer=setInterval(function (){
				n++;
				userScroll=false;
				
				var cur=start+dis*n/count;
				document.body.scrollTop=cur;
				document.documentElement.scrollTop=cur;
				
				if (n == count)
				{
					clearInterval(timer);
				}
			}, 30);
		
		};	
	})();	
};


//getPos
function getPos(obj,sName){
	var left=0;
	var top=0;
	while(obj)
	{
		left+=obj.offsetLeft;
		top+=obj.offsetTop;
		obj=obj.offsetParent;	
	}
	return {left:left,top:top};
}
//getByClass
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var arr=[];		
		//var reg=/\bred\b/;
		var reg=new RegExp('\\b'+sClass+'\\b');		
		var aEle=oParent.getElementsByTagName('*');
		for(var i=0; i<aEle.length; i++){
			if(reg.test(aEle[i].className)){
				arr.push(aEle[i]);	
			}
		}
		return arr;
	}
};

//获取时间
function time(sName){
	;(function (sName){
	var aImg=sName.getElementsByTagName('img');
	
	setInterval(show,1000);
	show();
	function show(){
		var oDate=new Date();
		var y=oDate.getFullYear();
		var mon=oDate.getMonth()+1;
		var d=oDate.getDate();
		var h=oDate.getHours();
		var m=oDate.getMinutes();
		var s=oDate.getSeconds();
		var str=y+toDub(mon)+toDub(d)+toDub(h)+toDub(m)+toDub(s);
		
		for (var i=0; i<aImg.length; i++){
			
			aImg[i].src='images/'+str.charAt(i)+'.png';	
		}	
	}
	function toDub(n){
		return n<10 ? n='0'+n : n=''+n;	
	}
})(sName);
};
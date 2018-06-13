var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var gamingUI=(function(_super){
		function gamingUI(){
			

			gamingUI.__super.call(this);
		}

		CLASS$(gamingUI,'ui.pudding.gamingUI',_super);
		var __proto__=gamingUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(gamingUI.uiView);

		}

		gamingUI.uiView={"type":"View","props":{"width":726,"layoutEnabled":true,"height":1572},"child":[{"type":"Image","props":{"y":0,"x":0,"width":726,"skin":"game/bg.png","height":1572}},{"type":"Image","props":{"y":375,"x":-6,"skin":"game/success_tips.png","scaleY":0.5,"scaleX":0.5}},{"type":"Label","props":{"y":428,"x":91,"text":"0","rotation":-18,"name":"pudding_counter","fontSize":48,"color":"#ffffff","anchorX":0,"align":"center"}},{"type":"Image","props":{"y":19,"x":125,"skin":"game/total_counter_bottom.png","scaleY":0.5,"scaleX":0.5,"name":"total_counter"},"child":[{"type":"Image","props":{"y":78,"x":29,"width":14,"skin":"game/total_counter_lolly.png","name":"total_counter_lolly","height":157}},{"type":"Image","props":{"y":1,"x":0,"skin":"game/total_counter_top.png","name":"total_counter_top"}}]},{"type":"Image","props":{"y":182,"x":138,"skin":"game/time_counter_bottom.png","scaleY":0.5,"scaleX":0.5,"name":"time_counter"}},{"type":"Image","props":{"y":207,"x":235,"width":11,"skin":"game/time_counter_lolly.png","name":"time_counter_lolly","height":70}},{"type":"Image","props":{"y":176,"x":131,"skin":"game/time_counter_top.png","scaleY":0.5,"scaleX":0.5,"name":"time_counter_top"}},{"type":"Label","props":{"y":219,"x":611,"text":"0","name":"time_number","fontSize":48,"color":"#ffffff","anchorX":0,"align":"center"}},{"type":"Image","props":{"x":0,"width":726,"skin":"game/flower.png","scaleY":0.5,"bottom":0}}]};
		return gamingUI;
	})(View);
var lostUI=(function(_super){
		function lostUI(){
			

			lostUI.__super.call(this);
		}

		CLASS$(lostUI,'ui.pudding.lostUI',_super);
		var __proto__=lostUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(lostUI.uiView);

		}

		lostUI.uiView={"type":"View","props":{"width":726,"height":1572},"child":[{"type":"Image","props":{"y":0,"x":0,"width":726,"skin":"game/bg.png","height":1572}},{"type":"Image","props":{"y":0,"x":0,"width":726,"skin":"game/halo.png","height":1572}},{"type":"Image","props":{"y":0,"x":0,"skin":"game/logo.png"}},{"type":"Label","props":{"y":369,"x":2,"width":726,"text":"居然只剥了19个粽子","height":81,"fontSize":55,"color":"#f3d94a","bold":true,"align":"center"}},{"type":"Image","props":{"y":269,"x":132,"skin":"game/failed.png","scaleY":0.6,"scaleX":0.6}},{"type":"Image","props":{"y":1126,"skin":"game/recur.png","scaleY":0.5,"scaleX":0.5,"name":"restartBtn","centerX":0}},{"type":"Image","props":{"x":0,"width":726,"skin":"game/flower.png","scaleY":0.5,"bottom":0}}]};
		return lostUI;
	})(View);
var openViewUI=(function(_super){
		function openViewUI(){
			

			openViewUI.__super.call(this);
		}

		CLASS$(openViewUI,'ui.pudding.openViewUI',_super);
		var __proto__=openViewUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(openViewUI.uiView);

		}

		openViewUI.uiView={"type":"View","props":{"width":726,"layoutEnabled":true,"height":1572},"child":[{"type":"Image","props":{"y":0,"x":0,"width":726,"visible":true,"skin":"game/bg.png","height":1572}},{"type":"Image","props":{"y":0,"x":0,"skin":"game/logo.png","scaleY":0.5,"scaleX":0.5}},{"type":"Image","props":{"y":170,"x":176,"width":734,"skin":"game/explain.png","scaleY":0.5,"scaleX":0.5,"height":292}},{"type":"Image","props":{"y":958,"x":167,"skin":"game/Ready.png","scaleY":0.5,"scaleX":0.5,"name":"gameBeginBtn"}},{"type":"Label","props":{"y":1122,"x":0,"width":726,"text":"——  15秒内剥够20个即过关  ——","height":88,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":1176,"x":0,"width":726,"text":"过后联系客服","height":57,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":1240,"x":0,"width":726,"text":"领取1个粽子","height":100,"fontSize":45,"color":"#ffdb0f","align":"center"}}]};
		return openViewUI;
	})(View);
var startUI=(function(_super){
		function startUI(){
			

			startUI.__super.call(this);
		}

		CLASS$(startUI,'ui.pudding.startUI',_super);
		var __proto__=startUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(startUI.uiView);

		}

		startUI.uiView={"type":"View","props":{"width":726,"height":1572},"child":[{"type":"Image","props":{"y":0,"x":0,"width":726,"skin":"game/bg.png","height":1572}},{"type":"Image","props":{"y":0,"x":0,"width":726,"skin":"game/halo.png","height":1572}},{"type":"Image","props":{"y":0,"x":0,"skin":"game/logo.png","scaleY":0.5,"scaleX":0.5}},{"type":"Image","props":{"y":136,"skin":"game/solgan.png","scaleY":0.5,"scaleX":0.5,"centerX":0}},{"type":"Image","props":{"y":420,"x":474,"skin":"game/message.png","scaleY":0.5,"scaleX":0.5}},{"type":"Image","props":{"y":989,"skin":"game/startBtn.png","scaleY":0.5,"scaleX":0.5,"name":"gameStarted","centerX":0}},{"type":"Image","props":{"x":0,"width":726,"skin":"game/flower.png","scaleY":0.5,"bottom":0}}]};
		return startUI;
	})(View);
var winUI=(function(_super){
		function winUI(){
			

			winUI.__super.call(this);
		}

		CLASS$(winUI,'ui.pudding.winUI',_super);
		var __proto__=winUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(winUI.uiView);

		}

		winUI.uiView={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"width":726,"skin":"game/bg.png","height":1572}},{"type":"Image","props":{"y":0,"x":0,"width":726,"skin":"game/halo.png","height":1572}},{"type":"Image","props":{"y":265,"x":166,"skin":"game/wintext.png","scaleY":0.5,"scaleX":0.5}},{"type":"Image","props":{"y":0,"x":0,"skin":"game/logo.png","scaleY":0.5,"scaleX":0.5}},{"type":"Label","props":{"y":1183,"x":9,"width":721,"text":"——  请联系我们的客服  ——","height":45,"fontSize":35,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":1235,"x":1,"width":728,"text":"领取1个粽子","height":93,"fontSize":45,"color":"#ffdb0f","align":"center"}},{"type":"Image","props":{"x":0,"width":726,"skin":"game/flower.png","scaleY":0.6,"height":592,"bottom":0}}]};
		return winUI;
	})(View);
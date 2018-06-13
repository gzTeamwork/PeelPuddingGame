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

		gamingUI.uiView={"type":"View","props":{},"child":[{"type":"Image","props":{"y":-50,"x":0,"width":1452,"skin":"game/bg.png","scaleY":0.5,"scaleX":0.5,"height":3145}},{"type":"Image","props":{"y":375,"x":-6,"skin":"game/success_tips.png","scaleY":0.5,"scaleX":0.5}},{"type":"Label","props":{"y":428,"x":91,"text":"0","rotation":-18,"name":"pudding_counter","fontSize":48,"color":"#ffffff","anchorX":0,"align":"center"}},{"type":"Image","props":{"y":19,"x":125,"skin":"game/total_counter_bottom.png","scaleY":0.5,"scaleX":0.5,"name":"total_counter"},"child":[{"type":"Image","props":{"y":78,"x":29,"width":14,"skin":"game/total_counter_lolly.png","name":"total_counter_lolly","height":157}},{"type":"Image","props":{"y":1,"x":0,"skin":"game/total_counter_top.png","name":"total_counter_top"}}]},{"type":"Image","props":{"y":182,"x":138,"skin":"game/time_counter_bottom.png","scaleY":0.5,"scaleX":0.5,"name":"time_counter"}},{"type":"Image","props":{"y":207,"x":235,"width":11,"skin":"game/time_counter_lolly.png","name":"time_counter_lolly","height":70}},{"type":"Image","props":{"y":176,"x":131,"skin":"game/time_counter_top.png","scaleY":0.5,"scaleX":0.5,"name":"time_counter_top"}}]};
		return gamingUI;
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

		openViewUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"game/bg.png","height":1280}},{"type":"Label","props":{"y":242,"x":180,"text":"手指上下滑动剥开粽叶","fontSize":36,"color":"#ffffff"}},{"type":"Button","props":{"y":613,"x":257,"width":210,"skin":"comp/button.png","name":"gameBeginBtn","labelSize":24,"label":"开始游戏","height":64}}]};
		return openViewUI;
	})(View);
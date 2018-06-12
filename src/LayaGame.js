//  声明全局变量
var WebGL = Laya.WebGL;
var Sprite = Laya.Sprite;
var Stage = Laya.Stage;
var Browser = Laya.Browser;
var Tween = Laya.Tween;
var Event = Laya.Event;
var Rectangle = Laya.Rectangle;
var Texture = Laya.Texture;
var Handler = Laya.Handler;

var LayerIndex = { ui: 0, game: 1, main: 2, chip: 3 };
var GarbageRes = [];

; (function () {
    //  声明游戏对象
    var Pudding;

    ; (function () {
        //  抗锯齿
        Laya.Config.isAntialias = true;
        //  初始化
        Laya.init(window.innerWidth * ((Browser.width / window.innerWidth) - 1), window.innerHeight * ((Browser.height / window.innerHeight) - 1), WebGL);
        //  开启鼠标事件
        Laya.stage.mouseEnabled = true;
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.bgColor = "#213823";

        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;

        var stageBackground = "assets/imgs/bg.png";
        Laya.loader.load(stageBackground, Handler.create(this, stageSetup))

    })();

    /**
     * 舞台加载完毕
     */
    function stageSetup() {
        console.log('舞台加载完毕..')
        var game = new GameLogics();
        game.stageOpen();
    }
})();

var GameLogics = function () {

    var UIopening = new openViewUI();
    var UIgameing = new gamingUI();

    /**
     * 资源加载
     */
    this.LoadRes = function () {
        var resArray = [
            { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS }
        ]
        Laya.loader.load(resArray, Laya.Handler.create(null, LoadResComplete()));

    }

    /**
     * 资源加载完毕,回调函数
     */
    function LoadResComplete() {
        Laya.stage.addChildAt(UIopening, LayerIndex.ui);
    }

    /**
     * 游戏开场场景初始化...
     */
    this.stageOpen = function () {
        console.log('游戏开场场景初始化...')
        this.LoadRes();
        var gameBeginBtn = UIopening.getChildByName('gameBeginBtn');
        gameBeginBtn.on(Event.MOUSE_DOWN, this, beginBtnHandler);

        /**
         * 点击开始游戏按钮
         */
        function beginBtnHandler() {
            console.log('开始游戏...')
            UIopening.removeSelf();
            this.stageGame();
        }
    }

    /**
     * 游戏中场景初始化...
     */
    this.stageGame = function () {
        console.log('游戏中场景初始化...')
        //  声明游戏对象
        //  游戏机制变量:剥粽子数量,游戏计时,游戏计时计数器,游戏最大计时,游戏状态,游戏滑动计数器
        var GameTotal, GameTimeCounter, GameTime, GameTimeMax, GameStatus, GameSwipeCounter;
        //  触摸/点击事件:是否被点击,是否划动,是否执行1次,是否碰撞,被触摸点坐标
        var isTouch, isSwipe, isOnce, isHit, TouchPoint;
        //  粽子变量:粽子动画模板,粽子,粽子掉皮,粽子表情列表
        var PuddingTemp, Pudding, PuddingSkinChip, PuddingFaceList, PuddingFa;
        //  划动痕迹:划痕堆栈,单个划痕
        var SwipeLines, SwipeLine;

        //  载入游戏界面
        Laya.stage.addChildAt(UIgameing, LayerIndex.ui);

        var PuddingData = new function () {
            this.faceList = ['smile', 'poor', 'normal', 'chagrin', 'wnwilling'];
            this.faceIndex = 0;
            this.maxHp = 7;
            this.Hp = 0;
        }

        //  初始化变量值
        GameTotal = GameSwipeCounter = GameTimeCounter = 0;
        isTouch = isSwipe = isHit = false;
        isOnce = true;
        SwipeLines = [];
        PuddingData.Hp = PuddingData.maxHp;

        PuddingSkinChip = new Laya.Image();
        this.spriteAlign(PuddingSkinChip);
        PuddingTemp = new Laya.Templet();

        //  加载模型文件
        PuddingTemp.loadAni('res/dragonBones/pudding/pudding.sk')
        PuddingTemp.on(Laya.Event.COMPLETE, this, LoadPudding);

        //  加载粽子模型
        function LoadPudding() {
            Pudding = PuddingTemp.buildArmature(1);
            Pudding.pos(UIgameing.width / 2, UIgameing.height / 2);
            Pudding.play(1, true);
            console.log(Pudding.getSlotByName('face'))
            Laya.stage.addChild(Pudding);
        }

        //  开启计时器
        var timeLolly = UIgameing.getChildByName('time_counter_lolly');
        var timeTop = UIgameing.getChildByName('time_counter_top');
        var timeWidth = timeTop.width - timeLolly.x;
        Laya.timer.loop(1000, this, timerEachSecound)
        //  计时器每秒事件
        function timerEachSecound() {
            GameTimeCounter++;
            if (GameTimeCounter > 50) {
                Laya.timer.clear();
            }
            // console.log(timeLolly);
            //  时间计时条缓动动画
            Tween.to(timeLolly, { width: timeWidth / 20 * GameTimeCounter }, 500)
            //  划痕回收
            if (GarbageRes.length > 0) {
                console.log('开始回收资源' + GarbageRes.length + '个');
                GarbageRes.map(function (e, i) {
                    GarbageRes.pop(i);
                    e.destroy();
                });
                console.log('清理后的资源个数' + GarbageRes.length + '个');
            }
        }

        //  绑定舞台事件
        Laya.stage.on(Event.MOUSE_DOWN, this, eventMouseDown);
        // Laya.stage.on(Event.MOUSE_MOVE, this, eventMouseMove);
        Laya.stage.on(Event.MOUSE_UP, this, eventMouseUp);

        //  鼠标按下
        function eventMouseDown(event) {
            // console.log('触点按下');
            var touchTarget = event.target;
            isTouch = true;
            TouchPoint = { x: touchTarget.mouseX, y: touchTarget.mouseY };
            SwipeLine = new Laya.Sprite();
            PuddingSkinChip = new Laya.Sprite();
            PuddingSkinChip.loadImage('assets/imgs/pudding/skin_part_' + (PuddingData.maxHp - PuddingData.Hp + 1) + '.png');
            PuddingSkinChip.scale(0.5, 0.5);
            this.spriteAlign(PuddingSkinChip);
            Laya.stage.on(Event.MOUSE_MOVE, this, eventMouseMove);
            //  随机脸
            PuddingData.faceIndex = 1 + Math.ceil(Math.random() * 3);
        }

        //  鼠标移动
        function eventMouseMove(event) {
            // console.log('触点移动')
            var touchTarget = event.target;
            if (isTouch) {
                isSwipe = true;
                //  粽子碰撞检测并执行1次
                if (this.spriteCollision(Pudding, { x: touchTarget.mouseX, y: touchTarget.mouseY })) {
                    isHit = true;
                    if (isOnce) {
                        var puddingFace = PuddingData.faceList[PuddingData.faceIndex];
                        //  被划到要变脸
                        Pudding.showSlotSkinByIndex('face', PuddingData.faceIndex + 0);
                        //  被划到需要丢皮
                        // PuddingSkinChip.on(Laya.Event.COMPLETE, this, function () {
                        this.spriteAlign(PuddingSkinChip);
                        UIgameing.addChild(PuddingSkinChip);
                    }
                    // })
                    isOnce = false;
                    PuddingSkinChip.pos(touchTarget.mouseX, touchTarget.mouseY);
                }
            }
        }

        //  鼠标松开
        function eventMouseUp(event) {
            // console.log('触点松开');
            var touchTarget = event.target;
            if (isSwipe) {
                SwipeLine.graphics.clear();
                SwipeLine.graphics.drawLine(TouchPoint.x, TouchPoint.y, touchTarget.mouseX, touchTarget.mouseY, "white", 20);
                Laya.stage.addChildAt(SwipeLine, LayerIndex.game + 1);
                //  缓动动画结束后,销毁划痕
                Tween.to(SwipeLine, { alpha: 0 }, 500, Laya.Ease.bounceIn, Handler.create(this, this.spriteDestroy, [SwipeLine]));
            }
            if (isHit) {
                //  扣血
                if (PuddingData.Hp-- < 0) {
                    GameTotal++
                    PuddingData.Hp = PuddingData.maxHp;
                    var puddingTotal ;
                    puddingTotal = UIgameing.getChildByName('pudding_counter');
                    console.log(puddingTotal);
                    // PuddingTotal.text++;
                }
                var hpTips = new Laya.Text();
                hpTips.text = 'Hp:' + PuddingData.Hp;
                hpTips.color = 'red';
                hpTips.fontSize = '64';
                hpTips.pos(touchTarget.mouseX, UIgameing.height / 2);
                UIgameing.addChild(hpTips);
                //  掉皮
                var pee = 7 - PuddingData.Hp;
                Pudding.showSlotSkinByIndex('body', pee);
                Tween.to(hpTips, { y: -200, alpha: 0 }, 2000, null, Handler.create(this, this.spriteDestroy, [hpTips]));
                Tween.to(PuddingSkinChip, { y: -500, alpha: 0 }, 1500, null, Handler.create(this, this.spriteDestroy, [PuddingSkinChip]));
            }

            isTouch = isSwipe = isHit = false;
            isOnce = true;
            Laya.stage.off(Event.MOUSE_MOVE, this, eventMouseMove);
        }
    }
    /**
     * 游戏通关场景初始化...
     */
    this.stageOK = function () {
        console.log('游戏通关场景初始化...')
    }

    //  Sprite销毁 - 主要用于缓动动画之后自我销毁
    this.spriteDestroy = function (e) {
        GarbageRes.push(e);
    }
    //  Sprite内对齐
    this.spriteAlign = function (e, mode = 'center') {
        switch (mode) {
            default:
                //  居中
                e.pivot(e.width / 2, e.height / 2);
        }
    }
    //  Sprite碰撞检测 - 用于划动与Sprite碰撞检测
    this.spriteCollision = function (e, point) {
        return e.hitTestPoint(point.x, point.y);
    }
}


// function GameMain() {

//     function spriteCollision(sprite, point) {
//         return sprite.hitTestPoint(point.x, point.y)
//     }

//     var WebGL = laya.webgl.WebGL;
//     var Sprite = Laya.Sprite;
//     var Stage = Laya.Stage;
//     var Browser = Laya.Browser;
//     var Tween = Laya.Tween;
//     // var pudding = Laya.pudding;
//     var pudding;
//     var ScreenIndex = {
//         //  背景图
//         background: 0,
//         //  ui界面
//         ui: 1,
//         //  游戏主体
//         gamebox: 2,
//         //  划痕
//         brush: 3,
//         //  粽子
//         pudding: 2,
//         //  粽子皮
//         puddingSkin: 5,

//     }
//     var psd = {
//         width: 1280,
//         height: 2772
//     }
//     var screen = {
//         width: window.screen.width,
//         height: window.screen.height
//     }

//     //  是否点击
//     var isTouch = false;

//     /**
//      * 为了划动时间只出发一次
//      */
//     //  是否可以剥皮
//     var isPee = false;
//     //  允许剥皮1次
//     var isOnce = true;

//     /**
//      * 资源加载
//      */
//     function LoadRes() {
//         var resArray = [
//             { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS }
//         ]
//         Laya.loader.load(resArray, Laya.Handler.create(null, LoadResComplete()));

//     }

//     /**
//      * 资源加载完毕,回调函数
//      */
//     function LoadResComplete() {
//         Laya.stage.addChildAt(new openViewUI(), ScreenIndex.background);
//     }

//     /**
//      * 按重置项目大小
//      * @param {*} item 
//      */
//     function ResetSize(item) {
//         var ow = item.width;
//         item.width = item.width * item.width / screen.width;
//         item.height = item.height * item.width / ow;
//     }


//     //  初始化引擎

//     Laya.init(720, 1280, WebGL);
//     Laya.stage.mouseEnabled = true;
//     Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;

//     LoadRes();

//     //  信息精灵
//     var tx = new Laya.Text();
//     tx.text = "hello world~";
//     tx.pos(5, Laya.stage.height - tx.height - 10);
//     tx.color = "#ffffff";
//     tx.fontSize = 18
//     Laya.stage.addChild(tx);

//     //  定义划痕精灵
//     var dline = new Laya.Sprite();
//     Laya.stage.addChildAt(dline, ScreenIndex.gamebox);
//     var beginPoint = { x: 0, y: 0 };

//     //  定义跟随精灵
//     var followSprite = new Laya.Sprite();
//     followSprite.pivot(followSprite.width / 2, followSprite.height / 2);  //轴心居中
//     Laya.stage.addChildAt(followSprite, ScreenIndex.gamebox);
//     followSprite.graphics.drawCircle(0, 0, 20, "#ffffff");

//     // //  定义一个粽子
//     // var pudding = new Laya.Sprite();
//     // pudding.size(646, 600);
//     // pudding.scale(0.5, 0.5);
//     // pudding.pivot(pudding.width / 2, pudding.height / 2);  //轴心居中
//     // pudding.pos(Laya.stage.width / 2, Laya.stage.height / 2);
//     // Laya.stage.addChildAt(pudding, ScreenIndex.pudding);
//     // var puddingSkin = new Laya.Image('assets/imgs/pudding.png');
//     // puddingSkin.size(pudding.width, pudding.height);
//     // pudding.addChild(puddingSkin);

//     //  创建一个粽子db
//     var dbTemplate = new Laya.Templet();
//     dbTemplate.loadAni('res/dragonBones/pudding/pudding.sk')
//     dbTemplate.on(Laya.Event.COMPLETE, this, LoadPudding);
//     function LoadPudding() {
//         pudding = dbTemplate.buildArmature(1);
//         pudding.pos(Laya.stage.width / 2, Laya.stage.height / 2);//动画位置
//         pudding.play(1, true);//动画播放，从0帧开始，不断循环播放
//         // pudding.scale(0.5, 0.5);//动画缩放为原始状态的二分之一
//         Laya.stage.addChildAt(pudding, ScreenIndex.pudding);
//     }

//     var faceList = ['smile', 'poor', 'normal', 'chagrin', 'wnwilling'];
//     var pee = 6;

//     // //  创建一个刮痕gif
//     // var scratch = new Laya.Image()
//     // scratch.loadImage('bin/assets/imgs/Armature_scratch_bomb.gif')
//     // scratch.pivot(scratch.width / 2, scratch.height / 2);
//     // Laya.stage.addChildAt(scratch, ScreenIndex.brush);
//     var faceIndex = 0;
//     //  声明一个掉皮sprite
//     var diaopi = new skinChip();

//     /**
//      * 鼠标事件
//      */
//     Laya.stage.on("mousedown", this, function (event) {
//         // console.log('鼠标按下')
//         var target = event.target;
//         // console.log(event);
//         tx.text = '鼠标点击坐标X:' + target.mouseX + ',坐标Y' + target.mouseY;

//         dline = new Laya.Sprite();
//         Laya.stage.addChildAt(dline, ScreenIndex.brush);
//         beginPoint = { x: target.mouseX, y: target.mouseY };
//         Tween.to(followSprite, { x: target.mouseX, y: target.mouseY }, 500);
//         isTouch = true
//         faceIndex = Math.round(Math.random() * 2 + 1);

//     })
//     Laya.stage.on("mousemove", this, function (event) {

//         // console.log('鼠标滑动');
//         var target = event.target;
//         tx.text = '变脸编号' + faceIndex;
//         if (isTouch) {
//             dline.graphics.clear();
//             dline.graphics.drawLine(beginPoint.x, beginPoint.y, target.mouseX, target.mouseY, '#ffffff', 10);
//             if (spriteCollision(pudding, { x: target.mouseX, y: target.mouseY })) {
//                 // pudding.replaceSlotSkinByIndex('face', 0, faceIndex);
//                 pudding.replaceSlotSkinName('face', 'face/smile', 'face/' + faceList[faceIndex]);
//                 pudding.playbackRate(3);
//                 isPee = true;
//                 if (isPee && isOnce) {

//                     diaopi = new Laya.Image()
//                     diaopi.loadImage('assets/imgs/pudding/skin_part_' + (7 - pee) + '.png');
//                     diaopi.pivot(diaopi.width / 2, diaopi.height / 2);
//                     // diaopi.pos(target.mouseX, target.mouseY);
//                     diaopi.scale(0.5, 0.5)
//                     Laya.stage.addChildAt(diaopi, ScreenIndex.puddingSkin);



//                     // console.log(pee + ' ' + pii);

//                     if (pee == 0) {
//                         pee = 6
//                         //  重置皮状态
//                         pudding.showSlotSkinByIndex('body', 7);
//                         console.log('重置皮')
//                     } else {
//                         console.log('换皮')
//                         pudding.replaceSlotSkinByIndex('body', pee + 1, (pee--));
//                     }
//                     console.log(pee);
//                     pudding.showSlotSkinByIndex('body', pee--);
//                     var puddingBody = pudding.getSlotByName('body');

//                     isPee = false;
//                     isOnce = false;
//                     // console.log(pudding.getSlotByName('body'));
//                     // console.log(pee);
//                 }
//             }
//             diaopi.pos(target.mouseX, target.mouseY);

//         }
//     })

//     Laya.stage.on("mouseup", this, function (event) {
//         // console.log('鼠标松开');
//         var target = event.target;
//         tx.text = '鼠标抬起坐标X:' + target.mouseX + ',坐标Y:' + target.mouseY;
//         // alert('鼠标放开');
//         // console.log(dline);
//         Tween.to(dline, { alpha: 0 }, 1000);
//         Tween.to(followSprite, { x: target.mouseX, y: target.mouseY }, 500);
//         isTouch = false
//         pudding.replaceSlotSkinByIndex('face', faceIndex, 0);
//         pudding.playbackRate(1);
//         isPee = true;
//         isOnce = true;
//         Tween.to(diaopi, { y: -300, alpha: 0, rotation: 720 }, 1500);

//     })

//     // var testGraphnics = new laya.display.Graphics();
//     // Laya.stage.addChild(testGraphnics);
//     // testGraphnics.drawLine(0, 0, Laya.stage.mouseX, Laya.stage.mouseY, '#kkkkkk', 2);
// }

// GameMain();


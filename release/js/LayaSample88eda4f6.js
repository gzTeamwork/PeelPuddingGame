function GameMain() {

    var WebGL = laya.webgl.WebGL;
    var Sprite = Laya.Sprite;
    var Stage = Laya.Stage;
    var Browser = Laya.Browser;
    var Tween = Laya.Tween;

    //  初始化引擎
    Laya.init(414, 763, WebGL);

    Laya.stage.mouseEnabled = true;
    Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;

    //  信息精灵
    var tx = new Laya.Text();
    tx.text = "hello world~";
    tx.pos(5, Laya.stage.height - tx.height - 10);
    tx.color = "#ffffff";
    tx.fontSize = 18

    Laya.stage.addChild(tx);

    //  定义划痕精灵
    var dline = new Laya.Sprite();
    Laya.stage.addChildAt(dline, 0);
    var beginPoint = { x: 0, y: 0 };

    //  定义跟随精灵
    var followSprite = new Laya.Sprite();
    followSprite.pivot(followSprite.width / 2, followSprite.height / 2);  //轴心居中
    Laya.stage.addChildAt(followSprite, 1);
    followSprite.graphics.drawCircle(0, 0, 20, "#ffffff");

    //  定义一个粽子
    var pudding = new Laya.Sprite();
    pudding.pivot(pudding.width / 2, pudding.height / 2);  //轴心居中
    pudding.pos(Laya.stage.width / 2, Laya.stage.height / 2);
    Laya.stage.addChildAt(pudding, 2);
    pudding.graphics.drawRect(0, 0, 48, 48, '#333');

    function spriteCollision(sprite, point) {
        return sprite.hitTestPoint(point.x, point.y)
    }


    Laya.stage.on("mousedown", this, function (event) {
        console.log('鼠标按下')
        var target = event.target;
        // console.log(event);
        tx.text = '鼠标点击坐标X:' + target.mouseX + ',坐标Y' + target.mouseY;
        dline = new Laya.Sprite();
        Laya.stage.addChildAt(dline, 0);
        beginPoint = { x: target.mouseX, y: target.mouseY };
        Tween.to(followSprite, { x: target.mouseX, y: target.mouseY }, 500);

    })

    Laya.stage.on("mousemove", this, function (event) {
        console.log('鼠标滑动');
        var target = event.target;
        tx.text = '鼠标经过坐标X:' + target.mouseX + ',坐标Y' + target.mouseY;
        dline.graphics.clear();
        dline.graphics.drawLine(beginPoint.x, beginPoint.y, target.mouseX, target.mouseY, '#ffffff', 10);
        if (spriteCollision(pudding, { x: target.mouseX, y: target.mouseY })) {
            console.log('粽子方框被划到了');
        }
    })

    Laya.stage.on("mouseup", this, function (event) {
        console.log('鼠标松开');
        var target = event.target;
        tx.text = '鼠标抬起坐标X:' + target.mouseX + ',坐标Y:' + target.mouseY;
        // alert('鼠标放开');
        console.log(dline);
        Tween.to(dline, { alpha: 0 }, 1000);
    })

    // var testGraphnics = new laya.display.Graphics();
    // Laya.stage.addChild(testGraphnics);
    // testGraphnics.drawLine(0, 0, Laya.stage.mouseX, Laya.stage.mouseY, '#kkkkkk', 2);
}

GameMain();


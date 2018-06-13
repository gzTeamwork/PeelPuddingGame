/**
 * 鼠标划过笔刷类
 */


class mouseBrush extends Laya.Sprite {

    // defaultColor = '#ffffff';
    // lineWidth = 5;
    // beginPoint = { x: 0, y: 0 };

    Init(color, width) {
        this.defaultColor = color;
        this.lineWidth = width;
    }

    Begin(x, y) {
        this.beginPoint = { x: x, y: y };
    }

    LineTo(x, y, only = true) {
        only ? this.graphics.clear() : '';
        this.graphics.LineTo(this.beginPoint.x, this.beginPoint.y, x, y, this.defaultColor, this.lineWidth);
    }

}

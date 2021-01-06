import { rectObjectBase } from './object.js';
class MenuButton extends rectObjectBase {
    constructor(rt, row, isLeft, texture) {
        super(rt);
        this.maxRows = 3;
        this.timePassed = 0;
        this.animationDuration = 100;
        this.everyTick = this.EveryTick;
        rt.addObject(this);
        this.layer = 3;
        this.width = rt.width / 20;
        this.height = this.width;
        this.isVisible = false;
        if (texture.isColor === true) {
            this.texture = texture.fill;
        }
        else {
            let image = new Image();
            image.src = texture.fill;
            this.texture = image;
        }
        let yCalc = () => {
            let _row = row;
            if (_row > this.maxRows)
                _row = 1;
            let heightScala = rt.height / this.maxRows + 1;
            return heightScala * _row;
        };
        let XYCalc;
        if (isLeft === true) {
            XYCalc = () => {
                this.x = rt.width / 4 + this.width / 2 - 20;
                this.y = yCalc();
            };
        }
        else {
            XYCalc = () => {
                this.x = rt.width / 4 + rt.width / 2 - this.width / 2 + 20;
                this.y = yCalc();
            };
        }
        XYCalc();
        this.onresize = () => {
            XYCalc();
            this.width = rt.width / 20;
            this.height = this.width;
        };
    }
    OnClick() {
        this.timePassed = 0;
        this.doEveryTick = true;
        this.width = this.getRt.width / 20 + 10;
        this.height = this.width;
    }
    EveryTick() {
        this.timePassed += this.getRt.DeltaTime;
        if (this.timePassed >= this.animationDuration) {
            this.width = this.getRt.width / 20;
            this.height = this.width;
            this.doEveryTick = false;
        }
    }
}
class Menu extends rectObjectBase {
    constructor(rt, texture) {
        super(rt, texture);
        this.isOpened = false;
        rt.addObject(this);
        this.layer = 2;
        this.x = rt.width / 2;
        this.y = rt.getHeight / 2;
        this.width = rt.width;
        this.height = rt.getHeight;
        this.onresize = () => {
            this.x = rt.width / 2;
            this.y = rt.getHeight / 2;
            this.width = rt.width;
            this.height = rt.getHeight;
        };
    }
    open() {
        this.isOpened = true;
        this.enable();
    }
    close() {
        this.isOpened = false;
        this.disable();
    }
    get getIsOpened() {
        return this.isOpened;
    }
}
export { Menu, MenuButton };
//# sourceMappingURL=menu.js.map
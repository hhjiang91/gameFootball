
(function(ns){

var Ball = ns.Ball = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        Ball.superclass.constructor.call(this, properties);
        this.init(properties);
    },
    startX: 0, 
    startY: 0, 
    moveX:[-100, -200, 100, 200],
    moveY:[-200,-300, -300, -200],

    init: function(properties){
        var ball = new Hilo.BitmapText({
            id: properties.idBall,
            glyphs: properties.imageBall,
            text: "0"
        }).addTo(this);
        // var ball = new Hilo.Bitmap({
        //     id: properties.idBall,
        //     image: properties.imageBall,
        //     rect: [0, 0, 122, 122]
        // }).addTo(this);
        ball.scaleX =  0.5;
        ball.scaleY =  0.5;
        ball.x = properties.widthBall - ball.width*ball.scaleX/2;
        ball.y = properties.heightBall - ball.height*ball.scaleY + 5;
        this.addChild(ball);
    },
    fromFly:function(){
        // if(this.tween) this.tween.stop();
        // this.tween.setProps({y:100}, {y:399},{duration:4000, reverse:false, loop:false});
        //启动缓动动画
        // this.tween.start();
        var a = 500;
        this.tween = Hilo.Tween.to(this, {y:a, rotation:8}, {duration:2000, reverse:false, loop:false});
        // this.tween.start();
    },

    getReady: function(){
        // 设置起始坐标
        if(this.tween){
            this.tween.stop();
        }
        this.x = this.startX;
        this.y = this.startY;
        this.rotation = 0;
        this.tween = Hilo.Tween.to(this, {y:this.y, x:this.x , rotation:0}, {duration:400, reverse:false, loop:false});
    },
    moveBall: function(index, backFlag){
        //this.tween.stop();
        this.x = this.startX;
        this.y = this.startY;
        this.rotation = 0;
        if (backFlag == 1) {
            this.tween = Hilo.Tween.to(this, {y:this.children[0].height - this.height*0.58 + this.moveY[index]/5, x:this.x + this.moveX[index]/2, rotation:0}, {duration:1000, reverse:false, loop:false,
                onComplete:this.fromFly.bind(this)
            });
        } else{
            this.tween = Hilo.Tween.to(this, {y:this.children[0].height - this.height*0.58 + this.moveY[index]/5, x:this.x + this.moveX[index]/2, rotation:0}, {duration:1000, reverse:false, loop:false});
        };
    }

});

})(window.game);

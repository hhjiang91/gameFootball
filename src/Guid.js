
(function(ns){

var Guid = ns.Guid = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        Guid.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    startX: 0, 
    startY: 0, 
    moveX:[-100, -200, 100, 200],
    moveY:[-100,-200, -200, -100],
    init: function(properties){
        var guid = new Hilo.BitmapText({
            id: properties.id,
            glyphs: properties.guidAtlas,
            text: "0"
        }).addTo(this);
        guid.scaleX = 0.5;
        guid.scaleY = 0.5;
        guid.x = properties.width - guid.scaleX*guid.width/2;
        guid.y = properties.height*0.58 - guid.getScaledHeight();
        // guid.y = properties.height - guid.scaleY*guid.height;
        this.addChild(guid);
    },

    getReady: function(){
        //设置起始坐标
        if(this.tween){
            this.tween.stop();
        }
        this.children[0].setText("0");
        this.x = this.startX;
        this.y = this.startY;
        this.rotation = 0;
        this.tween = Hilo.Tween.fromTo(this, {x:this.x - 100, rotation:0},{x:this.x + 100, rotation:0}, {duration:1500, reverse:true, loop:true});
    },
    startMove: function(index){
        //设置起始坐标
        this.children[0].setText(index+1);
        if(this.tween){
            this.tween.pause();
        }
        this.x = this.startX;
        this.y = this.startY;
        this.tween = Hilo.Tween.to(this, {y:this.y + this.moveY[index]/5, x:this.x + this.moveX[index]/2, rotation:0}, {duration:1000, reverse:false, loop:false});
    },
});

})(window.game);

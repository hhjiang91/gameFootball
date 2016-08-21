
(function(ns){

var ReadyScene = ns.ReadyScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        ReadyScene.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){
        //准备Get Ready!
        var getready = new Hilo.Bitmap({
            id: 'start',
            image: properties.image,
            rect: [0, 0, 212, 71]
        });
        var getFoot = new Hilo.Bitmap({
            id: 'foot',
            image: properties.footImg,
            rect: [0, 0, 156, 180],
            visible:false
        });
        getready.scaleX = 0.5;
        getready.scaleY = 0.5;
        getready.x = this.width/2 - getready.width/2*getready.scaleX;
        getready.y = this.height - getready.height*getready.scaleY - 5;
        
        getFoot.scaleX = 0.5;
        getFoot.scaleY = 0.5;
        getFoot.x = this.width/2;
        getFoot.y = this.height - getFoot.height*getFoot.scaleY - 5;
        getFoot.xOrg =  getFoot.x;
        getFoot.yOrg =  getFoot.y;
        this.addChild(getready,getFoot);
    }
});

})(window.game);
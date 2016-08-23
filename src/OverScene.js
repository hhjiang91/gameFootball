
(function(ns){

var OverScene = ns.OverScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        OverScene.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){
        var getBgMask = new Hilo.Bitmap({
            id: 'bgMask',
            width:properties.width,
            height:properties.height,
            background:'#696666',
            alpha:0.5
        });
        var getBgRes = new Hilo.Bitmap({
            id: 'bgResult',
            image: properties.imageRes,
            rect: [0, 0, 430, 333]
        });
        getBgRes.scaleX = 0.7;
        getBgRes.scaleY = 0.7;
        getBgRes.x = properties.width/2 - getBgRes.scaleX*getBgRes.width/2;
        getBgRes.y = properties.height/2 - getBgRes.scaleY*getBgRes.height/2;

        var getReplay = new Hilo.Bitmap({
            id: 'replay',
            image: properties.imgRpl,
            rect: [0, 0, 70, 70]
        });
        getReplay.scaleX = 0.7;
        getReplay.scaleY = 0.7;
        getReplay.x = properties.width/2 - getReplay.scaleX*getReplay.width*2.5;
        getReplay.y = getBgRes.y + getBgRes.getScaledHeight() - getReplay.scaleY*getReplay.height - 5;

        var getShare = new Hilo.Bitmap({
            id: 'share',
            image: properties.imgShare,
            rect: [0, 0, 70, 70]
        });
        getShare.scaleX = 0.7;
        getShare.scaleY = 0.7;
        getShare.x = properties.width/2 + getShare.scaleX*getShare.width*1.5;
        getShare.y = getBgRes.y + getBgRes.getScaledHeight() - getShare.scaleY*getShare.height - 5;

        var getHome = new Hilo.Bitmap({
            id: 'home',
            image: properties.imgHome,
            rect: [0, 0, 60, 55]
        });
        getHome.scaleX = 0.7;
        getHome.scaleY = 0.7;
        getHome.x = properties.width/2 - getHome.scaleX*getHome.width/2;
        getHome.y = getBgRes.y + getBgRes.getScaledHeight() - getHome.scaleY*getHome.height;

        var ballNum = new Hilo.Text({
            id: 'numShow',
            font: "17px arial",
            text: '    点球数：2<br/>     分数：456<br/>击败了20%的玩家',
            color:'#2d0a02',
            lineSpacing:0
        });
        ballNum.x = getBgRes.x + getBgRes.getScaledWidth()*13/43;
        ballNum.y = getBgRes.y + getBgRes.getScaledHeight()*18/34;

        // var ballScore = new Hilo.Text({
        //     id: 'scoreShow',
        //     font: "20px arial",
        //     text: '分数：20',
        //     color:'#2d0a02',
        //     lineSpacing:24
        // });
        // ballScore.x = getBgRes.x + getBgRes.getScaledWidth()*16/43;
        // ballScore.y = getBgRes.y + getBgRes.getScaledHeight()*22/34;

        // var ballFight = new Hilo.Text({
        //     id: 'percentShow',
        //     font: "20px arial",
        //     text: '击败了20%的玩家',
        //     color:'#2d0a02',
        //     lineSpacing:24
        // });
        // ballFight.x = getBgRes.x + getBgRes.getScaledWidth()*16/43;
        // ballFight.y = getBgRes.y + getBgRes.getScaledHeight()*25/34;

        this.addChild(getBgMask,getBgRes, getReplay, getShare, getHome, ballNum);
    }
});

})(window.game);
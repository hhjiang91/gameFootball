
(function(ns){

var ChooseScene = ns.ChooseScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        ChooseScene.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){
        //准备Get Ready!
        var getBgMask = new Hilo.Bitmap({
            id: 'bgMask',
            width:properties.width,
            height:properties.height,
            background:'#696666',
            alpha:0.5
        });
        var chooseRes = new Hilo.Container({
            id:'chooseRes',
            x:properties.width/2 - 568*0.8*0.5,
            y:properties.height/2 - 346*0.8*0.5*0.9,
            visible:false
        });
        var getBg = new Hilo.Bitmap({
            id: 'chooseBg',
            image: properties.bgImg,
            rect: [0, 0, 568, 346],
            x:0,
            y:0
        }).addTo(chooseRes);
        getBg.scaleX = 0.8;
        getBg.scaleY = 0.8;
        var getShot = new Hilo.Bitmap({
            id: 'chooseShot',
            image: properties.shotImg,
            rect: [0, 0, 146, 44]
        }).addTo(chooseRes);
        getShot.scaleX = 1;
        getShot.scaleY = 1;
        getShot.x = getBg.getScaledWidth()/2 - getShot.width/2 + 20;
        getShot.y = getBg.getScaledHeight()*2/3 - 30;

        var getClose = new Hilo.Bitmap({
            id: 'chooseClose',
            image: properties.closeImg,
            rect: [0, 0, 62, 62]
        }).addTo(chooseRes);
        getClose.scaleX = 1;
        getClose.scaleY = 1;
        getClose.x = getBg.getScaledWidth() - getClose.width/2;
        getClose.y = getBg.y - getClose.height/3;

        var getBall = new Hilo.BitmapText({
            id: 'chooseBall',
            glyphs: properties.ballSet,
            text: "0"
        }).addTo(chooseRes);
        getBall.scaleX = 1;
        getBall.scaleY = 1;
        getBall.x = getShot.x + getShot.getScaledWidth()/2 - getBall.width/2;
        getBall.y = getShot.y - getBall.height;

        var getText = new Hilo.Text({
            id: 'testShow',
            font: "14px arial",
            text: '您这轮的球是：',
            color:'#666666',
            lineSpacing:24
        }).addTo(chooseRes);
        getText.x = getBall.x + getBall.getScaledWidth()/6;
        getText.y = getBall.y - 20;

        var ballSet = new Hilo.Container({
            id:'ballSet',
            width:300,
            height:300,
            x:properties.width/2 ,
            y:properties.height/2
        });
        var ball0 = new Hilo.BitmapText({
            id: 'ball0',
            glyphs: properties.ballSet,
            text: "0"
        }).addTo(ballSet);
        var ball1 = new Hilo.BitmapText({
            id: 'ball1',
            glyphs: properties.ballSet,
            text: "1",
        }).addTo(ballSet);
        var ball2 = new Hilo.BitmapText({
            id: 'ball2',
            glyphs: properties.ballSet,
            text: "2",
        }).addTo(ballSet);
        var ball3 = new Hilo.BitmapText({
            id: 'ball3',
            glyphs: properties.ballSet,
            text: "3",
        }).addTo(ballSet);
        var ball4 = new Hilo.BitmapText({
            id: 'ball4',
            glyphs: properties.ballSet,
            text: "4",
        }).addTo(ballSet);



        ball0.scaleX = 1;
        ball0.scaleY = 1;
        ball0.x = ballSet.width/2 - ball0.scaleX*ball0.width/2;
        ball0.y = 0;

        ball1.scaleX = 1;
        ball1.scaleY = 1;
        ball1.x = 0;
        ball1.y = ballSet.height/2 - ball1.scaleY*ball1.height/2 - 20;

        ball2.scaleX = 1;
        ball2.scaleY = 1;
        ball2.x = ballSet.width - ball2.scaleX*ball2.width;
        ball2.y = ballSet.height/2 - ball2.scaleY*ball2.height/2 -20;

        ball3.scaleX = 1;
        ball3.scaleY = 1;
        ball3.x =  30;
        ball3.y = ballSet.height - ball3.scaleY*ball3.height;

        ball4.scaleX = 1;
        ball4.scaleY = 1;
        ball4.x = ballSet.width - ball4.scaleX*ball4.width - 30;
        ball4.y = ballSet.height - ball4.scaleY*ball4.height;

        ballSet.pivotX = 150;
        ballSet.pivotY = 150;
        this.addChild(getBgMask,chooseRes, ballSet);
    },
    showRes:function(){
        this.selectedNum = Math.floor(Math.random()*4.99);
        this.getChildById('ballSet').visible = false;
        this.getChildById('chooseRes').getChildById('chooseBall').setText(this.selectedNum);
        this.getChildById('chooseRes').visible = true;
    },
    chooseBallFuc:function(){
        this.getChildById('ballSet').visible = true;
        this.getChildById('chooseRes').visible = false;
        var ballSet = this.getChildById('ballSet');
        var ball0 = this.getChildById('ballSet').getChildById('ball0');
        var ball1 = this.getChildById('ballSet').getChildById('ball1');
        var ball2 = this.getChildById('ballSet').getChildById('ball2');
        var ball3 = this.getChildById('ballSet').getChildById('ball3');
        var ball4 = this.getChildById('ballSet').getChildById('ball4');
        if(ballSet.tween){
            ballSet.tween = {};
            ball0.tween = {};
            ball1.tween = {};
            ball2.tween = {};
            ball3.tween = {};
            ball4.tween = {};
        }
        ballSet.tween = Hilo.Tween.fromTo(ballSet,{ rotation:0},{rotation:360},
           {duration:4500, reverse:false, loop:false, onComplete:this.showRes.bind(this)}
         );
        ball0.tween = Hilo.Tween.fromTo(ball0, 
            {x:ball0.x,y:ball0.y},
            {x:ball0.x + 75 - ball0.x/2 - ball0.width/4, y:ball0.y + 75 - ball0.y/2 - ball0.height/4}, 
            {delay:100,duration:1000, reverse:true, loop:false,repeat:2});
        ball1.tween = Hilo.Tween.fromTo(ball1, 
            {x:ball1.x,y:ball1.y},
            {x:ball1.x + 75 - ball1.x/2 - ball1.width/4, y:ball1.y + 75 - ball1.y/2 - ball1.height/4}, 
            {delay:100,duration:1000, reverse:true, loop:false,repeat:2});
        ball2.tween = Hilo.Tween.fromTo(ball2, 
            {x:ball2.x,y:ball2.y},
            {x:ball2.x + 75 - ball2.x/2 - ball2.width/4, y:ball2.y + 75 - ball2.y/2 - ball2.height/4}, 
            {delay:100,duration:1000, reverse:true, loop:false,repeat:2});
        ball3.tween = Hilo.Tween.fromTo(ball3, 
            {x:ball3.x,y:ball3.y},
            {x:ball3.x + 75 - ball3.x/2 - ball3.width/4, y:ball3.y + 75 - ball3.y/2 - ball3.height/4}, 
            {delay:100,duration:1000, reverse:true, loop:false,repeat:2});
        ball4.tween = Hilo.Tween.fromTo(ball4, 
            {x:ball4.x,y:ball4.y},
            {x:ball4.x + 75 - ball4.x/2 - ball4.width/4, y:ball4.y + 75 - ball4.y/2 - ball4.height/4}, 
            {delay:100,duration:1000, reverse:true, loop:false,repeat:2});
    }

});

})(window.game);
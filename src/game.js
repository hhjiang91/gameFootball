(function(){

// window.onload = function(){
//     game.init();
// }

var game = window.game = {
    width: 0,
    height: 0,
    score:0,
    number:10,

    asset: null,
    stage: null,
    ticker: null,

    bg: null,
    gameReadyScene: null,

    init: function(){
        this.asset = new game.Asset();
        this.asset.on('complete', function(e){
            this.asset.off('complete');
            this.initStage();
        }.bind(this));
        this.asset.load();
    },

    initStage: function(){
        if (window.innerWidth)
            this.width = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            this.width = document.body.clientWidth;
        if (window.innerHeight)
            this.height = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            this.height = document.body.clientHeight;
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
        {
            this.height = document.documentElement.clientHeight;
            this.width = document.documentElement.clientWidth;
        }
         // $("#fancy-result-low .container").css("height", this.height);
        this.scale = 1;

        //舞台
        this.stage = new Hilo.Stage({
            renderType:'canvas',
            width: this.width,
            height: this.height,
            scaleX: this.scale,
            scaleY: this.scale
        });
        document.body.appendChild(this.stage.canvas);

        //启动计时器
        this.ticker = new Hilo.Ticker(60);
        this.ticker.addTick(Hilo.Tween);
        this.ticker.addTick(this.stage);
        this.ticker.start();

        //绑定交互事件
        this.stage.enableDOMEvent(Hilo.event.POINTER_START, true);
        //this.stage.on(Hilo.event.POINTER_START, this.onUserInput.bind(this));

        //初始化
        // this.initBackground();
        this.initScenes();
        this.initBall();
        this.initGuid();
        this.initRuleContent();
        this.initRule();
        this.initCurrentScore();
        this.initChooseScenes();
        //准备游戏
        this.gameReady();
    },

    initBackground: function(){
        //背景
        var bgWidth = this.width * this.scale;
        var bgHeight = this.height * this.scale;
        document.body.insertBefore(Hilo.createElement('div', {
            id: 'bgMask',
            style: {
                background: 'red',
                backgroundSize:'contain',
                position: 'absolute',
                top:'0px',
                bottom: '0px',
                left:'0px',
                right:'0px'
            }
        }), this.stage.canvas);
    },

    initRuleContent:function(){
        this.ruleContent = new Hilo.Bitmap({
            id: 'ruleContent',
            image: this.asset.ruleContent,
            rect: [0, 0, 649, 360],
            visible:false
        }).addTo(this.stage);
        this.ruleContent.scaleX = 0.5;
        this.ruleContent.scaleY = 0.5;
        this.ruleContent.x = this.width/2 - this.ruleContent.scaleX*this.ruleContent.width/2;
        this.ruleContent.y = this.height/2 - this.ruleContent.scaleY*this.ruleContent.height/2;
    },
    initRule:function(){
        //当前分数
        this.rule = new Hilo.Bitmap({
            id: 'rule',
            image: this.asset.rule,
            rect: [0, 0, 187, 63]
        }).addTo(this.stage, 1000);
        this.rule.scaleX = 0.5;
        this.rule.scaleY = 0.5;
        this.rule.x = this.width - this.rule.width*this.rule.scaleX - 10;
        this.rule.y = 30 ;
         //绑定rule按钮事件
        this.stage.getChildById('rule').on(Hilo.event.POINTER_START, function(e){
            e._stopped = true;
            if (this.ruleContent.visible == false) {
                this.ruleContent.visible = true;
                setTimeout((function(){this.ruleContent.visible = false;}).bind(this), 2000);
            }
        }.bind(this));
    },
    initCurrentScore:function(){
        //当前分数
        this.currentScore = new Hilo.BitmapText({
            id: 'score',
            glyphs: this.asset.numberAtlas,
            text: "a"
        }).addTo(this.stage);
        //设置当前分数的位置
        this.currentScore.x = 10;
        this.currentScore.y = 20;
        this.currentScore.scaleX = 0.3;
        this.currentScore.scaleY = 0.3;
    },
    initBall:function(){
        var startDom = this.gameReadyScene.getChildById('start');
        var startY = startDom.y;
        // var startX = this.width;
        var startX = startDom.x + startDom.getScaledWidth()/2;
        this.ball = new game.Ball({
            idBall: 'ball',
            imageBall: this.asset.ballAtlas,
            heightBall: startY,
            widthBall:startX,
            height:this.height
        }).addTo(this.stage, this.gameReadyScene.depth-1);

        // 店家足球
        this.ball.getChildById('ball').on(Hilo.event.POINTER_START, function(e){
            e._stopped = true;
            if(this.checkNum()) {
                if (this.gameReadyScene.getChildById('start').visible == true) {
                    this.gameStart();
                } 
            }else{
                alert("请稍等，分数即将出来");
            }
        }.bind(this));

    },
    initGuid:function(){
        var startDom = this.ball.getChildById('ball');
        var startY = startDom.y;
        var startX = startDom.x + startDom.getScaledWidth()/2;
        this.guid = new game.Guid({
            id: 'guid',
            guidAtlas: this.asset.guidAtlas0,
            height: this.height,
            width:startX
        }).addTo(this.stage, this.ball.depth - 1);
    },
    initScenes: function(){
        //准备场景
        this.gameReadyScene = new game.ReadyScene({
            width: this.width,
            height: this.height,
            image: this.asset.startBtn,
            footImg: this.asset.foot
        }).addTo(this.stage);

        //绑定开始按钮事件
        this.gameReadyScene.getChildById('start').on(Hilo.event.POINTER_START, function(e){
            e._stopped = true;
            this.gameStart();
        }.bind(this));

        // 绑定foot
        var getFoot = this.gameReadyScene.getChildById('foot');
        var footX = getFoot.x;
        var footY = getFoot.y;
        this.gameReadyScene.getChildById('foot').on(Hilo.event.POINTER_START, function(e){
            e._stopped = true;
            if (getFoot.tween) {
                getFoot.tween = {};
            };
            getFoot.tween = Hilo.Tween.fromTo(getFoot,{y:getFoot.y,rotation:-50},{y:getFoot.y-30,rotation:8},
               {duration:500, reverse:false, loop:false, onComplete:this.gamePlay.bind(this)});
        }.bind(this));
    },
    initChooseScenes:function(){
        this.gameChooseScene = new game.ChooseScene({
            width: this.width,
            height: this.height,
            ballSet: this.asset.ballAtlas,
            bgImg: this.asset.chooseBg,
            shotImg: this.asset.chooseShot,
            closeImg: this.asset.chooseClose,
            visible:false
        }).addTo(this.stage);
        //绑定关闭事件
        this.gameChooseScene.getChildById('chooseRes').getChildById('chooseClose').on(Hilo.event.POINTER_START, function(e){
            e._stopped = true;
            this.gameChooseScene.visible = false;
        }.bind(this));
        // 绑定开始射门
        this.gameChooseScene.getChildById('chooseRes').getChildById('chooseShot').on(Hilo.event.POINTER_START, function(e){
            e._stopped = true;
            this.ball.children[0].setText(this.gameChooseScene.selectedNum);
            this.gameChooseScene.visible = false;
            this.gameReadyScene.getChildById('start').visible = false;
            this.gameReadyScene.getChildById('foot').visible = true;

        }.bind(this));
    },

    gameReady: function(){
        this.num = 10;
        this.score = 0;
        this.currentScore.visible = true;
        this.currentScore.setText("0");
        this.gameReadyScene.visible = true;
        this.ball.getReady();
        this.guid.getReady();
    },

    gameStart: function(){
        this.gameChooseScene.visible = true;
        this.gameChooseScene.chooseBallFuc();
    },
    gamePlay:function(){
        var getFoot = this.gameReadyScene.getChildById('foot');
        getFoot.tween = {};
        getFoot.tween = Hilo.Tween.to(getFoot,{y:getFoot.yOrg,x:getFoot.xOrg,rotation:0},
           {delay:500,duration:500, reverse:false, loop:false});
        var num1 = Math.floor(Math.random()*4);
        var timeSlide;
        if(Math.random()>0.6){
            var num2 = Math.floor(Math.random()*4);
            while(num2 == num1){
                var num2 = Math.floor(Math.random()*4);
            }
            this.score += 1;
            timeSlide = 1300;
        }else{
            var num2 = num1;
            timeSlide = 2000;
        }
        this.ball.moveBall(num1, num1==num2);
        this.guid.startMove(num2);
        this.num -= 1;
        if (this.num == 0) {
            setTimeout(this.showResult.bind(this), timeSlide);
        }else{
           setTimeout(this.gameTemp.bind(this), timeSlide);
        }
    },
    gameTemp:function(){
        if (this.score == 10) {
            this.currentScore.setText("a");
        }else{
            this.currentScore.setText(this.score);
        }
        // this.gameReadyScene.getChildById('start').visible = true;
        this.ball.getReady();
        this.guid.getReady();
    },
    gameOver: function(){

    },
    checkNum:function(){
        return this.num > 0;
    },
    showResult: function(){
        this.gameTemp();
        $('.last_score_high').html(this.score);
        var percentage = 0, fraction = 0;
        for(var i = this.score - 1; i >= 0; i--) {
               fraction +=  100 - Math.floor(Math.random()*40);
        };
        for(var i = 10 - this.score + 1; i >= 0; i--) {
               fraction +=  50 - Math.floor(Math.random()*20);
        };
        if(this.score==0){
            percentage=1;
        }else if(this.score==1){
            percentage=15;
        }else if(this.score==2){
            percentage=30;
        }else if(this.score==3){
            percentage=43;
        }else if(this.score==4){
            percentage=50;
        }else if(this.score==5){
            percentage=58;
        }else if(this.score==6){
            percentage=64;
        }else{
            percentage=71;
        }
        $('.score_percentage_high').html(percentage+'%');
        $('.score_fen_high').html(fraction);

        setTimeout(
            function(){
                layer.open({
                    type: 1,
                    shade: [0.8, '#393D49'],
                    title: false, //不显示标题
                    content: $('#fancy-result-low'), //捕获的元素
                    cancel: function(index){
                      layer.close(index);
                      location.reload();
                    }
                });
            
        },100) 
    }
};

})();
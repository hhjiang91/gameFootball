
(function(ns){

var Asset = ns.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,

    queue: null,
    bg: null,
    score: null,
    rule: null,
    guid: null,
    ball: null,
    startBtn: null,
    share:null,
    replay:null,
    home:null,
    result:null,
    shareInfo:null,
    ballSet:null,
    chooseBg:null,
    chooseShot:null,
    chooseClose:null,
    foot:null,


    load: function(){
        var resources = [
            {id:'bg', src:'images/wc_game_wrap.png'},
            {id:'scoreAtlas', src:'images/pai_heng.png'},
            {id:'rule', src:'images/youxi.png'},
            {id:'ruleContent', src:'images/guize.png'},
            {id:'guidAtlas', src:'images/wc_gk.png'},
            {id:'ball', src:'images/wc_ball.png'},
            {id:'startBtn', src:'images/wc_btn_shoot.png'},
            {id:'share', src:'images/share.png'},
            {id:'replay', src:'images/replay.png'},
            {id:'home', src:'images/home.png'},
            {id:'result', src:'images/result.png'},
            {id:'shareInfo', src:'images/shareInfo.png'},
            {id:'ballSet', src:'images/wc_ball_set.png'},
            {id:'chooseBg', src:'images/wc_pop_bkg.png'},
            {id:'chooseShot', src:'images/wc_fc_choose_btn.png'},
            {id:'chooseClose', src:'images/wc_pop_close.png'},
            {id:'foot', src:'images/wc_leg.png'}
        ];

        this.queue = new Hilo.LoadQueue();
        this.queue.add(resources);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.start();
    },

    onComplete: function(e){
        this.bg = this.queue.get('bg').content;
        this.rule = this.queue.get('rule').content;
        this.ball = this.queue.get('ball').content;
        this.startBtn = this.queue.get('startBtn').content;
        this.ruleContent = this.queue.get('ruleContent').content;
        this.share = this.queue.get('share').content;
        this.replay = this.queue.get('replay').content;
        this.home = this.queue.get('home').content;
        this.result = this.queue.get('result').content;
        this.shareInfo = this.queue.get('shareInfo').content;
        this.chooseBg = this.queue.get('chooseBg').content;
        this.chooseShot = this.queue.get('chooseShot').content;
        this.chooseClose = this.queue.get('chooseClose').content;
        this.foot = this.queue.get('foot').content;
        // this.guidAtlas = this.queue.get('guidAtlas').content;
        var guid = this.queue.get('guidAtlas').content;
        this.guidAtlas0 = {
            0: {image:guid, rect:[0, 0, 324, 200]},
            1: {image:guid, rect:[0, 192*1+20, 324, 192]},
            2: {image:guid, rect:[0, 192*2+1, 324, 192]},
            3: {image:guid, rect:[0, 192*3+1, 324, 192]},
            4: {image:guid, rect:[0, 769, 324, 170]}
        };

        var ball = this.queue.get('ballSet').content;
        this.ballAtlas = {
            0: {image:ball, rect:[0, 0, 120, 120]},
            1: {image:ball, rect:[0, 120*1, 120, 120]},
            2: {image:ball, rect:[0, 120*2, 120, 120]},
            3: {image:ball, rect:[0, 120*3, 120, 120]},
            4: {image:ball, rect:[0, 120*4, 120, 120]}
        };

        var number = this.queue.get('scoreAtlas').content;
        this.numberAtlas = {
            0: {image:number, rect:[0,0,207,324]},
            1: {image:number, rect:[208,0,207,324]},
            2: {image:number, rect:[415,0,207,324]},
            3: {image:number, rect:[621,0,207,324]},
            4: {image:number, rect:[829,0,207,324]},
            5: {image:number, rect:[1036,0,207,324]},
            6: {image:number, rect:[1243,0,207,324]},
            7: {image:number, rect:[207*7+1,0,207,324]},
            8: {image:number, rect:[207*8 + 1,0,207,324]},
            9: {image:number, rect:[207*9 + 1,0,207,324]},
            a: {image:number, rect:[2071,0,207,324]}
        };

        this.queue.off('complete');
        this.fire('complete');
    }
});

})(window.game);
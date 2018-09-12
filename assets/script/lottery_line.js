
var global = require('Global'); 
cc.Class({
    extends: cc.Component,

    properties: {    

        icon:cc.Sprite,

        lottername:cc.Label,

        //lastdate:cc.Label,
        lastnum:cc.Label,

        currdate:cc.Label,
        currtime:cc.Label,

        //btn_trend:cc.Button,
        //bnt_rule:cc.Button,
        
        _controller_lottery:null,
        _lotterydata:null,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        
        this._controller_lottery =   cc.Canvas.instance.getComponent('controller_lottery');

        this.node.on('initlottery',this.initlottery,this);
        this.node.on('updatelottery',this.updatelottery,this);

        // this.btn_trend.on('click',this._controller_lottery,btn_trend,this);
        // this.btn_rule.on('click',this._controller_lottery,btn_rule,this);     
     },

    start () {

    },

    config:function(){

    },

    // update (dt) {},

    initlottery:function(event){
        if(cc.isValid(event.detail.data)){
            this._lotterydata = event.detail.data.split(",");            
           
            this.lottername.string = global.idtoname(this._lotterydata[0]); 
            //this.lastdate.string ='距'+global.currlottery[2]+'期';

            this.icon.spriteFrame = this._controller_lottery.geticon(this._lotterydata[0]);
            
            var num =this._lotterydata[5].replace(/\*/g,'0');  
            var numstr ='';
            
            switch(global.idtotype(this._lotterydata[0])){
                
                case 'syxw':
                    numstr =global.setnumstr(num,'syxw');
                    this.lastnum.font = this._controller_lottery.fonts[3];
                    this.lastnum.node.color = new cc.Color(235,182,17);       
                    break; 
                case 'pk10':
                    numstr =global.setnumstr(num,'pk10');
                    this.lastnum.font = this._controller_lottery.fonts[1];
                    this.lastnum.node.color = new cc.Color(255,255,255);   
                    break;                    
                default://ssc
                    numstr = num;
                    this.lastnum.font = this._controller_lottery.fonts[0];
                    this.lastnum.node.color = new cc.Color(235,182,17);           
            }
          
            this.lastnum.string = numstr;             
            
            this.currdate.string = '距'+ (this._lotterydata[2]-0)+1 +'期截止时间';
            this.currtime.string = global.getdate(this._lotterydata[1],this._lotterydata[3],this._lotterydata[4]);             
        }
    },

    updatelottery:function(){

       if(!cc.isValid(this._lotterydata)) return;
        this._lotterydata[3]++;        

        this.currtime.string = global.getdate(this._lotterydata[1],this._lotterydata[3],this._lotterydata[4]);

         if(this.currtime.string =='封盘中...'){
             global.getlotterydata(this._lotterydata[0],this.node,'initlottery');
         }  
    },

    btn_detail:function(){
        global.currlottery = this._lotterydata;

        switch(this._lotterydata[0].charAt(0)){
            case '1':cc.director.loadScene('p_lottery_detail');break;
            case '2':cc.director.loadScene('p_lottery_detail_pks');break;
            case '3':cc.director.loadScene('p_lottery_detail_syxw');break;
            case '4':cc.director.loadScene('p_lottery_detail_gf');break;
            default:cc.director.loadScene('p_lottery_detail');
        } 

        //cc.director.loadScene('p_lottery_detail');
    },
    btn_trend:function(){
        if(cc.isValid(this._controller_lottery) )
            this._controller_lottery.node.emit('trend',{id:this._lotterydata[0]});
    },
    btn_rule:function(){
        if(cc.isValid(this._controller_lottery) )
        this._controller_lottery.node.emit('rule',{id:this._lotterydata[0]})
    }
});

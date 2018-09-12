// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        seatid:cc.Label,
        btn_ball:[cc.Node],
        btn_style:[cc.Button],

        ballcolor:[cc.Color],

        lay_ball:cc.Node,
        lay_style:cc.Node,

        _lotterytype:'1001',

        _seat:1,
        //         0 1 2 3 4 5 6 7 8 9 10 11 12 13
        _selected:0,

        _ballstatus:[],
        //_ballmax:10,
        //_ball0:0,

        _controller_lottery_detail:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.node.on('init',this.initline,this);
        this._controller_lottery_detail =   cc.Canvas.instance.getComponent('controller_lottery_detail');
        
        this._selected= 0;
        //this._selected= 0;//[0,0,0,0,0,0,0,0,0,0];   
        
        this.btn_ball = this.lay_ball.children;
       
        switch(this._controller_lottery_detail.currlotterytype){
            case 'ssc':
            case 'gfsd':
                this._ballstatus = [0b1111111111,0b1010101010,0b0101010101,0b1111100000,0b0000011111,0b0];
                break;
            case 'syxw':
                this._ballstatus = [0b11111111111,0b10101010101,0b01010101010,0b11111100000,0b00000011111,0b0];               
                break;
            case 'pk10':
                this._ballstatus = [0b1111111111,0b0101010101,0b1010101010,0b1111100000,0b0000011111,0b0];
                break;           
            
            default:
            break;
        }

    },

    //  start () {

       
    //  },

    // update (dt) {},

    initline:function(event){
        this._seat =event.detail.seat-0;
        this._lotterytype =event.detail.type;

      
        this.seatid.string = event.detail.seatname;

        switch(this._lotterytype){
            case 'ssc':
                //this.seatid.string = event.detail.seatname;
            
               // cc.log('----- initline-----');
               // cc.log(event.detail);
                switch(event.detail.parent-0){
                    case 12:
                    case 13:
                    case 14:
                        if(event.detail.son-0 == 32){
                            this.btn_ball[0].active = false;
                            this.btn_ball[27].active = false;
                        }
                    break;

                    case 15:
                    case 16:                       
                        if(event.detail.son-0 == 24){       
                            for(var i=19;i<28;i++)                    
                                this.btn_ball[i].active = false;
                        }else{
                            if(event.detail.son-0 == 32){
                                
                                this.btn_ball[0].active = false;                                   
                                for(var i=18;i<28;i++)                    
                                    this.btn_ball[i].active = false;                                                            
                            }
                        }
                    break;
                }
               
            break;

            case 'pk10':                  
                if(event.detail.parent-0 == 36){
                    this.lay_ball.children[1].active = false;
                }
            //和值时隐藏部分球
                if(event.detail.son-0 == 86){
                    for(var i=3 ;i<this.lay_ball.childrenCount;i++){
                        if(i <3 || i>19) this.lay_ball.children[i].active = false;
                    }
                }
            break;

            case 'syxw':
            //猜中位玩法,隐藏 前二  后二个 球
                if(event.detail.son-0 == 66){
                    this.lay_style.active = false;
                    this.lay_ball.children[10].active = false;
                    this.lay_ball.children[9].active = false;
                    this.lay_ball.children[1].active = false;
                    this.lay_ball.children[0].active = false;
                }
            break;

            case 'gfsd':
                if(event.detail.son-0 == 32){
                    this.btn_ball[0].active = false;
                    this.btn_ball[27].active = false;
                }
            break;
        }        
    },
    
    setballstatus:function(id){         
        
        var d=0;
        switch(this._lotterytype){
            case 'ssc':
            case 'gfsd':break;
            case 'pk10':
                if(this._controller_lottery_detail._currparent <36 )
                    d=1;
                break;
            case 'syxw':d=1;break;
            
            default:break;
        }

        // n=4      0b0000010000
        var v= Math.pow(2,id-d);
        //this._selected += Math.pow(2,n);    


        if( (this._selected&v)  == 0 ){
                    
            this._selected += v;
            this.btn_ball[id-d].color = this.ballcolor[1];                
        }else{
           
            this._selected -= v;
            this.btn_ball[id-d].color = this.ballcolor[0];
        }         
    },

    click_ball:function(event,customEventData){
        //cc.log(customEventData)
        var n =customEventData-0;

        if( n >= 0){           
        
            this.setballstatus(n);
            //
            if(cc.isValid(this._controller_lottery_detail ) ){
                this._controller_lottery_detail.configorder(this._seat,this._selected);
            }
        }
    },

    click_style:function(event,customEventData){
        //cc.log(customEventData);
        switch(customEventData){
            case 'all':
                for(var i=0;i<this.lay_ball.childrenCount;i++){               
                    this.btn_ball[i].color = this.ballcolor[1];
                }
                this._selected = this._ballstatus[0];
                break;

            case 'ji':
                this._selected = this._ballstatus[1];
                var max=10;
                var ji0=1;
                var ji1=0;
                if(this._controller_lottery_detail.currlotterytype =='syxw'){
                    max =11;ji0 =0;ji1=1;
                }
                if(this._controller_lottery_detail.currlotterytype =='pk10'){
                    ji0 =0;ji1=1;
                }
                for(var i=ji0;i<this.lay_ball.childrenCount;i+=2){                
                    this.btn_ball[i].color = this.ballcolor[1];
                }
                for(var i=ji1;i<max;i+=2){                    
                    this.btn_ball[i].color = this.ballcolor[0];
                }
                break;

            case 'ou':
                this._selected = this._ballstatus[2];
                var max=10;
                var ou0=0;
                var ou1=1;
                if(this._controller_lottery_detail.currlotterytype =='syxw'){
                    max =11;ou0=1;ou1=0;
                }

                if(this._controller_lottery_detail.currlotterytype =='pk10'){
                   ou0=1;ou1=0;
                }
                for(var i=ou0;i<this.lay_ball.childrenCount;i+=2){                
                    this.btn_ball[i].color = this.ballcolor[1];
                }
                for(var i=ou1;i<max;i+=2){                
                    this.btn_ball[i].color = this.ballcolor[0];
                }
                break;

            case 'da':
                this._selected = this._ballstatus[3];
                for(var i=0;i<this.lay_ball.childrenCount;i++){
                    if(i<5){                    
                        this.btn_ball[i].color = this.ballcolor[0];
                    }else{                    
                        this.btn_ball[i].color = this.ballcolor[1];
                    }
                }
                break;

            case 'xiao':
                this._selected = this._ballstatus[4];
                for(var i=0;i<this.lay_ball.childrenCount;i++){
                    if(i>=5){                    
                        this.btn_ball[i].color = this.ballcolor[0];
                    }else{                    
                        this.btn_ball[i].color = this.ballcolor[1];
                    }
                }
                break;

            case 'qing':
                this._selected = 0b0;
                for(var i=0;i<this.lay_ball.childrenCount;i++){                
                    this.btn_ball[i].color = this.ballcolor[0];
                }
                break;
        }
        if(cc.isValid(this._controller_lottery_detail ) )
            this._controller_lottery_detail.configorder(this._seat,this._selected);
    },
});
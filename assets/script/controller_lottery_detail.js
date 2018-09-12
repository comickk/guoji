// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var global = require('Global'); 
var config =require('Config');
var rule = require('rule');
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

        lotteryname:cc.Label,

        lastdate:cc.Label,
        lastnum:cc.Label,

        currdate:cc.Label,
        currtime:cc.Label,


        lay_son:cc.Node,

        btnparent:cc.Node,
        btnson:cc.Node,

        pay:cc.Node,
        order:cc.Node,
        fonts:[cc.Font],
        line:[cc.Prefab],

        content:cc.Node,

        ballzone:cc.Node,   
        ballwidget:cc.Widget,     

        currlotterytype:'ssc',
        _currparent:0,
        _currson:0,
        _currstyle:null,

        _balls:null,

        _ballzoneheight:0,

        _controller_pay:null,


        //_defaulttop:0,
        //_defaultbuttom:0,

        
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.node.on('setlottery',this.setlottery,this);   

         //this.node.on('confirmorder',this.confirmorder,this);

         this._controller_pay = this.pay.getComponent('lottery_detail_pay');        
         
        // this._defaultbuttom = this.pay.height;
        //cc.log(this._defaultbuttom);
         
     },

    start () {
        //cc.log(global.currlottery);
        if(cc.isValid(global.currlottery)){
            this.initlottery();            
        
            //开启每秒更新
            this.schedule(function() {            
                this.updatelottery();
            }, 1);
        }

        this._ballzoneheight =this.ballzone.height;
    },

    // update (dt) {},   

    initlottery:function(){
        if(!cc.isValid(global.currlottery)) return;
        this.lotteryname.string = global.idtoname(global.currlottery[0]);
        this.lastdate.string ='第'+global.currlottery[2]+'期';
        var num =global.currlottery[5].replace(/\*/g,'0');   
        
        var id =global.currlottery[0];  

        var numstr ='';
        switch( global.idtotype(id) ){
            case 'ssc':
                this._currstyle =config.style.ssc;
                this._currlotterytype ='ssc';
                this._currparent =this._currson =10;
                this._balls=[0,0,0,0,0];
                this.createline('ssc');
                numstr =num;
                this.lastnum.font = this.fonts[0];
                this.lastnum.node.color = new cc.Color(235,182,17);break;
            case 'syxw':
                this._currstyle =config.style.syxw;
                this._currparent =21;
                this._currson =61;
                this._currlotterytype ='syxw';
                this.createline('syxw');
                this._balls=[0,0,0,0,0];
                numstr =global.setnumstr(num,'syxw');
                this.lastnum.font = this.fonts[3];
                this.lastnum.node.color = new cc.Color(235,182,17);break;
            case 'pk10':
                this._currstyle =config.style.pk10;
                this._currparent =31
                this._currson =11;
                this._currlotterytype ='pk10';
                this.createline('pk10');
                this._balls=[0,0,0,0,0,0,0,0,0,0];                
                numstr =global.setnumstr(num,'pk10');
                this.lastnum.font = this.fonts[1];
                this.lastnum.node.color = new cc.Color(255,255,255);break;
            case 'gfsd':
                this._currstyle =config.style.gfsd;
                this._currparent =41;
                this._currson =10;
                this._currlotterytype ='gfsd';
                this.createline('gfsd');
                this._balls=[0,0,0];
                numstr = num;
                this.lastnum.font = this.fonts[0];
                this.lastnum.node.color = new cc.Color(255,255,255);break;
            default:
                break;
        }

        this.lastnum.string = numstr;

        //取下一期
        var nextdate = (global.currlottery[2].substr(  global.currlottery[2].length-3 )-0)+1;
        if(nextdate < 100) nextdate='0'+nextdate;
        this.currdate.string = '第'+nextdate+'期';

        this.currtime.string = global.getdate(global.currlottery[1],global.currlottery[3],global.currlottery[4]);
              
    },

    configlottery:function(){
        this.lotteryname.string = global.idtoname(global.currlottery[0]);
        this.lastdate.string ='第'+global.currlottery[2]+'期';
        var num =global.currlottery[5].replace(/\*/g,'0');         

        this.lastnum.string = num;

        var nextdate = (global.currlottery[2].substr(  global.currlottery[2].length-3 )-0)+1;
        if(nextdate < 100) nextdate='0'+nextdate;
        this.currdate.string = '第'+nextdate+'期';
        this.currtime.string = global.getdate(global.currlottery[1],global.currlottery[3],global.currlottery[4]);
    },

    createline:function(type){

        this.content.destroyAllChildren();
        var maxline=0;

        var linetype =0;
        var lineseat =0;

        switch(type){
            case 'ssc':           
                maxline =5;     
                if(this._currson ==24 || this._currson ==32)
                    linetype=1;
        
                if(this._currparent == 19){         
                    if(this._currson ==10 ) this._currson = 46;
                    linetype=2;
                }    
        
                if(this._currparent == 20){         
                    if(this._currson ==10 ) this._currson = 50;                
                    if(this._currson == 54) linetype =3;
                }  
                break;

            case 'pk10':
                maxline=10;        
                if(this._currparent> 35)        //line he 1  dxds 2  lh  3
                    linetype =3-(this._currparent-36);//36  lh :1   37 dxds :2   38 he:3               
            break;

            case 'syxw':
                maxline=5;
            break;

            case 'gfsd':
                maxline =3;
                if(this._currparent == 45) linetype =2;
                if(this._currparent == 46) linetype =3;
                if(this._currson == 24 || this._currson ==32) linetype =1;
            break;
        }       

        lineseat = rule.getlineseat(this._currparent,this._currson);       
        
        for(var i=0;i<lineseat.length;i++){
            var node = cc.instantiate(this.line[linetype]);
            
            node.parent = this.content;

            node.emit('init',{type:type,seat: i+1,seatname: lineseat[i],parent:this._currparent,son:this._currson});           
        }
    },

    updatelottery:function(){
        global.currlottery[3]++;        

        this.currtime.string = global.getdate(global.currlottery[1],global.currlottery[3],global.currlottery[4]);

         if(this.currtime.string =='封盘中...'){
             global.getlotterydata(global.currlottery[0],this.node,'setlottery');
         }       
    },

    setlottery:function(event){
        if(cc.isValid(event.detail.data)){            
            global.currlottery =   event.detail.data.split(",");       

            this.lotteryname.string = global.idtoname(global.currlottery[0]);
            this.lastdate.string ='第'+global.currlottery[2]+'期';
            var num =global.currlottery[5].replace(/\*/g,'0');         

            this.lastnum.string = global.setnumstr(num,this._currlotterytype);            

            var nextdate = (global.currlottery[2].substr(  global.currlottery[2].length-3 )-0)+1;
            if(nextdate < 100) nextdate='0'+nextdate;
            this.currdate.string = '第'+nextdate+'期';
            this.currtime.string = global.getdate(global.currlottery[1],global.currlottery[3],global.currlottery[4]);                      
        }
    },

    btn_back:function(){

        cc.director.loadScene('p_lottery');
    },

    configorder:function(seat,balls){
        // cc.log(seat);
        // cc.log(balls);

        this._balls[ seat-1] = balls;

        //cc.log(this._balls)
        var v=0;
        for( var i=0;i<this._balls.length;i++)
            v += this._balls[i];
        
        if(v>0){
            if(!this.pay.active) {
                this.pay.active=true;
                this.ballwidget.bottom = this.pay.height;
               
                //this.ballwidget.top = 120;
            }
            //this.ballwidget.node.height-=160;
            //this.ballzone.height =this._ballzoneheight- 160;
            
            if(cc.isValid(this._controller_pay)){                
                this._controller_pay.setting(this._balls,this._currparent,this._currson);
            }
        }else{
            if(this.pay.active) {
                this.pay.active=false;
                this.ballwidget.bottom = 0;
               
                //this.ballwidget.top = 120;
            }
            //this.ballwidget.node.height +=160;
            //this.ballzone.height =this._ballzoneheight;
        }

        //cc.log(this._balls);
        //cc.log(rule.rule_ssc_wx(this._balls,''+this._currparent+this._currson));
        //cc.log(this.ballzone.height);
    },

    btn_parent:function(event,customEventData){
        //cc.log('-----parent----'+customEventData);

        var style = customEventData-0;      

        if(this._currstyle!= null){

            var x=0;
            for(var i=0;i<this._currstyle.parent.length;i++){
                if(style == this._currstyle.parent[i]){
                    x =i;
                    break;
                }
            }

            for(var i=0;i<this.btnson.childrenCount;i++){
                this.btnson.children[i].active = false;
                
                for(var j=0;j<this._currstyle.son[x].length;j++){    
                   
                    if( this.btnson.children[i].name == 's'+this._currstyle.son[x][j]){                        
                        this.btnson.children[i].active = true;
                    }
                }
            }            
        }  

        if(this._currparent == style){
            this.lay_son.active =!this.lay_son.active;
              
        }else{
            this._currparent = style;
            this.lay_son.active=true;

            //新选择一个父类，需要设置一个默认的子玩法
            switch(this._currlotterytype){
                case 'ssc':
                    this._currson = config.style.ssc.son[ this._currparent-10 ][0];
                    
                    if(this._currson == 11)//无子项时隐藏子项选单
                        this.lay_son.active = false;        
                    this._balls=[0,0,0,0,0];       
                break;

                case 'syxw':
                    this._currson = config.style.syxw.son[ this._currparent-21 ][0];
                        
                    if(this._currson == 11)//无子项时隐藏子项选单
                        this.lay_son.active = false;     
                    this._balls=[0,0,0,0,0];      
                break;

                case 'pk10':
                    this._currson = config.style.pk10.son[ this._currparent-31 ][0];
                            
                    if(this._currson == 11)//无子项时隐藏子项选单
                        this.lay_son.active = false;   
                    this._balls=[0,0,0,0,0,0,0,0,0,0];   
                break;
                
                case 'gfsd':
                    this._currson = config.style.gfsd.son[ this._currparent-41 ][0];
                   
                    if(this._currson == 11)//无子项时隐藏子项选单
                        this.lay_son.active = false;   
                    this._balls=[0,0,0];
                break;

                default:
                break;
            }
            if(this._currparent == 17){
                this.lay_son.active = false;
                this._currson =11;
            }

            this.createline(this._currlotterytype);
        }
    },

    btn_son:function(event,customEventData){
        //cc.log('-----son----'+customEventData);
        this._currson =customEventData-0;
        
        if(cc.isValid(this._controller_pay))
            this._controller_pay.setting(this._balls,this._currparent,this._currson);
        
        this.createline(this._currlotterytype);

        this.lay_son.active=false;      
    },

    btn_record:function(){
      
        if(!cc.isValid(global.currlottery)) return ;
        global.currrecordtype ='record';
        global.currlotteryid=global.currlottery[0];
        cc.director.loadScene('p_lottery_record');         
    },

    confirmorder:function(data){
        this.order.active = true;
      
        this.order.emit('confrimorder',{data:data});
      
       // var _ball = '';
        // for(var i=0;i<max;i++){
        //    var _ball = data.ball[i].toString(2); 
        // }

        
    },
});

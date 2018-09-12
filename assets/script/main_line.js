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
        left_name:cc.Label,
        left_icon:cc.Sprite,
        left_time:cc.Label,

        right_name:cc.Label,
        right_icon:cc.Sprite,
        right_time:cc.Label,

        

        left_id:'1001',
        right_id:'1002',

        _left_data:null,
        _right_data:null,
    },



    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        
        this.node.on('setleft',this.setleft,this);
        this.node.on('setright',this.setright,this);

        this.node.on('updatelottery',this.updatelottery,this);
        
     },

    start () {
        this.config();
    }, 

    // update (dt) {},

    updatelottery:function(){
        
        if(this._left_data){
            this._left_data[3]++;
            this.left_time.string = global.getdate(this._left_data[1],this._left_data[3],this._left_data[4]);  

            if(this.left_time.string =='封盘中...'){
                global.getlotterydata(this.left_id,this.node,'setleft');
            }
        }

        if(this._right_data){
            this._right_data[3]++;             
            this.right_time.string = global.getdate(this._right_data[1],this._right_data[3],this._right_data[4]);        
    
            if(this.right_time.string =='封盘中...'){
                global.getlotterydata(this.right_id,this.node,'setright');
            }
        }
    },

    config:function(){
       
        global.getlotterydata(this.left_id,this.node,'setleft');
        global.getlotterydata(this.right_id,this.node,'setright');
      
    },        

    setleft:function(event){
        if(cc.isValid(event.detail.data)){
            this._left_data = event.detail.data.split(",");      
            //cc.log(this._left_data);                                
            this.left_name.string = global.idtoname(this._left_data[0]);            
            //this.left_time.string = global.getdate('20180726111742','20180726112248','300');   
            this.left_time.string = global.getdate(this._left_data[1],this._left_data[3],this._left_data[4]);   
        }      
    },
    setright:function(event){
        if(cc.isValid(event.detail.data)){
            this._right_data = event.detail.data.split(",");   
            //cc.log(this._right_data);                                   
            this.right_name.string = global.idtoname(this._right_data[0]);
            this.right_time.string = global.getdate(this._right_data[1],this._right_data[3],this._right_data[4]);  
        }   
    },

    btn_left:function(){
        //cc.log('--switch to --'+ this.left_id);
        global.currlottery = this._left_data;

        switch(this._left_data[0].charAt(0)){
            case '1':cc.director.loadScene('p_lottery_detail');
                global.currtype ='ssc';
                break;
            case '2':cc.director.loadScene('p_lottery_detail_pks');
                global.currtype ='pk10';
                break;
            case '3':cc.director.loadScene('p_lottery_detail_syxw');
                global.currtype ='syxw';
                break;
            case '4':cc.director.loadScene('p_lottery_detail_gf');
                global.currtype ='gfsd';
                break;            
            default:cc.director.loadScene('p_lottery_detail');
        }      
    },

    btn_right:function(){
        //cc.log('--switch to --'+ this.right_id);
        global.currlottery = this._right_data;
        
        switch(this._right_data[0].charAt(0)){
            case '1':cc.director.loadScene('p_lottery_detail');
                global.currtype ='ssc';
                break;
            case '2':cc.director.loadScene('p_lottery_detail_pks');
                global.currtype ='pk10';
                break;
            case '3':cc.director.loadScene('p_lottery_detail_syxw');
                global.currtype ='syxw';
                break;
            case '4':cc.director.loadScene('p_lottery_detail_gf');
                global.currtype ='gfsd';
                break;            
            default:cc.director.loadScene('p_lottery_detail');
        }        
    },

    /*    
        0:"1002"
        1:"1533643230"
        2:"2018080720"
        3:1534396386
        4:"1800"
        5:"935"
    */

});

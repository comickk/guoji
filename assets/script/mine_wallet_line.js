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
        icon:cc.Sprite,
        dateid:cc.Label,
        date:cc.Label,
        price:cc.Label,
        state:cc.Label,        

        statename:[],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.statename =['待开奖','中奖','未中奖'];
        this.node.on('init',this.init,this);
    },

    start () {

    },

    init:function(event){
        //"orderid":"20180822094854100000001","opencode_stat":"2"
        this.dateid.string = event.detail.orderid;
        this.state.string = this.statename[event.detail.opencode_stat-0];
    },

    // update (dt) {},

    btn_order:function(){
        cc.Canvas.instance.node.emit('show',{orderid:this.dateid.string});
    }

    // http://www.hengshengsj.com/1/opencode/show.php


});

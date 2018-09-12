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

        totle:cc.Label,        
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        global.currpage = 'bank';

       this.initdata();
     },

     initdata:function(){
        if(cc.isValid(global.userinfo)){
            this.totle.string =  (global.userinfo.amount_total-0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
     },

    // start () {

    // },

    // update (dt) {},

    btn_detail:function(){
        cc.director.loadScene('p_bank_record');
    },
    btn_put:function(){
        cc.director.loadScene('p_bank_pay');
    },
    btn_get:function(){

    },
    btn_record:function(){

    }
});

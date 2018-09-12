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

        username:cc.Label,
        
        eb_realname:cc.EditBox,
        eb_phone:cc.EditBox,
        
        eb_pwd1:cc.EditBox,
        eb_pwd2:cc.EditBox,
        eb_pwd3:cc.EditBox,

        tip:cc.Node,
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        if(cc.isValid(global.userinfo)){
            this.username.string = global.userinfo.username;
            this.eb_realname.placeholder = global.userinfo.realname;
            this.eb_phone.placeholder = global.userinfo.cellphone;
        }
    },

    btn_confirm:function(){

        this.tip.active = false;
    },

    btn_save:function(){

        if(this.eb_pwd2.placeholder.length >0 || this.eb_pwd3.placeholder.length>0){
            if(this.eb_pwd1.placeholder.length < 1){
                cc.log('请输入正确的旧密码');
            }else{
                if(this.eb_pwd2.placeholder!= this.eb_pwd3.placeholder)
                {
                    cc.log('新设密码不相同');
                }
            }
        }
    },

    // update (dt) {},
    btn_back:function(){

        cc.director.loadScene('p_mine');
    },
});

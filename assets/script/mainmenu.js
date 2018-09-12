// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html

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

        color:[cc.Color],
        btnimg:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
       // cc.log(global.ver);
       switch(global.currpage){
           case 'main':   this.setbtncolor(0);break;
           case 'lottery':   this.setbtncolor(1);break;
           case 'bank':   this.setbtncolor(2);break;
           case 'server':   this.setbtncolor(3);break;
           case 'mine':   this.setbtncolor(4);break;
       }
    },

    // update (dt) {},

    setbtncolor:function(seat){
        for(var i=0;i<5;i++){
            if( i == seat )
                this.btnimg[i].color = this.color[1];
            else
                this.btnimg[i].color = this.color[0];
        }
    },

    btn_main:function(){
        //cc.log('-------main-------');
        this.setbtncolor(0);
        if(global.currpage !='main')
            cc.director.loadScene('p_main');

    },

    btn_lottery:function(){
        //cc.log('-------lottery-------');
        this.setbtncolor(1);
        if(global.currpage !='lottery')
            cc.director.loadScene('p_lottery');
    },

    btn_bank:function(){
        //cc.log('-------bank-------');
        this.setbtncolor(2);
        if(global.currpage !='bank')
            cc.director.loadScene('p_bank');
    },

    btn_server:function(){
        //cc.log('-------server-------');
        this.setbtncolor(3);
        if(global.currpage !='server')
            cc.director.loadScene('p_server');
    },
    btn_mine:function(){
        //cc.log('-------mine-------');
        this.setbtncolor(4);
        if(global.currpage !='mine')
            cc.director.loadScene('p_mine');
    }
});

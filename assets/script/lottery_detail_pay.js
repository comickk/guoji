// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var config =require('Config');
var rule = require('rule');
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

        note:cc.Label,
        remaining:cc.Label,
        rule:cc.Label,

        price:cc.EditBox,

        _note:0,
        _odds:0,
        _totle:0,
        _remaining:0,
        _rule:0,

        _ball:[],

        _controller_lottery_detail:null,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this._controller_lottery_detail =   cc.Canvas.instance.getComponent('controller_lottery_detail');
     },

    // start () {
    // },

    // update (dt) {},

    setting:function(balls,parent,son){
        //cc.log(balls);
        //cc.log(parent+'   '+son);     

        var r =rule.rule(balls,parent,son);
        //r[0] = note num
        //r[1] = odds;
        this._note =r[0];
        this._odds = r[1];
        //this._rule = (''+parent+son)-0;
        this._rule = ''+parent+son;

        this._ball = balls;
        
        if(cc.isValid(global.userinfo))
            this._remaining =global.userinfo.amount_total;

        this._totle =r[0]*(this.price.string-0);
        this.note.string = '共'+r[0]+'注'+(this._totle-0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
                            +'元(最高可得'+((this.price.string-0)*r[1]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'元)';

        this.rule.string = config.parentname[parent-0]+'  '+config.sonname[son-0];

        this.remaining.string ='可用余额'+(this._remaining-0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    },

    btn_clean:function(){
        this.price.string = '';
        this.edit_pricechange();
    },

    btn_pay:function(){
        var data={};
        data.price = this.price.string-0;
        if(data.price <=0) return;
        if(this._note <=0 ) return;
       
        if(this._totle-0 > this._remaining-0) return;
       
        data.note = this._note;
        data.odds = this._odds;
        data.totle = this._totle;
        data.rule = this._rule;
        data.ball = this._ball;  
      
        this._controller_lottery_detail.confirmorder(data);
    },

    edit_pricechange:function(){
        var num =0;
        if(this.price.string.length>0){

            if(this.price.string -0 < 0.01)
                this.price.string = '0.01';

            num =this.price.string-0;        
        }
        this._totle =this._note*num;
        this.note.string = '共'+this._note+'注'+(this._totle-0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        +'元(最高可得'+(num*this._odds).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'元)';
        //this.note.string='共0注'+num+'元';

        if(cc.isValid(global.userinfo))
            this._remaining =global.userinfo.amount_total;
        this.remaining.string ='可用余额'+(this._remaining-0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    },
});

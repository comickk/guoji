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

        dateid:cc.Label,
        date:cc.Label,
        num:cc.Label,        
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this._controller =   cc.Canvas.instance.getComponent('controller_lottery_record');

         this.node.on('initdata',this.initlotterydata,this);
     },

    start () {

    },

    initlotterydata:function(event){
        var data = event.detail.data;
        //cc.log(data);

        this.dateid.string = '第'+data.opencode_cycle+'期';
        this.date.string = data.opencode_date;

        var numstr= data.opencode_num.replace(/\*/g,'0');  
        var nums = numstr.split(",");          
       
        var str=''; 
        for(var i=0;i<nums.length;i++){
            var n = nums[i]-0;
            if(n>9) {                
                if(n >10)
                    str += ':';
                else
                    str += '0';
            }else{
                str += n.toString();
            }            
        }       
        
        switch(global.currtype){
            case 'ssc':
                this.num.font = this._controller.fonts[0];
                this.num.node.color = new cc.Color(235,182,17);     break;
            case 'pk10':
                this.num.font =this._controller.fonts[1];
                this.num.node.color = new cc.Color(255,255,255);    break;
            case 'syxw':

                this.num.font = this._controller.fonts[3];
                this.num.node.color = new cc.Color(235,182,17);     break;
            case 'gfsd':
                this.num.font = this._controller.fonts[0];
                this.num.node.color = new cc.Color(255,255,255);     break;            
        }
      
        this.num.string =str;
    }

    // update (dt) {},
});

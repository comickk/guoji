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

        line:cc.Prefab,

        record_sv:cc.Node,
        help_sv:cc.Node,
        trend_sv:cc.Node,

        record_content:cc.Node,
        help_content:cc.Node,
        trend_content:cc.Node,

        help_doc:cc.Label,

        fonts:[cc.Font],

        selectbg:[cc.Sprite],
        selectcolor:[cc.Color],

        _lotteryrecord:null,

        _lotteryid:'1001',
        _record_num:'10',
        _curr:'record',
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {

        this.node.on('getrecord',this.getrecord,this);

        if(cc.isValid(global.currlotteryid))
            this._lotteryid = global.currlotteryid;
        
        if(cc.isValid(global.currrecordtype))
            this._curr = global.currrecordtype;
        
        switch(this._curr){
            case 'record':
            this.show_record(this._lotteryid);
            break;
            case 'trend':
            this.show_trend(this._lotteryid);
            break;
            case 'help':
            this.show_help(this._lotteryid);
            break;
        }

        this.getruledoc(this._lotteryid);
     },

    start () {
        //global.getlotteryrecord('1001','5',this.node,'getrecord');
    },

    // update (dt) {},
    getrecord:function(event){
        
        this._lotteryrecord = event.detail.data;  

        if( !cc.isValid(this._lotteryrecord)) return;
        
        //for(var i=this._lotteryrecord.length-1;i>=0;i--){
        for(var i=0;i<this._lotteryrecord.length;i++){
           
            var node = cc.instantiate(this.line);
            node.parent = this.record_content;

            node.emit('initdata',{data:this._lotteryrecord[i]});
        }
    },

    btn_back:function(){
        if(cc.isValid(global.currlottery))
            switch(global.currlottery[0].charAt(0)){
                case '1':cc.director.loadScene('p_lottery_detail');break;
                case '2':cc.director.loadScene('p_lottery_detail_pks');break;
                case '3':cc.director.loadScene('p_lottery_detail_syxw');break;
                case '4':cc.director.loadScene('p_lottery_detail_gf');break;
                default:cc.director.loadScene('p_lottery_detail');
            } 
           // cc.director.loadScene('p_lottery_detail');
        else
            cc.director.loadScene('p_lottery'); 
    },

    btn_record:function(){
        if(this._curr =='record') return;
        this._curr='record';

        // this.selectbg[0].node.color = this.selectcolor[1];
        // this.selectbg[1].node.color = this.selectcolor[0];
        // this.selectbg[2].node.color = this.selectcolor[0];
        
        this.show_record(this._lotteryid);        
    },

    btn_trend:function(){
        if(this._curr=='trend')return;
        this._curr='trend'

        this.selectbg[0].node.color = this.selectcolor[0];
        this.selectbg[1].node.color = this.selectcolor[1];
        this.selectbg[2].node.color = this.selectcolor[0];

        this.show_trend(this._lotteryid);        
    },

    btn_help:function(){
        if(this._curr =='help') return;
        this._curr='help';        

        // this.selectbg[0].node.color = this.selectcolor[0];
        // this.selectbg[1].node.color = this.selectcolor[0];
        // this.selectbg[2].node.color = this.selectcolor[1];

        this.show_help(this._lotteryid);
    },

    show_record:function(id){
        this.record_sv.active =true;
        this.help_sv.active =false;
        this.trend_sv.active =false;

        this.selectbg[0].node.color = this.selectcolor[1];
        this.selectbg[1].node.color = this.selectcolor[0];
        this.selectbg[2].node.color = this.selectcolor[0];

        var list = this.record_content.destroyAllChildren();        

        global.getlotteryrecord(id,this._record_num,this.node,'getrecord');
    },
    show_help:function(id){
       // cc.log('help');
        this.record_sv.active =false;
        this.help_sv.active =true;
        this.trend_sv.active =false;

        this.selectbg[0].node.color = this.selectcolor[0];
        this.selectbg[1].node.color = this.selectcolor[0];
        this.selectbg[2].node.color = this.selectcolor[1];
    },
    show_trend:function(id){
        //cc.log('trend');
        this.record_sv.active =false;
        this.help_sv.active =false;
        this.trend_sv.active =true;
    },

    getruledoc:function(id){
        var url=global.URL+"1/notice/rule.php";
    
        var arg ="rule="+id;

        var self =this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {                
                
                var s = JSON.parse(xhr.responseText);     
               if(s.error == 0 ){                  
                  
                   self.help_doc.string =s.data[0].titles;
               }
            }
        };
        
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        xhr.send(arg); 
    }
});

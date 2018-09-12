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
// var rule = require('rule');
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
        content:cc.Node,
        line:cc.Prefab,
        orderdetail:cc.Node,

        detail_orderid:cc.Label,
        detail_type:cc.Label,
        detail_dateid:cc.Label,
        detail_date:cc.Label,
        detail_opencode_num:cc.Label,
        detail_amount:cc.Label,
        detail_lottery_num:cc.Label,
        detail_rule:cc.Label,
        detail_opencode:cc.Label,


        scrollview:cc.Node,

        amount_lottery:cc.Label,
        opencode_amount:cc.Label,
        profit:cc.Label,
        switchbar:cc.Node,

        fonts:[cc.Font],

        _page:1,
        _pagenum:20,
        _recordnum:-1,

        _orderlist:[],
        _statename:[],

        _color:[cc.Color],
        _switchtype:3,

        _data:null,
        _currlotterydata:null,

        _isrest:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this._statename =['待开奖','中奖','未中奖',''];
        this._orderlist = [];
        this._color =[new cc.Color(235,182,17), cc.Color.WHITE];
        this.switchbar.children[3].color = this._color[0];

        this.node.on('show',this.getdetail,this);
        this.node.on('createlist',this.createlist,this);
        //this.node.on('updatelistline',this.updatelistline,this);

        this.node.on('setlotterytime',this.setlotterytime,this);

        //下拉添加更多
        this.scrollview.on('bounce-bottom',this.getorderlist,this);
    },

    start () {

        if(cc.isValid(global.userinfo)){
            this.getorderlist();
            this.getamount();
        }

        // this.schedule(function() {            
        //     this.updatelottery();
        // }, 1);
        
    },

    restlist:function(){
        this._isrest = false;
        this._page =1;
        this._pagenum=20;
        this._recordnum =-1;
        this._orderlist.splice(0,this._orderlist.length);
        this.content.removeAllChildren();

        this.getorderlist();
    },
    
    showdetail:function(data){

        this.orderdetail.active = true;

        //cc.log(data);

        // {"error":0,"data":[{"opencode_type":"2001",
		// "opencode_cycle":"699687",
		// "opencode_amount":"100.0000",
		// "opencode_lottery_num":"1",
		// "opencode_price":"1.0000",
		// "opencode_rule":"2021",
		// "opencode":"**,**,07,03,10,01,06,09,02,05",
		// "opencode_stat":"1",
		// "opencode_num":"**,**,07,03,10,01,06,09,02,05",
		// "orderid":"20180822094927100000002",
		// "limitdate":"2018-08-22 09:49:27"
		// }]}
        this._data = data;
        this.detail_orderid.string = data.orderid;
        this.detail_type.string = global.idtoname( data.opencode_type);
        
        if(data.opencode_stat == 0)
            global.getlotterydata(data.opencode_type,this.node,'setlotterytime');   
        else
            this.detail_dateid.string = data.opencode_cycle+'期  ('+ this._statename[data.opencode_stat]  +')';

        this.detail_date.string = data.limitdate;        

        var type = global.idtotype(  data.opencode_type);
        switch(type){
            case 'ssc':
            case 'gfsd':this.detail_opencode_num.font = this.fonts[0];break;
            case 'pk10':this.detail_opencode_num.font = this.fonts[1];break;
            case 'syxw':this.detail_opencode_num.font = this.fonts[2];break;           
            default:break;
        }
        var numstr = global.setnumstr(data.opencode_num,type);
        //cc.log(data.opencode_num+'   '+ numstr);
        this.detail_opencode_num.string = numstr;        

        this.detail_lottery_num.string =data.opencode_lottery_num;
        this.detail_amount.string = (data.opencode_amount-0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'元';
       
        //data.opencode_rule;//config.parentname[parent-0]+' '+config.sonname[son-0];
        this.detail_rule.string =  config.parentname[data.opencode_rule.substring(0,2)] +'  '+
                                    config.sonname[data.opencode_rule.substring(2,4)];

        this.detail_opencode.string = data.opencode.replace(/\|/g,'\n');
    },          


    setlotterytime:function(event){
        this._currlotterydata = event.detail.data.split(",");     

        this.schedule(function() {            
             this.runtimer();
        }, 1);
    },

    runtimer:function(){
        this._currlotterydata[3]++;
        
        var timestr = global.getdate(this._currlotterydata[1],this._currlotterydata[3],this._currlotterydata[4]);
        this.detail_dateid.string = this._data.opencode_cycle+'期 ('+timestr+')';  

        if(timestr == '封盘中...')//this._currlotterydata[3] >= this._currlotterydata[1];
        {
            this.unschedule(this.runtimer);
            this._isrest = true;
        }            
    },

    getamount:function(){
        //if(!cc.isValid(this._orderlist)) return ;
        var url=global.URL+"1/user/show.php";

        var arg ="uid=" + global.userinfo.uid ;    
      
        var self = this;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {               

                 var response = xhr.responseText;                
                 var s = JSON.parse(response);   

                 if(s.error == 0){                 
                    //cc.log(s.data);
                    self.amount_lottery.string = (s.data[0].amount_lottery-0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    self.opencode_amount.string = (s.data[0].opencode_amount-0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    self.profit.string = ((s.data[0].amount_lottery-0)-(s.data[0].opencode_amount-0)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                } else{
               
                 } 
            }
        };
       
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        xhr.send(arg); 
    },

    getdetail:function(event){        
        if(this.orderdetail.active) return;
        var url=global.URL+"1/opencode/deta.php";

        var arg ="uid=" + global.userinfo.uid +
                 "&orderid=" + event.detail.orderid;                 
      
        var self = this;
        var orderid = event.detail.orderid;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {                               
               
                cc.log(xhr.responseText);
                var response = xhr.responseText;                
                var s = JSON.parse(response); 
              
                if(s.error == 0){  
                    self.showdetail(s.data[0]);

                } else{
                    
                } 
            }
        };
       
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        xhr.send(arg); 
    },

    getorderlist:function(){
        if(this._recordnum >=0 && (this._page-1) * this._pagenum >= this._recordnum) return; 
       // cc.log(this._page+'     '+ this._pagenum+'     '+this._recordnum);


        var url=global.URL+"1/opencode/show.php";

        var arg ="uid=" + global.userinfo.uid +
                 "&page=" + this._page.toString() +
                 "&record_num=" + this._pagenum.toString();
      
        var self = this;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                               
                //cc.log(xhr.responseText);

                //{"orderid":"20180822094854100000001","opencode_stat":"2"}
                //0 未开  1 中 2 未中

                //cc.log(xhr.responseText);
                 var response = xhr.responseText;                
                 var s = JSON.parse(response);    

                 if(s.error == 0){
                    //无错误
                    self._recordnum =s.record_num;                  
                    self._orderlist =self._orderlist.concat(s.data);                  
                    self.node.emit('createlist');
                    
                } else{
                //     //错误
                //     self.eb_userpw.string='';
                   
                //     switch(s.error)
                //     {
                //         case 1:
                //             self.node.emit('showtip',{tip:'账号和密码错误'});
                //         break;
                //     }
                 } 
            }
        };
       
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        xhr.send(arg); 
    },

    createlist:function(){
       
        if(!cc.isValid(this._orderlist)) return ;

        //this._page++;       
     
        for( var i=( this._page-1)*this._pagenum;i<this._orderlist.length;i++){
            
            var node = cc.instantiate(this.line);
            node.parent = this.content;

            node.emit('init',this._orderlist[i]);

            if( this._switchtype <3 && this._switchtype != this._orderlist[i].opencode_stat)
                node.active = false;
        }
        this._page++;
        
    },

    // updateList:function(){
    //     if(this._recordnum >=0 && (this._page-1) * this._pagenum >= this._recordnum) return; 

    //     var url=global.URL+"1/opencode/show.php";

    //     var arg ="uid=" + global.userinfo.uid +
    //              "&page=" + '1' +
    //              "&record_num=" + this._orderlist.length.toString();
      
    //     var self = this;

    //     var xhr = new XMLHttpRequest();
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                               
             
    //              var response = xhr.responseText;                
    //              var s = JSON.parse(response);    

    //              if(s.error == 0){
    //                 //无错误
    //                 //self._recordnum =s.record_num;                  
    //                 self._orderlist =s.data;                  
    //                 self.node.emit('updatelistline');
                    
    //             } else{
               
    //             } 
    //         }
    //     };
       
    //     xhr.open("POST", url, true);
    //     xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
    //     xhr.send(arg); 
    // },

    // updatelistline:function(){
    //     if(!cc.isValid(this._orderlist)) return ;
     
    //     for( var i=( this._page-1)*this._pagenum;i<this._orderlist.length;i++){
            
    //         var node = cc.instantiate(this.line);
    //         node.parent = this.content;

    //         node.emit('init',this._orderlist[i]);

    //         if( this._switchtype <3 && this._switchtype != this._orderlist[i].opencode_stat)
    //             node.active = false;
    //     }
    //     this._page++;
    // },

    btn_hidedetail:function(){
        this.orderdetail.active = false;
        
        if(this._isrest)
        {
            this.restlist();
        }
        //this.unschedule(this.runtimer);
        this.unscheduleAllCallbacks();
    },

    switchlist:function(){
        var isshow = true;
        for(var i=0;i<this.content.childrenCount;i++){
        
            if(this._switchtype<3){                  
                isshow = (this.content.children[i].children[3].getComponent(cc.Label).string == this._statename[this._switchtype] );               
                this.content.children[i].active = isshow;        
            }
            else
                this.content.children[i].active = true;   
        }
    },

    btn_switch:function(event,customEventData){

        this._switchtype = customEventData-0;
        for(var i=0;i< this.switchbar.childrenCount;i++){
            if(this._switchtype == i)
                this.switchbar.children[i].color = this._color[0];
            else
                this.switchbar.children[i].color = this._color[1];
        }

        this.switchlist();
     },

    // update (dt) {},
    btn_back:function(){

        cc.director.loadScene('p_mine');
    },
});

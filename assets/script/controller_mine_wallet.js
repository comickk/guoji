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

        backpage:'',

        line:cc.Prefab,
        content:cc.Node,
        scrollview:cc.Node,

        switchbar:cc.Node,

        amount:cc.Label,

        icons:[cc.SpriteFrame],

        _page:1,
        _pagenum:20,
        _recordnum:-1,



        _list:[],
        _typename:[],
       // _inout:[],
        _color:[cc.Color],

        _switchtype:0,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this._typename =['','中奖','投注','充值','提现','转账'];
        //this._inout =['','+','-','+','-','-'];
        this._list = [];
        this._color =[new cc.Color(235,182,17), cc.Color.WHITE];
       
        this.node.on('createlist',this.createlist,this);

        //下拉添加更多
        this.scrollview.on('bounce-bottom',this.getlist,this);

        this.switchbar.children[0].color = this._color[0];
     },
     start () {

        if(cc.isValid(global.userinfo)){
            this.getlist();
            this.getamount();
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
                 
                 //cc.log(response);
                 var s = JSON.parse(response);   

                 if(s.error == 0){                 
                    //cc.log(s.data);
                    //self.amount_lottery.string = (s.data[0].amount_lottery-0).toFixed(2);
                    //self.opencode_amount.string = (s.data[0].opencode_amount-0).toFixed(2);
                    //self.profit.string = ((s.data[0].amount_lottery-0)-(s.data[0].opencode_amount-0)).toFixed(2);
                    self.amount.string = (s.data[0].amount_total-0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                } else{
               
                 } 
            }
        };
       
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        xhr.send(arg); 
    },    

    // update (dt) {},
    getlist:function(){
        if(this._recordnum >=0 && (this._page-1) * this._pagenum >= this._recordnum) return; 
       // cc.log(this._page+'     '+ this._pagenum+'     '+this._recordnum);


        //http://www.hengshengsj.com/1/user/money_list.php
        var url=global.URL+"1/user/money_list.php";

        var arg ="uid=" + global.userinfo.uid +
                 "&page=" + this._page.toString() +
                 "&record_num=" + this._pagenum.toString();
      
        var self = this;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {                               
        
                //cc.log(xhr.responseText);
                 var response = xhr.responseText;                
                 var s = JSON.parse(response);    

                 if(s.error == 0){
                    //无错误
                    self._recordnum =s.record_num;                  
                    self._list =self._list.concat(s.data);                  
                    self.node.emit('createlist');
                    
                } else{
             
                 } 
            }
        };
       
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        xhr.send(arg); 
    },

    createlist:function(){
       
        if(!cc.isValid(this._list)) return ;

        //this._page++;       
     
        for( var i=( this._page-1)*this._pagenum;i<this._list.length;i++){
            
            var node = cc.instantiate(this.line);
            node.parent = this.content;
            //set line
            //{"money":"90.0000","limitdate":"2018-08-24 15:15:07","money_type":"2"}           
            
            //time
            node.children[1].getComponent(cc.Label).string = this._list[i].limitdate;
            
            var type = this._list[i].money_type-0;
            node.children[2].getComponent(cc.Label).string = this._typename[ type ];
            if(type ==1 || type==3){
                node.children[0].getComponent(cc.Label).string = '+'+(this._list[i].money-0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                node.children[0].color = this._color[0];
            }
            else
                node.children[0].getComponent(cc.Label).string ='-'+ (this._list[i].money-0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

            //icon
            node.children[3].getComponent(cc.Sprite).spriteFrame = this.icons[type];

            if( this._switchtype >0 && this._switchtype != type)
                node.active = false;
        }
        this._page++;
        
    },

    //isshow = (this.content.children[i].children[2].getComponent(cc.Label).string == this._typename[this._switchtype] );  
    switchlist:function(){
        var isshow = true;
        for(var i=0;i<this.content.childrenCount;i++){
            //if( cc.isValid(this._list[i]  )){
                if(this._switchtype>0){
                   // isshow = (this._list[i].money_type == this._switchtype);
                    isshow = (this.content.children[i].children[2].getComponent(cc.Label).string == this._typename[this._switchtype] );               
                    this.content.children[i].active = isshow;        
                }
                else
                    this.content.children[i].active = true;   
                    
            //cc.log(isshow +'  '+this._switchtype +'   '+ this._list[i].money_type+'    ' +this._list[i].limitdate);
            //}
        }
    },

    btn_switch:function(event,customEventData){
        
       // cc.log(customEventData);
    //     switch(customEventData){
    //         case '0':break;
    //         case '1':break;
    //         case '2':break;
    //         case '3':break;
    //         case '4':break;
    //     }

        this._switchtype = customEventData-0;
        for(var i=0;i< this.switchbar.childrenCount;i++){
            if(customEventData-0 == i)
                this.switchbar.children[i].color = this._color[0];
            else
                this.switchbar.children[i].color = this._color[1];
        }

        this.switchlist();
     },

    btn_back:function(){        

        cc.director.loadScene(this.backpage);
        
    }
});

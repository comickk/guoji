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

        content:cc.Node,
        ad:cc.Sprite,
        board:cc.Label,

        _boardloopnum:0,

        _lotterytime:Map,
        _msgbox:[],
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        global.currpage='main';       

        this.node.on('board',this.setboard,this);
        this._boardloopnum=0;

        this._msgbox = [''];
     },


    start () { 
        //开启每 3 秒更新
        this.schedule(function() {            
            this.updatelottery();
        }, 1);

        //this.node.emit('board',{msg:'这是一个公告！哈哈哈！'});
        //this.node.emit('board',{msg:'这还是一个公告！哈哈哈哈！'});
       // cc.log(global.userinfo);
        //this.test();

        this._boardloopnum =0;
        this.board.string = this._msgbox.shift();
        //this.schedule(this.boardaction,0.1 );

        this.getboard();
    },

     update () {
        this.boardaction();
     },

    setboard:function(event){
        var msg =event.detail.msg;
        
        this._msgbox.push(msg);

        //this.schedule(this.boardaction,0.1 );
    },

    boardaction:function(){        

        if(this._boardloopnum>=3){
            if(this._msgbox.length > 0){
                this._boardloopnum =0;
                this.board.string = this._msgbox.shift();

                if(this._msgbox.length==0)
                    this.getboard();
            }
            // else
            //     this.unschedule(this.boardaction,0);
        }else{
            this.board.node.x -= 2;
            if(this.board.node.width + this.board.node.x < 0 ){
                this.board.node.x = this.board.node.parent.width;
                this._boardloopnum++;
            }
        }
    },

    updatelottery:function(){
        var children = this.content.children;
        for (var i = 0; i < children.length; i++) {
           children[i].emit('updatelottery');
        }
    },

    configlottery:function(){
        this._lotterytime = new Map();
        //map  name     time
        this._lotterytime.set('101',100);

        //cc.log(this.lotterytime.get('101'));
    },

    btn_lottery:function (event,customEventData) {        
        cc.log("-----------"+ customEventData);
      
    },

    btn_ad:function(){
        
    },

    getboard:function(){
        //http://hengshengsj.com/1/notice/index.php?record_num=2
        var url=global.URL+"1/notice/index.php";

        var arg ="record_num=2";

        var self =this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
               
                var s = JSON.parse(xhr.responseText);     
                if(s.error == 0){  
                    for(var i=0;i<s.data.length;i++){        
                        //cc.log(s.data[i].titles);               
                        self._msgbox.push(s.data[i].titles);
                    }    
                    
                    //cc.log(self._msgbox);
                }else{   
                    //error
                    cc.log(' error = '+s.error);
                }

                // {"titles":"我就是来测试的，这是我第5条公告！"},{"titles":"我就是来测试的，这是我第4条公告！"}]}
                 
            }
        };
       
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        xhr.send(arg); 
    },

    test:function(){

        //投注消息
        // var msg={
        // uid:'1', 
        // username:'haoquan',
        // opencode_type :  '1001',
        // opencode_cycle: '20180730037',       
        // }
    
        // var url=global.URL+"1/opencode/opencode.php";

        // var arg ="uid=1&username=haoquan&opencode_type=1001&opencode_cycle=20180730039";
        // arg+="&opencode_amount=100&opencode_lottery_num=1&opencode_multiple=1&opencode_price=100";
        // arg+="&opencode_rule=1024&opencode=1,5,2,5,4";
        

        // var xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                               
        //         var response = xhr.responseText;                
               
        //         cc.log(response);
                 
        //     }
        // };
       
        // xhr.open("POST", url, true);
        // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        // xhr.send(arg); 

       
            //http://hengshengsj.com/1/notice/index.php?record_num=2
            
        
    }
});

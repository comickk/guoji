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

        eb_userid:cc.EditBox,
        eb_userpw:cc.EditBox,

        lb_tip:cc.Label,

        waitmask:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {

        cc.director.setDisplayStats( false);
        
        this.node.on('showtip',this.showtip,this);
     },

    //start () {  },

    // update (dt) {},

    showtip:function(event){        
        
        this.lb_tip.string=event.detail.tip;

        this.scheduleOnce(function() {            
           this.lb_tip.string='';           
        }, 5);
    },

    btn_login(){       
       
        //chick un and up
        var un = this.eb_userid.string;
        var up = this.eb_userpw.string;

        if(un.length<1 || up.length<1 ) {
            this.node.emit('showtip',{tip:'账号和密码不能为空'});
            return;
        }

        var url=global.URL+"1/user/login.php";

        var arg ="un="+this.eb_userid.string;
        arg += ('&up='+this.eb_userpw.string);
        
        //cc.log(arg);
      
        var self = this;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                
                self.waitmask.active= false;
                var response = xhr.responseText;                
                var s = JSON.parse(response);     
                if(s.error == 0){
                   //无错误
                    //cc.log(s.data);
                    global.userinfo = s.data[0];
                    cc.director.loadScene('p_main');
                    cc.log(global.userinfo);
                }  else{
                    //错误
                    self.eb_userpw.string='';
                   
                    switch(s.error)
                    {
                        case 1:
                            self.node.emit('showtip',{tip:'账号和密码错误'});
                        break;
                        case 2:
                            self.node.emit('showtip',{tip:'账号已在线'});
                        break;
                    }
                } 
            }
        };
       
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        xhr.send(arg); 

         //lock btn
        //等待登录结果
        this.waitmask.active = true;
    },
    btn_reg:function(){
        
    }
});

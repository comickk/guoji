

var global = require('Global');
var rule = require('rule'); 
var config = require('Config');
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

        dataid:cc.Label,
        date:cc.Label,

        //content:cc.Node,

        //line:cc.Prefab,

        type:cc.Label,
        notenum:cc.Label,
        price:cc.Label,
        note:cc.Label,

        totle:cc.Label,

        resulttip:cc.Node,

        _data:null,

    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.node.on('confrimorder',this.confrimorder,this);

        this.node.on('orderresult',this.result,this);
     },

    // start () {  },

    // update (dt) {},

    result:function(event){
         /* {   "error":0,
                "data":[{   "orderid":"20180807110753100000025","limitdate":"2018-07-31 17:57:36" }]
            }   */

            // "orderid":"'.$num.'",
            // "amount_total":"'.$amount_total.'",
            // "uid":"'.$uid.'",
            // "limitdate":"'.date("Y-m-d H:i:s",$myrow['limitdate']).'"

        var res = event.detail.res;       
      
        var restype='';
        var resstr='';
        if(res.error != 0){
            //error
            restype = '下单失败';
            var errortype =['正常',
                            '用户ID和服务器SESSION的ID不一致，请重新登陆',
                            '客户端期号和服务端期号不同',
                            '不在投注期内',
                            '投注号码不正常，请重新投注',
                            '投注金额超过用户余额，请充值'];

            resstr =errortype[res.error];
            //cc.log(errortype[res.error]);
          
        }else{
            //no error
           //"data":[{   "orderid":"20180807110753100000025","limitdate":"2018-07-31 17:57:36" }]
           restype = '下单成功';
           resstr = '订单号:'+ res.data[0].orderid+'\n\n'+'订单时间:'+ res.data[0].limitdate;

           if(cc.isValid(global.userinfo) && global.userinfo.uid ==res.data[0].uid){
               global.userinfo.amount_total = res.data[0].amount_total;
           }

           //set amount
           
        }

        this._data=null;
        this.node.active = false;      
        this.resulttip.active = true;     
        this.resulttip.children[0].getComponent(cc.Label).string = restype;
        this.resulttip.children[1].getComponent(cc.Label).string =resstr;
    },

    btn_clear:function(){

       // this.content.destroyAllChildren();
       this.node.active = false;
    },
    
    btn_confirm:function(){

       // cc.log(global);
        //投注消息
        // var msg={
        // uid:'1', 
        // username:'haoquan',
        // opencode_type :  '1001',
        // opencode_cycle: '20180730037',       
        // }
    
        if(!cc.isValid(global.userinfo)) return;
        
        //http://www.hengshengsj.com/1/opencode/1.php
        var url=global.URL+"1/opencode/opencode.php"; 
        //var url=global.URL+"1/opencode/1.php";

        var arg = "uid="+global.userinfo.uid +
                  "&username="+global.userinfo.username+
                  //"&opencode_type="+ global.currlottery[0] +
                  "&codetype="+ global.currlottery[0] +
                  "&opencode_cycle="+ ((global.currlottery[2]-0)+1);

        arg+="&opencode_amount="+ this._data.totle +
             "&opencode_lottery_num="+this._data.note+
             "&opencode_multiple=1"+
             "&opencode_price="+ this._data.price +
             "&opencode_rule="+this._data.rule+
             "&opencode="+this._data.ball;
        
        
        //cc.log(arg);

        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                               
                var response = xhr.responseText;                
               
                //cc.log(response);
                var res = JSON.parse(response);
                self.node.emit('orderresult',{res:res});                   
            }
        };
       
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        xhr.send(arg);     
    },

    btn_back:function(){
        this.node.active = false;
    },

    btn_confirmresult:function(){
        this.resulttip.active = false;
    },

    confrimorder:function(event){
        //cc.log(event.detail);

        // data.note = this._note;
        // data.odds = this._odds;
        // data.totle = this._totle;
        // data.rule = this._rule;
        // data.ball = this._ball;    
        this._data = event.detail.data;       

        this.dataid.string = (global.currlottery[2]-0)+1;
        
        this.notenum.string = '注数:'+this._data.note;
        this.price.string ='单注:'+ this._data.price+'元';  
        this.totle.string ='总下注金额:'+this._data.totle+'元';

        var parent = this._data.rule.substring(0,2);
        var son = this._data.rule.substring(2);
        this.type.string = '玩法:'+config.parentname[parent-0]+' '+config.sonname[son-0];
       
        var strball='';
        var max= 0;             
            
        switch(global.idtotype(global.currlottery[0])){
            case 'ssc':
                max=rule.odds.ssc['r'+ this._data.rule][1];

                switch(son){
                case '24': 
                        if( (parent-0) <= 14){ //0~27                   
                        var _ball = (268435456+this._data.ball[0]).toString(2).split('');
                        
                        for(var j=_ball.length-1;j>0;j--){
                            if(_ball[j] == '1')
                                strball += 28-j+',';
                        }
                        }else{//0~18                   
                        var _ball = (524288+this._data.ball[0]).toString(2).split('');                    
                        for(var j=_ball.length-1;j>0;j--){
                            if(_ball[j] == '1')
                                strball += 19-j+',';
                        }
                    }
                    break;
                case '32':                
                    if( (parent-0) <=14){//1~26                  
                        var _ball = (268435456+ this._data.ball[0]).toString(2).split('');
                
                        for(var j=_ball.length-1;j>0;j--){
                            if(_ball[j] == '1')
                                strball += 28-j+',';
                        }                    
                    }else{//1~17                        
                        var _ball = (524288+this._data.ball[0]).toString(2).split('');
                        
                        for(var j=_ball.length-1;j>0;j--){
                            if(_ball[j] == '1')
                                strball += 19-j+',';
                        }
                    }
                    break;
                case '46':
                case '47':
                case '48':
                case '49':
                //大小单双
                    var name=['大','小','单','双'];
                    for(var i=0;i<max;i++){
                        var _ball = (16+ this._data.ball[i]).toString(2).split('');
                    
                        for(var j=_ball.length-1;j>0;j--){
                            if(_ball[j] == '1')
                                strball += name[4-j]+',';
                        }
                        strball+='|';
                    }
                break;
        
                case '54':
                    //龙和虎
                    var name=['龙','和','虎'];
                    for(var i=0;i<max;i++){
                        var _ball = (8+this._data.ball[i]).toString(2).split('');
                    
                        for(var j=_ball.length-1;j>0;j--){
                            if(_ball[j] == '1')
                                strball += name[3-j]+',';
                        }                  
                    }
                break;
        
                default:            
                //0~9
                    // cc.log(data.ball);
                    for(var i=0;i<max;i++){
                        var _ball = (1024+this._data.ball[i]).toString(2).split('');
                        
                        for(var j=_ball.length-1;j>0;j--){
                            if(_ball[j] == '1')
                                strball += 10-j+',';
                        }
                        //if(i!=max)
                            strball+='|';
                    }
                break;
                }
            break;

            case 'syxw':
                max=rule.odds.syxw['r'+ this._data.rule][1];
                    
                for(var i=0;i<max;i++){
                    var _ball = (2048+this._data.ball[i]).toString(2).split('');
                
                    for(var j=_ball.length-1;j>0;j--){
                        if(_ball[j] == '1'){
                            var v = 11-j+1;
                            if(v <10)
                                strball +=('0'+v+',');
                            else
                                strball += ( v+',');
                        }                                        
                    }
                    //if(i!=max)
                        strball+='|';
                }
            break;

            case 'pk10':
                max=rule.odds.pk10['r'+ this._data.rule][1];

                for(var i=0;i<max;i++){
                    var _ball = (1024+this._data.ball[i]).toString(2).split('');
                
                    for(var j=_ball.length-1;j>0;j--){
                        if(_ball[j] == '1')
                            strball += 11-j+',';
                    }                   
                    strball+='|';
                }

                switch(parent){
                    case '36':
                        strball =strball.replace('1','龙').replace('3','虎');
                        break;
                    case '37':         
                        strball =strball.replace(/[1]/g,'大').replace(/[2]/g,'小').replace(/[3]/g,'单').replace(/[4]/g,'双');         
                    break;    
                }                
            break;

            case 'gfsd':
                max=rule.odds.gfsd['r'+ this._data.rule][1];

                switch(parent){
                    case '46':
                        for(var i=0;i<max;i++){
                            var _ball = (1024+this._data.ball[i]).toString(2).split('');
                        
                            for(var j=_ball.length-1;j>0;j--){
                                if(_ball[j] == '1')
                                    strball += 11-j+',';
                            }                   
                            strball+='|';
                        }
                        strball =strball.replace('1','龙').replace('3','虎').replace('2','和');
                        break;
                    case '45':    
                        for(var i=0;i<max;i++){
                            var _ball = (1024+this._data.ball[i]).toString(2).split('');
                        
                            for(var j=_ball.length-1;j>0;j--){
                                if(_ball[j] == '1')
                                    strball += 11-j+',';
                            }                   
                            strball+='|';
                        }     
                        strball =strball.replace(/[1]/g,'大').replace(/[2]/g,'小').replace(/[3]/g,'单').replace(/[4]/g,'双');         
                        break;  

                    default:
                        switch(son){
                            case '24':                                     
                            var _ball = (268435456+this._data.ball[0]).toString(2).split('');
                            
                            for(var j=_ball.length-1;j>0;j--){
                                if(_ball[j] == '1')
                                    strball += 28-j+',';
                            }
                            break;

                            case '32':        
                                    var _ball = (268435456+ this._data.ball[0]).toString(2).split('');
                            
                                    for(var j=_ball.length-1;j>0;j--){
                                        if(_ball[j] == '1')
                                            strball += 28-j+',';
                                    }
                            break;
                            
                            default:
                                for(var i=0;i<max;i++){
                                    var _ball = (1024+this._data.ball[i]).toString(2).split('');
                                    
                                    for(var j=_ball.length-1;j>0;j--){
                                        if(_ball[j] == '1')
                                            strball += 10-j+',';
                                    }
                                    //if(i!=max)
                                        strball+='|';
                                }
                        }  
                    }                    
        }

        cc.log('>>>>>>>'+strball);
        this.note.string = strball.replace(/\|/g,'\n');  
        this._data.ball =strball;
    },

    sscoder:function(){
        
    }
});

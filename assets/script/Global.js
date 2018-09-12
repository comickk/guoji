var Global={  

    ver:101,
    URL:"http://www.hengshengsj.com/",

    //-----------session-----------
    _currpage:'',
    currtype:'',
    currrecordtype:'',
    currlotteryid:'', 
    //------------------------------

    //----------data----------
    currlottery:null,
    userinfo:null,

    // switchpage:function(pagename){
    //     _currpage = pagename;
    // },
    // getpagename:function(){
    //     return _currpage;
    // },   
    
    getlotterydata:function(id,node,eventid){       

        //var msg='';        
        
        var url=this.URL+"1/a/a1/ajax1.php";
        url=url+"?sid="+Math.random();
        url=url+"&codetype="+id;

      
       var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                //cc.log(xhr.responseText);
                node.emit(eventid,{data:xhr.responseText});
            }
        };
       
        //cc.log(url);
        xhr.open("GET", url, true);
        //xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        xhr.send();        
    },

    getlotteryrecord:function(id,num,node,eventid){       

        //var msg='';        
        
        var url=this.URL+"1/a/a2/opencode.php";
        //url=url+"?sid="+Math.random();
        url=url+"?codetype="+id +
                "&record_num="+num;         
       
       //url ='http://www.hengshengsj.com/1/a/a2/opencode.php?codetype=1001&record_num=5';
       var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                //cc.log(xhr.responseText);
                var s = JSON.parse(xhr.responseText);     
                if(s.error == 0){
                   //无错误
                   node.emit(eventid,{data:s.data});
                } else{
                    //错误
                    cc.log(s.error);
                }               
            }
        };
       
        xhr.open("GET", url, true);
        //xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
        xhr.send();        
    },

    getdate:function(lasttime,currtime,interval){

         var lastdate =lasttime-0;//Date.UTC(
        //     lasttime.substring(0,4),//y
        //     lasttime.substring(4,6),//m
        //     lasttime.substring(6,8),//d
        //     lasttime.substring(8,10),//h
        //     lasttime.substring(10,12),//m
        //     lasttime.substring(12,14) //s
        // );

         var currdate = currtime-0;//Date.UTC(
        //     currtime.substring(0,4),//y
        //     currtime.substring(4,6),//m
        //     currtime.substring(6,8),//d
        //     currtime.substring(8,10),//h
        //     currtime.substring(10,12),//m
        //     currtime.substring(12,14) //s
        // );

        //console.log(currdate.format("HH:mm:ss"));  
       // console.log(lastdate+'----------'+currdate);    

        var nextdate =lastdate + (interval-0);
        //console.log(nextdate);  
        nextdate =nextdate- currdate;
        //console.log(nextdate); 

        if(nextdate<=0)
            return '封盘中...';

        var h = Math.floor(nextdate/3600); 
        var m = Math.floor((nextdate%3600)/60);
        var s = Math.floor(nextdate%60);        
        

        if(h<10) h= '0'+h;
        if(m<10) m= '0'+m;
        if(s<10) s= '0'+s;


        return  h  +':' + m  +':' +s;  //(nextdate-currdate)/1000;
    },

    getnextdateid:function(type,currdateid){
        switch(type){
            case '1001':
                return currdateid = currdateid >= 120? '001':currdateid+1;         
            default:
                return currdateid;       
        }
    },

    setnumstr:function(num,type){
       
        var str='';
        num = num.replace(/\,/g,'');
        switch(type){
            case 'syxw':               
                for(var i=0;i<num.length;i+=2){
                    var v= num.substr(i,2)-0;
                    if( v >9){
                        if(v>10)  
                            str += ':';
                        else
                            str += '0';
                    }else
                        str += v;
                }               
                return str;
            case 'pk10':
                for(var i=0;i<num.length;i+=2){                    
                    if( num.substr(i,2)-0 >9)
                        str+='0';
                    else
                        str+= num.substr(i,2)-0;
                }
                return str;
            default:
                return num;
        }
    },

    idtotype:function(id){
        id =id +'';
        switch( id.substr(0,2))
        {
            case '10':return 'ssc';
            case '20':return 'pk10';
            case '30':return 'syxw';
            case '40':return 'gfsd';
            default: return 'ssc';
        }
    },

    idtoname:function(id){
        switch(id){
            case '1001':
                return '重庆时时彩';
            case '1002':
                return '上海时时乐';
            case '1003':
                return '天津时时彩';
            case '1004':
                return '新疆时时彩';
            case '1005':
                return '台湾宾果';
            case '1010':
                return '10分彩';
            case '1011':
                return '5分彩';
            case '2001':
                return '北京赛车';
            case '3001':
                return '广东11选5';
            case '3002':
                return '山东11选5';
            case '3003':
                return '上海11选5';
            case '3004':
                return '江西11选5';
            case '4001':
                return '福彩3D';
            case '4002':
                return '体彩排3';
            default:
                return '';
        }
    },
} ;
module.exports =  Global;
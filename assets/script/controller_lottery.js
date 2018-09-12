
var global = require('Global'); 
var config = require('Config'); 
cc.Class({
    extends: cc.Component,

    properties: {
       

        typeimg:[cc.Sprite],
        typelab:[cc.Node],

        normalimg:[cc.SpriteFrame],
        selectimg:[cc.SpriteFrame],
        
        content:cc.Node,
        line:cc.Prefab,
        fonts:[cc.Font],

        fontcolor:[cc.Color],

        defaulticon:cc.SpriteFrame,
        icon:[cc.SpriteFrame],
        _iconid:[],

        _currtype:'ssc',
    
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.currpage = 'lottery';
        this.node.on('setlottery',this.setlottery,this);

        this.node.on('trend',this.btn_trend,this);
        this.node.on('rule',this.btn_rule,this);

        global.currlottery =null;
        this._iconid =['1001','1003','1004',
                        '2001',
                    '3001','3002','3003','3004',
                    '4001','4002'];
     },

     start () {
        var type =config.type.ssc;
       
        if(global.currtype != '') 
            this._currtype = global.currtype;

       switch(global.currtype){
           case 'ssc':type =config.type.ssc;break;
           case 'syxw':type =config.type.syxw;break;
           case 'pk10':type =config.type.pks;break;
           case 'gfsd':type =config.type.gfsd;break;
       }

        this.settypeimg();
        this.initlottery(type);
        this.schedule(function() {            
            this.updatelottery();
        }, 1);
     },


     settypeimg:function(){
         var id=1;
        
        switch(this._currtype){
            case 'all':id =0;   break;
            case 'ssc':id =1;   break;
            case 'syxw':id =2;   break;           
            case 'pk10':id =3;   break;         
            case 'gfsd':id =4;   break;           
        }

       
        for(var i=0;i<5;i++){
            if(i==id){
                this.typeimg[i].spriteFrame = this.selectimg[i];
                this.typelab[i].color = this.fontcolor[1];                
            }else{
                this.typeimg[i].spriteFrame = this.normalimg[i];
                this.typelab[i].color = this.fontcolor[0];                
            }
            //cc.log(this.typeimg[i].spriteFrame);
        }
     },

    // update (dt) {},
    initlottery:function(list){
        if(!cc.isValid(list)) return;

        this.content.destroyAllChildren();
        // var children = this.content.children;
        // for (var i = 0; i < children.length; i++) {
        //    children[i].destroy();
        // }

        for(var i=0;i<list.length;i++){
           // cc.log(list[i]);
           var node = cc.instantiate(this.line);
            node.parent = this.content;

            global.getlotterydata(list[i],node,'initlottery');
        }
    },

    updatelottery:function(){
        var children = this.content.children;
        for (var i = 0; i < children.length; i++) {
           children[i].emit('updatelottery');
        }     
    },

    setlottery:function(event){
        // if(cc.isValid(event.detail.data)){            
        //     global.currlottery =   event.detail.data.split(",");       
        //     this.initlottery();           
        // }
    },

    geticon:function(id){
        for(var i=0;i<this._iconid.length;i++){
            if(this._iconid[i] == id)
                return this.icon[i];
        }
        return this.defaulticon;
    },

    btn_trend:function(event){
        //cc.log('------trend------'+event.detail.id);
        global.currrecordtype ='record';
        global.currlotteryid=event.detail.id;
        cc.director.loadScene('p_lottery_record');
    },
    btn_rule:function(event){
        //cc.log('------rule-------'+ event.detail.id);
        global.currrecordtype ='help';
        global.currlotteryid=event.detail.id;
        cc.director.loadScene('p_lottery_record');
    },

    btn_all:function(){
        // if(this._currtype=='all') return;
        // global.currtype= this._currtype= 'all';
    },

    btn_ssc:function(){
        if(this._currtype=='ssc') return;
        global.currtype= this._currtype= 'ssc';

        this.settypeimg();
        this.initlottery(config.type.ssc);
    },
    btn_syxw:function(){
        if(this._currtype=='syxw') return;
        global.currtype= this._currtype= 'syxw';

        this.settypeimg();
        this.initlottery(config.type.syxw);
    },
    btn_pks:function(){
        if(this._currtype=='pk10') return;
        global.currtype= this._currtype= 'pk10';

        this.settypeimg();
        this.initlottery(config.type.pks);
    },
    btn_gfsd:function(){
        if(this._currtype=='gfsd') return;
        global.currtype= this._currtype= 'gfsd';

        this.settypeimg();
        this.initlottery(config.type.gfsd);
    },
});

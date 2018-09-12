var Rule={  

    // ver:101,   

    // idtoname:function(){        
        
    // },

    baseodds:9.78,

    odds:{
        ssc:{
            r1010:[97800,5],
            r1012:[97800,5],
            r1013:[97800,5],
            r1014:[815,1],
            r1015:[1630,2],
            r1016:[3260,2],
            r1017:[4890,2],
            r1018:[9780,2],
            r1019:[19560,2],

            r1110:[9780,4],
            r1112:[9780,4],
            r1113:[9780,4],
            r1120:[407,4],
            r1121:[815,4],
            r1122:[1630,4],
            r1123:[2445,4],

            r1210:[978,3],
            r1212:[978,3],
            r1213:[978,3],
            r1224:[978,3],
            r1225:[326,3],
            r1226:[163,3],
            r1232:[326,3],

            r1310:[978,3],
            r1312:[978,3],
            r1313:[978,3],
            r1324:[978,3],
            r1325:[326,3],
            r1326:[163,3],
            r1332:[326,3],

            r1410:[978,3],
            r1412:[978,3],
            r1413:[978,3],
            r1424:[978,3],
            r1425:[326,3],
            r1426:[163,3],
            r1432:[326,3],

            r1510:[97.8,2],
            r1512:[97.8,2],
            r1524:[97.8,2],
            r1530:[48.9,2],
            r1531:[48.9,2],
            r1532:[48.9,2],

            r1610:[97.8,2],
            r1612:[97.8,2],
            r1624:[97.8,2],
            r1630:[48.9,2],
            r1631:[48.9,2],
            r1632:[48.9,2],

            r1711:[9.78,5],

            r1833:[2.388,1],
            r1834:[6.666,1],
            r1835:[22.482,1],
            r1836:[2.843,1],
            r1837:[10.041,1],
            r1838:[2.843,1],
            r1839:[10.041,1],
            r1840:[3.608,1],
            r1841:[18.111,1],
            r1842:[3.608,1],
            r1843:[18.111,1],
            r1844:[3.608,1],
            r1845:[18.111,1],

            r1946:[7.824,3],
            r1947:[7.824,3],
            r1948:[3.912,2],
            r1949:[3.912,2],

            r2050:[2.388,1],
            r2051:[12.005,1],
            r2052:[114.252,1],
            r2053:[2126.086,1],
            r2054:[9.78,1],
        },

        syxw:{
            r2161:[968.2,3],
            r2162:[160.5,1],

            r2263:[107.03,2],
            r2264:[53.5,1],

            r2311:[10.758,5],

            r2465:[3.567,1],

            r2566:[4.5,1],

            r2667:[2.14,1],
            r2668:[5.35,1],
            r2669:[16.054,1],
            r2670:[64.218,1],
            r2671:[74.92,1],
            r2672:[21.4,1],
            r2673:[8.02,1],
        },

        pk10:{
            r3111:[9.78,10],
            r3211:[29574.72,5],
            r3311:[4929.12,4],
            r3411:[704.16,3],
            r3511:[9.78,1],

            r3681:[1.956,1],
            r3682:[1.956,1],
            r3683:[1.956,1],
            r3684:[1.956,1],
            r3685:[1.956,1],

            r3711:[1.956,5],
            r3886:[8.8,1],       
        },

        gfsd:{
            r4110:[963,3],
            r4124:[963,1],
            r4125:[321,1],
            r4126:[160.5,1],
            r4132:[160.5,1],

            r4291:[96.3,2],
            r4292:[96.3,2],
            r4293:[48.15,1],
            r4294:[48.15,1],

            r4311:[9.63,3],

            r4428:[3.553,1],
            r4429:[17.833,1],

            r4548:[3.852,2],
            r4549:[3.852,2],

            r4611:[2.14,1],
        },

    },

   
    // line:{
    //     ssc:{
    //         maxline:5,
    //         l10:['万位','千位','百位','十位','个位',],

    //     },

    // },

    hezhi:{
        sx_zhi:[1,3,6,10,15,21,28,36,45,55,63,69,73,75,75,73,69,63,55,45,36,28,21,15,10,6,3,1],//0~27
        sx_zu:[1,2,2,4,5,6,8,10,11,13,14,14,15,15,14,14,13,11,10,8,6,5,4,2,2,1],//1~26

        lx_zhi:[1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1],//0~18
        lx_zu:[1,1,2,2,3,3,4,4,5,4,4,3,3,2,2,1,1],//1~17
    },

    getlineseat:function(parent,son){
        switch(parent){
            case 10:
                switch(son){
                    case 10:
                    case 12:
                    case 13:return['万位','千位','百位','十位','个位'];               
                    case 15:
                    case 16:return['二重号','单号'];
                    case 17:return['三重号','单号'];
                    case 18:return['三重号','二重号'];
                    case 19:return['四重号','单号'];
                    default:return[''];
                }
              
            case 11:
                switch(son){
                    case 10:
                    case 12:
                    case 13:return['千位','百位','十位','个位'];                            
                    case 21:return['二重号','单号'];
                    case 22:return['二重号'];
                    case 23:return['三重号','单号'];                   
                    default:return[''];
                } 

            case 12:
                switch(son){
                    case 10:
                    case 12:
                    case 13:return['万位','千位','百位'];                 
                    case 24:   
                    case 32:return['和值'];                   
                    default:return[''];                            
                }
            case 13:
                switch(son){
                    case 10:
                    case 12:
                    case 13:return['千位','百位','十位'];               
                    case 24:   
                    case 32:return['和值'];                   
                    default:return[''];                            
                }
            case 14:
                switch(son){
                    case 10:
                    case 12:
                    case 13:return['百位','十位','个位'];               
                    case 24:   
                    case 32:return['和值'];                   
                    default:return[''];                            
                }

            case 15:
                if(son ==10) return ['万位','千位'];
            case 16:
                if(son ==10 ) return ['十位','个位']; 
            switch(son){                  
                case 24: return['和值'];                         
                case 32:return['和值'];                   
                default:return[''];                            
            }

            case 17:
                return['万位','千位','百位','十位','个位'];    
           
           
            
            case 19:
                switch(son){
                    case 46:return['万位','千位','百位'];
                    case 47:return['百位','十位','个位'];
                    case 48:return['万位','千位'];
                    case 49:return['十位','个位'];
                }
                //11 xuan 5 
            case 21:
                if(son == 61) return ['第一位','第二位','第三位'];
                else return [''];
            case 22:
                if(son == 63) return ['第一位','第二位'];
                else return [''];
            case 23:
                return ['第一位','第二位','第三位','第四位','第五位'];
            case 25:
                return ['中位'];
                
            //pk10
            case 31:
                return ['冠军','亚军','季军','第四名','第五名','第六名','第七名','第八名','第九名','第十名'];
            case 32:
            case 37:
                return ['冠军','亚军','季军','第四名','第五名'];
            case 33:
                return ['冠军','亚军','季军','第四名'];
            case 34:
                return ['冠军','亚军','季军'];
            case 35:
                return ['冠军'];                 
            case 38:       
                return ['和值'];       
            
            //官方
            case 41:
                if(son==10) return['百位','十位','个位'];
                if(son==24 || son == 32)return['和值'];               
            case 42:
                if(son == 91) return['百位','十位'];
                if(son == 92) return['十位','个位']; 
            case 43:
                if(son == 11) return['百位','十位','个位'];
            case 45:
                if(son == 48) return['百位','十位'];
                if(son == 49) return['十位','个位'];           
           
            // case '4110':
            // case '4311':return['百位','十位','个位'];
            // case '4124':           
            // case '4132':
            // case '4291':
            // case '4548':return['百位','十位'];
            // case '4292':
            // case '4549':return['十位','个位']; 

            default:
                return[''];
        }
    },

    rule:function(bet,parent,son){
       
        switch(parent){
            case 10:
                return this.rule_ssc_5x(bet,parent,son);
            case 11:
                return this.rule_ssc_4x(bet,parent,son);
            case 12:           
            case 13:               
            case 14:
                return this.rule_ssc_3x(bet,parent,son);
            
            case 15:
            case 16:
                return this.rule_ssc_2x(bet,parent,son);

            case 17:
                return this.rule_ssc_dingwei(bet,parent,son);

            case 18:
                return this.rule_ssc_budingwei(bet,parent,son);

            case 19:
                return this.rule_ssc_dxds(bet,parent,son);
            case 20:
                return this.rule_ssc_qw(bet,parent,son);

            //11 x 5
            case 21:
                return this.rule_syxw_3x(bet,parent,son);
            case 22:
                return this.rule_syxw_2x(bet,parent,son);
            case 23:
                return this.rule_syxw_dingwei(bet,parent,son);
            case 24:
                return this.rule_syxw_budingwei(bet,parent,son);
            case 25:
                return this.rule_syxw_quwei(bet,parent,son);
            case 26:
                return this.rule_syxw_renxuan(bet,parent,son);
            
            //pk10
            case 31:
                return this.rule_pk10_dingwei(bet,parent,son);
            case 32:
            case 33:
            case 34:
            case 35:
                return this.rule_pk10_zhixuan(bet,parent,son);
            case 36:
            case 37:                
            case 38:    
                return this.rule_pk10_other(bet,parent,son);   
                
            //gf  
            case 41:
                return this.rule_gf_3x(bet,parent,son);
            case 42:
                return this.rule_gf_2x(bet,parent,son);
            case 43:
                return this.rule_gf_dingwei(bet,parent,son);
            case 44:
                return this.rule_gf_budingwei(bet,parent,son);
            case 45:
                return this.rule_gf_dxds(bet,parent,son);
            case 46:
                return this.rule_gf_longhu(bet,parent,son);
            default:
                return[0,0];
        }
    },
    //----------------gf--------------------
    rule_gf_3x:function(bet,parent,son){
        var notenum =0;
        var rule = 'r'+parent +son;  
        var ball =[0,0,0];
        
        switch(son){
            case 10:
                var n=1;
                for(var i=0;i<3;i++){
                    var _bet = bet[i].toString(2).split('');                   
                    for(var j=0;j<_bet.length;j++){
                        ball[i]+=_bet[j]-0;
                    }           
                    n *= ball[i];
                }
                notenum =n;
                break;            
            case 24:
                notenum=0;
                var _bet = (bet[0]+268435456).toString(2).split('');
                
                for(var j=1;j<_bet.length;j++){
                    if(_bet[j] == '1')  
                        notenum += this.hezhi.sx_zhi[j-1];
                } 
                break;
            case 32:      
                notenum=0;             
                var _bet = (bet[0]+268435456).toString(2).split('');
                for(var j=2;j<_bet.length;j++){
                    if(_bet[j] == '1')  
                        notenum += this.hezhi.sx_zu[j-2];
                }
                break;
            case 25:
                var balls =[];
                var _bet = bet[0].toString(2).split('');
                for(var j=0;j<_bet.length;j++){
                    if(_bet[j] == '1')  
                        balls++;
                } 
                notenum = balls*(balls-1);
            break;
            case 26:
                var balls =[];
                var _bet = bet[0].toString(2).split('');
                for(var j=0;j<_bet.length;j++){
                    if(_bet[j] == '1')  
                        balls++;
                } 
                notenum = balls*(balls-1)*(balls-2)/3/2;
            break;    
        }        

        return [notenum,this.odds.gfsd[rule][0]];
    },
    rule_gf_2x:function(bet,parent,son){

        var notenum =0;
        var rule = 'r'+parent +son;  
        var ball=[0,0];

        switch(son-0){
            case 91:
            case 92:
                var n=1;
                for(var i=0;i<2;i++){
                    var _bet = bet[i].toString(2).split('');                   
                    for(var j=0;j<_bet.length;j++){
                        ball[i]+=_bet[j]-0;
                    }           
                    n *= ball[i];
                }
                notenum =n;
                break;
            case 93:
            case 94:
                var balls =[];
                var _bet = bet[0].toString(2).split('');
                for(var j=0;j<_bet.length;j++){
                    if(_bet[j] == '1')  
                        balls++;
                }                
                notenum = balls*(balls-1)/2;
            break;
        }      

        return [notenum,this.odds.gfsd[rule][0]];
    },
    rule_gf_dingwei:function(bet,parent,son){
        var ball =[0,0,0,0,0];
        var notenum =0;
        var rule = 'r'+parent + '11';

        for(var i=0;i<bet.length;i++){

            var _bet = bet[i].toString(2).split('');

            for(var j=0;j<_bet.length;j++){
                ball[i]+=_bet[j]-0;
            }
           
            notenum += ball[i];
        }  

        return [notenum,this.odds.gfsd[rule][0]];
    },
    rule_gf_budingwei:function(bet,parent,son){

        var ball =0;
        var notenum =0;
        var rule = 'r'+parent +son;       

        var _bet = bet[0].toString(2).split('');

        for(var j=0;j<_bet.length;j++){
            ball+=_bet[j]-0;
        }          
       
        if(son ==28)
            notenum =ball;
        else
            notenum = ball*(ball-1)/2;           

        return [notenum,this.odds.gfsd[rule][0]];
    },
    rule_gf_dxds:function(bet,parent,son){

        var notenum =1;
        var rule = 'r'+parent +son;  
         
        var max =3;
      
        var ball =[0,0];

        for(var i=0;i<2;i++){
            var _bet = bet[i].toString(2).split('');

            for(var j=0;j<_bet.length;j++){
                ball[i]+=_bet[j]-0;
            }               
            notenum *= ball[i];
        }    
        return [notenum,this.odds.gfsd[rule][0]];
    },
    rule_gf_longhu:function(bet,parent,son){

        var notenum =0;
        var rule = 'r'+parent +son;  

        var _bet = bet[0].toString(2).split('');

        for(var j=0;j<_bet.length;j++){
            notenum +=_bet[j]-0;
        }   

        return [notenum,this.odds.gfsd[rule][0]];
    },
    //---------------pk10-------------------------

    rule_pk10_other:function(bet,parent,son){

        var notenum =0;
        var rule = 'r'+parent +son;  

        for(var i=0;i<this.odds.pk10[rule][1];i++){
            var _bet = bet[i].toString(2).split('');

            for(var j=0;j<_bet.length;j++){
                notenum +=_bet[j]-0;
            }   
        }        

        return [notenum,this.odds.pk10[rule][0]];
    },
    //定位
    rule_pk10_dingwei:function(bet,parent,son){
        var ball =[0,0,0,0,0,0,0,0,0,0];
        var notenum =0;
        var rule = 'r'+parent + '11';

        for(var i=0;i<bet.length;i++){

            var _bet = bet[i].toString(2).split('');

            for(var j=0;j<_bet.length;j++){
                ball[i]+=_bet[j]-0;
            }           
            notenum += ball[i];
        }  

        return [notenum,this.odds.pk10[rule][0]];
    },

    rule_pk10_zhixuan:function(bet,parent,son){
        var ball =[0,0,0,0,0];
        var notenum =0;
        var rule = 'r'+parent + '11';
        
        var allball =[];
        for(var i=0;i<this.odds.pk10[rule][1];i++){

            var _bet = (1024+bet[i]).toString(2).split('');          

            var ball=[];
            for(var j=_bet.length-1;j>0;j--){
                if(_bet[j]-0 >0)
                    ball.push(11-j);
            }
            allball.push(ball);             
        } 

        switch(parent-0){
            case 32:
                for(var i=0;i<allball[0].length;i++)
                for(var j=0;j<allball[1].length;j++)
                for(var k=0;k<allball[2].length;k++)
                for(var l=0;l<allball[3].length;l++)
                for(var m=0;m<allball[4].length;m++)
                    if( allball[0][i] != allball[1][j] && allball[0][i] != allball[2][k] && allball[0][i] != allball[3][l] && allball[0][i] != allball[4][m] 
                        && allball[1][j] != allball[2][k] && allball[1][j] != allball[3][l] && allball[1][j] != allball[4][m] 
                        && allball[2][k] != allball[3][l] && allball[2][k] != allball[4][m]  && allball[3][l] != allball[4][m]   )                            
                        notenum++; 
            break;
            case 33:
                for(var i=0;i<allball[0].length;i++)
                for(var j=0;j<allball[1].length;j++)
                for(var k=0;k<allball[2].length;k++)
                for(var l=0;l<allball[3].length;l++)
                    if( allball[0][i] != allball[1][j] && allball[0][i] != allball[2][k] && allball[0][i] != allball[3][l] &&
                        allball[1][j] != allball[2][k] && allball[1][j] != allball[3][l] && allball[2][k] != allball[3][l] )                            
                        notenum++; 
            break;
            case 34:
                for(var i=0;i<allball[0].length;i++)
                for(var j=0;j<allball[1].length;j++)
                for(var k=0;k<allball[2].length;k++)
                    if(allball[0][i] != allball[1][j] && allball[0][i] != allball[2][k] && allball[1][j] != allball[2][k] )                            
                        notenum++; 
            break;
            case 35:
                var _bet = bet[0].toString(2).split('');
                for(var j=0;j<_bet.length;j++){
                    if(_bet[j] == '1')  
                        notenum++;
                }   
            break;
            default:
                notenum=0;
        }

        return [notenum,this.odds.pk10[rule][0]];
    },
    //---------------11x5------------------
    // 前三
    rule_syxw_3x:function(bet,parent,son){
        
        var ball =[0,0,0,0,0];
        var notenum =0;
        var rule = 'r'+parent + son;


        //组选
        if(son == 62){
            var balls=0;
            var _bet = bet[0].toString(2).split('');    
                   
            for(var j=0;j<_bet.length;j++){
                if(_bet[j] == '1')  
                    balls++;
            }                                 
            
            notenum = balls*(balls-1)*(balls-2)/3/2;
        }else{
             //直选            
             var allball =[];
             for(var i=0;i<bet.length;i++){
                 var _bet = (bet[i]+2048).toString(2).split('');
                
                 var ball=[];
                 for(var j=_bet.length-1;j>0;j--){
                     if(_bet[j]-0 >0)
                         ball.push(12-j);
                 }
                 allball.push(ball);  
             }                       
 
             for(var i=0;i<allball[0].length;i++)
                 for(var j=0;j<allball[1].length;j++)
                    for(var k=0;k<allball[2].length;k++)
                        if(allball[0][i] != allball[1][j] && allball[0][i] != allball[2][k] && allball[1][j] != allball[2][k] )                            
                            notenum++; 
                        
        }

        return [notenum,this.odds.syxw[rule][0]];
    },

    rule_syxw_2x:function(bet,parent,son){
        
        var ball =[0,0,0,0,0];
        var notenum =0;
        var rule = 'r'+parent + son;


        //组选
        if(son == 64){
            var balls=0;
            var _bet = bet[0].toString(2).split('');    
                   
            for(var j=0;j<_bet.length;j++){
                if(_bet[j] == '1')  
                    balls++;
            }                                 
            
            notenum = balls*(balls-1)/2;
        }else{
            //var x=7;var y=5;var d=1;x*y-d;
           
            //直选            
            var allball =[];
            for(var i=0;i<bet.length;i++){
                var _bet = (bet[i]+2048).toString(2).split('');
               
                var ball=[];
                for(var j=_bet.length-1;j>0;j--){
                    if(_bet[j]-0 >0)
                        ball.push(12-j);
                }
                allball.push(ball);  
            }          

            for(var i=0;i<allball[0].length;i++)
                for(var j=0;j<allball[1].length;j++)
                    if(allball[0][i] != allball[1][j])
                        notenum++;            
        }

        return [notenum,this.odds.syxw[rule][0]];
    },
    rule_syxw_dingwei:function(bet,parent,son){
        var ball =[0,0,0,0,0];
        var notenum =0;
        var rule = 'r'+parent + '11';

        for(var i=0;i<bet.length;i++){

            var _bet = bet[i].toString(2).split('');

            for(var j=0;j<_bet.length;j++){
                ball[i]+=_bet[j]-0;
            }
           
            notenum += ball[i];
        }  

        return [notenum,this.odds.syxw[rule][0]];
    },

    rule_syxw_budingwei:function(bet,parent,son){
        var ball =0;
        var notenum =0;
        var rule = 'r'+parent +son;       

        var _bet = bet[0].toString(2).split('');

        for(var j=0;j<_bet.length;j++){
            ball+=_bet[j]-0;
        }
        notenum =ball;           

        return [notenum,this.odds.syxw[rule][0]];
    },

    rule_syxw_quwei:function(bet,parent,son){
        var ball =0;
        var notenum =0;
        var rule = 'r'+parent +son;  

        var _bet = bet[0].toString(2).split('');

        for(var j=0;j<_bet.length;j++){
            ball+=_bet[j]-0;
        }
        notenum =ball;  


        return [notenum,this.odds.syxw[rule][0]];
    },
    rule_syxw_renxuan:function(bet,parent,son){

        var ball =0;
        var notenum =0;
        var rule = 'r'+parent +son;  


        var _bet = bet[0].toString(2).split('');

        for(var j=0;j<_bet.length;j++){
            ball+=_bet[j]-0;
        }
        notenum =ball;  


        switch(son-0){

            case 68:
                notenum = ball*(ball-1)/2;
            break;
            case 69:
                notenum = ball*(ball-1)*(ball-2)/3/2;
            break;
            case 70:
                notenum = ball*(ball-1)*(ball-2)*(ball-3)/4/3/2;
            break;
            case 71:
                notenum = ball*(ball-1)*(ball-2)*(ball-3)*(ball-4)*(ball-5)/6/5/4/3/2;
            break;
            case 72:
                notenum = ball*(ball-1)*(ball-2)*(ball-3)*(ball-4)*(ball-5)*(ball-6)/7/6/5/4/3/2;
            break;
            case 73:
                notenum = ball*(ball-1)*(ball-2)*(ball-3)*(ball-4)*(ball-5)*(ball-6)*(ball-7)/8/7/6/5/4/3/2;
            break;


        }

        return [notenum,this.odds.syxw[rule][0]];
    },

   
//------------------------------------------------------
    //五星
    rule_ssc_5x:function(bet,parent,son){

        var ball =[0,0,0,0,0];
        var notenum =1;
        var rule = 'r'+parent + son;

        //this.getorder(bet,parent,son);

        if(son > 13){

            switch(son){
                case 14:   
                    var balls=0;
                   
                    var _bet = bet[0].toString(2).split('');    
                   
                    for(var j=0;j<_bet.length;j++){
                        if(_bet[j] == '1')  
                            balls++;
                    }                                  
                    //var n =[0,0,0,0,0,1,6,21,56,126,252];
                    notenum = balls*(balls-1)*(balls-2)*(balls-3)*(balls-4)/5/4/3/2/1;
                break;
                case 15:            //xxyzw
                    var balls =[];

                    var repeat = 0;
                    for(var i=0;i<2;i++){
                        var _bet = (bet[i]+1024).toString(2).split('');    
                        balls[i] =_bet;                      
                    }  
                
                    var dn =0;
                    var sn =0;
                    for(var i=1;i<balls[0].length;i++){
                        if( balls[0][i] =='1' && balls[1][i] =='1' )
                            repeat++;
                        if(balls[0][i] =='1') dn++;
                        if(balls[1][i] =='1') sn++;
                    }                
                
                    if(repeat>0){
                        notenum =   (dn-repeat)*(  sn*(sn-1)*(sn-2)/3/2/1  ) +
                                    repeat*(  (sn-1)*(sn-2)*(sn-3)/3/2/1  );
                    }else                
                        notenum =dn*(  sn*(sn-1)*(sn-2)/3/2/1  );
                break;
                case 16://xxyyz
                    var balls =[];

                    var repeat = 0;
                    for(var i=0;i<2;i++){
                        var _bet = (bet[i]+1024).toString(2).split('');    
                        balls[i] =_bet;                      
                    }  
                
                    var dn =0;
                    var sn =0;
                    for(var i=1;i<balls[0].length;i++){
                        if( balls[0][i] =='1' && balls[1][i] =='1' )
                            repeat++;
                        if(balls[0][i] =='1') dn++;
                        if(balls[1][i] =='1') sn++;
                    }                
                
                    if(repeat>0){
                        notenum =   dn*(dn-1)/2 * (sn-repeat) +
                                    (dn-1)*(dn-2)/2 *repeat;
                    }else                
                        notenum = dn*(dn-1)/2*sn;
                break;

                case 17://xxxyz
                    var balls =[];

                    var repeat = 0;
                    for(var i=0;i<2;i++){
                        var _bet = (bet[i]+1024).toString(2).split('');    
                        balls[i] =_bet;                      
                    }  
                
                    var tn =0;
                    var sn =0;
                    for(var i=1;i<balls[0].length;i++){
                        if( balls[0][i] =='1' && balls[1][i] =='1' )
                            repeat++;
                        if(balls[0][i] =='1') tn++;
                        if(balls[1][i] =='1') sn++;
                    }                
                
                    if(repeat>0){
                        notenum =   (tn-repeat)*(  sn*(sn-1)/2  ) +
                                    repeat*(  (sn-1)*(sn-2)/2  );
                    }else                
                        notenum =tn*(  sn*(sn-1)/2  );           
                break;
                case 18://xxxyy
                case 19://xxxxy
                    var balls =[];

                    var repeat = 0;
                    for(var i=0;i<2;i++){
                        var _bet = (bet[i]+1024).toString(2).split('');    
                        balls[i] =_bet;                      
                    }  
                
                    var tn =0;
                    var dn =0;
                    for(var i=1;i<balls[0].length;i++){
                        if( balls[0][i] =='1' && balls[1][i] =='1' )
                            repeat++;
                        if(balls[0][i] =='1') tn++;
                        if(balls[1][i] =='1') dn++;
                    }                                        
                    notenum =  tn*dn -repeat ; 
                break;
            }

        }else{

            for(var i=0;i<bet.length;i++){

                var _bet = bet[i].toString(2).split('');
    
                for(var j=0;j<_bet.length;j++){
                    ball[i]+=_bet[j]-0;
                }
               
                notenum *= ball[i];
            }  
            if(son-0 == 13 )
                notenum *=5;
        }         

        return [notenum,this.odds.ssc[rule][0]];
    },

    //四星
    rule_ssc_4x:function(bet,parent,son){
        var ball =[0,0,0,0];
        var notenum =1;
        var rule = 'r'+parent + son;

        if(son > 13){

            switch(son){
                case 20:   //xyzw
                    var balls=0;
                    
                    var _bet = bet[0].toString(2).split('');    
                
                    for(var j=0;j<_bet.length;j++){
                        if(_bet[j] == '1')  
                            balls++;
                    }                                  
                    //var n =[0,0,0,0,0,1,6,21,56,126,252];
                    notenum = balls*(balls-1)*(balls-2)*(balls-3)/4/3/2;
                break;
                case 21://xxyz
                    var balls =[];

                    var repeat = 0;
                    for(var i=0;i<2;i++){
                        var _bet = (bet[i]+1024).toString(2).split('');    
                        balls[i] =_bet;                      
                    }  
                
                    var dn =0;
                    var sn =0;
                    for(var i=1;i<balls[0].length;i++){
                        if( balls[0][i] =='1' && balls[1][i] =='1' )
                            repeat++;
                        if(balls[0][i] =='1') dn++;
                        if(balls[1][i] =='1') sn++;
                    }                
                
                    if(repeat>0){
                        notenum =   (dn-repeat)*(  sn*(sn-1)/2  ) +
                                    repeat*(  (sn-1)*(sn-2)/2  );
                    }else                
                        notenum =dn*(sn*(sn-1)/2); 
                break;
                case 22://xxyy
                    var balls =[];
                    var _bet = bet[0].toString(2).split('');
                    for(var j=0;j<_bet.length;j++){
                        if(_bet[j] == '1')  
                            balls++;
                    }                                  
                   
                    notenum = balls*(balls-1)/2;
                break;
                case 23://xxxy
                    var balls =[];

                    var repeat = 0;
                    for(var i=0;i<2;i++){
                        var _bet = (bet[i]+1024).toString(2).split('');    
                        balls[i] =_bet;                      
                    }  
                
                    var tn =0;
                    var dn =0;
                    for(var i=1;i<balls[0].length;i++){
                        if( balls[0][i] =='1' && balls[1][i] =='1' )
                            repeat++;
                        if(balls[0][i] =='1') tn++;
                        if(balls[1][i] =='1') dn++;
                    }                                        
                    notenum =  tn*dn -repeat ; 
                break;              
            }
        }else{           
            for(var i=0;i<4;i++){

                var _bet = bet[i].toString(2).split('');
    
                for(var j=0;j<_bet.length;j++){
                    ball[i]+=_bet[j]-0;
                }
               
                notenum *= ball[i];
            }  
    
            if(son-0 == 13 )
                notenum *=4;
        }               
        return [notenum,this.odds.ssc[rule][0]];
    },

    //前三 中三 后三
    rule_ssc_3x:function(bet,parent,son){
        var ball =[0,0,0];
        var notenum =1;
        var rule = 'r'+parent + son;

        if(son >13){
            switch(son){
                case 25:
                    var balls =[];
                    var _bet = bet[0].toString(2).split('');
                    for(var j=0;j<_bet.length;j++){
                        if(_bet[j] == '1')  
                            balls++;
                    } 
                    notenum = balls*(balls-1);
                break;
                case 26:
                    var balls =[];
                    var _bet = bet[0].toString(2).split('');
                    for(var j=0;j<_bet.length;j++){
                        if(_bet[j] == '1')  
                            balls++;
                    } 
                    notenum = balls*(balls-1)*(balls-2)/3/2;
                break;

                //和值
                case 24:
                    notenum=0;
                    var _bet = (bet[0]+268435456).toString(2).split('');
                   
                    for(var j=1;j<_bet.length;j++){
                        if(_bet[j] == '1')  
                            notenum += this.hezhi.sx_zhi[j-1];
                    } 
                break;
                case 32:      
                    notenum=0;             
                    var _bet = (bet[0]+268435456).toString(2).split('');
                    for(var j=2;j<_bet.length;j++){
                        if(_bet[j] == '1')  
                            notenum += this.hezhi.sx_zu[j-2];
                    } 
                break;
            }
        }else{           
            for(var i=0;i<3;i++){

                var _bet = bet[i].toString(2).split('');
    
                for(var j=0;j<_bet.length;j++){
                    ball[i]+=_bet[j]-0;
                }
               
                notenum *= ball[i];
            }  
    
            if(son-0 == 13 )
                notenum *=3;
        }               
        return [notenum,this.odds.ssc[rule][0]];
    },


    //前二  后二
    rule_ssc_2x:function(bet,parent,son){
        var ball =[0,0];
        var notenum =1;
        var rule = 'r'+parent + son;
       

        switch(son){

            case 10: 
                for(var i=0;i<2;i++){
                    var _bet = bet[i].toString(2).split('');    
                    for(var j=0;j<_bet.length;j++){
                        ball[i]+=_bet[j]-0;
                    }               
                    notenum *= ball[i];
                }
            break;

            case 30:          
                var balls =[];
                var _bet = bet[0].toString(2).split('');
                for(var j=0;j<_bet.length;j++){
                    if(_bet[j] == '1')  
                        balls++;
                } 
                notenum = balls*(balls-1)/2;
            break;
                
            case 24:
                notenum=0;
                var _bet = (bet[0]+524288).toString(2).split('');
            
                for(var j=1;j<_bet.length;j++){
                    if(_bet[j] == '1')  
                        notenum += this.hezhi.lx_zhi[j-1];
                } 
            break;         

            case 32:
                notenum=0;
                var _bet = (bet[0]+524288).toString(2).split('');            
                
                for(var j=2;j<_bet.length;j++){
                    if(_bet[j] == '1')  
                        notenum += this.hezhi.lx_zu[j-2];
                } 
                // cc.log(notenum);
                // cc.log(_bet);
            break;
        }
    
        return [notenum,this.odds.ssc[rule][0]];
    },

    rule_ssc_dingwei:function(bet,parent,son){
        var ball =[0,0,0,0,0];
        var notenum =0;
        var rule = 'r'+parent + '11';

        for(var i=0;i<bet.length;i++){

            var _bet = bet[i].toString(2).split('');

            for(var j=0;j<_bet.length;j++){
                ball[i]+=_bet[j]-0;
            }
           
            notenum += ball[i];
        }  

        return [notenum,this.odds.ssc[rule][0]];
    },

    rule_ssc_budingwei:function(bet,parent,son){
        var ball =0;
        var notenum =0;
        var rule = 'r'+parent +son;       

        var _bet = bet[0].toString(2).split('');

        for(var j=0;j<_bet.length;j++){
            ball+=_bet[j]-0;
        }          
       

        switch(son){
            case 33:
            case 36:
            case 38:
            case 40:
            case 44:
            notenum =ball;
            break;

            case 34:
            case 37:
            case 39:
            case 41:
            case 43:
            case 45:
            notenum = ball*(ball-1)/2;
            break;

            case 35:
            notenum = ball*(ball-1)*(ball-2)/3/2;
            break;
        }       

        return [notenum,this.odds.ssc[rule][0]];
    },

    rule_ssc_dxds:function(bet,parent,son){
       
        var notenum =1;
        var rule = 'r'+parent +son;  
         
        var max =3;

        if(son >47)    max =2;
      
        var ball =[0,0,0];

        for(var i=0;i<max;i++){
            var _bet = bet[i].toString(2).split('');

            for(var j=0;j<_bet.length;j++){
                ball[i]+=_bet[j]-0;
            }               
            notenum *= ball[i];
        }          

        return [notenum,this.odds.ssc[rule][0]];
    },

    rule_ssc_qw:function(bet,parent,son){

        var notenum =0;
        var rule = 'r'+parent +son;  

        var _bet = bet[0].toString(2).split('');

        for(var j=0;j<_bet.length;j++){
            notenum +=_bet[j]-0;
        }   

        return [notenum,this.odds.ssc[rule][0]];
    },


     //取得号码的所有组合
     getorder:function(balls,parent,son){

        var order = [];        

        for(var i=0;i<balls.length;i++){           
            var _ball =[];           
             for(var j=0;j<10;j++){                
               if( ( balls[i]&(Math.pow(2,j))) !=0 ) {                   
                    _ball.push(j);
               }              
            }
            order.push(_ball);           
        }  

        //ijklmn
        //for(var i=0;i<order.length;i++){
            for(var j=0;j<order[0].length;j++){
                for(var k=0;k<order[1].length;k++){
                    for(var l=0;l<order[2].length;l++){
                        for(var m=0;m<order[3].length;m++){
                            for(var n=0;n<order[4].length;n++){
                                //cc.log(''+order[0][j]+order[1][k]+order[2][l]+order[3][m]+order[4][n]);
                            }
                        }
                    }
                }                
            }
        //}
        //cc.log(order);
    },

} ;
module.exports =  Rule;

/**
 * ssc 1~120期
 */
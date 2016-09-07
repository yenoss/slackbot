process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';

var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var users = require('./routes/users');

var utilz = require('./common/utilz');

var app = express();
//slackBot
var SlackBot = require('slackbots');
//redis
var redis = require('redis'),
    client = redis.createClient();
var request = require('request')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 53363);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


if( process.env.NODE_ENV == 'production' ) {
    console.log("Production Mode");
} else if( process.env.NODE_ENV == 'development' ) {
    console.log("Development Mode");
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// function consolee




var bot = new SlackBot({
    token: 'xoxb-75279241040-OvneDmigA15EpQqy0kzeu4Vg', //'xoxb-74329505366-3iYScKlaIH00Lnq9gDhq8sJZ', // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'hanjin'
});


// function initGameInfo (typess){
//   typess = 'hi';
//   // console.log(typess);

// }
bot.on('start', function() {
  
  //reply에 따라
  //0 -> exist
  //1 -> push success
  //-1 -> err
  // insertTeam('ab',function(reply){
  //   console.log('callbakc reply =>'+reply);
  // });

  //레디스 team(키)에 팀이름을 등록시킨다(pks)
  //팀이름 혹 자체적으로 해시키로 만들어서 저장해준다.
  insertTeam('pks',function(data){
    if(data==1 || data==0){
      //팀내의 있는 채널들을 싹다 가져온다.
      initChannels('pks',function(data){
        console.log("callback => "+ data);
      });    
    }
    console.log("callback => "+ data);
  });


});

const STR_START  = '.시작'
const STR_RNK  = '.랭크'
const STR_QUIZ1 = '류신노 겐오 쿠라에!'
const STR_QUIZ2 = '이것도 너프해 보시지!'
const STR_QUIZ3 = '석양이 진다..'
const STR_QUIZ4 = '목표를 포착했다.'
const STR_QUIZ5 = '폭탄 고정 / 폭탄받아'
const STR_QUIZ6 = '하늘에서 정의가 빗발친다!'
const STR_QUIZ7 = '신사숙녀여러분,한번 달려보자고!'
const STR_QUIZ8 = '류오 와가 테키오 쿠라에!'
const STR_QUIZ9 = '오우~ 제대로 놀아보자!'
const STR_QUIZ10 = '영웅은 죽지않아요'

const STR_QUIZ11 = '상처를 치료해줄 사람 어디 없나'
const STR_QUIZ12 = '방황하는 내 영혼을 조작키를 잡은 Jack Sparrow'
const STR_QUIZ13 = '다들 그래(다들 그래) 맞어 그래 난 더 미치고 싶어'
const STR_QUIZ14 = '[빈듯했던 네겐 울트라 같은 펀치'
const STR_QUIZ15 = '메밀 꽃 필 무렵 그녀가 말했다.. 배가고파.. 피자가 먹고싶어'
const STR_QUIZ16 = '삶이 있는 한 희망은 있다 - 키케로'
const STR_QUIZ17 = '신은 용기있는자를 결코 버리지 않는다 - 켄러'
const STR_QUIZ18 = '행복한 삶을 살기위해 필요한 것은 거의 없다. - 마르쿠스 아우렐리우스 안토니우스'
const STR_QUIZ19 = '절대 어제를 후회하지 마라 . 인생은 오늘의 나 안에 있고 내일은 스스로 만드는 것이다 - L.론허바드'
const STR_QUIZ20 = '진짜 문제는 사람들의 마음이다. 그것은 절대로 물리학이나 윤리학의 문제가 아니다. - 아인슈타인'

const IM_USER = 'USER'
const IM_BOT = 'BOT'
const BOT_FULLNAME = 'hanjin'

const TALK_TYPE_RECONNECT_URL = 'reconnect_url'
const TALK_TYPE_USER_TYPING = 'user_typing'
const TALK_TYPE_MESSAGE = 'message'

var arrQuiz;
var params;
var isGameStart = false;

function initGame(data){
  //기존 데이터 있으면 일단삭제 싹하고
  client.del(data.channel+'_resultList_');

  arrQuiz = [STR_QUIZ1,STR_QUIZ2,STR_QUIZ3,STR_QUIZ4,STR_QUIZ5,STR_QUIZ6,STR_QUIZ7,STR_QUIZ8,STR_QUIZ9,STR_QUIZ10,STR_QUIZ11,STR_QUIZ12,STR_QUIZ13,STR_QUIZ14,STR_QUIZ15,STR_QUIZ16,STR_QUIZ17,STR_QUIZ18,STR_QUIZ19,STR_QUIZ20]
  
  params = {
          icon_emoji: ''
    };

}

bot.on('message', function(data) {

  //가. 게임 초기화할것들이 필요함. 이초기화할것들은 게임이 시작되면 전체적으로 초기화되는것임.
  // 0. 퀴즈배열 초기화.
  // 1. 게임 기본 파라미터 설정.



  //타입유저를 분별한다. 
  // console.log(data);

  var typeUser;

  var whoUare;
  //사람이 입력하면 ==> user가 있고
  //봇이 입력하면 ==> userName이 있다.
  //고로 이것으로 유저인지 아닌지를 분별한다.

  //ex) username :한진, user는 id로 보여진다.
  //** 유저구분은 불안정한 소켓에서 명확하게 확인해줄 중요한요소이다.
  if(data.username == undefined){
    whoUare = IM_USER;
    typeUser = data.user;
  }else{
    whoUare = IM_BOT;
    typeUser = data.username;
  }
  
  var typingType = data.type;


  //나. 게임시작.
  //  .시작을 입력하였을떄.
  //  퀴즈리스트에서 퀴즈를 하나 골라두고
  //  3. 2. 1. 제시어가 보여질수 있도록한다.


  if(data.text == STR_START){

    isGameStart = true;
    var currentChannel = data.channel;
    initGame(data);
    //time line은 시간을 재고 보여주기위함이다.
    
    //퀴즈리스트에서 퀴즈를 고르고 
    var selectedQuiz = arrQuiz[Math.floor(Math.random() * arrQuiz.length)];
    
    //선택된 퀴즈의 길이를 반환한다.
    var timeOut = selectedQuiz.length;
    

    //redis에 현재 퀴즈 를 저장한다. 후에 비교하기위함이다.    
    client.set(currentChannel + "_Quiz", selectedQuiz);

    //봇에게 게임을 시작한다고 알려준다.
    bot.postMessage(currentChannel, '게임을 시작합니다.'+' timeout : '+timeOut/3+'초 ', params);
    //
    var cnt = 3;
    var countDown = setInterval(function(){    
      if(cnt==1){        
        //clear로 인터벌을 끊어줌.
        clearInterval(countDown)
          //그리고 종료를위해 타이머를 다시 설정
          setTimeout(function(){

            var startTime = new Date().getTime();
            client.set(currentChannel + "_start", startTime);

            //문제내기!
            bot.postMessage(currentChannel,'*'+selectedQuiz+'* '+ utilz.msToTime(startTime), params);          
            
            //문제내기 시작부터 타임아웃시작!
            setTimeout(function(){

              // isGameStart = false
              //타임아웃이라고 말해준다.
              bot.postMessage(currentChannel, '-----TimeOut------'+ utilz.msToTime(new Date().getTime()), params);
              
              client.lrange(data.channel+'_resultList_', 0, -1, function(err, reply) {    
                for(var entry in reply){
                  bot.postMessage(currentChannel,reply[entry] , params);  
                }

                client.lrange(currentChannel+'_resultEnqueueJson', 0, -1, function(err, reply) {                                  
                  for(var entry in reply){
                    labzyWrite(reply[entry]);  
                  }
                  client.del(data.channel+'_resultEnqueueJson');
                  isGameStart = false;

                });             
              }); 
            },timeOut/3*1000);

          },1000);   

      }; 

      bot.postMessage(currentChannel,cnt--, params);
    },500);

    //
  }

  //게임이 시작했다.
  else if( isGameStart == true && typeUser != BOT_FULLNAME && typingType ==TALK_TYPE_MESSAGE && whoUare == IM_USER){
    console.log('hi! am Answer!');

    var currentChannel = data.channel;

    //현재타임에서 차이를 이용해 얼마나걸렸는지 확인한다.
    client.get(currentChannel + "_start", function(err, value) {
      var startTime = value;
      var endTime = new Date().getTime();
      var diffTime = endTime - startTime;
    
      client.get(currentChannel + "_Quiz", function(err, value) {
          //유저네임을 추출하기위해 봇에 모든 유저들을 가져온다.
        var arr = bot.getUsers()._value.members;
        var userName;
        var userID;
        
        for (var entry in arr){
          //아이디같은녀석중에 이름을 추출해야한다.
          if(arr[entry].id == typeUser){
            userName = arr[entry].name;
            userID = arr[entry].id;
            console.log(userName);
            break;
          };
        }

        //score로직이 들어가야함;;;
        var accuracy = utilz.similarStr(data.text,value);
        var score = 1000;

        var resultText = userName+' =>'+' 정확도 : '+accuracy+'%  ||   걸린시간 : '+utilz.msToTime(diffTime)+'  ||   score : '+score ;
        //유저채널명을 앞으로 구분하여 저장한다.
      

        //보여줄거 싹다 저장하고.. 
        client.lpush(currentChannel+'_resultList_',resultText,function(err,reply){
        
        setUserScore('pks',currentChannel,userName,score,function(data){

              var jsonData = new Object();
              jsonData.userId = userID;
              jsonData.userName = userName;
              jsonData.percise = accuracy;
              jsonData.diffTime = diffTime;
              jsonData.score = score;

              client.lpush(currentChannel+'_resultEnqueueJson',JSON.stringify(jsonData),function(err,reply){

              });

            });         
        });
      });
    });

  }
});

function getDeliveryData(t_callNum,t_code,t_invoice,callback){
      
        var request = require('request');      
        var defaultURL = 'https://m.search.naver.com/p/csearch/content/util/headerjson.nhn?_callback=window.__jindo2_callback._'+t_callNum+'&callapi=parceltracking';
        console.log(defaultURL);
        request.get(
            // 'https://m.search.naver.com/p/csearch/content/util/headerjson.nhn?_callback=window.__jindo2_callback._8082&callapi=parceltracking&t_code=04&t_invoice=337015615165',            
            defaultURL+'&t_code='+t_code+'&t_invoice='+t_invoice,
            { json: { t_code: 'value' } },
            function (error, response, body) {
              // console.log(defaultURL+'&t_code='+t_code+'&t_invoice='+t_invoice);
              console.log(body);
                if (!error && response.statusCode == 200) {
                        // console.log(body);
                        var start = body.indexOf("{");
                        var end = body.lastIndexOf("}");
                        callback(body.substr(start, end-30));
                }
            }
        );
}
function prettyJson(jsonVal,t_callNum,t_invoice){
          var obj = JSON.parse(jsonVal);
          var arrDetail = obj.trackingDetails;
          // console.log(arrDetail);
          var prettyVal = ''
          if(t_callNum == 8082){
                  prettyVal += '>:truck: *CJ대한통운 : '+t_invoice+'*\n'
          }else if(t_callNum == 8731){
                  prettyVal += '>:truck: *현대택배 : '+t_invoice+'*\n'
          }else if(t_callNum == 6630){
                  prettyVal += '>:truck: *우체국 : '+t_invoice+'*\n'
          }
          prettyVal += '>========================================================\n';
          prettyVal += '>                   시간                           배송상태                        장소\n';
          prettyVal += '>========================================================\n';


          for(var i = 0 ; i< arrDetail.length; i++){
                  prettyVal += '>   '+arrDetail[i].timeString+'      ';
                 
                  if(/(\r\n|\n|\r)/gm.test(arrDetail[i].kind)){
                          console.log('find gahang');
                          arrDetail[i].kind = arrDetail[i].kind.replace(/(\r\n|\n|\r)/gm,"");  
                  }

                  prettyVal += '      '+arrDetail[i].kind;
                  
                  for(var j = 0 ;j<10-arrDetail[i].kind.length;j++){
                          prettyVal +='   ';
                  }
                  // var pos =           
                  
                  
                  prettyVal += '  '+arrDetail[i].where+'   ';
                  prettyVal += '\n';
          }
          

          return prettyVal
}

module.exports = app;
http.createServer(app).listen(app.get('port'), function() {
  console.log('gogo! serverrunning');
});


//rabitq



//**REDIS 저장 로직
//1. 최초 앱봇이 추가될떄 해당팀을 넣는다. teams : ['urung','namtang']
//   ..만약 없다면 추가 있다면.. 
//2. (최초)내팀을 키로 채널을 넣는다. namtang : ['general','idea','mission']
//    ..채널은 매번 봇이실행될때 테스트를 해봐야한다. 혹은 invite트리거가 존재하는가?
//3. 해당 채널을 키로 (score: name)을 넣는다.



//팀을 추가하는 과정이다.
//1. 봇이 시작되면(start) 팀명을 게임에 추가해준다.
//2. 기존에없는것이면추가, 있는것이면 존재한다는 것이라고 알려준다.
function insertTeam(teamName,callback){
  client.lrange('teams', 0, -1, function(err, reply) {    
    //길이가 0 이면 그냥 넣어주면되고.
    if(reply.length ==0){
      // console.log('init! First!');
      client.lpush('teams',teamName,function(err,reply){
        if(err){
          callback(-1);    
        }else{
          callback(1);
        }        
      });

    }else{
      // console.log(reply);
    
      var flgIsSame = false;

      reply.every(function(entry,index) {
        
        if(entry==teamName){ 
          flgIsSame = true; 
          return false;
        }else{
          return true;
        }     
      });

      console.log(flgIsSame);

      if(flgIsSame == true){
        callback(0); 
      }else{
        client.lpush('teams',teamName,function(err,reply){
          if(err){callback(-1);}
          else{
            callback(1);    
          }             
        });
      }

    }

  });
}

//채널이 없으면 만들고 있으면 리로드한다.
// input : teamName
//1.채널을 추가할것이다.
//2.팀네임을 에 해당하는 채널들 이있는지 검색을 해야한다.
//3. 만약 해당 팀네임에 정보가 없다면(length==0) 채널을 탐색해서 싹 넣어주면되고 리턴. 
function initChannels(teamName,callback){
  //팀내임으로 만드
  client.lrange(teamName, 0, -1, function(err, reply) {    
    var rowChannels = bot.getChannels()._value.channels;
    console.log('array Channels ===> ' +reply);
    //팀내임으로 키가 없으면 만들어준다.
    if(reply.length ==0){      
      console.log('init Channels');
      var arrChannelsWithID = [];
      //엔트리에 아이디를 추가해준다.
            // reply.every(function(entry,index) {


      rowChannels.forEach(function(entry){
        // console.log(entry);
        client.lpush(teamName,entry.id,function(err,reply){
          callback(1);
          return false;
        });

      });      
      // 채널을 아이디로 저장    
    //기존에 있으면 됬다.
    }else{callback(0);}
  });
}
function getRank(teamName,channelID,callback){
  client.lrange(teamName, 0, -1, function(err, reply) {    

      reply.every(function(entry,index) {
      //리스트에 채널ID랑 같은것이 있다! 면 스코어랑 유저를 저장한다.
        if(entry==channelID){
                 
            client.zrevrange(channelID,0,-1,'withscores',function(err,members){
                callback(members);  
            });            
          return false;
        }else{
          return true;
        }
      });

  });
}

function setUserScore(teamName,channelID,user,score,callback){

  client.lrange(teamName, 0, -1, function(err, reply) {    
    // console.log(reply);
    reply.every(function(entry,index) {
      //리스트에 채널ID랑 같은것이 있다! 면 스코어랑 유저를 저장한다.
        if(entry==channelID){
          client.zincrby(channelID,score,user,function(err,reply){
            if(err){
              callback(-1)

            }
            else{
              
              client.zrevrange(channelID,0,-1,'withscores',function(err,members){
                  // console.log('members!'+members);                  
                  callback(members);  

              });
            }
          });
          return false;
        }
        //채널 ID에 없다! 면 만들어서 넣어준다음 스코어랑 유저를 저장한다.
        else { 
          client.lpush(teamName,channelID,function(err,reply){
            //zadd,zincryby
            client.zincrby(channelID,score,user,function(err,reply){
              if(err){
                callback(-1)
              }
              else{
                callback(1);    
                client.zrevrange(channelID,0,-1,'withscores',function(err,members){
                    callback(members);  
                });

              }
            });
            return false;
          });
        }
        return true;

      });        
  });
}

//producer
//큐서버로 데이터를(저장정보) 전송한다.
function labzyWrite(payload){
  console.log('lazy write')
  var config = require('./conf.json');
  var amqp = require('amqp');
  // console.log('hi write')
  
  
  var connection = amqp.createConnection({ host: config.host, port: 5672,login:config.loginID,password:config.password,vhost:config.vhost });
  connection.on('ready', function () {
    console.log('read');

    connection.exchange('yenos-bot', options={type:'direct'}, function(exchange) {   
    console.log('exchange');

      var sendMessage = function(exchange, payload) {
        console.log('producer')
        var encoded_payload = JSON.stringify(payload);
        exchange.publish('yenos-bot-key', encoded_payload, {})
      }
      sendMessage(exchange,payload);

   });

  });
}


// function msToTime(duration) {
//     var milliseconds = parseInt((duration%1000)/100)
//         , seconds = parseInt((duration/1000)%60)
//         , minutes = parseInt((duration/(1000*60))%60)
//         , hours = parseInt((duration/(1000*60*60))%24);

//     hours = (hours < 10) ? "0" + hours : hours;
//     minutes = (minutes < 10) ? "0" + minutes : minutes;
//     seconds = (seconds < 10) ? "0" + seconds : seconds;

//     return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
// }
// function similarStr(a,b) {
//     var lengthA = a.length;
//     var lengthB = b.length;
//     var equivalency = 0;
//     var minLength = (a.length > b.length) ? b.length : a.length;    
//     var maxLength = (a.length < b.length) ? b.length : a.length;    
//     for(var i = 0; i < minLength; i++) {
//         if(a[i] == b[i]) {
//             equivalency++;
//         }
//     }
//     //절대 maxLength가0 이면안된다.
//     var weight = equivalency / maxLength;
//     return (weight * 100);
// }


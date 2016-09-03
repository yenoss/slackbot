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





function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}


var bot = new SlackBot({
    token: 'xoxb-75279241040-OvneDmigA15EpQqy0kzeu4Vg', //'xoxb-74329505366-3iYScKlaIH00Lnq9gDhq8sJZ', // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'hanjin'
});


function initGameInfo (typess){
  typess = 'hi';
  // console.log(typess);

}
bot.on('start', function() {

  //봇 예제..
    // more information about additional params https://api.slack.com/methods/chat.postMessage 
    // var params = {
    //     icon_emoji: ':cat:'
    // };
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services  
    
    // // define existing username instead of 'user_name' 
    // bot.postMessageToUser('yenos', 'meow!', params); 
    
    // // If you add a 'slackbot' property,  
    // // you will post to another user's slackbot channel instead of a direct message 
    // bot.postMessageToUser('yenos', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' }); 
    
    // define private group instead of 'private_group', where bot exist 
    // bot.postMessageToGroup('private_group', 'meow!', params); 
    // var jsonVa = '{"result":"Y","completeYN":"Y","itemName":"","trackingDetails":[{"time":1472198811000,"level":2,"remark":null,"telno2":"010-5232-9575","telno":"02-2614-8254","manPic":"","timeString":"2016-08-26 17:06:51","code":null,"where":"구로중앙(대)","manName":"","kind":"집하완료"},{"time":1472205826000,"level":3,"remark":null,"telno2":"","telno":"02-852-8548","manPic":"","timeString":"2016-08-26 19:03:46","code":null,"where":"구로터미널","manName":"","kind":"구간도착"},{"time":1472209769000,"level":3,"remark":null,"telno2":"","telno":"02-852-8548","manPic":"","timeString":"2016-08-26 20:09:29","code":null,"where":"구로터미널","manName":"","kind":"구간발송"},{"time":1472218103000,"level":3,"remark":null,"telno2":"","telno":"031-460-2800","manPic":"","timeString":"2016-08-26 22:28:23","code":null,"where":"군포TML","manName":"","kind":"구간도착"},{"time":1472255413000,"level":3,"remark":null,"telno2":"","telno":"02-3159-7982","manPic":"","timeString":"2016-08-27 08:50:13","code":null,"where":"상암(대)","manName":"","kind":"구간도착"},{"time":1472267709000,"level":5,"remark":null,"telno2":"010-2730-9428","telno":"02-3159-7982","manPic":"","timeString":"2016-08-27 12:15:09","code":null,"where":"상암(대)","manName":"","kind":"배달전"},{"time":1472295682000,"level":6,"remark":null,"telno2":"010-2730-9428","telno":"02-3159-7982","manPic":"","timeString":"2016-08-27 20:01:22","code":null,"where":"상암(대)","manName":"","kind":"배달완료"},{"time":1472309999000,"level":6,"remark":null,"telno2":"010-2730-9428","telno":"02-3159-7982","manPic":"","timeString":"2016-08-27 23:59:59","code":null,"where":"상암(대)","manName":"","kind":"인수등록"}],"productInfo":null,"lastDetail":{"time":1472309999000,"level":6,"remark":null,"telno2":"010-2730-9428","telno":"02-3159-7982","manPic":"","timeString":"2016-08-27 23:59:59","code":null,"where":"상암(대)","manName":"","kind":"인수등록"},"invoiceNo":"225664590060","estimate":null,"adUrl":null,"recipient":null,"lastStateDetail":{"time":1472309999000,"level":6,"remark":null,"telno2":"010-2730-9428","telno":"02-3159-7982","manPic":"","timeString":"2016-08-27 23:59:59","code":null,"where":"상암(대)","manName":"","kind":"인수등록"},"senderName":"","level":6,"receiverAddr":"","complete":true,"zipCode":null,"orderNumber":null,"firstDetail":{"time":1472198811000,"level":2,"remark":null,"telno2":"010-5232-9575","telno":"02-2614-8254","manPic":"","timeString":"2016-08-26 17:06:51","code":null,"where":"구로중앙(대)","manName":"","kind":"집하완료"},"receiverName":"","itemImage":null}';
    // console.log('hi');
    

    // bot.postMessageToUser('yenos', 'hi', { 'slackbot': true, icon_emoji: ':cat:' }); 
    // var channels = []
    // channels = bot.getChannels()._value;
    // var obj = JSON.parse(bot.getChannels()._value);
    // console.log(obj);
    // var arrDetail = obj._value;

    // // console.log(channels[0]);
      // console.log(bot.getChannels()._value);
      // var test;
    // initGameInfo(test);
    // console.log(test);

    // initChannels('hi',function(reply){
    //   console.log('reply ==> '+reply);
    // });


  
  //reply에 따라
  //0 -> exist
  //1 -> push success
  //-1 -> err
  // insertTeam('ab',function(reply){
  //   console.log('callbakc reply =>'+reply);
  // });


  // insertTeam('pks',function(data){
  //   console.log("callback => "+ data);
  // });

  // initChannels('pks',function(data){
  //   console.log("callback => "+ data);
  // });

  // C27J7NZ5L
  // setUserScore
  setUserScore('pks','C27J7NZ5L','user',3,function(data){
    console.log(data);
  });


});
var isGameStart = false;

bot.on('message', function(data) {
  // console.log(data);

  const STR_START  = '.시작'


  var typeUser;
  if(data.username == undefined){
    typeUser = data.user;
  }else{
    typeUser = data.username;
  }
  var typingType;
  typingType = data.type;

  var user = data.user;
  var currentChannel = data.channel;

  var params = {
      icon_emoji: ''
  };

  if(data.text == STR_START){
    isGameStart = true;
    // console.log('start  => '+new Date().getTime());
  
    var cnt = 3;
    var countDown = setInterval(function(){
      if(cnt==0){
        // console.log('0');
      }
      if(cnt==1){
        // console.log('1');
        //바로 여기서 끊김.
        clearInterval(countDown)
          setTimeout(function(){
            bot.postMessage(currentChannel,'이것도 너프해 보시지!', params);          
            var startTime = new Date().getTime();
            client.set(currentChannel + "_start", startTime);
            bot.postMessage(currentChannel, '시작 =>'+(startTime) , params);

          },1000);        
      };        
        bot.postMessage(currentChannel,cnt--, params);
    },1000);
 
  }else if(data.text == '.끝'){
    console.log('end  => '+new Date().getTime());
    client.get(currentChannel + "_start", function(err, value) {
      var startTime = value;
      var endTime = new Date().getTime();
      var diffTime = endTime - startTime;
      bot.postMessage(currentChannel, '차이 =>'+msToTime(diffTime) , params);  
    });

  }else if(data.text = '\n' && isGameStart == true && typeUser != 'hanjin' && typingType =='message'){
    console.log('game enter end!');
    isGameStart = false;
  }



//큐서버 콜 example
//       var userId = currentChannel + "_" + user;
//       client.get(userId, function(err, value) {
//         // console.log('value  ==>'+currentChannel + "_" + user);
//         // console.log('value  ==>'+value);
//         //nil일떄
//         if(value == null){
//           console.log('its new!');            
//           client.set(userId, diffTime);
//         }else{
//           if(value != diffTime){
//             client.set(userId, diffTime);
//             console.log('difference!');            
//             //다름으로 큐 서버로 콜한다.
// // 52.69.191.160:53366/queue?redisVal={"hi":"hi"}
//             request.get(
//                 'http://52.69.191.160:53366/queue?redisVal='+'{"user" : "'+userId+'","time" :"'+diffTime+'"}',
//                 { redisVal: { redisVal: 'value' } },
//                 function (error, response, body) {
//                   // console.log(defaultURL+'&t_code='+t_code+'&t_invoice='+t_invoice);
//                   console.log(body);
//                     if (!error && response.statusCode == 200) {
//                             // console.log(body);
//                             // var start = body.indexOf("{");
//                             // var end = body.lastIndexOf("}");
//                             // callback(body.substr(start, end-30));
//                       }
//                   }
//               );

//             }else{
//               client.set(currentChannel + "_" + user, diffTime);
//               console.log('same!');            
//             }
//           }
//       });
//     });
  // }






  // bot.postMessage(currentChannel, '시작 =>', params);

    // // all ingoing events https://api.slack.com/rtm 
    // console.log(data);
    // //     console.log(data.text);
    

    //택배 테스트
  //   console.log(data.text);
  //   // // PostCode('');
  //     var regExp = /^_/g;
  // //일단 명령어로 인지한다.
  //     if(regExp.test(data.text)){
  //           var arrInput = data.text.split("_");
  //           if(arrInput.length==2){
  //                   print("무언가 부족합니다.")
  //           }else{
  //                 console.log(arrInput[1]);
  //                 console.log(arrInput[2]);
  //                   var t_code;
  //                   var t_invoice;
  //                   var t_callNum;
  //                   if(arrInput[1]=='CJ' || arrInput[1] == '04'){t_code = '04'; t_callNum = 8082}
  //                   else if(arrInput[1]=='현대' || arrInput[1] == '08'){t_code = '08',t_callNum = 8731}
  //                   else if(arrInput[1]=='우체' || arrInput[1] == '01'){t_code = '01',t_callNum = 6630}
  //                   //현대_8731
  //                   //CJ_8082
  //                   t_invoice = arrInput[2];
                    
  //                   var json = '{"mykey": "my value"}';
  //                   // console.log(t_code);
  //                   // console.log(t_invoice);
  //                   getDeliveryData(t_callNum,t_code,t_invoice,function(json){
  //                       console.log(json);   
  //                       var params = {
  //                           icon_emoji: ''
  //                       };
                        
  //                       // bot.postMessageToUser('yenos', prettyJson(json,t_callNum,t_invoice), params); 

  //                       // console.log(currentChannel);
  //                       bot.postMessage(currentChannel, prettyJson(json,t_callNum,t_invoice), params);
  //                       // bot.postMessageToChannel(currentChannel, prettyJson(json,t_callNum,t_invoice), params);

  //                       // var obj = eval(json)œ
  //                       // JSON.stringify(json)


  //                   });
  //                 // console.log(backing);
  //           }
  //     }          
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
// function prettyJson(jsonVa){
//   // var obj = JSON.parse(jsonVa);
//   //   // console.log(obj.trackingDetails);
//   //   var arrDetail = obj.trackingDetails;
//   //   // console.log('hi ')
//   //   var prettyVal = '========================================================\n';
//   //   prettyVal += '                   시간                         배송상태                          장소\n';
//   //   prettyVal += '========================================================\n';
//   //   for(var i = 0 ; i< arrDetail.length; i++){
//   //           prettyVal += '   '+arrDetail[i].timeString+'      ';
//   //           prettyVal += '      '+arrDetail[i].kind;
            
//   //           for(var j = 0 ;j<10-arrDetail[i].kind.length;j++){
//   //                   prettyVal +='   ';
//   //           }          

//   //           prettyVal += '  '+arrDetail[i].where+'   ';
//   //           prettyVal += '\n';
//   //   }
//     // return prettyVal
// }

//  function PostCode(codestring) {
//   // Build the post string from an object
//   var post_data;
//   // var post_data = querystring.stringify({
//   //     // 'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
//   //     // 'output_format': 'json',
//   //     // 'output_info': 'compiled_code',
//   //     //   'warning_level' : 'QUIET',
//   //     //   'js_code' : codestring
//   // });

//   // An object of options to indicate where to post to
//   var post_options = {
//       host: 'http://www.naver.com',
//       port: '80',
//       path: '/',
//       method: 'GET',
//       headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Content-Length': Buffer.byteLength(post_data)
//       }
//   };

//   // Set up the request
//   var post_req = http.request(post_options, function(res) {
//       res.setEncoding('utf8');
//       res.on('data', function (chunk) {
//           console.log('Response: ' + chunk);
//       });
//   });

//   // post the data
//   post_req.write(post_data);
//   post_req.end();

// }





module.exports = app;
http.createServer(app).listen(app.get('port'), function() {

});

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
        return false;}      
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
      rowChannels.every(function(entry,index){
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

function setUserScore(teamName,channelID,user,score,callback){
  client.lrange(teamName, 0, -1, function(err, reply) {    
    reply.every(function(entry,index) {
      //리스트에 채널ID랑 같은것이 있다! 면 스코어랑 유저를 저장한다.
        if(entry==channelID){
          client.zadd(channelID,score,user,function(err,reply){
            if(err){
              callback(-1)
            }
            else{
              callback(1);    
            }
          });
          return false;
        }
        //채널 ID에 없다! 면 만들어서 넣어준다음 스코어랑 유저를 저장한다.
        else { 
          client.lpush(teamName,channelID,function(err,reply){
            client.zadd(channelID,score,user,function(err,reply){
              if(err){
                callback(-1)
              }
              else{
                callback(1);    
              }
            });
            return false;
          });
        }

      });        
  });
}

// };

//랭크 저장 테스트
// client.zadd('myset',1,'usera');
// client.zadd('myset',5,'userb');
// client.zadd('myset',3,'userc');
// client.zrevrange('myset',0,-1,'withscores',function(err,members){
//   // console.log(members[0]);
//   // console.log(members[1]);
// });


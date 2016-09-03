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
  // setUserScore('pks','C27J7NZ5L','user',3,function(data){
  //   console.log(data);
  // });
    // console.log(bot.getUsers()._value.members);



});
var isGameStart = false;

bot.on('message', function(data) {

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

  
  // console.log(bot.getChannels());

  // arrQuiz.forEach(function(ele){
  //   console.log(ele);
  // })

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
  
  var timeLine;

  if(isGameStart==false){
    var arrQuiz = [STR_QUIZ1,STR_QUIZ2,STR_QUIZ3,STR_QUIZ4,STR_QUIZ5,STR_QUIZ6,STR_QUIZ7,STR_QUIZ8,STR_QUIZ9,STR_QUIZ10,STR_QUIZ11,STR_QUIZ12,STR_QUIZ13,STR_QUIZ14,STR_QUIZ15,STR_QUIZ16,STR_QUIZ17,STR_QUIZ18,STR_QUIZ19,STR_QUIZ20]
    var selectedQuiz = arrQuiz[Math.floor(Math.random() * arrQuiz.length)];
    
    timeLine = selectedQuiz.length;
    // console.log(timeLine);
    client.set(currentChannel + "_Quiz", selectedQuiz);

  }

  if(data.text == STR_START){
    
    timeoutLine = arrQuiz.length;
    // console.log(timeoutLine);
    
    bot.postMessage(currentChannel, '게임을 시작합니다.'+' timeout : '+timeLine/3+'초 ', params);
    isGameStart = true;
  
    var cnt = 3;
    var countDown = setInterval(function(){
      // if(cnt==3)
      if(cnt==0){
        // console.log('0');
      }
      if(cnt==1){
        // console.log('1');
        //바로 여기서 끊김.
        clearInterval(countDown)

          setTimeout(function(){
            var startTime = new Date().getTime();
            client.set(currentChannel + "_start", startTime);
            bot.postMessage(currentChannel,'*'+selectedQuiz+'* '+msToTime(startTime), params);          
            // bot.postMessage(currentChannel, STR_GAME_TIMEOUT+msToTime(startTime), params);

            setTimeout(function(){
              // var startTime = ;
              isGameStart = false
              // console.log(timeLine*1000);
              bot.postMessage(currentChannel, '-----TimeOut------'+msToTime(new Date().getTime()) , params);
              // client.set(currentChannel+'_resultText_'+data.user, resultText);
              client.get(currentChannel+'_resultText_'+data.user,function(err,value){
                bot.postMessage(currentChannel, value , params);
              })
              // console.log(currentChannel+'_resultEnqueueJson_'+data.user);
              client.get(currentChannel+'_resultEnqueueJson_'+data.user,function(err,value){
                // console.log(value);
                //   var payload = JSON.stringify(value)
                //   console.log(payload);
                labzyWrite(value);
                // labzyWrite(value);
                // labzyWrite(value);
                // labzyWrite(value);
                // labzyWrite(value);
                // labzyWrite(value);
                // labzyWrite(value);
              })


            },timeLine/3*1000);

          },1000);   

      };        
        bot.postMessage(currentChannel,cnt--, params);
    },500);
 
  }else if(data.text == '.끝'){
    

  }else if( isGameStart == true && typeUser != 'hanjin' && typingType =='message'){
    console.log('game enter end!');
    // console.log(data);


    client.get(currentChannel + "_start", function(err, value) {
      var startTime = value;
      var endTime = new Date().getTime();
      var diffTime = endTime - startTime;

      
      client.get(currentChannel + "_Quiz", function(err, value) {
        var selectedQuiz = value;
        var accuracy = similarStr(data.text,selectedQuiz);
        var score = 0;
        // console.log(accuracy);
        if(accuracy==100){
          score += 700;
        }else if(accuracy>=90 && accuracy<100){
          score += 500;
        }else if(accuracy>=80 && accuracy<90){
          score += 300;
        }else{
          score += 100;
        } 
        //0.5초 아래면
        if(diffTime<2000){
          score += 100
        }else if(diffTime>=2000 && diffTime<3000){
          score += 70
        }else if(diffTime>=3000 && diffTime<3500){
          score += 50
        }else if(diffTime>=3500 && diffTime<4000){
          score += 30
        }else if (diffTime>=4000 && diffTime<4500){
          score += 20
        }
        else{
          score += 10
        }
        // console.log(diffTime);
        // console.log(score);

        var arr = bot.getUsers()._value.members;
        var userName;
        // ㅁㄲ
        arr.every(function(entry,inex){
          // console.log(entry.id);
          // console.log(entry);
          if(entry.id == data.user){
            userName = entry.name;

            var percise = similarStr(data.text,selectedQuiz);
            var userId = data.user
            var resultText = userName+' =>'+' 정확도 : '+percise+'%  ||   걸린시간 : '+msToTime(diffTime)+'  ||   score : '+score ;
            client.set(currentChannel+'_resultText_'+userId, resultText);

            setUserScore('pks',currentChannel,userName,score,function(data){

              var jsonData = new Object();
              jsonData.userId = entry.id;
              jsonData.userName = userName;
              jsonData.percise = percise;
              jsonData.diffTime = diffTime;
              jsonData.score = score;
              console.log(jsonData);

              // console.log(currentChannel+'_resultEnqueueJson_'+userId);

              client.set(currentChannel+'_resultEnqueueJson_'+userId, JSON.stringify(jsonData));

              // console.log(data);
              // console.log(data[0]);
              // console.log(data[1]);
            });

            // bot.postMessage(currentChannel,resultText , params);  


            return false;
          }else{
            return true;
          }
          
          
        });
        // arr.forEach(function(ele){
        //   console.log(ele.id);
        // })

      });
      //유저 점수를 매기고 & 저장해주면됨.


    });
  }else if(data.text == STR_RNK){
    getRank('pks',currentChannel,function(data){

    // client.get(currentChannel+'_resultText_'+data.user,function(err,value){
      bot.postMessage(currentChannel, data, params);
    // })

      // console.log(data);
    // console.log(data[0]);
    // console.log(data[1]);
    });
  }


  // if(typingType == 'message'){
  //   console.log(data.text);
  //   if(data.text)
  // }


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

function similarStr(a,b) {
    var lengthA = a.length;
    var lengthB = b.length;
    var equivalency = 0;
    var minLength = (a.length > b.length) ? b.length : a.length;    
    var maxLength = (a.length < b.length) ? b.length : a.length;    
    for(var i = 0; i < minLength; i++) {
        if(a[i] == b[i]) {
            equivalency++;
        }
    }


    var weight = equivalency / maxLength;
    return (weight * 100);
}


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
  var config = require('./conf.json');
  var amqp = require('amqp');
  var connection = amqp.createConnection({ host: config.host, port: config.port,login:config.loginID,password:config.password,vhost:config.vhost });
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

      // var queue = connection.queue('yenos-bot-queue');
      // queue.bind(exchange, "direct-key");
      // queue.subscribe(function (message) {
      // });

      // Recieve messages
      // connection.queue('yenos-bot', function(queue){
      //   // console.log('Created queue')
      //   queue.bind(exchange, 'yenos-bot-key'); 
      //   queue.subscribe(function (message) {
      //     console.log('subscribed to queue')
      //     var encoded_payload = unescape(message.data)
      //     var payload = JSON.parse(encoded_payload)
      //     console.log('Recieved a message:')
      //     console.log(payload)
      //   })
      // })

      // setInterval( function() {    
      //   var test_message = 'TEST '
      //   sendMessage(exchange, test_message)  
      // }, 2000) 

   })

  })
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


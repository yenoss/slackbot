// var express = require('express');
// var http = require('http');
// var app = express();


// var server = http.createServer(app).listen(53368, function() {
// });
// var io = require('socket.io-client');
// var socket = io.connect('http://localhost:53366', {reconnect: true});

// console.log('workser server running');

// // Add a connect listener
// socket.on('connect', function(socket) { 
//   console.log('Connected!');
// });
// socket.on('crowling', function (data) {
//     var obj = JSON.parse(data.updateData);
//     console.log(obj.user);
//     console.log('CLI Data==> '+obj.user+'님의 시간이'+ obj.time+'으로 업데이트 되었습니다.');
    

//   // socket.emit('updatee',{code:"200"});
//   // socket.emit('my other event', { my: 'data' });
// });
var express = require('express');
var http = require('http');
var app = express();


var server = http.createServer(app).listen(53368, function() {
    console.log('cli run!!');
    var config = require('./conf.json');
    var amqp = require('amqp');
    var connection = amqp.createConnection({ host: config.host, port: 5672,login:config.loginID,password:config.password,vhost:config.vhost });
    var count = 1;

  connection.on('ready', function () {
    console.log('ready');
    connection.exchange('yenos-bot', options={type:'direct'}, function(exchange) {   

        connection.queue('yenos-bot', function(queue){
            
            queue.bind(exchange, 'yenos-bot-key'); 
            queue.subscribe(function (message) {
              // console.log('subscribed to queue')
              var encoded_payload = unescape(message.data)
              
              var payload = JSON.parse(encoded_payload).replace('\\','')

              // var payload = JSON.parse(encoded_payload)
              console.log('Recieved a message:')
              console.log(payload)
              // console.log(message)
              // console.log(JSON.parse(message))
              // console.log(payload[0]);
              // console.log(payload.userName)
              // console.log(payload.percise)
              // console.log(payload.diffTime)
              // console.log(payload.score)
            })
        })
    });
  });
});


// var io = require('socket.io-client');
// var socket = io.connect('http://localhost:53366', {reconnect: true});

// console.log('workser server running');

// // Add a connect listener
// socket.on('connect', function(socket) { 
//   console.log('Connected!');
// });
// socket.on('crowling', function (data) {
//     var obj = JSON.parse(data.updateData);
//     console.log(obj.user);
//     console.log('CLI Data==> '+obj.user+'님의 시간이'+ obj.time+'으로 업데이트 되었습니다.');
    

//   // socket.emit('updatee',{code:"200"});
//   // socket.emit('my other event', { my: 'data' });
// });

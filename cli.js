var express = require('express');
var http = require('http');
var app = express();


var server = http.createServer(app).listen(53368, function() {
});
var io = require('socket.io-client');
var socket = io.connect('http://localhost:53366', {reconnect: true});

console.log('workser server running');

// Add a connect listener
socket.on('connect', function(socket) { 
  console.log('Connected!');
});
socket.on('crowling', function (data) {
    var obj = JSON.parse(data.updateData);
    console.log(obj.user);
    console.log('CLI Data==> '+obj.user+'님의 시간이'+ obj.time+'으로 업데이트 되었습니다.');
    

  // socket.emit('updatee',{code:"200"});
  // socket.emit('my other event', { my: 'data' });
});

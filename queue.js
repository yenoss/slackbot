var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var io = require('socket.io');

//큐를 구현
var queue = require('queue');
var q = queue();
var results = [];


var server = http.createServer(app).listen(53366, function() {

  console.log('queue server running');

});

io = io.listen(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/queue', function(req, res){
    console.log('hi');
    console.log('get_Queue => '+req.query.redisVal);
    
    q.push(function(cb) {
        results.push(req.query.redisVal);
        cb();
    });

    q.start(function(err) {
        console.log('all done:', results);
    });


    if(results.length>0){
        io.sockets.emit('crowling', { updateData: results[0] }); 
        


        // q.push(function(cb) {
        //     // myFish.splice
        //     results.splice(0,1);
        //      // results.push(req.query.redisVal);
        //     cb();
        // });
        // q.start(function(err) {
        //     console.log('all done:', results);
        // });
    }
  

});


// io.sockets.on('updatee',function(data){
//     console.log(data);
// });;

// Add a connect listener
io.sockets.on('connection', function(socket)
{
  console.log('Client connected.');

  // Disconnect listener
  socket.on('disconnect', function() {
  console.log('Client disconnected.');
  });
});


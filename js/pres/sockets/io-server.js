var io = require('socket.io');
var ioclient = require('socket.io-client');

//Creates the server
var server = io();

//Sets the server to listen on a port
server.listen(5001);
console.log('Server: listening on 5001');


//Socket.io is event driven. Communicate to the server and ports with events
server.on('connection', function(socket){
  console.log('Server: received new connection');

  //Custom event called time
  socket.on('time', function(){
    var time = Date.now();
    console.log('Server: sending client time');
    socket.emit('time', time);
  });

  //Echo event for messages to echo
  socket.on('echo', function(message){
    socket.emit('echo', message);
  });
});

//Performs connection to server and returns a socket.io client 
var client = ioclient.connect('http://localhost:5001');


process.stdin.on('readable', function(){
  var data = process.stdin.read();
  if(data){
    client.emit('echo', data);
    client.emit('time');
  }
});

//Listens for time event from server
client.on('time', function(time){
  var date = new Date(time);
  console.log(date.toString());
});

//Listens for echo event from server
client.on('echo', function(msg){
  console.log(msg.toString());
});
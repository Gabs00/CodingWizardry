
//express
var s = require('http').createServer(/* express() */);
var server = require('socket.io')(s);
var ioclient = require('socket.io-client');
var ioclient2 = require('socket.io-client');

//Sets the server to listen on a port
s.listen(5001);
console.log('Server: listening on 5001');

//Socket.io is event driven. Communicate to the server and ports with events
var connections = [];
server.on('connection', function(socket){
 console.log('received a new connection');
 connections.push(socket.id);
 console.log(connections);
  socket.on('signal', function(data){
    socket.broadcast.to(data.id).emit('signal', {data:data.info, id:socket.id});
  });

  socket.on('join', function(data){
    socket.join(data.room);
    server.to(data.room).emit('new-peer', {id:socket.id});
  });
});
server.on('error', function(err){
  console.log('err', err.message);
});
//Performs connection to server and returns a socket.io client 
var client = ioclient('http://localhost:5001/');
var client2 = ioclient2('http://localhost:5001/');
var c1b = false;
var c2b = false;
function block(trig, callback){
  if(trig){
    setTimeout(function(){
      trig = !trig;
      block(trig, callback);
    }, 5000);
  } else {
    callback();
  }
}

client.on('connect', function(){
  console.log('client1 connected', client.io.engine.id);
  client.emit('join', {room:'apple'});
});

client2.on('connect', function(){
  console.log('client2 connected', client2.io.engine.id);
  client2.emit('join', {room:'apple'});
});

client.on('signal', function(data){
  console.log(arguments);
  block(cb1, function(){
    client.emit('signal', {id:data.id, data:'Why Hello from client 1'});
    console.log('client 1 responded');
  });
});

client2.on('signal', function(data){
  console.log(arguments);
  block(cb2, function(){
    client2.emit('signal', {id:data.id, data:'Why Hello from client 2'});
    console.log('client 2 responded');
  });
});


//readable stream
process.stdin.on('readable', function(){
  var data = process.stdin.read();

  if(data){
    var info = data.toString().split(' ');
    client.emit(info[0], info[1]);
  }
});
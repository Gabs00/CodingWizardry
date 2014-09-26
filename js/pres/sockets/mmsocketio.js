
//express
var s = require('http').createServer(/* express() */);
var server = require('socket.io')(s);
var ioclient = require('socket.io-client');

//Mm
var mm = function(){
  this.meetings = [];
  this.addmeeting = function(value){
    if(typeof value === 'string'){
      throw Error('Meetings are not strings');
    }
    this.meetings.push(value);

  };
  this.getmeetings = function(id){
    if(id !== undefined){
      if(!this.meetings[id]){
        throw Error('Meeting not found');
      } else {
        return this.meetings[id];
      }
    } else {
      return this.meetings.slice();
    }
  };
};



//Sets the server to listen on a port
s.listen(5001);
console.log('Server: listening on 5001');

var man = new mm();
//Socket.io is event driven. Communicate to the server and ports with events
server.on('connection', function(socket){
 
 socket.on('add', function(data){
    var meeting = data.aMeetingObject;
    try{
      man.addmeeting(meeting);
      socket.emit('success', {resp:true});
    } catch(e) {
      socket.emit('error', {resp:e}, 'add');
    }
  });

  socket.on('get', function(data){
    try{
      socket.emit('meeting', {resp: man.getmeetings(data.id)});
      socket.emit('success', {resp:true});
    } catch(e) {
      socket.emit('error', {resp:e}, 'get');
    }

  });
});

//Performs connection to server and returns a socket.io client 
var client = ioclient.connect('http://localhost:5001');

client.on('meeting', function(data){
  console.log(data.resp);
});

client.on('error', function(data, evt){
  console.log('ERROR:',evt, data.resp );
});

client.on('success', function(){});

client.emit('add', {aMeetingObject: {a:'apple', b:'banana'}});
client.emit('add', {aMeetingObject: {c:'cat', d:'dog'}});

//readable stream
process.stdin.on('readable', function(){
  var data = process.stdin.read();

  if(data){
    var info = data.toString().split(' ');
    client.emit(info[0], info[1]);
  }
});
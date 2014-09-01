var net = require('net');

//Create a server, has socket that listens on a port for inbound connections
//The callback is run when a new connection is made
//It receives the connecting socket
var port = 5000;
var server = net.createServer(function(socket){
  console.log('Server: New connection');
  socket.on('end', function(){
    console.log('Server: Disconnected Client');

  });

  //Sets a listener on the socket, if it has readable data, the server will collect and print it
  socket.on('readable', function(){
    var data = socket.read();

    //writes the data back to the socket
    socket.write('From Server: '+ data, 'utf8');
  });
});

//Call listen with port to begin  recieving requests
server.listen(5000, function(){
  console.log('Server: listening on', port);
});


var greet ='Hello Server';

//Connects to a port with a socket, then returns a socket
var client = net.createConnection({port:5000, host:'localhost'}, function(){
  console.log('Connected');

  //Send a message to the server with write
  client.write(greet);

  //Coverts messages to string
  client.setEncoding('utf8');
}); 


//Event for when the connection has data to be read from server
client.on('readable', function(){
  var data = client.read();
  console.log(data);
});

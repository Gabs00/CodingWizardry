
var express = require('express')();
var http = require('http');
var fs = require('fs');
var app = http.createServer(express);
var io = require('socket.io')(app);

app.listen(9000, function(){
	console.log('listening on 9000');
});

var parts = [];
io.on('connect', function(socket){

	var id = parts.length;
	parts.push(socket);
	console.log(socket.connected);
	socket.on('signal', function(evt, data){
		var to = parts[data.to];
		if(to.connected){
			to.emit(evt, data);
		} else {
			data.error = 'User not connected';
			socket.emit('error', evt, data);	
		}
	});
});

express.use('/', function(req,res){
	console.log('sending index');
	fs.readFile('index.html', function(data){
		res.send(data);
	});
});
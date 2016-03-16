// Set this to the ip address of your board (not 127.0.0.1)
var ipAddress = '192.168.0.102'; 

var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

// Start by loading in some data
var fs = require('fs');

//var five = require("johnny-five");
//var Galileo = require("galileo-io");
//var board = new five.Board({
//  io: new Galileo()
//});

//board.on("ready", function() {
//  var led = new five.Led(3);
//  led.blink(500);
//});
var myOnboardLed = new mraa.Gpio(3, false, true);

function turnOnLed(){
     myOnboardLed.write(1);
}
function turnOffLed(){
     myOnboardLed.write(0);
}


var http = require('http');
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

//app.get('/', function(request, response){
//   response.sendFile(__dirname + '/public/index.html'); 
//});

app.get('/on', function(request, response){
    turnOnLed();
    response.sendFile(__dirname + '/public/index.html');
});
app.get('/off', function(request, response){
    turnOffLed();
    response.sendFile(__dirname + '/public/index.html');
});

app.listen(1337, ipAddress);


    
//http.createServer(function (req, res) {
//    var value;
//    // This is a very quick and dirty way of detecting a request for the page
//    // versus a request for light values
//    if (req.url.indexOf('lightsensor') != -1) {
//        res.writeHead(200, {'Content-Type': 'text/html'});
//        res.end(lightSensorPage);
//    }
//    else {
//        value = analogPin0.read();
//        res.writeHead(200, {'Content-Type': 'text/json'});
//        res.end("Hello fucking world!!!");
//    }
//}).listen(1337, ipAddress);

var express = require('express');
require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
var app = express();
var http = require('http').Server(app);
var data = require('./static/test');
var model = require('./static/model')
//var daysGames = require('./static/dataSetup')
var io = require('socket.io')(http);

var latestData;

data.getData().then((result) => {
    latestData = result;
});

data.getStatsForToday().then((result) => {
    todaysStats = result;
});

//daysGames.getTodaysJsonData();
model.createModel();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/static', express.static(__dirname + '/static'));
app.use(express.static(__dirname));


//daysGames.testing();
http.listen( process.env.PORT || 4400, function () {
    console.log('HTTP server started on port 4000');
});
io.on('connection', function (socket) {
    socket.emit('data', latestData);
});

// refresh once per hour
setInterval(function () {
    data.getData().then((result) => {
        latestData = result;
        io.emit('data', result);
        console.log('Last updated: ' + new Date());
    });
}, 3600000);

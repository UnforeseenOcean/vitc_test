var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

var app = express();
var	port = normalizePort(process.env.PORT || '3000');

app.set('port', port);
console.log(`Running on port: ${port}`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('gotten');
});

app.post('/battery', (req, res) => {
	var lowChucks = [];
	var payload = req.body.payload;
	for (var i = 0; i < payload.length; i++) {
		var logObj = getJSON(payload[i]);
		var lowBattery = getBattery(logObj.msg);
		var chuck = logObj.mfp.id;
    console.log(chuck);
		/*var inPool = lowChucks.includes(chuck);
		console.log(chuck+'\n'+(lowBattery && !inPool)+'\n'+(!lowBattery && inPool));
		if (lowBattery && !inPool) {
		  lowChucks.push(chuck);
		  console.log(lowChucks);
		} 
		else if (!lowBattery && inPool) {
		  console.log("High battery and in pool");
		  var index = lowChucks.indexOf(chuck);
		  lowChucks.splice(index, 1);
		  console.log("end of high battery statement");
		}*/
	}
	res.send('sent battery info');
});

app.listen(port);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function getJSON(log) {
  for (var i = 0; i < log.length; i++) {
    if (log.charAt(i) == '{') {
      return JSON.parse(log.substring(i));
    }
  }
}

function getBattery(msg) {
  var regex = /m\): (\d+)/;
  var result = msg.match(regex);
  regex = /\d+/;
  var timeToEmpty = ((Number(result[0].match(regex)) + Number(result[1].match(regex))) / 2);
  if (timeToEmpty < 900) {
    return true;
  } else {
    return false;
  }
}
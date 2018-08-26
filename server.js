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

var lowChucks = [];

app.post('/battery', (req, res) => {
  var entering = [];
  var leaving = [];
	var payload = req.body.payload;
	for (var i = 0; i < payload.length; i++) {
		var logObj = getJSON(payload[i]);
		var lowBattery = getBattery(logObj.msg);
		var chuck = logObj.mfp.id;
		var inPool = lowChucks.includes(chuck);
		if (lowBattery && !inPool) {
		  lowChucks.push(chuck);
      entering.push(chuck);
		} 
		else if (!lowBattery && inPool) {
		  var index = lowChucks.indexOf(chuck);
		  lowChucks.splice(index, 1);
      leaving.push(chuck);
		}
	}
  console.log("Low Battery");
  console.log(lowChucks);
  console.log("Entered Pool");
  console.log(entering);
  console.log("Left Pool");
  console.log(leaving);
  console.log(`${genie_token}`);
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
  var regex = /(?<=\(0-1\)\: )\d+(\.\d+)?/g;
  var result = msg.match(regex);
  var avgCharge = ((Number(result[0]) + Number(result[1])) / 2) * 100;
  if (avgCharge < 40) {
    return true;
  } else {
    return false;
  }
}
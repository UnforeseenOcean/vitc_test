var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

var app = express();
var	port = normalizePort(process.env.PORT || '3000');

app.set('port', port);
console.log(`Running on port: ${port}`);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('gotten');
})

app.post('/battery', (req, res) => {
	console.log(req.body.payload);
	res.send('sent battery info');
})

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
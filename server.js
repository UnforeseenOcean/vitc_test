var express = require('express');

var app = express();

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
console.log(`Running on port: ${port}`);

app.get('/', (req, res) => {
	res.send('gotten');
})

app.post('/battery', (req, res) => {
	res.send('battery');
	console.log(req);
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
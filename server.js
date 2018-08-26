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
	console.log(req.body);
})

app.listen(port);
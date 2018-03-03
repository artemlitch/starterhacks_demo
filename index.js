var app = require('express')();
var http = require('http').Server(app);
var hbs = require('hbs');
var fs = require('fs');

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.get('/', function(req, res) {
	var messages = JSON.parse(fs.readFileSync('messages.json', 'utf8'));
	console.log(messages);
	res.render(__dirname + '/index.html', { 
		welcomeMessage: "Hello Starterhacks",
		messages: messages,
	});
});

app.get('/message', function(req, res) {
	console.log(req.query);
	res.status(200).redirect('/');
	allMessages = JSON.parse(fs.readFileSync('messages.json', 'utf8'));
	allMessages.push(req.query);
	fs.writeFileSync('messages.json', JSON.stringify(allMessages));
})


app.get('/error', function(req, res) {
	res.render(__dirname + '/index.html', { 
		welcomeMessage: "Whoopsie daisy" 
	});
})

http.listen(3000, function() {
	console.log("Listening on port 3000");
})
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' })); // support encoded bodies

/*
    Initialization
 */

mongoose.connect('mongodb://localhost/coach');
require('./model/account');
require('./model/tutorial');
require('./model/video');

/*
    Routing
 */

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    console.log('[log]', req.method, req.originalUrl);
    next()
});

app.use('/doc', express.static('doc'));
app.use('/public/video', express.static('public/video'));
app.use('/', express.static(__dirname + '/public'));
app.use('/static', express.static('static'));

app.use('/auth', require('./routers/auth'));
app.use('/account', require('./routers/account'));
app.use('/tutorial', require('./routers/tutorial'));
app.use('/video', require('./routers/video'));

app.get('/', function(req, res){
    // res.send('coach success!')
    // res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, function () {
    console.log('Server started!')
});


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var messageRouter = require('./routes/messages');
var contactsRouter = require('./routes/contacts');
var env = process.env;
var app = express();

env.PORT = 4000;


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Apply routes to app
app.use('/contacts', contactsRouter);
app.use('/messages', messageRouter);

// Test route
app.get('/', function(req, res, next) {
    res.json('server ok');
})

app.listen(env.PORT, () => {
    console.log(`App running on port ${env.PORT}.`);
});



module.exports = app;

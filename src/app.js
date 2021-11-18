var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var messageRouter = require('./routes/messages');
var contactsRouter = require('./routes/contacts');
var env = process.env;
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Apply routes to app
app.use('/contacts', contactsRouter);
app.use('/messages', messageRouter);

app.listen(env.PORT, () => {
    console.log(`App running on port ${env.PORT}.`);
    console.log(env.POSTGRES_USER);
})



module.exports = app;

var express = require('express'),
	config = require('./config'),
	bodyParser = require('body-parser'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	morgan = require('morgan'),
	session = require('express-session'),
	passport = require('passport'),
	flash = require('connect-flash');

module.exports = function(){
	var app = express();

	if(process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	}
	else if(process.env.NODE_ENV === 'production'){
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(express.static('./public'));

	require('../app/routes/index.server.routes')(app);
	require('../app/routes/user.server.route')(app);

	return app;
};	
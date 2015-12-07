var user  =require('../controllers/user.server.controller');
var passport = require('passport');

module.exports = function(app){
	app.route('/user').get(user.list).post(user.create);
	app.route('/user/:userID').get(user.read).put(user.update).delete(user.delete);
	app.param('userID', user.UserByID);

	app.route('/signup').get(user.renderSignup).post(user.signup);
	app.route('/signin').get(user.renderSignin).post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/signin',
		failureFlash: true
	}));
	app.get('/signout', user.signout);
};
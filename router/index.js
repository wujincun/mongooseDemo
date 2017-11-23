module.exports = function(app) {
	let Index = require('../app/controllers/index');
	let Movie = require('../app/controllers/movie');
	let User = require('../app/controllers/user');
	app.use(function(req, res, next) {
		var _user = req.session.user;
		app.locals.user = _user; //放到本地变量中
		return next()
	});
	//Index
	app.get('/', Index.index);
	//Movie
	app.get('/movie/:id', Movie.detail)
	app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
	app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
	app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.save)
	app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del)
		//user
	app.get('/admin/usersList', User.signinRequired, User.adminRequired, User.list)
	app.get('/signup', User.signupPage)
	app.get('/signin', User.signinPage)
	app.get('/logout', User.logout)
	app.post('/user/signup', User.signup)
	app.post('/user/signin', User.signin)
}
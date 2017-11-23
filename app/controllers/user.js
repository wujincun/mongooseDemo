let User = require('../model/User');
module.exports = {
	//注册页
	signupPage: function(req, res) {
		res.render('signup', {
			title: '注册',
		})
	},
	signup: function(req, res) {
		var _user = req.body.user;
		User.findOne({
			name: _user.name
		}, function(err, user) {
			if (err) {
				console.log(err)
			}
			if (user) {
				return res.redirect('/signin')
			} else {
				var user = new User(_user);
				user.save(function(err, user) {
					if (err) {
						console.log(err)
					} else {
						res.redirect('/usersList')
					}
				})
			}
		})
	},
	//登录页
	signinPage: function(req, res) {
		res.render('signin', {
			title: '登录',
		})
	},
	signin: function(req, res) {
		var _user = req.body.user;
		var name = _user.name;
		var password = _user.password;
		User.findOne({
			name: _user.name
		}, function(err, user) {
			if (err) {
				console.log(err)
			}
			if (!user) {
				return res.redirect('/signup')
			} else {
				user.comparePassword(password, function(err, isMatch) {
					if (err) {
						console.log(err)
					}
					if (isMatch) {
						req.session.user = user;
						return res.redirect('/');
					} else {
						console.log('password is not matched')
						return res.redirect('/signin')
					}
				})
			}

		})
	},
	//登出
	logout: function(req, res) {
		delete req.session.user;
		res.redirect('/');
	},

	//list page
	list: function(req, res) {
		User.fetch(function(err, users) {
			if (err) {
				console.log(err)
			}
			res.render('usersList', {
				title: '列表',
				users: users
			})
		})
	},
	signinRequired: function(req, res, next) {
		var user = req.session.user;
		console.log(user);
		if (!user) {
			return res.redirect('/signin')
		}
		next()
	},
	adminRequired: function(req, res, next) {
		var user = req.session.user;
		if (user.role <= 10) {
			return res.redirect('/signin')
		}
		next()
	}
}
//index page
let Movie = require('../model/movie');
module.exports = {
	index: function(req, res) {
		console.log(req.session.user)
		Movie.fetch(function(err, movies) {
			if (err) {
				console.log(err)
			}
			res.render('index', {
				title: '首页',
				movies: movies,
			})
		})
	}
}
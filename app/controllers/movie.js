let Movie = require('../model/movie');
const _ = require('underscore');
module.exports = {
	//list page
	list: function(req, res) {
		Movie.fetch(function(err, movies) {
			if (err) {
				console.log(err)
			}
			res.render('list', {
				title: '列表',
				movies: movies
			})
		})
	},

	/*后台录入页*/
	new: function(req, res) {
		res.render('admin', {
			title: '',
			movie: {
				title: ''
			}
		})
	},

	//admine post movie

	save: function(req, res) {
		var id = req.body.movie._id;
		var movieObj = req.body.movie;
		var _movie;
		if (id !== undefined) {
			Movie.findById(id, function(err, movie) {
				if (err) {
					console.log(err)
				}
				_movie = _.extend(movie, movieObj)
				_movie.save(function(err, movie) {
					if (err) {
						console.log(err)
					}
					res.redirect('/movie/' + movie._id)
				})
			})
		} else {
			_movie = new Movie({
				title: movieObj.title,
			})
			console.log(_movie)
			_movie.save(function(err, movie) {
				console.log('qqq')
				if (err) {
					console.log(err)
				}
				res.redirect('/movie/' + movie._id)
			})
		}
	},
	/*详情页*/
	detail: function(req, res) {
		var id = req.params.id;
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err)
			}
			console.log(movie)
			res.render('detail', {
				title: '详情页',
				movie: {
					title: movie.title,
				}
			})
		})
	},
	/*list delete*/
	del: function(req, res) {
		var id = req.query.id;
		console.log(id)
		if (id) {
			Movie.remove({
				_id: id
			}, function(err, movie) {
				if (err) {
					console.log(err)
				} else {
					res.json({
						success: 1
					})
				}
			})
		}
	}
}
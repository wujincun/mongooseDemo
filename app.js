let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let port = process.env.PORT || 3000;
let app = express();

let _ = require('underscore');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/imooc', {
	useMongoClient: true
});
let Movie = require('./model/movie');

app.use(bodyParser.urlencoded({
	extended: true
})); //
app.set('views', './views');
app.set('view engine', 'jade');
app.listen(port);
console.log('port' + port)

//index page
app.get('/', function(req, res) {
	res.render('index', {
		title: '首页'
	})
});
//list page
app.get('/list', function(req, res) {
		Movie.fetch(function(err, movies) {
			if (err) {
				console.log(err)
			}
			res.render('list', {
				title: '列表',
				movies: movies
					/*[{
									title: '画皮',
									id: 1,
									poster: ''
								}, {
									title: '画皮2',
									id: 2,
									poster: ''
								}]*/
			})
		})
	})
	/*后台录入页*/
app.get('/admin', function(req, res) {
	res.render('admin', {
		title: '',
		movie: {
			title: ''
		}
		/*[{
						title: '画皮',
						id: 1,
						poster: ''
					}, {
						title: '画皮2',
						id: 2,
						poster: ''
					}]*/
	})
})

//admine post movie

app.post('/admin/movie/new', function(req, res) {
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
	})
	/*详情页*/
app.get('/movie/:id', function(req, res) {
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
})
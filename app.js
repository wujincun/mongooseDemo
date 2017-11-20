let express = require('express');
let path = require('path');
let port = process.env.PORT || 3000;
let app = express();

let mongoose = require('mongoose');
let Movie = require('./model/movie');
mongoose.connect('mongodb://localhost/imooc');


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
//lisr page
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
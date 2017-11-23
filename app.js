const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const port = process.env.PORT || 3000;
const app = express();
const dburl = 'mongodb://localhost/imooc';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //???
mongoose.connect(dburl, {
	useMongoClient: true ///???
});

app.use(bodyParser.urlencoded({
	extended: true //????
})); //将表单里的数据格式化
app.use(express.static(path.join(__dirname, 'js'))); //设置静态文件的默认路径

app.use(cookieParser())
app.use(session({ //依赖于cookieParser
	secret: 'imooc', //防止篡改cookie
	store: new MongoStore({
		url: dburl,
		collection: 'sessions'
	}),
	resave: false,
	saveUninitialized: true,
}))

//配置为了开发环境下更好的追踪问题
if ('development' === app.get('env')) {
	let logger = require('morgan');
	app.use(logger(':method :url :status'));
	app.set('showStackError', true);
	app.locals.pretty = true; //源代码格式化
	mongoose.set('debug', true)
}

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.listen(port);
console.log('port' + port)

require('./router/index')(app)
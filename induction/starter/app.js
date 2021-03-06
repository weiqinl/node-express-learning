var express = require('express');
var app = express();
//加载自定义的路由句柄
var birds = require('./birds');
var rt = require('./router');

app.use('/rt', rt);
app.use('/birds', birds);

//views，放模板文件的目录
app.set('views', './views');
//view engine，模板引擎
app.set('view engine', 'jade');

// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

// app.all()是一个特殊的路由方法，它的作用是对于一个路径上的所有请求加载中间件
app.all('/secret', function(req, res, next) {
  console.log('Accessing the secret section ... ');
next(); //pass control to the next handler

}, function(req, res) {
  res.send('Hello from next()');
});

//使用回调函数数组处理路由：
var cb0 = function(req, res, next) {
  console.log('CB0');
  next();
};
var cb1 = function(req, res, next) {
  console.log('CB1');
  next();
};
var cb2 = function(req, res, next) {
	res.send('Hello from c!');
};
app.get('/example/c', [cb0, cb1, cb2]);
app.get('/example/d', [cb0, cb1], function(req, res, next) {
	console.log('response will be sent by the next function ...');
	next();
}, function(req, res) {
	res.send('Hello from D!');
});

app.route('/book')
	.get(function(req, res) {
		res.send('Get a random book');
	})
	.post(function(req, res) {
		res.send('Add a book');
	})
	.put(function(req, res) {
		res.send('Update the book');
	});

//错误处理中间件，必须使用4个参数
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

//logErrors 将请求和错误信息写入标准错误输出、日志或类似服务：
function logErrors(err, req, res, next) {
	console.error(err.stack);
	next(err);
}
//clientErrorHandler 的定义如下（注意这里将错误直接传给了 next）：
function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send({error: 'Something blew up!' });
	} else {
		next(err);
	}
}
//errorHandler 能捕获所有错误，其定义如下：
function errorHandler(err, req, res, next) {
	//当你添加了一个自定义的错误处理句柄后，如果已经向客户端发送包头信息了，
	//你还可以将错误处理交给 Express 内置的错误处理机制。
	if (res.headerSent) {
		return next(err);
	}
	res.status(500);
	res.render('error', {error: err});
}
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://localhost:%s', port);
});
//调试 Express
// > set DEBUG=express:* & node index.js
// > DEBUG=express:* node ./bin/www
///设置 DEBUG 的值为 express:router，只查看路由部分的日志；
///设置 DEBUG 的值为 express:application，只查看应用部分的日志
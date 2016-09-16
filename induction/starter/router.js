var express = require('express');
var app = express();
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function(req, res, next){
	console.log('Time:', Date.now());
	next();
});


// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next){
	console.log('Request URL:', req.originalUrl);
	next();
}, function(req, res, next){
	console.log('Request Type:', req.method);
	next();
});


// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function(req, res, next){
	if (req.params.id === 0) next('route');
	else next();
}, function(req, res, next) {
	// res.render('');
	res.send('what are render?');
});


// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function(req, res, next) {
	console.log(req.params.id);
	// res.render('special');
	res.send('what wht what ?');
});
// 将路由挂载至应用
app.use('/', router);

module.exports = router;

 
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())

//是要get请求并且匹配到路由`/`，我就执行回调，并用`res.send`方法去相应结果
app.get('/', function(req, res) {
	res.send('Hello World');
})
//中间件
app.get('/index', function(req, res) {
	console.log(req.query)
	res.append("Access-Control-Allow-Origin","*")
	res.send('进入首页');
})
//要post请求，并且路由是/home才能进入此逻辑
app.post('/home', function(req, res) {
	console.log(req.body)
	res.append("Access-Control-Allow-Origin","*")
	res.send('进入到home页面');
})

//只要路由是/test就进入到此逻辑
app.all('/test', function(req, res){
	res.send('进入到test页面');
})

var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var mysql = require("mysql");
var connection;
var multer = require('multer');
/*var upload = multer({
	//如果用这种方法上传，要手动添加文明名后缀
	dest: 'uploads/'
})*/
var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹手动创建。
	destination: function(req, file, cb) {
		cb(null, './uploads')
	},
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//给图片加上时间戳格式防止重名名
		//比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
var upload = multer({
	storage: storage
});

function createConnection() {
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'laoxie',
		password: '12345678',
		database: 'lagou'
	});
}

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
		extended: false
	}))
	//设置静态文件 app.js根目录下寻找public文件夹作为静态文件夹
app.use(express.static('public'));
app.use(express.static('uploads'));
// parse application/json 
//是要get请求并且匹配到路由`/`，我就执行回调，并用`res.send`方法去相应结果
app.get('/', function(req, res) {
		res.send('Hello World');
	})
	//views：模板文件所在目录。例如：
app.set('views', './views');
//view engine：要使用的模板引擎。例如： css<-sass   html<-jade
app.set('view engine', 'jade')
app.get("/jade", function(req, res) {
		//提供数据给jade模板
		res.render("home", {
			name: "laoxie"
		})
	})
	//中间件
app.get('/jobs', function(req, res) {
		createConnection()
		connection.connect();
		console.log(req.query)

		var pageCount = 10 * (req.query.page - 1)
		connection.query('SELECT * FROM jobs limit ' + pageCount + ',10', function(error, results, fields) {
			if(error) throw error;
			//results =>array类型
			console.log('The solution is: ', results);
			var obj = {
				jobs: results
			}
			res.send(JSON.stringify(obj));
			connection.end();
		});
		console.log(req.query)
		res.append("Access-Control-Allow-Origin", "*")
	})
	//要post请求，并且路由是/home才能进入此逻辑
app.post('/detail', function(req, res) {
	createConnection();
	console.log(req.body.id);
	var id = req.body.id;
	connection.query('SELECT * FROM jobs where id =  ' + id, function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		console.log('The solution is: ', results);
		var obj = {
			detail: results
		}
		res.send(JSON.stringify(obj));
		connection.end();
	});
	res.append("Access-Control-Allow-Origin", "*")
})

//只要路由是/test就进入到此逻辑
app.all('/test', function(req, res) {
	console.log(req.cookies)
	res.send('进入到test页面');
})

 
//单图上传
//app.post('/upload-single', upload.single('logo'), function(req, res, next) {
app.post('/upload-single', upload.any(), function(req, res, next) {
	console.log(req.files)
	res.append("Access-Control-Allow-Origin","*");
	res.send({
		wscats_code: '0',
		imgInfo: req.files
	});
});

app.post('/gethtml', upload.any(), function(req, res, next) {
	console.log(req.body)
	res.append("Access-Control-Allow-Origin","*");
	res.send({
		wscats_code: '0',
	});
});

var server = app.listen(8081, function() {
	//测试
	//测试
	var host = server.address().address
	var port = server.address().port
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
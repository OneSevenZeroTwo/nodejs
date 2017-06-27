var http = require("http");
//node版本的jq
var cheerio = require("cheerio")
var mysql = require("mysql");
var fs = require("fs")
	//配置数据库的连接
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'laoxie',
	password: '12345678',
	database: 'meizi'
});

var http = require("http");
var app = http.createServer(function(req, res) {

});

var ioFn = require("socket.io");
//实例化服务器，让它支持websocket
var io = ioFn(app);
app.listen(6789)
	//进行数据库连接
connection.connect();
//console.log(http)
console.log("start")
http.get("http://www.mzitu.com/zipai/comment-page-1/", function(res) {
	var data = "";
	res.on('data', function(chunk) {
		data += chunk
	})
	res.on('end', function() {
		console.log(data)
			//console.log(data)
			//把DOM交给$去处理
		var $ = cheerio.load(data);

		var imgArr = [];
		$('img').each(function(index, ele) {
			//console.log($(ele).attr("src"))
			//执行sql语句
			/*connection.query('INSERT INTO `source`(`title`, `image`) VALUES ("' + index + '","' + $(ele).attr("src") + '")', function(error, results, fields) {
				if(error) throw error;
				console.log('The solution is: ', results);
			});*/
			imgArr.push($(ele).attr("src"))
		})
		download(imgArr)
	})
})
var i = 0;
//下载
function download(imgArr) {
	var length = imgArr.length;
	var writerStream = fs.createWriteStream("./image/" + i + ".jpg");
	http.get(imgArr[i], function(res) {
		//写完图片才进行下载
		res.pipe(writerStream);
		//递归
		if(i < length) {
			io.on("connection", function(socket) {
				//前端跟后端联系的一个重要对象 发送消息的名字 发送消息的内容
				setInterval(function() {
					socket.emit("progress", i*4.35);
				}, 1000)
			})
			i++;
			console.log("完成第" + i + "/" + length + "张")
			download(imgArr);
		} else {
			return
		}
	})
}
//创建一个服务器
var http = require("http");
var app = http.createServer(function(req, res) {

});

var ioFn = require("socket.io");
//实例化服务器，让它支持websocket
var io = ioFn(app);
//跟前端进行连接
io.on("connection", function(socket) {
	//前端跟后端联系的一个重要对象 发送消息的名字 发送消息的内容
	var num = 0;
	setInterval(function() {
		socket.emit("progress",num);
		num++;
	}, 1000)
	socket.on("chat", function(data) {
		console.log(data)
		io.emit("topeople", data)
	})
})
app.listen(6789)
var express = require('express');
var http = require("http");
var fs = require("fs")

var app = express();
//中间层
app.get('/', function(req, res) {
	//nodejs专门写文件
	fs.readFile("log.txt", function(err, data) {
			var content = data.toString() + req.query.name + "   ";
			fs.writeFile("log.txt", content, function(err) {

			})
		})
		//通信php
		//php专门存数据库
	http.request({
		hostname: 'localhost',
		port: '81',
		path: '/1702/nodedemo/test.php?name=' + req.query.name,
		method: 'GET'
	}, function(res) {
		res.setEncoding('utf8');
		var data = "";
		res.on('data', function(chunk) {
			data += chunk
		});
		res.on('end', function() {
			console.log(data);
		});
	}).on('error', function(e) {
		console.log('problem with request: ' + e.message);
	}).end();
	res.send('Hello World');
})
app.listen(6789)
# NodeJS

首先[下载](https://nodejs.org/en/)NodeJS，安装

1. Chrome其实本质上就是V8引擎，用来解析JS的客户端（浏览器）前端部分
2. Node其实就死系统上运行V8引擎，用来解析JS的服务端（系统）后端部分

客户端 浏览器
```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
	</body>
	<!--以前一定要在浏览器中引入test。js，然后在浏览器打开执行-->
	<script src="test.js"></script>
</html>
```

服务端 系统环境
```javascript
node xxx.js
```
可以省略`.js`后缀
```javascript
node test.js
//相当于
node test
```

> nodejs是一个系统框架，专门实现把JS跑在浏览器以外的地方，nodejs其实就是用JS的语法

ctrl + c 退出命令


## 模块系统
理解为就是类似前端的`require.js`

|require.js|node.js|
|-|-|
|define|exports|
|require|require|

前端里面
```javascript
<script src="method.js"></script>
<script src="test.js"></script>
```
methods.js模块
export导出模块 类似以前require.js的define方法，导出对象，数字，字符串，数组
```javascript
exports.func = function() {
	return {
		name: "abc"
	}
}
exports.name = "laoxie"
```
require导入模块 跟require的require方法类似，导出是一个对象

export指向module.export，module.export指向一个空对象，export方法就是依赖于module.export
```javascript
export = module.export = {}//module.export的指向是不能被改变的
export = module.export = {name:"wscats"}
```
```javascript
var b = require("./method.js");
console.log(b)//object
```

```
module.exports = {
	name: "wscats",
	add: function(a, b) {
		return a + b;
	},
	sub: function(a, b) {
		return a - b;
	}
}//这种写法了先创建对象(指针就改变了)，然后赋属性值
module.exports.name = "wscats",//module.exports原本就是一个对象，往自己对象上添加属性值
exports.name = "wscats"
```

## 区分模块
```javascript
//jq相当于第三模块
<script src="jquery.js"></script>
//相当于自定义模块
<script src="method.js"></script>
<script src="test.js"></script>
```

1. **自定义模块** 自己封装的方法
2. **第三方模块** 别人写好的模块(就是从NPM下载的模块) 比如gulp
3. **内置模块** nodejs自带的模块(不用下载，就是存在nodejs内部的模块)

## NPM
NPM就是模块应用市场,就是其他开发者开发好的模块把它上传到NPM管理中心，提供给我们安装使用
```javascript
npm install XXX(模块名)
npm uninstall XXX(卸载)
```
如果不知道模块如何用，在这里查找
[npm模块管理中心](https://www.npmjs.com/)

## 内置模块
[查找nodejs模块的文档](http://nodejs.cn/api)

内置模块:http,os,path,url
```javascript
require("./http.js")//自定义模块
require("http")//内置模块
```

|状态码||
|-|-|
|100||
|2xx|请求成功|
|3xx|重定向|
|4xx|客户端错误|
|5xx|服务端错误|


## 创建服务器
### http
1. 引入require("http")内置http模块
2. 用http模块的createServer方法创建服务器，createServer接受一个匿名的回调函数，这个匿名的回调函数，接受两个参数(request,response)
3. 链式调用listen方法，把服务器放在对应端口号上监听

```javascript
//引入http内置模块
var http = require("http");
//console.log(http)
//用createServer创建服务器
//request请求
//response相应
http.createServer(function(request,response){
	//相应结果显示浏览器上
	response.end("Hello World");
}).listen(12345)
//端口号有范围限制0~65535
```

注意点：是否跨域，每次修改完代码，记得重新用node执行后端.js文件
请求的地方是指向xxx.js执行后的域名和端口号，nodejs跑一个http.js(代替了php+apache)

|php|nodejs|
|-|-|
|`header("Access-Control-Allow-Origin:*");`|`response.setHeader("Access-Control-Allow-Origin","*")`|
|`echo xxx;`|`response.end("xxx")`|
|Apache解析|Node(V8)解析|
|PHP|JS|
|$_GET["xxx"]|var paramStr  = url.parse(request.url).query;var param = querystring.parse(paramStr);//记得引入url和querystring模块|
|打开(wamp)apche服务器，直接请求.php，放在你们的wamp,www文件里面|放在任何地方，但是要用node执行，然后访问对应端口|


### url
**url**模块提供了一些实用函数，用于URL处理与解析
```javascript
var url = require("url");
```
```
console.log(request.url);//http://localhost:12345/index.html/?name=laoxie&skill=js
//把我们参数部分截取出来
var paramStr  = url.parse(request.url).query;//name=laoxie&skill=js
```

### querystring
**querystring**模块提供了一些实用工具，用于解析与格式化URL查询字符串
```javascript
var querystring = require('querystring');
```
```javascript
var param = querystring.parse(paramStr);//{name:"laoxie",skill:"js"}
param.name / param["name"]
```
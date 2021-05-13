/*
* @Author: ASUS
* @Date:   2021-05-09 19:46:48
* @Last Modified by:   ASUS
* @Last Modified time: 2021-05-11 19:27:56
*/

function ajax(obj) {
	var defaults = {
		type: 'get',
		dataType: 'text',
		data: {},
		url: '',
		jsonp: 'callback',
		async: true,
		success: function (data) {
			console.log(data);
		}
	}
	// 获取参数值,没有传递的参数的使用默认值
	for (var key in obj) {
		defaults[key] = obj[key];
	}
	if (defaults.dataType === 'jsonp') {
		ajaxForjsonp(defaults);
	} else {
		ajaxForjson(defaults);
	}
}

function ajaxForjson(defaults) {

	// 处理data
	var data = '';
	for (var key in defaults.data) {
		data = data + key + '=' + defaults.data[key] + '&';
	}
	data = data.substring(0, data.length - 1);

	// 处理url
	if (defaults.type === 'get') {
		defaults.url = defaults.url + '?' + data;
	}

	// 开始ajax
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = ActiveXObject('Microsoft.XMLHTTP');
	}
	// encodeURI兼容IE6
	xhr.open(defaults.type, encodeURI(defaults.url), defaults.async);

	var parma = null;
	if (defaults.type === 'post') {
		parma = data;
		// post要设置请求头,请求头没有设置好，返回来的数据是有问题的
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	xhr.send(parma);

	// 如果是同步的情况的话，直接返回 responseText
	if (defaults.async === false) {
		if (defaults.dataType === 'json') {
			return JSON.parse(xhr.responseText);
		} else {
			return xhr.responseText;
		}
	}

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var retData = xhr.responseText;
				if (defaults.dataType === 'json') {
					retData = JSON.parse(retData);
					// retData = eval(''+retData+'');
				} 
				defaults.success(retData);
			}
		}
	};
}

function ajaxForjsonp(defaults) {
	// data拼接
	var param = '';
	for (var key in defaults.data) {
		param += '&' + key + '=' + defaults.data[key];
	}	

	// expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	var version = '1.12.2';
	var jsonpCallback = 'jQuery' + ( version + Math.random() ).replace(/\D/g, '')+ '_' + (new Date().getTime());

	if (defaults.jsonpCallback) {
		jsonpCallback = defaults.jsonpCallback;
	}

	window[jsonpCallback] = function (data) {
		defaults.success(data);
	}

	var script = document.createElement('script');
	script.src = defaults.url + '?' + defaults.jsonp + '=' + jsonpCallback + param;
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(script);
}

// 测试代码
/*
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>ajax封装json与jsonp</title>
	<style type="text/css">
		.container {
			width: 300px;
			height: 300px;
			background-color: lightgreen;
		}
		
	</style>
</head>
<body>
	<div class="container">
		图书名字<input type="text" id='bookName'>
		<input type="button" value="查询" id="btn">
		<div id="show"></div>
	</div>
	<script type="text/javascript" src="ajax封装No3.js"></script>
	<script type="text/javascript">
		var btn = document.getElementById('btn');
		btn.onclick = function () {
			var bookName = document.getElementById('bookName').value;
			ajax({
				type: 'post',
				dataType: 'json',
				data: {username: 'lxf', password: '123'},
				url: 'http://www.myWebServer.com/index.php',
				jsonp: 'cb',
				jsonpCallback: 'fnName',
				async: true,
				success: function (data) {
					console.log(data);
					console.log(data.username, data.password);
				}
			});
			ajax({
				type: 'get',
				dataType: 'jsonp',
				data: {username: 'lxf', password: '123'},
				url: 'http://www.cross.com/jsonp.php',
				jsonp: 'cb', // 这里如果修改的话，服务器记得同步修改，否则获取不了，
				jsonpCallback: 'fnName',
				async: true,
				success: function (data) {
					console.log(data);
					console.log(data.username, data.password);
				}
			});
		};
	</script>
</body>
</html>*/
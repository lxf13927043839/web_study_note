/*
* @Author: ASUS
* @Date:   2021-05-09 19:46:48
* @Last Modified by:   ASUS
* @Last Modified time: 2021-05-10 16:57:25
*/

function ajax(obj) {
	var origin = {
		type: 'get',
		dataType: 'text',
		data: {},
		url: '',
		async: true,
		success: function (data) {
			console.log(data);
		}
	}
	// 获取参数值,没有传递的参数的使用默认值
	for (var key in obj) {
		origin[key] = obj[key];
	}
	// 处理data
	var data = '';
	for (var key in origin.data) {
		data = data + key + '=' + origin.data[key] + '&';
	}
	data = data.substring(0, data.length - 1);

	// 处理url
	if (origin.type === 'get') {
		origin.url = origin.url + '?' + data;
	}

	// 开始ajax
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = ActiveXObject('Microsoft.XMLHTTP');
	}
	// encodeURI兼容IE6
	xhr.open(origin.type, encodeURI(origin.url), origin.async);

	var parma = null;
	if (origin.type === 'post') {
		parma = data;
		// post要设置请求头,请求头没有设置好，返回来的数据是有问题的
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	xhr.send(parma);

	// 如果是同步的情况的话，直接返回 responseText
	if (origin.async === false) {
		if (origin.dataType === 'json') {
			return JSON.parse(xhr.responseText);
		} else {
			return xhr.responseText;
		}
	}

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var retData = xhr.responseText;
				if (origin.dataType === 'json') {
					retData = JSON.parse(retData);
					// retData = eval(''+retData+'');
				} 
				origin.success(retData);
			}
		}
	};
}

// 测试的代码
// 异步测试
/*ajax({
	type: 'post',
	dataType: 'text',
	data: {'bookName': bookName},
	url: 'http://www.myWebServer.com/index.php',
	async: true,
	success: function (data) {
		if (data.flag !== 0) {
			var str = '<ul><li>书名：'+data.name+'</li><li>作者：'+data.author+'</li><li>描述：'+data.desc+'</li></ul>';	
		} else {
			var str = '查询不到该图书';
		}
		console.log(data);
		var show = document.getElementById('show');

		show.innerHTML = data;
	}
});*/
// 同步测试
/*var ret = ajax({
	type: 'post',
	dataType: 'json',
	data: {'bookName': bookName},
	url: 'http://www.myWebServer.com/index.php',
	async: false
});
console.log(ret);
if (ret.flag !== 0) {
		var str = '<ul><li>书名：'+ret.name+'</li><li>作者：'+ret.author+'</li><li>描述：'+ret.desc+'</li></ul>';	
	} else {
		 str = '查询不到该图书';
	}
	var show = document.getElementById('show');
	show.innerHTML = str;*/
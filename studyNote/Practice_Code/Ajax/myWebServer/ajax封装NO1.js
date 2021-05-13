// parma在传递的时候，需要符合要求，现在没有出错的判断
/*
	如果没有传参数的话，怎么处理。学jQuery的封装
*/
function ajax(method, url, parma, callback) {
	var xhr = null;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	if (method === 'get' && parma !== 'undefined') {
		url += '?' + parma;
	}
	// url 加上 encodeURI() 是兼容IE6
	xhr.open('get', url, true);	
	
	if (method === 'post') {
		xhr.open('post', url, true); 
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	var data = null;
	if (method === 'post') {
		data = parma;
	}
	xhr.send(data);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var data = xhr.responseText;
				callback(data);
			}
		}
	}
}
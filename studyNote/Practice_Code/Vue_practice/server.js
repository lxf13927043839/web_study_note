/*
* @Author: ASUS
* @Date:   2021-06-19 23:27:08
* @Last Modified by:   ASUS
* @Last Modified time: 2021-06-20 00:49:20
*/
const http = require('http');

http.createServer((request, response) => {
	const {searchParams} =  new URL(request.url, `http://${request.headers.host}`);
	const callback = searchParams.get('callback');
	console.log(callback);

	let people = {
		name:'Tom',
		age: '43',
	};

	response.writeHead(200, {
		'content-Type': 'text/plain; charset=utf8',
	});
	const data = `${callback}(${JSON.stringify(people)})`;
	console.log(data);
	response.end(data);

}).listen(3000,'192.168.43.153', (err)=>{
	if (err) {
		console.log(500);
		return;
	}
	console.log('server running');
});
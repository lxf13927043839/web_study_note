fetch('http://www.liulongbin.top:3005/api/getprodlist').then(response => {
    console.log(response);
    // 通过fetch请求的结果，如果成功了，则第一个.then中拿不到最终的数据,数据没有被解析
    // 需要调用respon.json()得到一个新的Promise对象。
    return response.json();
}).then(data => {
    console.log(data);
})
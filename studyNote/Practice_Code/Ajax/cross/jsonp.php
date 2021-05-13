<?php

/**
 * @Author: ASUS
 * @Date:   2021-05-11 17:59:01
 * @Last Modified by:   ASUS
 * @Last Modified time: 2021-05-11 19:21:41
 */
// 要跟前端页面接口参数一致，不然出错误
	$callback = $_GET['cb'];
	$username = $_GET['username'];
	$password = $_GET['password'];
	$arr = array('username'=>$username, 'password'=>$password);
	echo $callback.'('.json_encode($arr).')';
?>
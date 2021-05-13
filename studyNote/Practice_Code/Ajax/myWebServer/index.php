<?php
	// $username = $_GET['username'];
	// $password = $_GET['password'];
	$username = $_POST['username'];
	$password = $_POST['password'];
	$arr = array('username'=>$username, 'password'=>$password);

	echo json_encode($arr);
?>

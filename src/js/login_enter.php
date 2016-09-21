<?php
header('Content-type: text/html;charset=utf-8');

$phonenum = $_REQUEST['phonenum'];      // 通过get请求传递过来的phonenum值
$pass  = $_REQUEST['password'];  // 通过get请求传递过来的密码

$pass = md5($pass);


// 创建连接
$conn = new mysqli('localhost', 'root', '', 'library');

$sql = "select phonenum from yanzheng where phonenum='$phonenum' and password='$pass'";     // sql语句     查询zhenpin表中的phonenum字段

$conn->query('set names utf8');

$result = $conn->query($sql);


if ($result->num_rows > 0) {

    $phonenum = $result->fetch_assoc();
    $phonenum = $phonenum['phonenum'];

    $data = array(
        'code' => 0,
        'msg'  => '登录成功！',
        'data' => array(
            'phonenum' => $phonenum
        )
    );
} else {
    $data = array(
        'code' => 1,
        'msg'  => '用户名或密码错误！'
    );
}

echo json_encode($data);

$conn->close();
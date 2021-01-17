<?php
require_once '../../config.php';
require_once '../../model/account.php';

header('Access-Control-Allow-Origin: *');

if(isset($_POST['email']) && isset($_POST['password'])){
    $email = $_POST['email'];
    $password = $_POST['password'];

    $account = login($email, $password);
    //var_dump($account);
    //$account gia tri true/ false
    if($account){
        //ton tai tai khoan
        $id = $account['acc_id'];
        echo json_encode(['error' => '', 'id' => $id]);
    }
    else{
        echo json_encode(['error' => 'tên đăng nhập hoặc mật khẩu không chính xác']);
    }
}
else{
    echo json_encode(['error' => 'vui long nhap tai khoan']);
}
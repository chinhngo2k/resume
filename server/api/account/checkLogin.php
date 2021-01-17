<?php
require_once '../../config.php';
require_once '../../model/account.php';

header('Access-Control-Allow-Origin: *');

if(isset($_POST['id'])){
    $acc_id = intval($_POST['id']);
    $account = getAccById($acc_id);
    echo json_encode($account);
}else{
    echo 'sagdhja';
}
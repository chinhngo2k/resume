<?php
require_once '../../config.php';
require_once '../../model/personal.php';

header('Access-Control-Allow-Origin: *');

if(isset($_GET['acc_id'])){
    $acc_id = $_GET['acc_id'];
    $personal = getPersonalByAccId($acc_id);
    echo json_encode($personal);
}
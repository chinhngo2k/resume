<?php

require_once '../../config.php';
require_once '../../model/personal.php';

header('Access-Control-Allow-Origin: *');

//xu ly anh
//kiem tra dieu kien: bat buoc phai la file anh va kich thuoc < ...
// move_uploaded_file($_FILES['avatar']['tmp_name'], "../../uploads/".$_FILES['avatar']['name']);
// $avatar = "http://localhost/CV/server/uploads/$_FILES[avatar][name]";

//var_dump($_FILES);

$data = file_get_contents('php://input');
$data = json_decode($data, true);

$fullname = $data['fullname'];
$birthday = $data['birthday'];
$sex = intval($data['sex']);
$mail = $data['mail'];
$address = $data['address'];
$phone = intval($data['phone']);
$job = $data['job'];
$facebook_link = $data['facebook_link'];
$github_link = $data['github_link'];
$carrer = $data['carrer'];

$personla_id = addPersonal($fullname, $birthday, $sex, $mail, $address, $phone, $job, $facebook_link, $github_link, $carrer);

echo json_encode($personla_id);


//$education = $data['education'];
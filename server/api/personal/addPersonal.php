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
$person = $data['person'];
$acc_id = intval($data['acc_id']);

$fullname = $person['fullname'];
$birthday = $person['birthday'];
$sex = intval($person['sex']);
$mail = $person['mail'];
$address = $person['address'];
$phone = intval($person['phone']);
$job = $person['job'];
$facebook_link = $person['facebook_link'];
//$github_link = $person['github_link'];
$carrer = $person['carrer'];


$personla_id = addPersonal($fullname, $birthday, $sex, $mail, $address, $phone, $job, $facebook_link, $carrer, $acc_id);

echo json_encode($personla_id);


//$education = $data['education'];
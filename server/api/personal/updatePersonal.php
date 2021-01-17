<?php

require_once '../../config.php';
require_once '../../model/education.php';
require_once '../../model/experience.php';
require_once '../../model/skills.php';
require_once '../../model/personal.php';

header('Access-Control-Allow-Origin: *');

$data = file_get_contents('php://input');
$data = json_decode($data, true);

$person = $data['person'];
$per_id = $data['per_id'];

var_dump($person);
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

updatePersonal($fullname, $birthday, $sex, $mail, $address, $phone, $job, $facebook_link, $carrer, $per_id);

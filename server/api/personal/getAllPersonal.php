<?php
require_once '../../config.php';
require_once '../../model/personal.php';

header('Access-Control-Allow-Origin: *');

$personal = getAllPersonal();

echo json_encode($personal);

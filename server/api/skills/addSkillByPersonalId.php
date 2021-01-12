<?php
require_once '../../config.php';
require_once '../../model/skills.php';

header('Access-Control-Allow-Origin: *');

$data = file_get_contents('php://input');
$data = json_decode($data, true);

//var_dump($data);

//var_dump($education);
$skills = $data['skills'];
$personal_id = $data['personal_id'];

foreach ($skills as &$element) {
    $element['group'] = substr($element['key'], strlen($element['key']) - 1);
}

$countGroup = array_map(function ($element) {
    return $element['group'];
}, $skills);
//var_dump($countGroup);

$countGroup = array_unique($countGroup);
//var_dump($countGroup);
$result = [];

foreach ($countGroup as &$element) {
    $temp = [];
    foreach ($skills as &$item) {
        if ($item['group'] == $element) {
            $temp["$item[key]"] = $item['value'];
        }
    }
    array_push($result, $temp);
}

$index = 0;
foreach ($result as $element) {
    //trong truong hop nguoi dung ko nhap day du thong tin;
    $skill = isset($element["skill$index"]) ? $element["skill$index"] : '';
    $level = isset($element["level$index"]) ? $element["level$index"] : '';
    //$address = isset($element["address$index"]) ? $element["address$index"] : '';
    // $descripition = isset($element["descripition$index"]) ? $element["descripition$index"] : '';
    // $datestart = isset($element["datestart$index"]) ? $element["datestart$index"] : '';
    // $dateeend = isset($element["dataeend$index"]) ? $element["dataeend$index"] : '';
    addSkillByPersonalId($skill, intval($level), intval($personal_id));
    $index++;
}

//chi viec them tung phan tu trong result nay vao co so du lieu la xong
var_dump($result);

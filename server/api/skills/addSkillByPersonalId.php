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

foreach($countGroup as $id){
    //var_dump($result[$index]["school$id"]);
    $skill = isset($result[$index]["skill$id"]) ? $result[$index]["skill$id"] : '';
    $level = isset($result[$index]["level$id"]) ? $result[$index]["level$id"] : '';
    $time = isset($result[$index]["time$id"]) ? $result[$index]["time$id"] : '';
    $descripition = isset($result[$index]["descripition$id"]) ? $result[$index]["descripition$id"] : '';
    addSkillByPersonalId($skill, intval($level), $time, $descripition, intval($personal_id));
    $index++;
}
//chi viec them tung phan tu trong result nay vao co so du lieu la xong
//var_dump($result);

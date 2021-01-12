<?php
require_once '../../config.php';
require_once '../../model/experience.php';

header('Access-Control-Allow-Origin: *');

$data = file_get_contents('php://input');
$data = json_decode($data, true);

//var_dump($data);

//var_dump($education);
$experience = $data['experience'];
$personal_id = $data['personal_id'];

foreach ($experience as &$element) {
    $element['group'] = substr($element['key'], strlen($element['key']) - 1);
}

$countGroup = array_map(function ($element) {
    return $element['group'];
}, $experience);
//var_dump($countGroup);

$countGroup = array_unique($countGroup);
//var_dump($countGroup);
$result = [];

foreach ($countGroup as &$element) {
    $temp = [];
    foreach ($experience as &$item) {
        if ($item['group'] == $element) {
            $temp["$item[key]"] = $item['value'];
        }
    }
    array_push($result, $temp);
}

for($index = 0; $index < count($result); $index++){
    var_dump($result[$index]);
}

// $index = 0;
// foreach ($result as $element) {
//     //trong truong hop nguoi dung ko nhap day du thong tin;
//     $company = isset($element["company$index"]) ? $element["company$index"] : '';
//     $job = isset($element["job$index"]) ? $element["job$index"] : '';
//     //$address = isset($element["address$index"]) ? $element["address$index"] : '';
//     $descripition = isset($element["descripition$index"]) ? $element["descripition$index"] : '';
//     $datestart = isset($element["datestart$index"]) ? $element["datestart$index"] : '';
//     $dateeend = isset($element["dataeend$index"]) ? $element["dataeend$index"] : '';
//     addExperienceByPersonalId($job, $company, $descripition, $datestart, $dateeend, intval($personal_id));
//     $index++;
// }

//chi viec them tung phan tu trong result nay vao co so du lieu la xong
//var_dump($result);

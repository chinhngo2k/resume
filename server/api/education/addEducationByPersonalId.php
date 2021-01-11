<?php

$data = file_get_contents('php://input');
$data = json_decode($data, true);

var_dump($data);

//var_dump($education);
$education = $data['education'];
$personal_id = $data['id'];

foreach($education as &$element){
    $element['group'] = substr($element['key'], strlen($element['key']) - 1);
} 
//var_dump($countGroup);

$countGroup = array_unique($countGroup);
//var_dump($countGroup);
$result = [];

foreach($countGroup as &$element){
    $temp = [];
    foreach($education as &$item){
        if($item['group'] == $element){
            $temp["$item[key]"] = $item['value'];
        }
    }
    array_push($result, $temp);
}

$index = 0;
foreach($result as $element){
    //trong truong hop nguoi dung ko nhap day du thong tin;
    $school = isset($element["school$index"]) ? $element["school$index"] : '';
    $degree = isset($element["degree$index"]) ? $element["degree$index"] : '';
    //$address = isset($element["address$index"]) ? $element["address$index"] : '';
    $descripition = isset($element["descripition$index"]) ? $element["descripition$index"] : '';
    $datestart = isset($element["datestart$index"]) ? $element["datestart$index"] : '';
    $dateeend = isset($element["dataeend$index"]) ? $element["dataeend$index"] : '';
    addEducationByPersonalId($school, $degree, $descripition, $datestart, $datestart, intval($personal_id));
    $index++;
}

//chi viec them tung phan tu trong result nay vao co so du lieu la xong
var_dump($result);
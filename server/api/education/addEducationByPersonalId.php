<?php
require_once '../../config.php';
require_once '../../model/education.php';

header('Access-Control-Allow-Origin: *');

$data = file_get_contents('php://input');
$data = json_decode($data, true);

//var_dump($data);

//var_dump($education);
$education = $data['education'];
$personal_id = $data['personal_id'];

foreach($education as &$element){
    $element['group'] = substr($element['key'], strlen($element['key']) - 1);
} 

$countGroup = array_map(function($element){
    return $element['group'];
}, $education);
//var_dump($countGroup);

$countGroup = array_unique($countGroup);

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
//var_dump($countGroup);
//var_dump($result);

$index = 0;

// foreach($result as $element){
//     echo $countGroup[$index];
//     //trong truong hop nguoi dung ko nhap day du thong tin;
//     //$school = isset($element["school$countGroup[$index]"]) ? $element["school$countGroup[$index]"] : '';
//     //var_dump($school);
//     // $degree = isset($element["degree$index"]) ? $element["degree$index"] : '';
//     // //$address = isset($element["address$index"]) ? $element["address$index"] : '';
//     // $descripition = isset($element["descripition$index"]) ? $element["descripition$index"] : '';
//     // $datestart = isset($element["datestart$index"]) ? $element["datestart$index"] : '';
//     // $dateeend = isset($element["dataeend$index"]) ? $element["dataeend$index"] : '';
//     // addEducationByPersonalId($school, $degree, $descripition, $datestart, $datestart, intval($personal_id));
//     $index++;
//     //echo $index;
// }

//duyet qua cai groupcount
foreach($countGroup as $id){
    //var_dump($result[$index]["school$id"]);
    $school = isset($result[$index]["school$id"]) ? $result[$index]["school$id"] : '';
    $degree = isset($result[$index]["degree$id"]) ? $result[$index]["degree$id"] : '';
    //$address = isset($element["address$index"]) ? $element["address$index"] : '';
    $descripition = isset($result[$index]["descripition$id"]) ? $result[$index]["descripition$id"] : '';
    $datestart = isset($result[$index]["datestart$id"]) ? $result[$index]["datestart$id"] : '';
    $dateeend = isset($result[$index]["dateend$id"]) ? $result[$index]["dateend$id"] : '';
    addEducationByPersonalId($school, $degree, $descripition, $datestart, $datestart, intval($personal_id));
    $index++;
}

//chi viec them tung phan tu trong result nay vao co so du lieu la xong
//var_dump($result);
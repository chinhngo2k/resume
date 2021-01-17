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
var_dump($countGroup);
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
var_dump($result);
// for($index = 0; $index < count($result); $index++){
//     $temp = [];
//     foreach($result[$index] as $element){
//         array_push($temp, $element);
       
//         //var_dump($element);
//     }
//     //khi chay het vong lap roi 
//     addExperienceByPersonalId($temp[0], $temp[1], $temp[2], $temp[3], $temp[4], intval($personal_id));
// }

// foreach($countGroup as $id){
//     echo($id);
//     // foreach ($result as $element) {
//     //     var_dump($element["job$id"]);
//     //     //trong truong hop nguoi dung ko nhap day du thong tin;
//     //     //$company = isset($element["company$id"]) ? $element["company$id"] : '';
//     //     // $job = isset($element["job$id"]) ? $element["job$id"] : '';
//     //     // //$address = isset($element["address$id"]) ? $element["address$id"] : '';
//     //     // $descripition = isset($element["descripition$id"]) ? $element["descripition$id"] : '';
//     //     // $datestart = isset($element["datestart$id"]) ? $element["datestart$id"] : '';
//     //     // $dateeend = isset($element["dataeend$id"]) ? $element["dataeend$id"] : '';
//     //     // addExperienceByPersonalId($job, $company, $descripition, $datestart, $dateeend, intval($personal_id));
//     // }
// }

$index = 0;
//var_dump($countGroup[$index]);
// foreach ($result as $element) {
//     echo 'hghj';
//     //trong truong hop nguoi dung ko nhap day du thong tin;
//     //var_dump($element["company$countGroup[$index]"]);
//     //$company = isset($element["company$countGroup[$index]"]) ? $element["company$countGroup[$index]"] : '';
//     //var_dump($company);
//     // $job = isset($element["job$countGroup[$index]"]) ? $element["job$countGroup[$index]"] : '';
//     // //$address = isset($element["address$countGroup[$index]"]) ? $element["address$countGroup[$index]"] : '';
//     // $descripition = isset($element["descripition$countGroup[$index]"]) ? $element["descripition$countGroup[$index]"] : '';
//     // $datestart = isset($element["datestart$countGroup[$index]"]) ? $element["datestart$countGroup[$index]"] : '';
//     // $dateeend = isset($element["dataeend$countGroup[$index]"]) ? $element["dataeend$countGroup[$index]"] : '';
//     // addExperienceByPersonalId($job, $company, $descripition, $datestart, $dateeend, intval($personal_id));
//     $index++;
// }

foreach($countGroup as $id){
    //var_dump($result[$index]["school$id"]);
    $job = isset($result[$index]["job$id"]) ? $result[$index]["job$id"] : '';
    $company = isset($result[$index]["company$id"]) ? $result[$index]["company$id"] : '';
    $address = isset($result[$index]["address$id"]) ? $result[$index]["address$id"] : '';
    $descripition = isset($result[$index]["descripition$id"]) ? $result[$index]["descripition$id"] : '';
    $datestart = isset($result[$index]["datestart$id"]) ? $result[$index]["datestart$id"] : '';
    $dateeend = isset($result[$index]["dateend$id"]) ? $result[$index]["dateend$id"] : '';
    addExperienceByPersonalId($job, $company, $address, $descripition, $datestart, $dateeend, intval($personal_id));
    $index++;
}

//chi viec them tung phan tu trong result nay vao co so du lieu la xong
//var_dump($result);

<?php
require_once '../../config.php';
require_once '../../model/education.php';

header('Access-Control-Allow-Origin: *');

//lay thong tin ve hoc van
$education = getEducationByPersonalId($personal_id);

//xu ly ngay thang nam
//2020-10-18 => thang 10, 2020

//cai education dang la 1 mang thi phai duyet qua tung phan tu de chinh sua
foreach($education as &$item){
    //item chinh la giai doan hoc 
    $datestart = explode('-', $item['datestart']);
    $item['datestart'] = "tháng $datestart[1], $datestart[0]";
    
    $dateend = explode('-', $item['dateend']);
    $item['dateend'] = "tháng $dateend[1], $dateend[0]";
}
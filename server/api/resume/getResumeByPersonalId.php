<?php
//lay tat ca thong tin cua 1 nguoi
//thong tin ca nhan, hoc van, kinh nghiem lam viec, ky nang

header('Access-Control-Allow-Origin: *');

require_once '../../model/education.php';
require_once '../../model/experience.php';
require_once '../../model/skills.php';
require_once '../../model/personal.php';
require_once '../../config.php';

if (isset($_GET['personal_id'])) {
    $personal_id = $_GET['personal_id'];

    $data = [];

    //lay thong tin co ban
    $data = getPersonalById($personal_id);

    //lay thong tin ve hoc van
    $education = getEducationByPersonalId($personal_id);

    $experience = getExperienceByPersonalId($personal_id);

    $skills = getSkillsByPerosnalId($personal_id);


    //xu ly ngay thang nam
    //2020-10-18 => thang 10, 2020

    //cai education dang la 1 mang thi phai duyet qua tung phan tu de chinh sua
    foreach ($education as &$item) {
        //item chinh la giai doan hoc 
        $datestart = explode('-', $item['datestart']);
        $item['datestart'] = "tháng $datestart[1], $datestart[0]";

        $dateend = explode('-', $item['dateend']);
        $item['dateend'] = "tháng $dateend[1], $dateend[0]";
    }

    foreach ($experience as &$item) {
        //item chinh la giai doan hoc 
        $datestart = explode('-', $item['datestart']);
        $item['datestart'] = "tháng $datestart[1], $datestart[0]";

        $dateend = explode('-', $item['dateend']);
        $item['dateend'] = "tháng $dateend[1], $dateend[0]";
    }

    //xu ly gioi tinh
    //1 => nam, 0 => nu
    $sex = $data['sex'] == 1 ? 'nam' : 'nữ';
    $data['sex'] = $sex;

    //xu ly nam sinh
    //2000-02-26 => 26/02/2000
    $birthday = explode('-', $data['birthday']);
    $data['birthday'] = "$birthday[2]/$birthday[1]/$birthday[0]";

    $data['education'] = $education;
    $data['experience'] = $experience;
    $data['skills'] = $skills;

    echo json_encode($data);
}

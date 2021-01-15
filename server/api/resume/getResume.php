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

    $data['education'] = $education;
    $data['experience'] = $experience;
    $data['skills'] = $skills;

    echo json_encode($data);
}

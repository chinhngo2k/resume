<?php

require_once '../../config.php';
require_once '../../model/education.php';
require_once '../../model/experience.php';
require_once '../../model/skills.php';
require_once '../../model/personal.php';

header('Access-Control-Allow-Origin: *');

//xoa thoe ma person
if (isset($_GET['per_id'])) {
    //kiem tra xem cai id co dung ko da roi moi xoa
    $per_id = intval($_GET['per_id']);
    deleteEducation($per_id);
    deleteExperience($per_id);
    deleteSkills($per_id);
} else {
    echo 'ko co ma id';
}

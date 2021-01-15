<?php

//school, degree, address, descripition, datestart, dateend, personal_id

function getEducationByPersonalId($personal_id)
{
    global $db;
    $education = $db->query("select school, degree, datestart, dateend, descripition from education where personal_id = '$personal_id'");
    $education = $education->fetchAll(PDO::FETCH_ASSOC);
    return $education;
}

function addEducationByPersonalId($school, $degree, $descripition, $datestart, $dateend, $personal_id)
{
    global $db;
    $query = "insert education(school, degree, descripition, datestart, dateend, personal_id) values('$school', '$degree', '$descripition', '$datestart', '$dateend', $personal_id)";
    $db->exec($query);
}

<?php

//school, degree, address, descripition, datestart, dateend, personal_id

function getEducationByPersonalId($personal_id)
{
    global $db;
    $education = $db->query("select school, degree, datestart, dateend, descripition from education where personal_id = '$personal_id'");
    $education = $education->fetchAll(PDO::FETCH_ASSOC);
    return $education;
}

function addEducationByPersonalId($school, $degree, $address, $descripition, $datestart, $dateend, $personal_id)
{
    global $db;
    $query = "insert education(school, degree, address, descripition, datestart, dateend, personal_id) values('$school', '$address', '$degree', '$descripition', '$datestart', '$dateend', $personal_id)";
    $db->exec($query);
}

function deleteEducation($per_id)
{
    global $db;
    $query = "delete from education where personal_id = $per_id";
    try {
        $db->exec($query);
    } catch (Exception $e) {
        echo $e;
    }
}
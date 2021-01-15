<?php

//company, job, address, descripition, datestart, dateend, personal_id

function getExperienceByPersonalId($personal_id)
{
    global $db;
    $experience = $db->query("select job, company, datestart, dateend, descripition from experience where personal_id = '$personal_id'");
    $experience = $experience->fetchAll(PDO::FETCH_ASSOC);
    return $experience;
}

function addExperienceByPersonalId($job, $company, $descripition, $datestart, $dateend, $personal_id)
{
    global $db;
    $query = "insert experience(job, company, descripition, datestart, dateend, personal_id) values('$job', '$company', '$descripition', '$datestart', '$dateend', $personal_id)";
    $db->exec($query);
}

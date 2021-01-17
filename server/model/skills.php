<?php

//skill_id, skill, level, descripition, time, personal_id

function getSkillsByPerosnalId($personal_id)
{
    global $db;
    $query = "select skill, level, time, descripition from skills where personal_id = $personal_id";
    try {
        $skills = $db->query($query);
        $skills = $skills->fetchAll(PDO::FETCH_ASSOC);
        return $skills;
    } catch (exception $e) {
        echo $e;
        return ['error' => 'lay du lieu ve ky nang ko thanh cong'];
    }
}

function addSkillByPersonalId($skill, $level, $time, $descripition, $personal_id)
{
    global $db;
    $query = "insert skills(skill, level, time, descripition, personal_id) values('$skill', $level, '$time', '$descripition', $personal_id)";
    try {
        $db->exec($query);
    } catch (Exception $e) {
        echo $e;
        return ['error' => 'them moi ky nang ko thanh cong'];
    }
}

function deleteSkills($per_id)
{
    global $db;
    $query = "delete from skills where personal_id = $per_id";
    try {
        $db->exec($query);
    } catch (Exception $e) {
        echo $e;
    }
}

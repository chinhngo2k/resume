<?php

//skill_id, skill, level, descripition, time, personal_id

function getSkillsByPerosnalId($personal_id){
    global $db;
    $query = "select skill, level from skills where personal_id = $personal_id";
    try{
        $skills = $db->query($query);
        $skills = $skills->fetchAll(PDO::FETCH_ASSOC);
        return $skills;
    }
    catch(exception $e){
        echo $e;
        return ['error' => 'lay du lieu ve ky nang ko thanh cong'];
    }
}

function addSkillByPersonalId($skill, $level, $personal_id){
    global $db;
    $query = "insert skills(skill, level, personal_id) values('$skill', $level, $personal_id)";
    try {
        $db->exec($query);
    }
    catch(Exception $e){
        echo $e;
        return ['error' => 'them moi ky nang ko thanh cong'];
    }
}
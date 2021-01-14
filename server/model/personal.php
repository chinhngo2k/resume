<?php

//lat tat ca
function getAllPersonal()
{
    global $db;
    $personals = $db->query("select * from personal");
    $personals = $personals->fetchAll(PDO::FETCH_ASSOC);
    return $personals;
}

//lay 1 item
function getPersonalById($personal_id)
{
    global $db;
    $personal = $db->query("select * from personal where personal_id = $personal_id");
    $personal = $personal->fetch(PDO::FETCH_ASSOC);
    return $personal;
}

function getPersonalByAccId($acc_id){
    global $db;
    $personal = $db->query("select * from personal where acc_id = $acc_id");
    $personal =  $personal->fetchAll(PDO::FETCH_ASSOC);
    return $personal;
}

//them
function addPersonal($fullname, $birthday, $sex, $mail, $address, $phone, $job, $facebook_link, $carrer, $acc_id)
{
    global $db;
    $code = md5(uniqid(rand(), true));
    //echo $birthday;
    $query = "insert personal(fullname, birthday, sex, mail, address, phone, job, facebook_link, carrer, code, acc_id) values('$fullname', '$birthday', $sex, '$mail', '$address', $phone, '$job', '$facebook_link', '$carrer', '$code', $acc_id)";
    //echo $query;
    $count = $db->exec($query);
    if ($count > 0) {
        //thuc hien thanh cong;
        $user = $db->query("select personal_id from personal where code = '$code'");
        $user = $user->fetch(PDO::FETCH_ASSOC);
        return $user['personal_id'];
    }
}

function updateAvatar($avatar, $personal_id)
{
    global $db;
    $query = "update personal set avatar = '$avatar' where personal_id = $personal_id";
    $db->exec($query);
}

//sua

//xoa

<?php

function login($email, $password){
    global $db;
    $account = $db->query("select * from account where email = '$email' and password = '$password'");
    $account = $account->fetch(PDO::FETCH_ASSOC);

    //$account la boolean
    return $account;

}
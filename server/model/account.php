<?php

function login($email, $password)
{
    global $db;
    $account = $db->query("select * from account where email = '$email' and password = '$password'");
    //truy xuat den csdl lay thong tin account
    $account = $account->fetch(PDO::FETCH_ASSOC);
    //vi moi email tao chi 1 ac nen no truy xuat den phan tu dau tien

    //$account la boolean
    return $account;
    //tra ve tt tk

}

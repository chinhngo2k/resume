<?php
$dsn = 'mysql:host=localhost;dbname=cv';
$username = 'root';
$password = '';
try{
    $db = new PDO($dsn, $username, $password);
}
catch(exception $e){
    echo $e;
}
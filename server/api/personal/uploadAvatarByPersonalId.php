<?php
require_once '../../config.php';
require_once '../../model/personal.php';

header('Access-Control-Allow-Origin: *');
//kiem tra xem file anh da ton tai hay chua
if (isset($_FILES['avatar']) && isset($_POST['personal_id'])) {
    $type = $_FILES['avatar']['type'];
    var_dump($type);
    $personal_id = $_POST['personal_id'];
    if (in_array($type, ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'])) {
        $filename = $_FILES['avatar']['name'];
        echo $filename;
        move_uploaded_file($_FILES['avatar']['tmp_name'], "../../uploads/$filename");
        $src = "http://localhost/resume/server/uploads/$filename";
        updateAvatar($src, $personal_id);
        echo $personal_id;
    }
    //echo 'ádas';
}

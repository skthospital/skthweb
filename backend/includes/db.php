<?php
$DB_HOST = '192.168.0.42';
$DB_USER = 'username';
$DB_PASS = 'password';
$DB_NAME = 'skthgo_webbase';
$TOKEN = md5('skthweb');

// $DB_USER = 'bangjarearn';
// $DB_PASS = '4567';
// $DB_NAME = 'bangjarearnN';

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Check connection
// if ($mysqli->connect_error) {
//     die("Connection failed: " . $mysqli->connect_error);
// }

?>

<?php
session_start();
require_once 'includes/db_login.php';





session_destroy();

 echo "<meta http-equiv='refresh' content='0;URL=login'>";

?>

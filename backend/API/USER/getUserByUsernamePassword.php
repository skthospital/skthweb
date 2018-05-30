<?php
require_once '../../includes/db.php'; // The mysql database connection script




$data = file_get_contents('php://input');
  $dataJsonDecode = json_decode($data);
  if ($dataJsonDecode->token == $TOKEN) {

    $mysqli->query('SET NAMES utf8');
    $query = " SELECT * FROM tbl_person LIMIT 5 ";
    $result = $mysqli->query ( $query ) or die ( $mysqli->error . __LINE__ );

    $arr = array ();
    if ($result->num_rows > 0) {
    	while ( $row = $result->fetch_assoc () ) {
    		$arr [] = $row;
    	}
    }
    // JSON-encode the response
    echo $json_response = json_encode ( $arr );
  }

?>

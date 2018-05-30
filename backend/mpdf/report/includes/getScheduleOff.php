<?php

function getTotalOFF ($user_id,$ward_id,$month_id,$year_id) {
  require "../../includes/db.php";

  $queryGetOFF = "SELECT COUNT(off_id) AS total  FROM SKTH_ENS.dbo.tblScheduleOff
                  WHERE off_user_id = '$user_id'
                  AND off_at_ward = '$ward_id'
                  AND off_status = '1'";
  $stmtOFF = sqlsrv_query( $conn, $queryGetOFF);
  if( $stmtOFF === false ) {
       echo "Error in executing query.</br>";
       die( print_r( sqlsrv_nrrors(), true));
  } else {
    /* Process results */
    $jsonOFF = array();
    do {
         while ($rowOFF = sqlsrv_fetch_array($stmtOFF, SQLSRV_FETCH_ASSOC)) {
         $jsonOFF = $rowOFF;

          return $jsonOFF['total'];
         }
    } while ( sqlsrv_next_result($stmtEN) );
  }

}

?>

<?php

function getTotalOT ($user_id,$ward_id,$month_id,$year_id) {
  require "../../includes/db.php";

  error_reporting( error_reporting() & ~E_NOTICE );

  if($conn){
    $data = file_get_contents('php://input');
    $dataJsonDecode = json_decode($data);



    $sql = "SELECT * FROM SKTH_ENS.dbo.tblScheduleDetail WHERE schd_month = '$month_id' AND schd_year = '$year_id' AND schd_ward_id = '$ward_id' AND schd_user_id = '$user_id'";
    // $tsql = "SELECT TOP 10 * FROM (SELECT TOP 20 FROM tblJob ORDER BY job_id) ORDER BY job_id DESC";
    $stmt = sqlsrv_query( $conn, $sql);

    if( $stmt === false ) {
         echo "Error in executing query.</br>";
         die( print_r( sqlsrv_errors(), true));
    }

    /* Process results */
    $json = array();

    do {
         while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
         $c = 0;
         $ot = 0;
         $hr = 0;
         $json  = $row;


         require "func/import01.php";
         require "func/import02.php";
         require "func/import03.php";
         require "func/import04.php";
         require "func/import05.php";
         require "func/import06.php";
         require "func/import07.php";
         require "func/import08.php";
         require "func/import09.php";
         require "func/import10.php";
         require "func/import11.php";
         require "func/import12.php";
         require "func/import13.php";
         require "func/import14.php";
         require "func/import15.php";
         require "func/import16.php";
         require "func/import17.php";
         require "func/import18.php";
         require "func/import19.php";
         require "func/import20.php";
         require "func/import21.php";
         require "func/import22.php";
         require "func/import23.php";
         require "func/import24.php";
         require "func/import25.php";
         require "func/import26.php";
         require "func/import27.php";
         require "func/import28.php";
         require "func/import29.php";
         require "func/import30.php";
         require "func/import31.php";




         }
    } while ( sqlsrv_next_result($stmt) );

    /* Run the tabular results through json_encode() */
    /* And ensure numbers don't get cast to trings */
    return $ot;
    /* Free statement and connection resources. */
    sqlsrv_free_stmt( $stmt);
  }
  sqlsrv_close( $conn);

}

?>

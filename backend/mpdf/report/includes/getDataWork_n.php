<?php
function getDataWork_n ($id_n) {
  require "../../includes/db.php";

  $queryGetData_n = "SELECT * FROM SKTH_ENS.dbo.tblWorkList WHERE wl_id = '$id_n'";
  $stmtGDT_n = sqlsrv_query( $conn, $queryGetData_n);
  if( $stmtGDT_n === false ) {
       echo "Error in executing query.</br>";
       die( print_r( sqlsrv_nrrors(), true));
  } else {
    /* Process results */
    $jsonGDT_n = array();
    do {
         while ($rowGDT_n = sqlsrv_fetch_array($stmtGDT_n, SQLSRV_FETCH_ASSOC)) {
         $jsonGDT_n = $rowGDT_n;
         $hr_n = $jsonGDT_n['wl_hr'];
         if($hr_n == 8){
           return '<font color="'.$jsonGDT_n['wl_color_b'].'">'.$jsonGDT_n['wl_b'].'</font>';
         } else {
           return '<font color="'.$jsonGDT_n['wl_color_b'].'">'.$jsonGDT_n['wl_b'].'</font><sup style="color:'.$jsonGDT_n['wl_color_b'].';font-size:0.7em;">'.$hr_n.'</sup>';
         }
         }
    } while ( sqlsrv_next_result($stmtGDT_n) );
  }

}

 ?>

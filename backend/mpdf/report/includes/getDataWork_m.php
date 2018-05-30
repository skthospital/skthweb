<?php
function getDataWork_m ($id_m) {
  require "../../includes/db.php";

  $queryGetData_m = "SELECT * FROM SKTH_ENS.dbo.tblWorkList WHERE wl_id = '$id_m'";
  $stmtGDT_m = sqlsrv_query( $conn, $queryGetData_m);
  if( $stmtGDT_m === false ) {
       echo "Error in executing query.</br>";
       die( print_r( sqlsrv_errors(), true));
  } else {
    /* Process results */
    $jsonGDT_m = array();
    do {
         while ($rowGDT_m = sqlsrv_fetch_array($stmtGDT_m, SQLSRV_FETCH_ASSOC)) {
         $jsonGDT_m = $rowGDT_m;
         $hr_m = $jsonGDT_m['wl_hr'];
         $wl_id = $jsonGDT_m['wl_id'];
         if($hr_m == 8 || $hr_m == 0){
           return '<font  color="'.$jsonGDT_m['wl_color'].'">'.$jsonGDT_m['wl_f'].'</font>';
         } else {
           return '<font  color="'.$jsonGDT_m['wl_color'].'">'.$jsonGDT_m['wl_f'].'</font><sup style="color:'.$jsonGDT_m['wl_color'].';font-size:0.7em;">'.$hr_m.'</sup>';
         }
         }
    } while ( sqlsrv_next_result($stmtGDT_m) );
  }
}
 ?>

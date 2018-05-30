<?php
function getDataWork_a ($id_e) {
  require "../../includes/db.php";

  $queryGetData_e = "SELECT * FROM SKTH_ENS.dbo.tblWorkList WHERE wl_id = '$id_e'";
  $stmtGDT_e = sqlsrv_query( $conn, $queryGetData_e);
  if( $stmtGDT_e === false ) {
       echo "Error in executing query.</br>";
       die( print_r( sqlsrv_errors(), true));
  } else {
    /* Process results */
    $jsonGDT_e = array();
    do {
         while ($rowGDT_e = sqlsrv_fetch_array($stmtGDT_e, SQLSRV_FETCH_ASSOC)) {
         $jsonGDT_e = $rowGDT_e;
         $hr_e = $jsonGDT_e['wl_hr'];
         if ($hr_e == 8){
           return '<font  color="'.$jsonGDT_e['wl_color_c'].'">'.$jsonGDT_e['wl_c'].'</font>';
         } else {
           return '<font  color="'.$jsonGDT_e['wl_color_c'].'">'.$jsonGDT_e['wl_c'].'</font><sup style="color:'.$jsonGDT_e['wl_color_c'].';font-size:0.7em;">'.$hr_e.'</sup>';
         }
         }
    } while ( sqlsrv_next_result($stmtGDT_e) );
  }

}

 ?>

<?php
$queryHead = "SELECT * FROM SKTH_ENS.dbo.v_RPT_AW  WHERE sch_id='$sch_id'";
$stmt = sqlsrv_query( $conn, $queryHead);
// $tsql = "SELECT TOP 10 * FROM (SELECT TOP 20 FROM tblJob ORDER BY job_id) ORDER BY job_id DESC";

if( $stmt === false ) {
     echo "Error in executing query.</br>";
     die( print_r( sqlsrv_errors(), true));
} else {
  /* Process results */
  $json = array();
  do {
       while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
       $json = $row;

       $ward_id = $json['ward_id'];
       $month_id = $json['month_id'];
       $year_id = $json['year_id'];

       $hospital_name = $json['hospital_name'];
       $group_name = $json['group_name'];
       $month_name = $json['month_name'];
       $year = $json['year_id'];
       $ward_name = $json['ward_name'];


       $head_fullname = $json['h_pre'].$json['h_name']."  ".$json['h_lastname'];
       $invest_fullname = $json['i_pre'].$json['i_name']."  ".$json['i_lastname'];
       $create_fullname = $json['cre_pre'].$json['cre_name']."  ".$json['cre_lastname'];



       }
  } while ( sqlsrv_next_result($stmt) );
}

$year_b = intval($year) + 543;

?>

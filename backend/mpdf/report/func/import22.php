<?php

if($json['schd_d22_m'] != null){

  $sch_22_m =  $json['schd_d22_m'];

  $sqlWL = "SELECT *,CASE  WHEN  wl_color = 'red' THEN 'rgb(221, 75, 57)'
  WHEN  wl_color = 'brown' THEN 'brown'
  ELSE wl_color END AS wl_color FROM SKTH_ENS.dbo.tblWorkList WHERE wl_id = '$sch_22_m'";

  // $tsql = "SELECT TOP 10 * FROM (SELECT TOP 20 FROM tblJob ORDER BY job_id) ORDER BY job_id DESC";
  $stmtWL = sqlsrv_query( $conn, $sqlWL);

  if( $stmtWL === false ) {
       echo "Error in executing query.</br>";
       die( print_r( sqlsrv_errors(), true));
  }

  /* Process results */
  $jsonWl = array();

  do {
       while ($rowWl = sqlsrv_fetch_array($stmtWL, SQLSRV_FETCH_ASSOC)) {
       $jsonWl  = $rowWl;

       $jsonArr[$c] = $jsonWl;
       $jsonArr[$c]['title'] =$jsonWl['wl_name'];if($jsonWl['wl_ot'] == 1){$ot++;}if($jsonWl['wl_en'] == 1){$nm++;}

       $hr = $hr+$jsonWl['wl_hr'];

       }
  } while ( sqlsrv_next_result($stmtWL) );


  $jsonArr[$c]['t_date'] = $json['schd_year']."-".$json['schd_month']."-"."22";
  $jsonArr[$c]['t_day_no'] = "22";
  $jsonArr[$c]['t_id'] = $json['schd_id'];
  $jsonArr[$c]['t_month_no'] = $json['schd_month'];
  $jsonArr[$c]['t_ward_no'] = $json['schd_ward_id'];
  $jsonArr[$c]['t_work_status'] = $json['schd_d22_m'];
  $jsonArr[$c]['t_year_no'] = $json['schd_year'];

  $c++;
}
if($json['schd_d22_a'] != null){


  $sch_22_a =  $json['schd_d22_a'];

  $sqlWL = "SELECT *,CASE  WHEN  wl_color = 'red' THEN 'rgb(221, 75, 57)'
  WHEN  wl_color = 'brown' THEN 'brown'
  ELSE wl_color END AS wl_color FROM SKTH_ENS.dbo.tblWorkList WHERE wl_id = '$sch_22_a'";

  // $tsql = "SELECT TOP 10 * FROM (SELECT TOP 20 FROM tblJob ORDER BY job_id) ORDER BY job_id DESC";
  $stmtWL = sqlsrv_query( $conn, $sqlWL);

  if( $stmtWL === false ) {
       echo "Error in executing query.</br>";
       die( print_r( sqlsrv_errors(), true));
  }

  /* Process results */
  $jsonWl = array();

  do {
       while ($rowWl = sqlsrv_fetch_array($stmtWL, SQLSRV_FETCH_ASSOC)) {
       $jsonWl  = $rowWl;

       $jsonArr[$c] = $jsonWl;
       $jsonArr[$c]['title'] =$jsonWl['wl_name'];if($jsonWl['wl_ot'] == 1){$ot++;}if($jsonWl['wl_en'] == 1){$nm++;}
       $hr = $hr+$jsonWl['wl_hr'];
       }
  } while ( sqlsrv_next_result($stmtWL) );



  $jsonArr[$c]['t_date'] = $json['schd_year']."-".$json['schd_month']."-"."22";
  $jsonArr[$c]['t_day_no'] = "22";
  $jsonArr[$c]['t_id'] = $json['schd_id'];
  $jsonArr[$c]['t_month_no'] = $json['schd_month'];
  $jsonArr[$c]['t_ward_no'] = $json['schd_ward_id'];
  $jsonArr[$c]['t_work_status'] = $json['schd_d22_a'];
  $jsonArr[$c]['t_year_no'] = $json['schd_year'];
  $c++;
}
if($json['schd_d22_n'] != null){
  $sch_22_n =  $json['schd_d22_n'];

  $sqlWL = "SELECT *,CASE  WHEN  wl_color = 'red' THEN 'rgb(221, 75, 57)'
  WHEN  wl_color = 'brown' THEN 'brown'
  ELSE wl_color END AS wl_color FROM SKTH_ENS.dbo.tblWorkList WHERE wl_id = '$sch_22_n'";

  // $tsql = "SELECT TOP 10 * FROM (SELECT TOP 20 FROM tblJob ORDER BY job_id) ORDER BY job_id DESC";
  $stmtWL = sqlsrv_query( $conn, $sqlWL);

  if( $stmtWL === false ) {
       echo "Error in executing query.</br>";
       die( print_r( sqlsrv_errors(), true));
  }

  /* Process results */
  $jsonWl = array();

  do {
       while ($rowWl = sqlsrv_fetch_array($stmtWL, SQLSRV_FETCH_ASSOC)) {
       $jsonWl  = $rowWl;

       $jsonArr[$c] = $jsonWl;
       $jsonArr[$c]['title'] =$jsonWl['wl_name'];if($jsonWl['wl_ot'] == 1){$ot++;}if($jsonWl['wl_en'] == 1){$nm++;}
       $hr = $hr+$jsonWl['wl_hr'];
       }
  } while ( sqlsrv_next_result($stmtWL) );
  $jsonArr[$c]['t_date'] = $json['schd_year']."-".$json['schd_month']."-"."22";
  $jsonArr[$c]['t_day_no'] = "22";
  $jsonArr[$c]['t_id'] = $json['schd_id'];
  $jsonArr[$c]['t_month_no'] = $json['schd_month'];
  $jsonArr[$c]['t_ward_no'] = $json['schd_ward_id'];
  $jsonArr[$c]['t_work_status'] = $json['schd_d22_n'];
  $jsonArr[$c]['t_year_no'] = $json['schd_year'];
  $c++;
}



?>

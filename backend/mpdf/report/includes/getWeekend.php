<?php

error_reporting( error_reporting() & ~E_NOTICE );

function getWeekend($params_date,$params_month_id,$params_year) {
      require "../../includes/db.php";

      $day = $params_year."-".$params_month_id."-".$params_date;


      $sqlHoliday = "SELECT * FROM SKTH_ENS.dbo.tblHoliday
              WHERE h_date = '$day'";

      // $tsql = "SELECT TOP 10 * FROM (SELECT TOP 20 FROM tblJob ORDER BY job_id) ORDER BY job_id DESC";

      $stmtHoliday = sqlsrv_query( $conn, $sqlHoliday);

      if( $stmtHoliday === false ) {
           echo "Error in executing query.</br>";
           die( print_r( sqlsrv_errors(), true));
      }

      /* Process results */
      $jsonHoliday = array();


      do {

           while ($rowHoliday = sqlsrv_fetch_array($stmtHoliday, SQLSRV_FETCH_ASSOC)) {
           $jsonHoliday   =  $rowHoliday;

           if($jsonHoliday['h_id'] != null){
             return "red";
           }

           }
      } while ( sqlsrv_next_result($stmtHoliday) );


      $day = explode("-",$day);
      $jd=cal_to_jd(CAL_GREGORIAN,$day[1],$day[2],$day[0]);
      if ((jddayofweek($jd,1)) == 'Saturday'){
        return "red";
      } else if ((jddayofweek($jd,1)) == 'Sunday'){
        return "red";
      }




}















?>

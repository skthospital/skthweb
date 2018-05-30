<?php

 require "../../includes/db.php";

$sch_id = $_GET['sch_id'];

require "includes/getScheduleMaster.php";


// function for M Work
require "includes/getDataWork_m.php";

// function for E work
require "includes/getDataWork_a.php";

// function for N Work
require "includes/getDataWork_n.php";

// function total OT
require "includes/getTotalOT.php";

// function total EN
require "includes/getTotalEN.php";

// function get Week End
require "includes/getWeekend.php";

require "includes/getScheduleOff.php";


// font
$fontH = '1';
$fontB = '1';




/* Run the tabular results through json_encode() */
/* And ensure numbers don't get cast to trings */
/* Free statement and connection resources. */

$htmlH = '
  <html>
    <head>
      <title>ENS | รายงานใบตารางเวร</title>
       <link rel="shortcut icon" href="dist/img/title.png" type="image/x-icon">
	     <meta http-equiv="Content-Language" content="en-GB">
	     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    </head>
    <style>
      .main  {
                border-collapse: collapse;
                width:100%;
              }

        table, th, td {
                border: 1px solid black;
                      }
                      th {
                          height: 25px;
                          }
                      td {
                          height: 25px;
                          padding:2px 2px 2px
                          }
      	</style>


    <body>
      <h4 align="center">'.$group_name.' '.$hospital_name.'</h4>
      <h4 align="center">ใบตารางเวร ประจำเดือน'.$month_name.' พ.ศ.'.$year_b.' แผนก'.$ward_name.'</h4>
    <table border="1" class="main" >
      <thead>
      <tr>
        <th><font size="'.$fontH.'"> ที่ </font></th>
        <th><font size="'.$fontH.'">ชื่อ - สกุล</font></th>
        <th><font size="'.$fontH.'">ตำแหน่ง</font></th>
        ';

        $d=cal_days_in_month(CAL_GREGORIAN,$month_id,$year_id);
        $x = 1;
        $t = 1;
        while($x <= $d) {

          if ($x < 10) {
                $x = "0" . $x;
            }

            $htmlDate[$x] = '<th><font size="'.$fontH.'" color="'.getWeekend($x,$month_id,$year_id).'"> '.$t.' </font></th>';

          $x++;
          $t++;
        }

        $htmlFtable = '
        <th><font size="'.$fontH.'" color="red">OT</font></th>
        <th><font size="'.$fontH.'">บ/ด</font></th>
        <th><font size="'.$fontH.'">ค้าง</font></th>
      </tr>

      </thead>
      <tbody>';



      $personalList = "SELECT * FROM SKTH_ENS.dbo.tblScheduleDetail_bakup schd
                       LEFT JOIN SKTH_HOSPITAL.dbo.tblPersonal tblp ON tblp.Mem_ID = schd.schd_user_id
                       LEFT JOIN SKTH_HOSPITAL.dbo.tbl_Position tblpo ON tblp.Position_ID = tblpo.Position_ID
                       WHERE  schd.schd_ward_id = '$ward_id' AND schd.schd_month = '$month_id' AND schd.schd_year = '$year_id'
                       ORDER BY schd_seq ASC";
      $stmtPL = sqlsrv_query( $conn, $personalList);
      // $tsql = "SELECT TOP 10 * FROM (SELECT TOP 20 FROM tblJob ORDER BY job_id) ORDER BY job_id DESC";
      $c = 1;
      $sum = 0;
      if( $stmtPL === false ) {
           echo "Error in executing query.</br>";
           die( print_r( sqlsrv_errors(), true));
      } else {

        /* Process results */
        $jsonPL = array();
        do {
             while ($rowPL = sqlsrv_fetch_array($stmtPL, SQLSRV_FETCH_ASSOC)) {
             $jsonPL = $rowPL;

                  $user_pre_name = $jsonPL['Pre_name'];
                  $user_name = $jsonPL['Mem_name'];
                  $user_lastname = $jsonPL['Mem_lastname'];

                  $position_name = $jsonPL['Position_Initals'];


                  require "includes/getSchdData.php";

                  $user_id = $jsonPL['schd_user_id'];

                  $totalOT = getTotalOT($user_id,$ward_id,$month_id,$year_id);
                  $totalEN = getTotalEN($user_id,$ward_id,$month_id,$year_id);

                  $totalOFF = getTotalOFF($user_id,$ward_id,$month_id,$year_id);

                  $sumOT += intval($totalOT);
                  $sumEN += intval($totalEN);
                  $sumOFF += intval($totalOFF);

                   $htmlL[$c] = '
                     <tr>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'"> '.$c.' </font></td>
                       <td align="left" nowrap="nowrap"><font size="'.$fontB.'"> '.$user_pre_name.$user_name.' '.$user_lastname.'</font></td>
                       <td align="left" nowrap="nowrap"><font size="'.$fontB.'">'.$position_name.'</font></td>

                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d01_m.' '.$schd_d01_a.' '.$schd_d01_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d02_m.' '.$schd_d02_a.' '.$schd_d02_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d03_m.' '.$schd_d03_a.' '.$schd_d03_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d04_m.' '.$schd_d04_a.' '.$schd_d04_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d05_m.' '.$schd_d05_a.' '.$schd_d05_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d06_m.' '.$schd_d06_a.' '.$schd_d06_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d07_m.' '.$schd_d07_a.' '.$schd_d07_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d08_m.' '.$schd_d08_a.' '.$schd_d08_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d09_m.' '.$schd_d09_a.' '.$schd_d09_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d10_m.' '.$schd_d10_a.' '.$schd_d10_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d11_m.' '.$schd_d11_a.' '.$schd_d11_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d12_m.' '.$schd_d12_a.' '.$schd_d12_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d13_m.' '.$schd_d13_a.' '.$schd_d13_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d14_m.' '.$schd_d14_a.' '.$schd_d14_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d15_m.' '.$schd_d15_a.' '.$schd_d15_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d16_m.' '.$schd_d16_a.' '.$schd_d16_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d17_m.' '.$schd_d17_a.' '.$schd_d17_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d18_m.' '.$schd_d18_a.' '.$schd_d18_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d19_m.' '.$schd_d19_a.' '.$schd_d19_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d20_m.' '.$schd_d20_a.' '.$schd_d20_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d21_m.' '.$schd_d21_a.' '.$schd_d21_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d22_m.' '.$schd_d22_a.' '.$schd_d22_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d23_m.' '.$schd_d23_a.' '.$schd_d23_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d24_m.' '.$schd_d24_a.' '.$schd_d24_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d25_m.' '.$schd_d25_a.' '.$schd_d25_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d26_m.' '.$schd_d26_a.' '.$schd_d26_n.'</font></td>
                       <td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d27_m.' '.$schd_d27_a.' '.$schd_d27_n.'</font></td>';

                       $html28[$c] = '<td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d28_m.' '.$schd_d28_a.' '.$schd_d28_n.'</font></td>';
                       $html29[$c] = '<td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d29_m.' '.$schd_d29_a.' '.$schd_d29_n.'</font></td>';
                       $html30[$c] = '<td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d30_m.' '.$schd_d30_a.' '.$schd_d30_n.'</font></td>';
                       $html31[$c] = '<td align="center" nowrap="nowrap"><font size="'.$fontB.'">'.$schd_d31_m.' '.$schd_d31_a.' '.$schd_d31_n.'</font></td>';

                       $htmlTotal[$c] = '<td align="center" nowrap="nowrap"><font size="'.$fontB.'" color="red">'.$totalOT.'</font></td>
                        <td align="center" nowrap="nowrap"><font size="'.$fontB.'" color="black">'.$totalEN.'</font></td>
                        <td align="center" nowrap="nowrap"><font size="'.$fontB.'" color="black">'.$totalOFF.'</font></td>

                    </tr>';


                 $c++;
             }
        } while ( sqlsrv_next_result($stmtPL) );
      }

      $colspan = $d+3;

      $htmlF = '
      <tr>
          <td colspan="'.$colspan.'" align="center"><font size="'.$fontB.'" color="black">รวม</font></td>
          <td align="center"><font size="'.$fontB.'" color="red">'.$sumOT.'</font></td>
          <td align="center"><font size="'.$fontB.'" color="black">'.$sumEN.'</font></td>
          <td align="center"><font size="'.$fontB.'" color="black">'.$sumOFF.'</font></td>
      </tr>
        </tbody>
    </table>
    <br>
    <br>


    <table style="border: none;width:100%">
      <thead>
        <tr style="border: none;">
          <th align="center" style="border: none;"><span>ผู้จัด.............................................................</span></th>
          <th align="center" style="border: none;"><span>ผู้ตรวจสอบ.............................................................</span></th>
          <th align="right" style="border: none;"></th>
        </tr>
      </thead>
      <tbody>
        <tr style="border: none;">
          <td style="border: none;" align="center">( '.$create_fullname.' )</span></td>
          <td style="border: none;" align="center"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;( '.$invest_fullname.' )</span></td>
          <td style="border: none;" align="center"></td>
        </tr>
      </tbody>
    </table>




    </body>
    </html>';

//==============================================================
//==============================================================
//==============================================================


include("../mpdf.php");
$mpdf = new mPdf('th', 'A4-L', '0', 'THSaraban');
$mpdf->WriteHTML($htmlH);
for ($i=1; $i <= $d ; $i++) {
  if ($i < 10) {
        $i = "0" . $i;
    }
    $mpdf->WriteHTML($htmlDate[$i]);
}
$mpdf->WriteHTML($htmlFtable);
for ($x = 1; $x < $c; $x++) {
  $mpdf->WriteHTML($htmlL[$x]);
  if($d == 28){
    $mpdf->WriteHTML($html28[$x]);
  } else if ($d == 29){
    $mpdf->WriteHTML($html28[$x]);
    $mpdf->WriteHTML($html29[$x]);
  } else if ($d == 30){
    $mpdf->WriteHTML($html28[$x]);
    $mpdf->WriteHTML($html29[$x]);
    $mpdf->WriteHTML($html30[$x]);
  } else if ($d == 31){
    $mpdf->WriteHTML($html28[$x]);
    $mpdf->WriteHTML($html29[$x]);
    $mpdf->WriteHTML($html30[$x]);
    $mpdf->WriteHTML($html31[$x]);

  }
  $mpdf->WriteHTML($htmlTotal[$x]);

}
$mpdf->WriteHTML($htmlF);

$mpdf->Output();
exit;

//==============================================================
//==============================================================
//==============================================================


?>

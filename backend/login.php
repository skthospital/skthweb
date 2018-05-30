<?php
session_start();
require_once 'includes/db_login.php';
error_reporting( error_reporting() & ~E_NOTICE );
/* TSQL Query */

$username = $_POST['username'];
$password = md5($_POST['password']);
$logo = 'logo1.png';
$color = '#d2d6de';
/* TSQL Query */
// $sql = "SELECT * FROM tblPersonal WHERE Mem_ID='$username' AND Password = '$pwdMd'";
if($username == null){

}else{
  $sql = "SELECT * FROM SKTH_HOSPITAL.dbo.tblPersonal tbp
          WHERE tbp.Mem_ID='$username' AND tbp.Password = '$password'";
  $req =  sqlsrv_query($conn, $sql) or die(print_r(sqlsrv_errors(),true));

  if(sqlsrv_has_rows($req) != 1){
        $logo = 'logoerror.png';
        $color = '#ded2d2';

  }else{
    $req =  sqlsrv_query($conn, $sql) or die(print_r(sqlsrv_errors(),true));
      $logo = 'logo1.png';
      $color = '#d2d6de';

      while($data = sqlsrv_fetch_array($req, SQLSRV_FETCH_ASSOC)){
        // echo "<center><h4 style='color:green'>ยินดีต้อนรับ </br>".$_SESSION['Pre_name'].  $_SESSION['firstName']." ".$_SESSION['lastName']."</h4></center>";
        echo "<meta http-equiv='refresh' content='1;URL=./'>";


      	  $_SESSION['ses_id'] = session_id();
          $_SESSION['Mem_ID'] = $data['Mem_ID'];
          $_SESSION['firstName'] = $data['Mem_name'];
          $_SESSION['lastName'] = $data['Mem_lastname'];
          $_SESSION['Pre_name'] = $data['Pre_name'];
          $_SESSION['Cost_id'] = $data['Cost_id'];
          $_SESSION['Position_ID'] = $data['Position_ID'];
          $_SESSION['Permiss_ENS'] = $data['Permiss_ENS'];
  		}
          // echo "SESSION Mem_ID  =".$_SESSION['Mem_ID'];
  }
  sqlsrv_free_stmt( $req);
  sqlsrv_close( $conn);
}

/* Free statement and connection resources. */

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>SKTH ENS | Log in</title>
  <link rel="shortcut icon" href="dist/img/title.png" type="image/x-icon">
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.6 -->
  <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/AdminLTE.css">
  <!-- iCheck -->
  <style >
  .login-page,
  .register-page {
    background: <?php echo $color;?>;
  }
  </style>
  <link rel="stylesheet" href="plugins/iCheck/square/blue.css">


  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

</head>
<body class="hold-transition login-page" style="overflow: hidden">
<div class="login-box">
  <div class="login-logo">

  </div>

  <!-- /.login-logo -->
  <div class="login-box-body">
    <div class="row">
      <p><img  src="dist/img/<?php echo $logo; ?>" class="img-responsive center-block" alt="logo"></p>
    </div>
    <p class="login-box-msg"><b>E</b>lectronic <b>N</b>urse <b>S</b>chedules System</p>

    <form action="login" method="post">
      <div class="form-group has-feedback">
        <input type="text" class="form-control" placeholder="Username" name="username">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Password" name="password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox icheck">
            <label>
              <input type="checkbox"> Remember Me
            </label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

    <div class="social-auth-links text-center">
      <p>- OR -</p>
      <a href="" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
        Facebook</a>
      <a href="" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
        Google+</a>
    </div>
    <!-- /.social-auth-links -->

    <a href="http://192.168.0.10/irs/frmSearchID.aspx" target="_blank">I forgot my password</a>
  </div>
  <!-- /.login-box-body -->
  <div style="text-align: right;">
    <h4>Powered  by <img src="dist/img/angularjs.png" height="30" alt=""></h4>
  </div>
</div>
<!-- /.login-box -->



<!-- jQuery 2.2.3 -->
<script src="plugins/jQuery/jquery-2.2.3.min.js"></script>
<!-- Bootstrap 3.3.6 -->
<script src="bootstrap/js/bootstrap.min.js"></script>
<!-- iCheck -->
<script src="plugins/iCheck/icheck.min.js"></script>
<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
  });
</script>
</body>
</html>

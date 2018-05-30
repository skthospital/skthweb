<?php
  error_reporting( error_reporting() & ~E_NOTICE );
 		session_start();
 		$ses_id = $_SESSION['ses_id'];
 		$ses_firstName = $_SESSION['firstName'];
    $ses_lastName = $_SESSION['lastName'];
    $ses_prename = $_SESSION['Pre_name'];
    $ses_status = $_SESSION['ses_id'];
    $ses_userid = $_SESSION['Mem_ID'];
    $ses_costid = $_SESSION['Cost_id'];
    $ses_Cost_SKTHM = $_SESSION['Cost_SKTHM'];
    $ses_Position = $_SESSION['Position_ID'];
    $ses_Permiss_ENS = $_SESSION['Permiss_ENS'];
    
    if($ses_Position == null){
      $ses_Position = '0';
    }
      if($ses_Permiss_ENS == "1" || $ses_Permiss_ENS == "2" || $ses_Permiss_ENS == "3" || $ses_Permiss_ENS == "4"){
			}else  {
               echo "<meta http-equiv='refresh' content='0;URL=../'>";
          exit();
      }
?>
<!DOCTYPE html>
<html data-ng-app="myApp">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>SKTH | ENS</title>
  <link rel="shortcut icon" href="dist/img/title.png" type="image/x-icon">
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <link rel="stylesheet" href="lib/flags/flags.css"/>

  <link rel="stylesheet" href="lib/jquery-gritter/jquery.gritter.css"/>

  <!-- Bootstrap 3.3.6 -->
  <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="lib/font-awesome-4.7.0/css/font-awesome.css">
  <!-- Ionicons -->
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/AdminLTE.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="dist/css/skins/_all-skins.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="plugins/iCheck/flat/blue.css">
  <!-- Morris chart -->
  <link rel="stylesheet" href="plugins/morris/morris.css">

  <link rel="stylesheet" href="lib/fullcalendar/dist/fullcalendar.css">

  <link href="lib/bootstrap-switch/angular-bootstrap-toggle.css" rel="stylesheet">
  <!-- JQUERY GRITTER -->
	<!-- SELECT2 -->
	<link rel="stylesheet" href="lib/select2/select2.css"/>
	<link rel="stylesheet" href="lib/select2/select2-bootstrap.css"/>
  <!-- jvectormap -->
  <link rel="stylesheet" href="plugins/jvectormap/jquery-jvectormap-1.2.2.css">
  <!-- Date Picker -->
  <link rel="stylesheet" href="plugins/datepicker/datepicker3.css">

  <link rel="stylesheet" href="plugins/iCheck/all.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="plugins/daterangepicker/daterangepicker.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

  <link rel="stylesheet" href="lib/angular-ui/angular-ui.css"/>


  <link rel="stylesheet" href="lib/angular-ui/ui-tree/angular-ui-tree.css">

  <link rel="stylesheet" href="lib/app/app.css?v=2"/>
  <link rel="stylesheet" href="lib/jquery/jquery.qtip.css"/>

  <style media="screen">
  .multiSelect {
  overflow: auto;
}
.multiSelect .select {
  margin-right: 20px;
  float: left;
}
.multiSelect .text {
  clear: both;
  font-size: 11px;
}
.multiSelect label::after {
  content: ":";
}
.btn.mover {
  display: block;
  margin-top: 25px;
  vertical-align: top;
}
.btn.mover.left {
  padding: 3px 8px 2px 6px;
}
.btn.mover.right {
  margin-top: 24px;
  padding: 3px 7px 2px;
}
.btn.mover i {
  margin: 0;
}

/* demo css */

}
  </style>
<link rel="stylesheet" href="lib/app/app-ie.css"/>
  <?php
    echo "<script type='text/javascript'>
 		var user_id = ".json_encode($ses_userid)."
    var position = ".$ses_Position."

    var role = ".json_encode($ses_Permiss_ENS)."
 	</script>";

  if(isMobile()){
  echo "<script>var device = 'mobile'</script>";
  }
  else {
  echo "<script>var device = 'other'</script>";
  }
   ?>


   <!-- NOTIFICATION CHROME -->
   <script>
          document.addEventListener('DOMContentLoaded', function () {
              if (Notification.permission !== "granted")
              Notification.requestPermission();
            });
    </script>

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body class="hold-transition skin-blue sidebar-mini " data-ng-controller="AppCtrl">
<div class="wrapper">

  <header class="main-header">
    <!-- Logo -->
    <a href="#/" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>E</b>NS</span>

      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>ENS</b> system</span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- Messages: style can be found in dropdown.less-->

          <!-- Notifications: style can be found in dropdown.less -->
          <li class="dropdown notifications-menu">
            <a href="" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-danger">10</span>
            </a>
            <ul class="dropdown-menu">
              <li class="header">You have 10 notifications</li>
              <li>
                <!-- inner menu: contains the actual data -->
                <ul class="menu">
                  <li>
                    <a href="#">
                      <i class="fa fa-users text-aqua"></i> 5 new members joined today
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-warning text-yellow"></i> Very long description here that may not fit into the
                      page and may cause design problems
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-users text-red"></i> 5 new members joined
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-shopping-cart text-green"></i> 25 sales made
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-user text-red"></i> You changed your username
                    </a>
                  </li>
                </ul>
              </li>
              <li class="footer"><a href="#">View all</a></li>
            </ul>
          </li>
          <!-- Tasks: style can be found in dropdown.less -->

          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="" class="dropdown-toggle" data-toggle="dropdown">
              <img ng-src="jcrop/upload_pic/{{userObj.PICTURE}}" class="user-image" alt="User Image">
              <span class="hidden-xs">{{userObj.Mem_name}} {{userObj.Mem_lastname}}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img ng-src="jcrop/upload_pic/{{userObj.PICTURE}}" class="img-circle" alt="User Image">

                <p>
                  <strong>{{userObj.Mem_name}} {{userObj.Mem_lastname}}</strong></br>
                  {{userObj.POSITION}}

                </p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="">Friends</a>
                  </div>
                </div>
                <!-- /.row -->
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#/profile/{{userId}}" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a href="logout.php?user_id=<?php echo $ses_userid ?>" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
          <li>
            <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img ng-src="jcrop/upload_pic/{{userObj.PICTURE}}" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>{{userObj.Mem_name}} {{userObj.Mem_lastname}}</p>
          <a href="#"> {{userObj.POSITION}}</a>
        </div>
      </div>
      <!-- search form -->
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li class="header">MAIN NAVIGATION</li>
        <!-- <li class="treeview">
          <a href="#">
            <i class="fa fa-dashboard text-aqua"></i> <span>หน้าแรก</span>
          </a>
        </li> -->
        <li data-ng-show="role == 1 || role == 2 || role == 3">
          <a href="">
            <i class="fa fa-th text-aqua"></i> <span>ตารางปฏิบัติงาน</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#/schedules"><i class="fa fa-table text-aqua"></i> ตารางทั้งหมด</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#/leaves"><i class="fa fa-refresh text-aqua"></i> <span>รายการแลกเวร</span>

          </a>

        </li>
        <li class="treeview" data-ng-show="role == 1 || role == 2 || role == 3">
          <a href="">
            <i class="fa fa-files-o text-aqua"></i> <span>จัดการข้อมูล</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">


            <li><a href="#/wards"><i class="fa fa-fw fa-building-o text-aqua"></i> หอผู้ป่วยทั้งหมด</a></li>
            <li><a href="#/holiday"><i class="fa fa-sun-o text-aqua"></i> วันหยุดนักขัตฤกษ์</a></li>
            <li><a href="#/groups/defult"><i class="fa fa-map-signs text-aqua"></i> กลุ่มงาน</a></li>

          </ul>
        </li>
        <li class="treeview" data-ng-show="role == 1 || role == 2 || role == 3">
          <a href="">
            <i class="fa fa-user-circle-o text-aqua"></i> <span>ข้อมูลผู้ใช้</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#/positions"><i class="fa fa-star-o text-aqua"></i> รายการตำแหน่งทั้งหมด</a></li>

            <li class="treeview">
              <a href=""><i class="fa fa-users text-aqua"></i> รายชื่อผู้ใช้
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu">
                <li data-ng-hide="role == 2"><a href="#/user-head"><i class="fa fa-map  text-aqua"></i> รายชื่อหัวหน้าหยน่วยงาน</a></li>
                <li><a href="#/users"><i class="fa fa-sitemap text-aqua"></i> รายชื่อผู้ใช้งาน</a></li>
              </ul>
            </li>



          </ul>
        </li>



        <li class="header" data-ng-show="role == 1 || role == 2 || role == 3">โรงพยาบาล</li >
        <li data-ng-show="role == 1 || role == 2 || role == 3">
          <a href="" data-ng-click="setHospital()"><i class="fa fa-hospital-o text-aqua"></i> <span>{{hospitalObj.lov_name}}</span></a>
        </li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <div data-ng-view>
    <!-- Content Header (Page header) -->
    <!-- Main content -->
    <!-- /.content -->
  </div>
</div>
  <!-- /.content-wrapper -->

  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> 0.1
    </div>
    <strong>Copyright &copy; 2016 <a href="http://192.168.0.10/">ระบบบริหารงานข้อมูลสารสนเทศภายในโรงพยาบาล</a>.</strong> All rights
    reserved.
  </footer>

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Create the tabs -->
    <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
      <li><a href="#control-sidebar-home-tab"  data-toggle="tab"><i class="fa fa-home"></i></a></li>
      <li><a href="#control-sidebar-settings-tab"  data-toggle="tab"><i class="fa fa-gears"></i></a></li>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
      <!-- Home tab content -->
      <div class="tab-pane" id="control-sidebar-home-tab" data-ng-show="tab == 1">
        <h3 class="control-sidebar-heading">Recent Activity</h3>
        <ul class="control-sidebar-menu">
          <li>
            <a href="javascript:void(0)">
              <i class="menu-icon fa fa-birthday-cake bg-red"></i>

              <div class="menu-info">
                <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>

                <p>Will be 23 on April 24th</p>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i class="menu-icon fa fa-user bg-yellow"></i>

              <div class="menu-info">
                <h4 class="control-sidebar-subheading">Frodo Updated His Profile</h4>

                <p>New phone +1(800)555-1234</p>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i class="menu-icon fa fa-envelope-o bg-light-blue"></i>

              <div class="menu-info">
                <h4 class="control-sidebar-subheading">Nora Joined Mailing List</h4>

                <p>nora@example.com</p>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <i class="menu-icon fa fa-file-code-o bg-green"></i>

              <div class="menu-info">
                <h4 class="control-sidebar-subheading">Cron Job 254 Executed</h4>

                <p>Execution time 5 seconds</p>
              </div>
            </a>
          </li>
        </ul>
        <!-- /.control-sidebar-menu -->

        <h3 class="control-sidebar-heading">Tasks Progress</h3>
        <ul class="control-sidebar-menu">
          <li>
            <a href="javascript:void(0)">
              <h4 class="control-sidebar-subheading">
                Custom Template Design
                <span class="label label-danger pull-right">70%</span>
              </h4>

              <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <h4 class="control-sidebar-subheading">
                Update Resume
                <span class="label label-success pull-right">95%</span>
              </h4>

              <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-success" style="width: 95%"></div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <h4 class="control-sidebar-subheading">
                Laravel Integration
                <span class="label label-warning pull-right">50%</span>
              </h4>

              <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-warning" style="width: 50%"></div>
              </div>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <h4 class="control-sidebar-subheading">
                Back End Framework
                <span class="label label-primary pull-right">68%</span>
              </h4>

              <div class="progress progress-xxs">
                <div class="progress-bar progress-bar-primary" style="width: 68%"></div>
              </div>
            </a>
          </li>
        </ul>
        <!-- /.control-sidebar-menu -->

      </div>
      <!-- /.tab-pane -->
      <!-- Stats tab content -->
      <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
      <!-- /.tab-pane -->
      <!-- Settings tab content -->
      <div class="tab-pane" id="control-sidebar-settings-tab">
        <form method="post">
          <h3 class="control-sidebar-heading">General Settings</h3>

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Report panel usage
              <input type="checkbox" class="pull-right" checked>
            </label>

            <p>
              Some information about this general settings option
            </p>
          </div>
          <!-- /.form-group -->

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Allow mail redirect
              <input type="checkbox" class="pull-right" checked>
            </label>

            <p>
              Other sets of options are available
            </p>
          </div>
          <!-- /.form-group -->

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Expose author name in posts
              <input type="checkbox" class="pull-right" checked>
            </label>

            <p>
              Allow the user to show his name in blog posts
            </p>
          </div>
          <!-- /.form-group -->

          <h3 class="control-sidebar-heading">Chat Settings</h3>

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Show me as online
              <input type="checkbox" class="pull-right" checked>
            </label>
          </div>
          <!-- /.form-group -->

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Turn off notifications
              <input type="checkbox" class="pull-right">
            </label>
          </div>
          <!-- /.form-group -->

          <div class="form-group">
            <label class="control-sidebar-subheading">
              Delete chat history
              <a href="javascript:void(0)" class="text-red pull-right"><i class="fa fa-trash-o"></i></a>
            </label>
          </div>
          <!-- /.form-group -->
        </form>
      </div>
      <!-- /.tab-pane -->
    </div>
  </aside>
  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>

<!-- ./wrapper -->

<!-- jQuery 2.2.3 -->
<script type="text/javascript">
		window.jQuery || document.write("<script src='lib/jquery/jquery-2.0.3.min.js'>"+"<"+"/script>");
	</script><!-- jQuery UI 1.11.4 -->

  <script type="text/javascript">
  if("ontouchend" in document) document.write("<script src='lib/jquery/jquery.mobile.custom.min.js'>"+"<"+"/script>");
</script>





<!-- ANGULAR SCRIPTS -->
<script src="lib/angular/angular.js"></script>
<script src="lib/angular/angular-route.js"></script>
<script src="lib/angular/angular-animate.js"></script>

<!-- ANGULAR UI SCRIPTS -->
<script src="lib/angular-ui/ui-utils/ui-utils.js"></script>
<script src="lib/angular-ui/ui-select2/select2.js"></script>
<script src="lib/angular-ui/ui-bootstrap/ui-bootstrap-0.8.0.js"></script>
<script src="lib/angular-ui/angular-ui.min.js"></script>

<script src="lib/angular-ui/ui-tree/angular-ui-tree.min.js" charset="utf-8"></script>

<!-- <script src="lib/angular-translate/angular-translate-storage-cookie.js"></script> -->

<!-- ANGULAR TRANSLATE -->
<script src="lib/angular-translate/angular-translate.js"></script>
<script src="lib/angular-translate/angular-translate-storage-cookie.js"></script>
<script src="lib/angular-translate/angular-translate-storage-local.js"></script>

<script src="lib/bootstrap-switch/angular-bootstrap-toggle.min.js"></script>

	<!-- CONTRALLER SCRIPTS -->
  <!-- JQUERY GRITTER SCRIPTS -->
	<script src="lib/gritter/jquery.gritter.min.js"></script>



<!-- Bootstrap 3.3.6 -->
<script src="bootstrap/js/bootstrap.min.js"></script>
<!-- Morris.js charts -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script> -->
<script src="plugins/morris/morris.min.js"></script>
<!-- Sparkline -->
<script src="plugins/sparkline/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<script src="plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<!-- jQuery Knob Chart -->
<script src="plugins/knob/jquery.knob.js"></script>
<!-- daterangepicker -->
<script src="lib/moment/moment.min.js"></script>

  <!-- SWITCH LANGUAGE SCRIPTS -->

  <script src="lib/jquery/jquery-ui-1.10.4.custom.min.js"></script>
	<script src="lib/jquery/jquery.ui.touch-punch.min.js"></script>
  <script src="lib/jquery/jquery.qtip.js"></script>

	<!-- DATATABLE SCRIPTS -->
	<script src="lib/datatable/jquery.dataTables.min.js"></script>
	<script src="lib/datatable/DT_bootstrap.js"></script>

	<!-- SCROLL SCRIPTS -->
	<script src="lib/scroll/jquery.slimscroll.js"></script>

	<!-- TEXTAREA AUTO SIZE SCRIPTS -->
	<script src="lib/textarea/jquery.textareaAutoResize.js"></script>



	<!-- SWITCH LANGUAGE SCRIPTS -->
	<script src="lib/jquery-lang/jquery-lang.js"></script>
	<script src="lib/jquery-lang/langpack/Lc.js"></script>

	<!-- BOOTSTRAP SCRIPTS -->
  <script src="plugins/datepicker/bootstrap-datepicker.js"></script>
	<!-- <script src="lib/bootstrap/bootstrap-datepicker.js"></script> -->
	<script src="lib/bootstrap/bootstrap-fileupload.js"></script>
	<script src="lib/bootstrap/bootstrap-paginator.js"></script>

	<!-- BOOTSTRAP-SWITCH -->
	<script src="lib/bootstrap-switch/js/bootstrap-switch.min.js"></script>

  <script src="lib/checklist-model/checklist-model.js"></script>

	<!-- SELECT2 SCRIPTS -->
	<script src="lib/select2/select2.js"></script>

	<!-- MULTISELECT SCRIPTS -->
	<script src="lib/multiselect/jquery.multi-select.js"></script>
	<script src="lib/multiselect/jquery.quicksearch.js"></script>

	<!-- ADMINLTE APP -->
	<!-- <script src="lib/admin-lte/admin-lte.js"></script> -->

	<!-- MOMENT SCRIPTS -->
	<script src="lib/moment/moment.min.js"></script>
	<script src="lib/moment/livestamp.min.js"></script>

	<!-- UNDERSCORE SCRIPTS -->
	<script src="lib/underscore/underscore-min.js"></script>
	<script src="lib/underscore/underscore-mixin.js"></script>

	<!-- DYNATREE SCRIPTS -->
	<script src="lib/dynatree/jquery.dynatree.js"></script>



	<!-- SECURITY SCRIPTS -->
	<script src="js/common/security/authorization.js"></script>
	<script src="js/common/security/interceptor.js"></script>
	<script src="js/common/security/security.js"></script>

	<!-- SERVICES SCRIPTS -->
	<script src="js/common/services/httpRequestTracker.js"></script>

	<!-- FULL CALENDAR -->
	<!-- <script src="plugins/fullcalendar/fullcalendar.min.js"></script> -->


  <script src="lib/fullcalendar/dist/fullcalendar.js"></script>
  <script src="lib/fullcalendar/dist/gcal.js"></script>

  <script src="lib/fullcalendar/src/calendar.js"></script>
	<!-- CONFIG SCRIPT -->
	<script src="config/constants.js"></script>

	<!-- I-CHECK SCRIPT -->
	<script src="lib/icheck/icheck.js"></script>

	<!-- BOOTSTRAP-DATETIMEPICKER -->
	<script src="lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>

  <script src="lib/multiselect/multiselect.js"></script>

	<!-- CONTRALLER SCRIPTS -->
	      <script src="js/app.js"></script>
       	<script src="js/filters.js"></script>
       	<script src="js/directives.js"></script>
       	<script src="js/dialog.js"></script>
       	<script src="js/myFunction.js"></script>
        <script src="js/jet.js"></script>
        <script src="js/work.js"></script>
        <script src="js/backup.js"></script>
       	<script src="js/functions.js"></script>


<script src="plugins/daterangepicker/daterangepicker.js"></script>
<!-- datepicker -->
<script src="plugins/datepicker/bootstrap-datepicker.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<script src="plugins/slimScroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="plugins/fastclick/fastclick.js"></script>

<script src="plugins/iCheck/icheck.min.js"></script>

<!-- AdminLTE App -->
<script src="dist/js/app.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<!-- AdminLTE for demo purposes -->
<script src="dist/js/demo.js"></script>
<script src="js/controllers/profile.js"></script>
<script src="js/controllers/home-dashboard.js"></script>
<script src="js/controllers/schedule.js"></script>
<script src="js/controllers/schedule.draf.js" charset="utf-8"></script>
<script src="js/controllers/schedule.draf.swop.js" charset="utf-8"></script>



<script src="js/controllers/position.js"></script>
<script src="js/controllers/group.js"></script>'
<script src="js/controllers/user.js" charset="utf-8"></script>



<script src="js/controllers/ward.js"></script>
<script src="js/controllers/option.js"></script>
<script src="js/controllers/holiday.js"></script>
<script src="js/controllers/redeem.js"></script>
<script src="js/controllers/draf.js"></script>
<script src="js/controllers/leave.js"></script>



<!-- POPUP -->
<script src="js/controllers/popup/asign-position.js"></script>
<script src="js/controllers/popup/create-schedule.js"></script>
<script src="js/controllers/popup/draf-work.js"></script>
<script src="js/controllers/popup/add-user.js"></script>
<script src="js/controllers/popup/seq.js"></script>
<script src="js/controllers/popup/set-hour.js"></script>
<script src="js/controllers/popup/set-hospital.js"></script>
<script src="js/controllers/popup/approve.js"></script>
<script src="js/controllers/popup/swop.js"></script>
<script src="js/controllers/popup/change-work.js"></script>


<script>

</script>

<!-- ###################################  [START] LOADING INDICATOR ################################### -->
<!-- <div id="loading" data-ng-show="httpRequestTracker.hasPendingRequests()">
  <div class="modal-backdrop fade in" style="z-index: 5000;"></div>
  <div style="position: absolute; left:45%; top: 275px; z-index: 10000;">
    <img src="img/ajax-loader.gif">
  </div>
</div> -->
<!-- ###################################  [ END ] LOADING INDICATOR ################################### -->
</body>
</html>

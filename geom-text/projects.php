<! DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exploring Geometry - Projects </title>
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet'  type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'  type='text/css'>
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="siteJS.js"> </script>
  </head>
  <body>
    <div id="wrapper">
		<nav>
			<?php
				include('menus.php');
			?>
		</nav>
		<div id = "software-projects-main">
				<header class = "software-projects-header">
					Resources for Project in Exploring Geometry
				</header>
				<div id = "errata-list-div">
				  <p>
					
				  </p>
				</div>
				<div  id = "software-projects-menu-div">
				  <ul>
					<li class="software-projects-menu-item" style="text-align:center">
					  <a href = "./tutorials/geogebra"> 
						Help on Using GeoGebra for Projects
					  </a></li>
					<li class="software-projects-menu-item" style="text-align:center">
					  <a href = "./tutorials/sketchpad"> 
						Help on Using Geometer's Sketchpad for Projects
					  </a></li>
					<li class="software-projects-menu-item" style="text-align:center">
					  <a href = "./tutorials/cinderella"> 
						Help on Using Cinderella for Projects
					  </a></li>
					<li class="software-projects-menu-item" style="text-align:center">
					  <a href = "./tutorials/gex"> 
						Help on Using Geometry Explorer for Projects
					  </a></li>
					<li class="software-projects-menu-item" style="text-align:center"><a href = "./ifs.php"  > 
						IFS Ferns
					  </a></li>
				   </ul>
				</div>
		</div>
		<?php
				include('footer.php');
		?>
	</div>
  </body>
</html>
<! DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exploring Geometry - Geometry Software Help</title>
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
		<div id = "software-main">
				<header class = "software-header">
					Geometry Software Tutorials
				</header>
				<div class = "software-info">
				  <p class = "software-info">
					The recommended software to use with the text is 
					<a href="http://www.gac.edu/~hvidsten/gex"> Geometry Explorer</a>. 
					Other software can be used as well. Info on
					three other popular geometry software applications is below. 
				  </p>
				</div>
				<div  id = "software-menu-div">
				  <ul>				    
					<li class="software-menu-item">
					    <a class = "gex-image" href = "./tutorials/gex/index.php">
						<img class = "gex-image" src="images/gex.png" alt = "Geometry Explorer">
					</a></li>
					<li class="software-menu-item"><a href = "./tutorials/geogebra/index.php"> 
						<img class = "geo-image" src="images/geogebra.png" alt = "Geogebra">
					</a></li>
					<li class="software-menu-item"> <a href = "./tutorials/sketchpad">
						<img class = "sketch-image" src="images/sketchpad2.png" alt = "Geometer's Sketchpad">
					</a></li>
					<li class="software-menu-item">
					    <a class = "cindy-image" href = "./tutorials/cinderella/index.php"> Cinderella
						<img class = "cindy-image" src="images/cinderella.png" alt = "Cinderella">
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
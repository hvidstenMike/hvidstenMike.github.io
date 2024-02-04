<! DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exploring Geometry - Cinderella</title>
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet'  type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'  type='text/css'>
	<link rel="stylesheet" type="text/css" href="../../style.css">
	<script src="../../siteJS.js"> </script>
  </head>
  <body>
    <div id="wrapper">
		<nav>
			<?php
				include('menus-two-level-down.php');
			?>
		</nav>
		<div id = "software-tutorial-main">
				<header class = "software-projects-header">
					The Cinderella Application
				</header>
				
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p><span id = "launch" class = "tutorial-p-head">Getting Cinderella </span><br>
						 Cinderella is a dynamic geometry software package for exploring geometry.
						  Cinderella can be freely downloaded from the web. 
						  To access the program 
						   you can go to the <a href="http://cinderella.de/tiki-index.php?page=Download+Cinderella.2&bl">
							Cinderella download site </a> using any standard browser and follow the instructions. 
							The version of Sketchpad you should use is Cinderella 2.0 or higher. 
						   </p>
						</div>
						<div class="tutorial-right">
							<img src="./images/download.png" alt="Cinderella Site" />
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Once you have installed the program, you can locate and run the application. 
						Once the
						program has started up you should see a screen like the one shown here.
							Information on using Cinderella to create geometric constructions is on 
							<a href="index.php"> this page </a>.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/cindy.png" alt = "Cinderella">
						</div>
					</div>
					
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							If you want more general info
							on using Cinderella, consult the Cinderella 
							<a href="http://doc.cinderella.de/tiki-index.php">
								 Documentation Site</a>.
						</p>
					</div>
				</div>
		</div>
		<?php
				include('../../footer.php');
		?>
	</div>
  </body>
</html>
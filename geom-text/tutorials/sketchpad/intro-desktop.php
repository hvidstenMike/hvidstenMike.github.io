<! DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exploring Geometry - Geometer's Sketchpad</title>
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
					The Geometer's Sketchpad Application
				</header>
				
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p><span id = "launch" class = "tutorial-p-head">Getting Geometer's Sketchpad </span><br>
						Geometer's Sketchpad is a dynamic geometry software package for exploring geometry.
						  Sketchpad is a commercial product, but there are also free trial versions on the web. 
						  To access the program 
						   you can go to the <a href="http://www.keycurriculum.com/products/sketchpad.html">
							Sketchpad Site </a> using any standard browser and follow the instructions. 
							The version of Sketchpad you should use is Sketchpad 5.0 or higher. 
						   </p>
						</div>
						<div class="tutorial-right">
							<img src="./images/download.png" alt="Sketchpad Site" />
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Once you have installed the program, you can locate and run the application. 
						Once the
						program has started up you should see a screen like the one shown here.
							Information on using Sketchpad to create geometric constructions is on 
							<a href="index.php"> this page </a>.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/sketchpad.png" alt = "Sketchpad">
						</div>
					</div>
					
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							If you want more general info
							on using Geometer's Sketchpad, there are numerous on-line tutorials. 
							A nice brief intro is at <a href="http://0-www.learner.org.librus.hccs.edu/courses/learningmath/geometry/session4/part_a/tutorial.html">
							this site </a>.
							The Geometer's Sketchpad web site has resources at 
							<a href="http://www.keycurriculum.com/node/637.html">
								this page </a>.
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
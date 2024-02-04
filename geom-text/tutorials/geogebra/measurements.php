<! DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exploring Geometry - Geogebra</title>
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
					Measurement in Geogebra
				</header>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						The tools used for measuring properties such as distance, length, and angles
							are located under the Measurement button. This is the one that, by default,
							has an Angle icon on top. If we click on this button, a menu will drop
							down with all of the possible measurement tools. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-intro10.png" alt = "GeoGebra Buttons">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						For example, here we have created points A, B, and C on the screen. We can now click on the Angle
						button and then click on A, B, and C (in that order). A numeric value for the
						angle defined by these three points will appear in the Algebra View and a green
						sector arc will appear in the Geometry View illustrating the angle. Note that measurements
						are like constructions in that a measurement depends on existing objects.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-intro11.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							If you want more general info
							on using measurements in GeoGebra, there are numerous on-line tutorials. 
							A nice brief intro is at <a href="http://www.ms.uky.edu/~droyster/courses/fall10/MA341/Geogebra/Introduction%20to%20GeoGebra.pdf">
							www.ms.uky.edu </a>.
							The GeoGebra web site is the definitive reference. 
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
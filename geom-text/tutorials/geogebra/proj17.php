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
					Geogebra Tutorial on Project 17 -  IFS Ferns
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 17 explores the concept of Iterated Function Systems.
							Read through and do the activities on pages 472-476. 
							Follow the instructions on page 477 to download
							the GeoGebra file you will need to carry out the iterations of the Iterated 
							Function System defined in the project. Open this file using GeoGebra.
							You will see an initial point A (in blue here) and four green points.
							These are the result of carrying out one iteration of applying all four
							transformations (T<sub>1</sub>,T<sub>2</sub>, T<sub>3</sub>,T<sub>4</sub>)
							to A. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj17-1.png" alt = "Project 17">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  We will now iterate this set of functions on each of the four green points.
							In the text, we say to click the 'Iterate' button. Instead, we will move the 
							slider over until it reads 2 (for our second iteration). All four transformations 
							will be applied to the four points, yielding 16 new points. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj17-2.png" alt = "Project 17">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Move the slider to 3 to carry out the iterated system 3 times.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj17-3.png" alt = "Project 17">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 Move the slider all the way to 5 to carry out the iterated system 5 times.
							We begin to see the fern come to life. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj17-4.png" alt = "Project 17">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p>
							The remaining exercises in Project 17 should now be doable.
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
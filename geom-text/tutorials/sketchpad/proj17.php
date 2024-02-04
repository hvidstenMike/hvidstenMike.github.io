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
					Tutorial on Project 17 -  IFS Ferns
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 17 explores the concept of Iterated Function Systems.
							Read through and do the activities on pages 472-476. 
							Follow the instructions on page 477 to download
							the Sketchpad file you will need to carry out the iterations of the Iterated 
							Function System defined in the project. Open this file using Sketchpad.
							You will see an initial point A (in blue here) and four green points.
							These are the result of carrying out one iteration of applying all four
							transformations (T<sub>1</sub>,T<sub>2</sub>, T<sub>3</sub>,T<sub>4</sub>)
							to A. Additionally, there are 16 small green points - these are 
							result of carrying out the iteration a second time.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj17-1.png" alt = "Project 17">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  We will now iterate our set of functions on each of the 16 green points.
							In the text, we say to click the 'Iterate' button. Instead, we can increase
								the iteration level by box selecting (draw a selection box) around
								all of the points and then typing '+.' All four transformations 
							will be applied to the 16 points, yielding 64 new points. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj17-2.png" alt = "Project 17">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Select all of the points and type '+' once more to get 256 points.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj17-3.png" alt = "Project 17">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 Carry out this iteration one more time. 
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
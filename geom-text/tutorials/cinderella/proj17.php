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
					Geogebra Tutorial on Project 17 -  IFS Ferns
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 17 explores the concept of Iterated Function Systems.
							Read through and do the activities on pages 472-476. 
							Follow the instructions on page 477 to download
							the Cinderella file you will need to carry out the iterations of the Iterated 
							Function System defined in the project. Open this file using Cinderella.
							You will see an initial point A (in blue here) and four green points.
							These are the result of carrying out one iteration of applying all four
							transformations (T<sub>1</sub>,T<sub>2</sub>, T<sub>3</sub>,T<sub>4</sub>)
							to A. These four transformations are represented by the four 
							transformation buttons on the right side of the screen. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj17-1.png" alt = "Project 17">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  We will now iterate this set of functions on each of the four green points.
							In the text, we say to click the 'Iterate' button. Instead, we will directly create
								an iterated function system (IFS) for the system. 
								Click on the Move/Select button to make it active and then 
								select all four transformation buttons (hold the shift key down
								while selecting). Then,
							under the <b>Modes</b> menu choose <b>Special</b> 
							and then <b>Special/IFS</b>. The replacement process for the IFS 
							is repeatedly applied to the 
							original set of points. The fern 'comes to life' before our eyes. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj17-2.png" alt = "Project 17">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  If we drag the original point A around the screen, we see that the fern 
						shape does not change. We say that this shape is an 'attractor' for this system.
							The iterates always converge to this shape no matter what the starting position
							is for point A.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj17-3.png" alt = "Project 17">
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
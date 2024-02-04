<! DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exploring Geometry - Geometry Explorer</title>
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
							the Geometry Explorer file you will need to carry out the iterations of the Iterated 
							Function System defined in the project. Open this file using Geometry Explorer.
							You will see an initial point A. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj17-1.png" alt = "Project 17">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  The four affine functions defined in the text are already
						defined in this file. 
						We will now iterate our set of functions on the point A. Select
							the point A and choose <b>Iterated...</b> from the <b>Custom</b>
								menu in the Transform panel. In the dialog box that pops up,
								choose the IFS transformation in the list and type in '4' for
								the Iteration Number. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj17-2.png" alt = "Project 17">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  The iteration level is the number of times the IFS system is applied 
							<em> recursively</em> to the point A. The first time it is applied, 
							four new points are created from applying each of the four 
							transformations to A. The second time it is applied, each of the four 
							transformations is applied to each of the four new points, yielding 16 points.
							The third time through, 64 points are created, and the fourth time 256 
						points are created. We can see that this recursive process grows in size very fast.
							All of the labels are a nuisance. Hide them by choosing <b>Hide All Labels</b>
							from the <b>View</b> menu. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj17-3.png" alt = "Project 17">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 The shape that appears is <em>something</em> like the fern. 
						 One problem is that the points are too large. Choose <b>Preferences...</b>
						 from the <b>Edit</b> menu and reduce the point size to 2 pixels.
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
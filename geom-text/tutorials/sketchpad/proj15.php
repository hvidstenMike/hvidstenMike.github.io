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
					Tutorial on Project 15 -  Ratios and Harmonics
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 15 explores ratios in affine and projective geometry. 
						 For this project, we will need a special file for defining affine
						 transformations. This is the file <a href="./Affine.gsp"> Affine.gsp</a>.
						 Download this file and open it using Sketchpad. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-0.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> To start the project we construct a line AB and attach a point C. 
						 Then, we measure the distance from A to C and the distance from A to B.
						 We compute the ratio of these distances by using the Calculator. The
						 Calculator can be launched by choosing <b>Calculate..</b> under the <b>Number</b>
						 menu. 
						 (If you need help with these steps, review the Sketchpad Tools topics.)
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-1.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Next, we define an affine transformation by using the parameter boxes at
						the top of the window. We use the values from matrix A on page 408.
						We type in a = 1, b = -1, c = 1.5, d = 0.5, e = 1, and f = 1. 
							  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-2.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  The affine transformation for this matrix is already stored 
						   as a Custom Transformation. If you click on the <b>Transform</b> menu you will find 
						   a new transformation called <b>Affine</b> at the bottom of the list. 
							We can transform our points and line by selecting A, B, C, and the line 
								and then choosing <b>Affine</b> from the <b>Transform</b> menu. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-3.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  The transformed points may be out of view. If so, we can re-size
								the window by using the Dilate Tool 
								<img src="./images/dilateTool.jpg"  style="width:30px" alt ="Dilate Tool">.
								This is found under the Select button (the one with the black arrow cursor).
								Make this tool active and then select the two lines. While still clicked on a
								line, drag the mouse to shrink the lines until all points are visible. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-4.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 Then, measure the distance from D to F and from D to E, and calculate the ratio
						 of these distances as we did above. The ratios match.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-5.png" alt = "Project 15">
						</div>
					</div>
					
					<div class = "tutorial-end-comments">
						<p>
							The remaining constructions and exercises in Project 15 should now be doable.
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
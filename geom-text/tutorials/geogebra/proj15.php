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
					Geogebra Tutorial on Project 15 -  Ratios and Harmonics
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 15 explores ratios in affine and projective geometry. 
						 To start the project we construct a line AB and attach a point C. 
						 Then, we measure the distance from A to C and the distance from A to B.
						 (If you need help with these steps, review the GeoGebra Tools topics.)
						 We compute the ratio of these distances by typing in 'AC/AB'
						 in the Input field at the bottom of the window and hit Return. A numerical 
						 value for this ratio (here labeled 'a') will be created in the Algebra View. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-1.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Next, we define an affine transformation by defining a 3x3 matrix. 
							We can do this by defining the matrix as a list of three vectors. 
							In the Input field, type 'M={{1,-1,1},{1.5,0.5,1},{0,0,1}}' and hit return.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-2.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  The matrix will appear in the Algebra View in the List section.
							We can transform our points and line by this transformation by 
							using the ApplyMatrix command. To transform point A, type
							'ApplyMatrix[M, A]' in the Input field and hit return.
							The transformed point might be out of view, so you may have to
							zoom out (under the <img src="./images/move-icon.png" style="width:30px" alt="Move Icon">
							icon) to see it. Likewise, transform points B, C, and line f.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-3.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 Then, measure the distance from A' to B', from A' to C', and calculate the ratio
						 of these distances as we did above. The ratios match.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-4.png" alt = "Project 15">
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
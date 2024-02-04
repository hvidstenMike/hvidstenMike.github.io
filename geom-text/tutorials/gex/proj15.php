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
					Tutorial on Project 15 -  Ratios and Harmonics
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 15 explores ratios in affine and projective geometry. 
						  To start the project we construct a line AB and attach a point C. 
						 Then, we measure the distance from A to C and the distance from A to B.
						 We compute the ratio of these distances by using the Calculator. The
						 Calculator can be launched by choosing <b>Calculator...</b> from the <b>View</b>
						 menu. 
						 (If you need help with these steps, review the Geometry Explorer Tools topics.)
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-1.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Next, we define an affine transformation. 
						Choose <b>Affine...</b>  from the <b>Custom</b> menu in the Transform panel.
						In the dialog box that pops up we can input the parameters for our affine transformation.
						We will use the values from matrix A on page 408.
						We type in a = 1, b = -1, c = 1.5, d = 0.5, e = 1, and f = 1. 
							  Name this transformation 'Affy' and hit 'Okay.'
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-2.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  If you click on the <b>Custom</b> menu in the Transform panel you will find 
						   a new transformation called <b>Affy</b> at the bottom of the list.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-3.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  We can transform our points and line by selecting A, B, C, and the line 
								and then choosing <b>Affy</b> from the <b>Custom</b> menu. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-3-b.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  The transformed points may be out of view. If so, we can shrink
								the window by hitting the Period key '.'. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-4.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 Measure the distance from D to E and from D to F, and calculate the ratio
						 of DF to DE. The ratios match.  
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
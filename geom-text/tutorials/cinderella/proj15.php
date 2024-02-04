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
					Tutorial on Project 15 -  Ratios and Harmonics
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 15 explores ratios in affine and projective geometry. 
						 To start the project we construct a line AB and attach a point C. 
						 Then, we measure the distance from A to C and the distance from A to B.
						 We compute the ratio of these distances by using the Distance tool in the Toolbar. 
						 (If you need help with these steps, review the Cinderella Tools topics.)
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-1.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Next, we define an affine transformation by using the
						'Transformation by Function' tool.
							  Under the <b>Modes</b> menu choose <b>Transformation</b> 
							and then <b>Add Function</b>. Click in the working part of the
							window (middle part). A dialog box will pop up. To define the 
							affine transformation from page 408, 
							type in '<em>(#_1-#_2, 1.5*#_1 +0.5*#_2)</em>' and click 'OK.'
							(The parameters #_1 and #_2 represent the x and y coordinates of a point.)
							A button representing this transformation will appear in the upper right
							corner of the geometry window. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-2.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  In Cinderella, a function transformation can only be applied to points.
						Select A, B, and C, and then click the transform button.
						<img src="./images/functionTransform.png" style="width:30px" alt="Function Transform Button">
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-3.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  The transformed points may be out of view. If so, we can re-size
								the window so that all points are shown. Click on the 'Zoom to Points' button
								<img src="./images/zoomAllPoints.png"  style="width:30px" alt ="Zoom to Points Tool">.
								This is found at the bottom of the Cinderella window.  Click on
								this button to make all points visible. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj15-4.png" alt = "Project 15">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Re-label the new points to D, E, and F. 
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
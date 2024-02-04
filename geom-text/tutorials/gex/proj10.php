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
				   Tutorial on Project 10 -  Saccheri Quadrilateral
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 10 involves using geometry software to investigate 
						Hyperbolic Geometry. This is done using the Poincare circle model. 
						To enable this capability in Geometry Explorer, go to the <b>File</b> menu
						and select <b>New</b>. A window will open up with a variety of possible geometries.
						Choose 'Hyperbolic' and click 'Okay.'
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-1.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  We start by creating a segment AB. Next, we create 
							the perpendicular to AB at B and the perpendicular to AB at A. 
							(Use the Perpendicular tool in the Construct panel.)
							Attach a point C to the perpendicular at B.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj10-2.png" alt = "Project 10">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Hide the perpendicular at B and create segment BC. Select A and segment BC.
						Then, click the Circle Construct button
						<img src="./images/circle-construct.png"  style="width:30px" alt ="Circle Construct Tool">
						in the Construct panel to create a circle at A of radius equal to BC. Select the 
						perpendicular at A and the circle and click the Intersect button to find the intersection point D.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj10-3.png" alt = "Project 10">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Next, hide all perpendiculars, lines, and circles and connect the points
						(with <em> Hyperbolic</em> segments) to create the Saccheri  
						quadrilateral ADCB.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj10-4.png" alt = "Project 10">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> As part of the project, we are to measure the summit angles. To do this,
						select points 
							A, D, and C (in that order) and choose <b>Angle</b> from the <b>Measure</b> menu. 
							Likewise, select D, C, and B to get the measure of the angle at C.  As mentioned in the text, these
						angles appear to match.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj10-5.png" alt = "Project 10">
						</div>
					</div>
					
					<div class = "tutorial-end-comments">
						<p>
							The remaining constructions and exercises in Project 10 should now be doable.
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
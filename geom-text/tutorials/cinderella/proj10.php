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
				   Tutorial on Project 10 -  Saccheri Quadrilateral
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 10 involves using geometry software to investigate 
						Hyperbolic Geometry. This is done using the Poincare circle model. 
						To open a hyperbolic window in Cinderella, go to the <b>Views</b> menu
						and select <b> Hyperbolic View</b>. A window will open up with the Poincare model
						of Hyperbolic Geometry. Also, to insure that all measurements are <em>hyperbolic</em>
						measurements, click the 'Hyp' measurement button at 
						the bottom of the window. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-1.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  We start by creating a hyperbolic segment AB. Next, we create 
							the perpendicular to AB at B.
								(Click on the Perpendicular button 
						<img src="./images/perpIcon.png" style="width:30px" alt="Perpendicular Button">
						and then click and drag on segment AB until
						the perpendicular is set at B.)
						Attach a point C to this perpendicular.
							Now, we will use the Compass tool to copy the distance from B to C
								over to A (like a compass) to construct a circle at A of radius 
								equal to the distance from B to C. 
								Under the <b>Modes</b> menu choose <b>Circle</b> 
							and then <b>Compass</b>. Then, click on B and C and then click 
							A to create the circle. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj10-2.png" alt = "Project 10">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Now, construct the hyperbolic perpendicular to AB at A. 
						Construct the 
							intersection D of the circle with the perpendicular.
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
						(with segments) to create the Saccheri  
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
						click on the Angle button in the Toolbar. Then, select segments  AD and DC
						to measure angle ADC. Likewise, click on 
							segments CD and BC to get the measure of the angle at C.  As mentioned in the text, these
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
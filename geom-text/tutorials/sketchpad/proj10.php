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
				   Tutorial on Project 10 -  Saccheri Quadrilateral
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 10 involves using geometry software to investigate 
						Hyperbolic Geometry. This is done using the Poincare circle model. 
						We use a special file to study Hyperbolic geometry.  
						This is the file <a href="PoincareDisk.gsp"> PoincareDisk.gsp </a>.
						Click this link and download the file to your computer. Then, open it using Sketchpad. 
						You will see a screen with a large circle. This is the 'universe' for hyperbolic geometry. 
						Lines, segments, and circles have different definitions in this geometry,
						so we must have custom tools for constructing these objects. 
						The custom tools are located under the Custom Tool button at the bottom of the Toolbar. 
						Here we see the variety of special tools we will need. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-1.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  We start by creating a hyperbolic segment. Choose 'Hyperbolic Segment' from the
							Custom Tool button in the Toolbar. 
							Then, click and drag to create hyperbolic segment AB. Next, we create 
							the perpendicular to AB at B. Choose 'Hyperbolic Perpendicular' from the
							Custom Tools and then click point B, point A, and then point B again
							to create the
							perpendicular at B. Attach a point C to this perpendicular.
							Next, choose 'Hyperbolic Circle by CP' from the Custom Tools and select  
							point B and point C. The hyperbolic circle centered at B with radius to C 
							will be constructed.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj10-2.png" alt = "Project 10">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Now, construct the hyperbolic perpendicular to AB at A. 
						Then, choose 'Hyperbolic Circle by CR' from the Custom Tools menus.
						This defines a circle by a center point and two other points whose distance 
						serves as a radius. Select point A, then B and C to create the desired circle. 
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
						choose 'Hyperbolic Angle Measure' from the Custom Tools and then select points 
							A, D, and C (in that order). Likewise, click on 
							D, C, and B to get the measure of the angle at C.  As mentioned in the text, these
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
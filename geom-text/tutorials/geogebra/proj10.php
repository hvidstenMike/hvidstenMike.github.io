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
					Geogebra Tutorial on Project 10 -  Saccheri Quadrilateral
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 10 involves using geometry software to investigate 
						Hyperbolic Geometry. This is done using the Poincare circle model. 
						We use a special file to study Hyperbolic geometry.  
						This is the file <a href="PoincareModel.ggb"> PoincareModel.ggb </a>.
						Click this link and download the file to your computer. Then, open it using GeoGebra. 
						You will see a screen with a large circle and a Tool Bar having three new Buttons
						with wrench icons. These are custom tools built for the hyperbolic geometry model. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj10-1.png" alt = "Project 10">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  We start by creating a hyperbolic segment. Choose 'Hyperbolic Segment' under the
							first wrench menu. Then click twice to create the segment. Next, we create 
							the perpendicular to AB at B. Choose 'Hyperbolic Perpendicular at Point' under
							the second wrench menu and then click point B and then point A to create the
							perpendicular. Next, choose 'Hyperbolic Circle w Given Radius' and click 
							point B. A dialog box will pop up with a desired radius. A small number will work best - 
							we suggest a value of 1 or less. The hyperbolic circle of that radius will be constructed.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj10-2.png" alt = "Project 10">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Carry out a similar construction to construct a circle with center at A
							(and same radius as the first circle) and a perpendicular at A. Construct the 
							intersections (C and D) of the two circles with the two perpendiculars.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj10-3.png" alt = "Project 10">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Next, hide the perpendiculars and the circles and connect the points
						(with <em> Hyperbolic</em> segments) to create the Saccheri  
						quadrilateral ADCB.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj10-4.png" alt = "Project 10">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> As part of the project, we are to measure the summit angles. To do this,
						choose 'Hyperbolic Angle' under the first wrench button and then select points 
							C, D, and A (in that order). A numeric value will appear in the Algebra
							View (here labeled 'a') representing this angle. Likewise, click on 
							B, C, and D to get the measure of the angle at C.  As mentioned in the text, these
						angles appear to match.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj10-5.png" alt = "Project 10">
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
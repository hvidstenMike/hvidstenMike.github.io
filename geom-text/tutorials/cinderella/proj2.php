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
					Tutorial on Project 2
				</header>
				
				<div class = "tutorial-select-anchors" >
				<label class = "tutorial-label"> Page Topics: &nbsp;</label> 
					<select  name="page-links" onchange="location = this.value;">
					<option value="#poincare">Poincare Model</option>
					<option value="#segments">Hyperbolic Segments</option>
					<option value="#length">Hyperbolic Length</option>
					<option value="#circles">Hyperbolic Circles</option>
					<option value="#angles">Hyperbolic Angles</option>
					</select>
				</div>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "poincare" class = "tutorial-p-head">
						Poincare Model of Hyperbolic Geometry </span><br>
						The second project in Chapter 1 involves using geometry software to construct the 
						non-Euclidean geometry called 'Hyperbolic Geometry.' 
						To begin, start up Cinderella. The program has the capability to explore 
						hyperbolic geometry. To enable this capability, go to the <b>Views</b> menu
						and select <b> Hyperbolic View</b>. A window will open up with the Poincare model
						of Hyperbolic Geometry. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-1.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  All of the tools in the Toolbar can still be used, 
						but now they are interpreted to create/construct 
						<em>hyperbolic</em> objects. As an example, click on the Segment tool in the
						Toolbar and then click and drag
						 to create a hyperbolic segment. Note that this 
						segment does not look like a 'normal' Euclidean segment. That is because it is not Euclidean! 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-2.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  <span id = "segments" class = "tutorial-p-head"> Hyperbolic Segments</span><br>
						On page 45 of the text we discuss what happens to B as we move towards the circle.
						We see that we can never move point B beyond the 
						circle. The points in this geometry are constrained to exist only inside the disk. 
						 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-3.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "length" class = "tutorial-p-head"> Hyperbolic Distance</span><br>
						On page 45 we also discuss what happens to the length of a segment as it is moved around 
						in this hyperbolic geometry. Construct a segment AB near the center of screen. 
						We want to make sure that all measurements are <em>hyperbolic</em>
						measurements. To insure that this is the case, click the 'Hyp' measurement button at 
						the bottom of the window. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-4.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Now, we can measure the hyperbolic distance from A to B by clicking on the Distance tool
							<img src="./images/distanceIcon.png" style="width:30px" alt="Distance Button">
							in the Toolbar, and then clicking on point A and dragging to point B.
						Next construct hyperbolic segment 
						DE near the edge and measure the hyperbolic distance from D to E. If we adjust D we
						can make this second distance match the length of AB, although the two 
						'segments' look very different!
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-5.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "circles" class = "tutorial-p-head"> Hyperbolic Circles</span><br>
						On page 46, we create circles in this geometry and notice that circles of different apparent 
						sizes can have the same <em>hyperbolic</em> radii. We can use the Hyperbolic circle tool and 
						the Hyperbolic 
						distance to create circles with this property.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-6.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "angles" class = "tutorial-p-head"> Hyperbolic Angles</span><br>
						On page 47, we look at what happens to angles as we move them
							via hyperbolic motions. Since movement of points in the model
							we are using is not really hyperbolic, we can simulate this by looking 
							at what happens to a right angle. Construct a hyperbolic line through A and B.
							Then, construct a perpendicular to this line at some point C.
							(Click on the Perpendicular button 
						<img src="./images/perpIcon.png" style="width:30px" alt="Perpendicular Button">
						and then click and drag on line AB until
						the perpendicular is set at a point C.)
							If we move point A or B, we see that that the
							constructed line remains perpendicular.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-7.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p>
							The remaining constructions and exercises in Project 2 should now be doable.
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
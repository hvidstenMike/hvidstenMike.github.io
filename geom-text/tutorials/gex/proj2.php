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
					Tutorial on Project 2
				</header>
				
				<div class = "tutorial-select-anchors" >
				<label class = "tutorial-label"> Page Topics: &nbsp;</label> 
					<select  name="page-links" onChange="location = this.value;">
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
						The second project in Chapter 1 involves exploring the 
						non-Euclidean geometry called 'Hyperbolic Geometry.' 
						To begin, start up Geometry Explorer. The program has the capability to explore 
						hyperbolic geometry. To enable this capability, go to the <b>File</b> menu
						and select <b>New</b>. A window will open up with a variety of possible geometries.
						Choose 'Hyperbolic' and click 'Okay.'
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-0.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						A new tab will open up with the Poincare model
						of Hyperbolic Geometry.  Note that all of the tools and menus are still
						visible. All of the tools that do not depend on Euclidean parallels are still 
						usable in this geometry.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-1.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p><span id = "segments" class = "tutorial-p-head"> Hyperbolic Segments</span><br>  
						As an example, click on the Segment button and then click and drag
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
						<p>  
						On page 45 of the text we discuss what happens to B as we move towards the circle.
						If this software model were ideal, the point B would never leave the interior of the 
						circle. The points in this geometry are constrained to exist only inside the disk. 
						We do see that the segment does not leave the disk, which is accurate. But, it also 
						disappears! You will have to 
						imagine that point B cannot leave the disk.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-3-a.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "length" class = "tutorial-p-head"> Hyperbolic Length</span><br>
						On page 45 we also discuss what happens to the length of a segment as it is moved around 
						in this hyperbolic geometry. Construct a segment AB near the center of screen. We can measure
						the length of the segment by selecting the segment and then 
						choosing <b>Length</b> from the <b>Measure</b> menu. 
						The value of this measurement is the <em>hyperbolic</em> 
						distance from A to B. Next, select the segment and move it around the screen. The
						length does not change!
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-3.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "circles" class = "tutorial-p-head"> Hyperbolic Circles</span><br>
						On page 46, we create circles in this geometry. Select one of these circles and measure its radius. (Choose 
						<b>Radius</b> from the <b>Measure</b> menu.) 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-4.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Select the circle for which we measured the radius and drag it toward the boundary.
						The measured radius does not change, even though it looks like the circle 
						shrinks to nothing as we approach the boundary. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-5.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "angles" class = "tutorial-p-head"> Hyperbolic Angles</span><br>
						On page 47, we look at what happens to angles as we move them
							via hyperbolic motions. Create a segment AB and then a segment BC from B.
							Select A, B, and C (in that order) and choose 
						<b>Angle</b> from the <b>Measure</b> menu to measure the angle. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj2-6.png" alt = "Project 2">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Now, select the three points A, B, and C in a group and drag them
						with the mouse, moving the angle
						around the screen. Movement of the angle has no effect
						on the angle measurement.
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
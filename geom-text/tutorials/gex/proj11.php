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
				   Tutorial on Project 11 -  Tiling the Hyperbolic Plane 

				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 11 requires the construction of a
						hyperbolic triangle with angles of 72, 45, and 45 degrees. To start this project, 
						you will need to download
						the file <a href="./hyperTiling.gex"> hyperTiling.gex</a> 
						which contains the construction of this triangle. Once you have downloaded this file,
						open it using Geometry Explorer.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj11-1.png" alt = "Project 11">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Read through the introductory material on pages 312 and 313. To make sure
							that this triangle is the one we want,
							measure the angles.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj11-2.png" alt = "Project 11">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Hide the angle measurements and connect C and
						B with a segment. We will construct a pentagon using this segment
						as a side. Set A as a center of
						rotation of 72 degrees and rotate
						segment BC four times to get a regular pentagon.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj11-3.png" alt = "Project 11">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Now, set point C as a center
							of rotation of 90 degrees. Rotate the pentagon three times, yielding
							four pentagons meeting at right angles!
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj11-4.png" alt = "Project 11">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> If we continue to rotate the
							pentagon about exterior points in
							this figure, we see that a tiling
							of the hyperbolic plane is indeed
							possible with regular pentagons
							meeting at right angles.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj11-5.png" alt = "Project 11">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> if we move the point at the center of the tiling, point A, we see that the tiling
						breaks up in a quite nasty way. When we move A we create compound translations and rotations
							for other parts of the figure. In Hyperbolic geometry compositions
						of translations are not necessarily
						translations again as they
						are in Euclidean geometry.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj11-6.png" alt = "Project 11">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p>
							The remaining exercises in Project 11 should now be doable.
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
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
					Constructing Transformations
				</header>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						The tools used for constructing transformations such as reflections, rotations, 
						dilations, and translations
							are located under the <b>Transform</b> menu item. 
							If we click on this menu item, a sub-menu will drop
							down with all of the possible transformation tools. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-1.png" alt = "Transformations">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						For example,suppose we have created a triangle ABC and a point O and we want to rotate the 
						triangle about O by 60 degrees. The first thing we need to do is to select 
						a point for the center of the rotation. Select point O and then choose <b>Mark Center</b> 
						from the <b> Transform</b> menu.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-2.png" alt = "Transformations">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Next, we select the object to 
						rotate. In our case, we want to rotate the entire triangle. The easiest way
						to select the entire triangle is by a Box selection. 
						Draw a box around the points to select the triangle. Then, choose 
						<b>Rotate...</b> from the <b>Transform</b> menu. A dialog box will pop up asking for the
						angle of rotation. Type in '60' and hit 'Rotate. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-3.png" alt = "Transformations">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						A copy of the triangle is created and then rotated about point O by the angle we entered. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-4.png" alt = "Transformations">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							If you want more general info
							on using Geometer's Sketchpad, there are numerous on-line tutorials. 
							A nice brief intro is at <a href="http://0-www.learner.org.librus.hccs.edu/courses/learningmath/geometry/session4/part_a/tutorial.html">
							this site </a>.
							The Geometer's Sketchpad web site has resources at 
							<a href="http://www.keycurriculum.com/node/637.html">
								this page </a>. 
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
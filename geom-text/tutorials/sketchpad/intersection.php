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
					Constructing the Intersection of Two Objects
				</header>
				
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						In our projects, we often have to create a point of intersection for two objects. 
							For example, here we have created two lines AB and CD. 
							There are two ways to construct the intersection of these lines.
							The first way is to use the <b> Intersection</b> menu item under the
							<b> Construct</b> menu. To use this tool, we first have to select the two lines.
							Once they are selected, the <b>Intersection</b> menu item will be active (not grayed out). 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-1.png" alt = "Intersection">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Once we choose the <b>Intersection</b> menu item, 
						the intersection point E is then constructed.   
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-2.png" alt = "Intersection">
						</div>
					</div>
					
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Let's construct a circle to illustrate the second method. Click on the Point Tool
							in the Toolbar to make it 
							active and hover your mouse over where the circle intersects the line. The two objects
							defining the intersection should be outlined in red, denoting that they will be 
							selected for the intersection. Clicking the mouse will then create the intersection
							point (Point H).
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-3.png" alt = "Intersection">
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
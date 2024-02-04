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
					Constructing the Intersection of Two Objects
				</header>
				
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						In our projects, we often have to create a point of intersection for two objects. 
							For example, here we have created two lines AB and CD. 
							There are two ways to construct the intersection of these lines.
							The first way is to use the Intersection Button 
							<img src="./images/intersect.png" style="width:30px" alt="Intersect Button">
							in the Tool Panel. Note that this button is by default grayed out in 
							appearance. This indicates that the button is <em>inactive</em>. To make the button
							active we need to select the objects it depends on.  
							To help determine what these objects are, we can hover over the button. 
								In the Message Area below the active window, we will see a description of 
								what needs to be selected to use the button. In our case we need to 
								choose two objects such as lines or circles. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-1.png" alt = "Intersection">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						As an example, let's construct line AB and a circle at C. If we select the line and the circle, 
						the Intersect Button will become <em>active</em>, which is illustrated by its more
							solid appearance. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-2.png" alt = "Intersection">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						If we click the Intersect Button, the two intersection points E and F
						will be constructed.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-3.png" alt = "Intersection">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Let's construct two segments to illustrate the second method. Click on the Point Tool
							in the Tool Panel to make it 
							active and hover your mouse over where the two segments appear to intersect. 
							The two objects
							defining the intersection should be outlined in a dashed purplish-red pattern, 
							denoting that they will be 
							selected for the intersection.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-4.png" alt = "Intersection">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Clicking the mouse will then create the intersection
							point (Point E).
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-5.png" alt = "Intersection">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							If you want more general info
							on using Geometry Explorer, consult the Geometry Explorer User Guide,
							which can be downloaded at 
							<a href="http://www.gac.edu/~hvidsten/gex/guide.pdf">
							http://www.gac.edu/~hvidsten/gex/guide.pdf</a>. Note that this guide is a
							pdf file of about 5 mb.  The program also has help pages which can be accessed
							from the <b>Help</b> menu.
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
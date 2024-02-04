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
					Constructing the Intersection of Two Objects
				</header>
				
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						In our projects, we often have to create a point of intersection for two objects. 
							For example, here we have created two lines AB and CD. 
							To construct the intersection we use the
							Intersect Tool. This is under the Point menu (second from left in Toolbar).
							Here we have clicked on the Point Button and selected the Intersect 
							Tool. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-1.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Once we have selected the Intersect Tool, it replaces the Point button and is the active 
						Tool. If we hover over this button, we see a tooltip that describes what we 
						need to select to construct the intersection. It tells us that there are two
						ways to construct the intersection - we either select the two objects or we 
						click where we expect the intersection to be. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-2.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Let's try the first method - click on line
						AB and then on CD. The intersection point E is then constructed.   
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-3.png" alt = "GeoGebra Example">
						</div>
					</div>
					
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Let's construct a circle to illustrate the second method. Click on the Intersect Tool to make it 
							active and hover your mouse over where the circle intersects the line. The two objects
							defining the intersection should darken in appearance, denoting that they will be 
							selected for the intersection. A small box will also appear with info on which
							objects will define the desired intersection. 
							Clicking the mouse will then create the intersection.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-4.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							If you want more general info
							on using GeoGebra, there are numerous on-line tutorials. 
							A nice brief intro is at <a href="http://www.ms.uky.edu/~droyster/courses/fall10/MA341/Geogebra/Introduction%20to%20GeoGebra.pdf">
							www.ms.uky.edu </a>.
							The GeoGebra web site	
								is the definitive reference. 
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
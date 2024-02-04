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
					Constructing the Intersection of Two Objects
				</header>
				
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						In our projects, we often have to create a point of intersection for two objects. 
							For example, here we have created two lines AB and CD. 
							There are two ways to construct the intersection of these lines.
							The first way is to use the Intersection button 
							<img src="./images/intersectIcon.png" style="width:30px" alt="Intersect Button">
							in the Toolbar. 
							To use this tool, we click the button and then select the two objects for which we
							want the intersection. In out case we select the two lines. 
							The intersection point E is then constructed.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-1.png" alt = "Intersection">
						</div>
					</div>
					
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Let's construct a circle and a line to illustrate the second method. Click on the Point Tool
							<img src="./images/pointIcon.png" style="width:30px" alt="Point Button">
							in the Toolbar to make it 
							active and click the mouse over where the circle intersects the line. Both
							intersection points (E and F) for where the circle crosses the line will be created.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/intersection-2.png" alt = "Intersection">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							If you want more general info
							on using Cinderella, consult the Cinderella 
							<a href="http://doc.cinderella.de/tiki-index.php">
								 Documentation Site</a>.
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
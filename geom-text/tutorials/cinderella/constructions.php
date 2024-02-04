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
					Constructing vs Creating Objects  
				</header>
				
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						In our projects, we make a distinction between <em> creating</em> 
							and <em> constructing </em> objects. Creating an object requires no 
							prior objects to exist. For example, if we use the Segment Tool 
							 we can click and drag to create a segment. Here we have created 
							a segment AB and a point C.  Suppose we want to construct the perpendicular
								to the segment through C.  We can construct the perpendicular
								by using the Perpendicular Line tool
									<img src="./images/perpIcon.png" style="width:30px" alt="Perpendicular Button">
									in the Toolbar.  A perpendicular is an object that is 
								<em> constructed</em> from existing objects, in our case from a line 
								and a point. Once we click on the perpendicular line tool, we see a description
								of how to use it. We first click on the segment and hold the mouse down. 
								A perpendicular line appears with a point where the cursor is. (Highlighted in
								yellow here.) We then can drag this point to C to create the desired 
								perpendicular.								
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/construction-1.png" alt = "Constructions">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						For another example, we have created three points on the screen and want to
						construct the circle through these points. To do this, we use the 
						3-point Circle button
						<img src="./images/circle3ptsIcon.png" style="width:30px" alt="3-Point Circle Button">
									in the Toolbar. 
						Then, we select the three points to construct the circle. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/construction-2.png" alt = "Constructions">
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
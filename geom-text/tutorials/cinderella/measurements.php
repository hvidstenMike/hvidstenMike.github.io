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
					Measurement in Cinderella
				</header>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						The tools used for measuring properties such as distance, angle, and area
							are located in a group of three tools near the bottom of the Toolbar
							(highlighted in yellow here). 
							Creating a measurement is much like
							doing a construction - both are actions that depend on pre-existing objects.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/measure-1.png" alt = "Measurement">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						For example, suppose we want to measure the angle defined by three points A, B, and C.
						In Cinderella, angles are defined by two lines. So, we create the line through A and
							B and the line through B and C. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/measure-2.png" alt = "Measurement">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						We can now measure the angle. Click on the Angle tool
						<img src="./images/angleIcon.png" style="width:30px" alt="Angle Button">
									in the Toolbar. Then, select the two lines to define the angle.
									If the angle is obscured, you can move the angle by clicking
									on the Move tool and then clicking and dragging the angle text box.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/measure-3.png" alt = "Measurement">
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
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
					Measurement in Geometry Explorer
				</header>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						The tools used for measuring properties such as distance, length, and angles
							are located under the <b>Measure</b> menu.
							If we click on this menu item, a sub-menu will drop
							down with all of the possible measurement tools. Creating a measurement is much like
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
						For example, here we have created points A, B, and C on the screen. If we select these points
						(A, B, and C in that order), the <b>Angle</b> menu item will now be active.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/measure-2.png" alt = "Measurement">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						If we select the <b>Angle</b> menu item, a numerical measurement object 
						for the angle will appear in the window.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/measure-3.png" alt = "Measurement">
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
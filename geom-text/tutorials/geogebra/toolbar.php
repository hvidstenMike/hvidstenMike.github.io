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
					The GeoGebra Toolbar - Creating Lines and Segments
				</header>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "toolbar" class = "tutorial-p-head">GeoGebra Tool Bar </span><br>
						The main tools used to create geometric figures in GeoGebra are located in a horizontal
						tool bar of buttons at the top of 
						the application window.
						Clicking once on any of these buttons reveals a drop-down list of menu items grouped 
						into categories. For example, here we have clicked on the Line button and hovered over the 
						Segment menu item (without clicking). Near the bottom of the screen you will notice 
						that GeoGebra gives you an idea of what you have to select to create that object. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-buttons.png" alt = "GeoGebra Buttons">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "basic-construction" class = "tutorial-p-head">Lines and Segments </span><br> 
						To illustrate the use of a tool in the Toolbar, we will create a line defined by two points. 
						Click on the Line Button and then click
							somewhere in the window and drag.  
							Notice that GeoGebra creates a point (A) where you first clicked and a second point(B) 
							where you released the mouse. These define the line. Create another line, with points C and D.
							GeoGebra automatically labels any points we create and also creates a list of all of the properties
							of objects we create. This is the list at the left side of the window. Points are listed with their 
							labels and lines with their linear equations.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-intro1.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Now, let's create a segment. Click on the Line Button and drag down to select the Segment menu item. 
						Notice that the Line button now shows a segment icon. We have changed the functionality of the Line tool
						so that it is now a segment tool. This is a fundamental technique used in GeoGebra to provide for 
						multiple tools with just a few buttons. With the Segment Tool now active, click and drag to create a 
						segment. Segments are labeled with lower-case letters. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-intro2.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							Try experimenting with the various
							tools in the Tool Bar.  If you want more general info
							on using GeoGebra, there are numerous on-line tutorials. 
							A nice brief intro is at <a href="http://www.ms.uky.edu/~droyster/courses/fall10/MA341/Geogebra/Introduction%20to%20GeoGebra.pdf">
							www.ms.uky.edu </a>.
							The GeoGebra web site is the definitive reference. 
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
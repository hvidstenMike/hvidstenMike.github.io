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
					Selecting Objects
				</header>
				
				<div  id = "tutorial-content">
					
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "selection" class = "tutorial-p-head">Single Selection </span><br>
						One of the most frequent actions that you will carry out is that of <em> selecting</em> an 
						object (point, line, circle, etc) in the window. To select an object, we first click
							on the Select Button (White cursor arrow). This puts GeoGebra into selection mode so
							that we can select objects. Alternatively, we can use the Escape key to put
							GeoGebra into selection mode. If we move the cursor over an object, we will see that
							object's appearance changes to denote that it can be selected. For example, here
							we have hovered the cursor over a point. We see a gray circle surrounding the point,
							and if we keep the cursor there for a second or so, we see a label describing the object
							to be selected. If we click the mouse on a point, it will be selected. Try clicking the mouse over
							various objects to see how they look when selected. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-intro5.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "selection" class = "tutorial-p-head">Multiple Selection </span><br>
						It is often the case that we want
							to select more than one object, i.e. to do a <em> multi-selection</em>. 
							To select more than one object, hold the Ctrl-key (Mac OS: Cmd-key) 
							down while clicking on the objects to be selected. Here we have selected segments h and i 
							and points A, C, and L.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-intro6.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "selection" class = "tutorial-p-head">Box Selection </span><br>
						 If we want to select a group of objects in a certain area of the screen,
						 we can do that selection by drawing a box around the objects. 
						 Here we have a group of points we want to select. Click on the Select button
						 and then hold the right mouse down (Mac OS: Hold the Ctrl key down, Mobile
						 devices: long-tap) and then 
						 draw a box around the points. They will now be selected.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-box-select.png" alt = "GeoGebra Example">
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
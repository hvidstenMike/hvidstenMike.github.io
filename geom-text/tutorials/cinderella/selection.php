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
					Selecting Objects
				</header>
				
				<div  id = "tutorial-content">
					
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "selection" class = "tutorial-p-head">Single Selection </span><br>
						One of the most frequent actions that you will carry out is that of <em> selecting</em> an 
						object (point, line, circle, etc) in the window. To select an object, we first click
							on the Move/Select Button
							<img src="./images/moveIcon.png" style="width:30px" alt="Move Button">
							in the Toolbar. 
							This puts Cinderella into selection mode so
							that we can select objects. If we now move the cursor over an object, we will see that
							the cursor changes to denote that we are selecting something. For example, here
							we have hovered the cursor over a point. A thin yellow circle pops up around the point
							to show that is can be selected. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/selection-1.png" alt = "Selection">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "selection" class = "tutorial-p-head">Single Selection </span><br>
						Once we click on an object, its appearance changes to denote that it is selected. 
						For example, clicking on point C will result in a white circle about the point. 
						Try clicking the mouse on
							various objects to see how they look when selected. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/selection-2.png" alt = "Selection">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "selection" class = "tutorial-p-head">Multiple Selection </span><br>
						It is often the case that we want
							to select more than one object, i.e. to do a <em> multi-selection</em>. 
							To select more than one object, just select the objects in order.
							Here we have selected the segment through E and F and  
							and points A, B, and C.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/selection-3.png" alt = "Selection">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "selection" class = "tutorial-p-head">Box Selection </span><br>
						 If we want to select a group of objects in a certain area of the screen,
						 we can do that selection by drawing a box around the objects. 
						 Here we have a group of points we want to select. Click on the Select button
						 and then hold the mouse down and  
						 draw a box around the points. They will now be selected.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/selection-4.png" alt = "Selection">
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
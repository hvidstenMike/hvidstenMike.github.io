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
					Selecting Objects
				</header>
				
				<div  id = "tutorial-content">
					
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "selection" class = "tutorial-p-head">Single Selection </span><br>
						One of the most frequent actions that you will carry out is that of <em> selecting</em> an 
						object (point, line, circle, etc) in the window. To select an object, we first click
							on the Select Button (Black cursor arrow in first row of Tool Panel). 
							This puts the program into selection mode so
							that we can select objects. If we move the cursor over an object, we will see that
							the cursor changes to denote that we are selecting something. For example, here
							we have hovered the cursor over point A. The cursor has changed to a hand 
							and there is a description of the object to be selected attached to the hand. 
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
						For example, clicking on point A will result in a purplish-red circle about the point. 
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
							Here we have selected the segment through A and B and  
							and points A, C, and G.  
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
						 Here we have a group of points we want to select. Click on the Select Button
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
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
					Geogebra Tutorial on Project 7 - Quilts and Transformations 
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "construct" class = "tutorial-p-head">
						Construction of Square-in-Square Quilt </span><br>
						We start by creating a segment AB. We wish to rotate point B about point	
							A by 90 degrees.  To do this, we click on the button with the
								reflection icon <img src="./images/geogebra-reflect-icon.png" 
								style="width:30px" alt = "reflect"> and choose 
							the 'Rotate around Point' option. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj7-1.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Then, click on point B and then point A (in that order). 
							A dialog box will pop up for the rotation angle. 
							Enter 90 for the angle and hit 'Okay.' Point B will be
							copied and rotated, forming point C. Likewise, rotate 
								A about C by 90 degrees to get point D. Connect the points
								to get square ABCD.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj7-2.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  We now create a filled area for triangle ABC. To do this, we will use the Polygon
						tool. This is the button with the Polygon icon <img src="images/geogebra-polygon-icon.png"
							style="width:30px;" alt = "Polygon Tool">. 
							Click this to make it the active tool and then click on
								B, A, C, and then on B again to form the filled area.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj7-3.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						The area is transparent by default in GeoGebra. If we want a more solid area,
						we can right-click inside the area and choose 'Object Properties...' In the window that 
						pops up we can adjust the transparency by choosing the 'Color' tab and then adjusting
						the 'Opacity' slider. We can also change the color. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj7-4.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Next, we will reflect this square shape across CD. Under the Transformation button,
						make sure the 'Reflect about Line' tool is selected. Then, do a box selection
						around the square and click segment CD. The square will be copied and reflected across 
						the segment. You may want to turn off the auto-labeling feature of GeoGebra as 
						more and more objects are created. To turn off the labels, go to the <b> Options </b>
						menu and select <b> Labeling -> No New Objects </b>.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj7-5.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						To finish the basic block, we reflect this new shape across DB. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj7-6.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						To make more blocks, we translate this basic block. 
						Before we translate, we may want to move the block a bit to the left. 
						To do a translation,
						choose the 'Translate by Vector' Tool under the Transformation button
						 <img src="images/geogebra-translate-icon.png" style="width:30px;"
							alt = "Translate Tool">.
						Then, select the entire block and click on points A and E (in that order). 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj7-7.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p>
							The remaining constructions and exercises in Project 7 should now be doable.
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
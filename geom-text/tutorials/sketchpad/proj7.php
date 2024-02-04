<! DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exploring Geometry - Geometer's Sketchpad</title>
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
					Tutorial on Project 7 - Quilts and Transformations 
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "construct" class = "tutorial-p-head">
						Construction of Square-in-Square Quilt </span><br>
						We start by creating a segment AB. We wish to rotate point B about point	
							A by 90 degrees. To do this, we will use the <b>Rotate...</b> 
							tool under the <b>Transform</b> menu. Rotations require a center of rotation and 
							an angle. To set the center of rotation , click on A and then choose 
							<b>Mark Center</b> under the <b>Transform</b>  menu.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-1.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Then, click on point B and choose  <b>Rotate...</b> 
							from the <b>Transform</b> menu.
							A dialog box will pop up asking for the rotation angle. 
							Enter 90 for the angle and hit 'Rotate.' Point B will be
							copied and rotated, forming point C. Likewise, rotate 
								A about C by 90 degrees to get point D. Connect the points
								to get square ABCD.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-2.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  We now create a filled area for triangle ABC. To do this, we will use the <b>Interior</b>
						tool under the <b>Construct</b> menu. 
							Select the points 
								B, A, C, and then choose <b>Triangle Interior</b> from the <b>Construct</b> menu.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-3.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						The interior of the triangle will be filled with a color. You can change this color
						by right-clicking on the interior (Mac OS: Ctrl-click) and selecting 'Colors.'
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-4.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Next, we will reflect this square shape across CD. Select segment CD and
						then choose <b> Mark Mirror</b> from the <b>Transform</b> menu. 
							You may want to turn off the auto-labeling feature of Sketchpad as 
						more and more objects are created. To turn off the labels, go to the <b> Edit </b>
						menu and select <b> Preferences... </b> Under the 'Text' tab uncheck the box labeled 
						'For All New Points.'
						To do the reflection, use the selection tool to draw a box around the square to select it. 
						Then, choose <b>Reflect</b> from the <b>Transform</b> menu.
						The square will be copied and reflected across 
						the segment. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-5.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						To finish the basic block, we reflect this new shape across DB. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-6.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						To make more blocks, we translate this basic block. 
						Before we translate, we may want to move the block a bit to the left. 
						To do a translation, select points A and E and then choose
						<b>Mark Vector</b> from the <b>Transform</b> menu.
						Then, select the entire block and choose <b>Translate...</b> 
						from the <b>Transform</b> menu. In the dialog box that pops up,
						click 'Translate.' 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-7.png" alt = "Project 7">
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
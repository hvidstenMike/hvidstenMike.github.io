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
					Tutorial on Project 7 - Quilts and Transformations 
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "construct" class = "tutorial-p-head">
						Construction of Square-in-Square Quilt </span><br>
						We start by creating a segment AB. We wish to rotate point B about point	
							A by 90 degrees. Rotations require a center of rotation and 
							an angle. To set the center of rotation, click on A and then choose 
							<b>Center</b> under the <b>Mark</b>  menu in the Transform Panel.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-1.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Next, we define the angle. Choose <b>Rotation</b> from the <b>Custom</b>
						menu in the Transform Panel. A dialog box will pop up asking for the rotation angle. 
							Enter 90 for the angle and hit 'Okay.'
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-1-a.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Then, click on point B and click the Rotate button
							<img src="./images/rotate.png"  style="width:30px" alt ="Rotate Tool">
							in the Transform panel.
							Point B will be
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
						<p>  We now create a filled area for triangle ABC. To do this, 
						select the points 
								B, A, C, and then click the Filled Polygon button
							<img src="./images/fill-poly.png"  style="width:30px" alt ="Filled Polygon Tool">
							in the Construct panel.
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
						by selecting the interior and clicking on one of the color boxes in the 
						'Color Palette' panel at the bootm of the Tool Panel.  
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
						then choose <b> Mirror</b> from the <b>Mark</b> menu. 
							You may want to turn off the auto-labeling feature for points as 
						more and more objects are created. To turn off the labels, go to the <b> Edit </b>
						menu and select <b> Preferences... </b> Under the 'Appearance' tab uncheck the box labeled 
						'Show Labels for:'-> 'points.'
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-4-a.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						To carry out the reflection, use the selection tool to draw a box around the square to select it. 
						Then, click on the Reflect button
						<img src="./images/reflect.png"  style="width:30px" alt ="Reflect Tool">
						in the Transform panel.
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
						To finish the basic block, we reflect this new shape across segment DB. 
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
						Before we translate, we may want to move the block a bit to the left and shrink it.
							(To shrink, click in the window and hit the period key '.')
						To do a translation, select points A and E and then choose
						<b>Vector</b> from the <b>Mark</b> menu.
						In the dialog box that pops up,
						choose 'Rectangular' and click 'Okay.' To translate the block, draw a selection box
						around the entire figure and then  click on the Translate button
						<img src="./images/translate.png"  style="width:30px" alt ="Translate Tool">
						in the Transform panel.
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
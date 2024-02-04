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
					Tutorial on Project 7 - Quilts and Transformations 
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "construct" class = "tutorial-p-head">
						Construction of Square-in-Square Quilt </span><br>
						We start by creating a square. We can bypass some of the steps in the
							text by using Cinderella's square constructing tool. 
							Under the <b>Modes</b> menu choose <b>Polyon</b> 
							and then <b>square</b>. Click and drag in the window to construct a
							square with a center point. Hide all of the segment labels and re-label
							the square to have vertices A, B, C, and D as shown. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-1.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  We now create a filled area for triangle ABC. To do this, we will use the Polygon
						tool. Click on the Polygon tool
							<img src="./images/polyIcon.png" style="width:30px" alt="Polygon Button">
							in the Toolbar and then click on C, A, B, and C again to define the polygon. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-2.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						The interior of the triangle will be filled with a color. You can change this color
						by right-clicking on the interior (Mac OS: Ctrl-click) and selecting 'Information.'
						A dialog box will pop up where you can select a new color if you wish. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-3.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Next, we will reflect this square shape across CD. Under the <b>Modes</b> 
						menu choose <b>Transformation</b> 
							and then <b>Reflection</b> (not Reflection(old)). Click on segment
							CD. A button will appear in the upper right corner of the geometry window
							<img src="./images/reflect-1.png" style="width:30px" alt="Reflect Button">.
							This button represents reflection across the line through C and D. 
						To do the reflection, use the Move/Select tool to draw a box around the square to select it.
							You may have to also click on the triangle area (while holding the shift key down)
							to select it along with all the other objects. 
						Then, click the reflect button. 
						The square will be copied and reflected across 
						the segment. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-4.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						To finish the basic block, we reflect this new shape across DB. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-5.png" alt = "Project 7">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						To make more blocks, we translate this basic block. 
						Before we translate, we may want to move the block a bit to the left. 
						Under the <b>Modes</b> 
						menu choose <b>Transformation</b> 
							and then <b>Translation</b>.
						Then, select points A and K. A button reflecting this translation
						<img src="./images/translate.png" style="width:30px" alt="Translate Button">
						will be created in the Geometry window. 
						Select the entire block and click the Translate button.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj7-6.png" alt = "Project 7">
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
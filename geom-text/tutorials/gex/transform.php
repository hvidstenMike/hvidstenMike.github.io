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
					Constructing Transformations
				</header>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						The tools used for constructing transformations such as reflections, rotations, 
						dilations, and translations
							are located in the Transform sub-panel of the main Tool Panel. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-1.png" alt = "Transformations">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						For example,suppose we have created a triangle ABC and a point O and we want to rotate the 
						triangle about O by 60 degrees. The first thing we need to do is to select 
						a point for the center of the rotation. Select point O and then click on the
						<b>Mark</b> menu in the Transform Panel and choose <b>Center</b>. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-2.png" alt = "Transformations">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Next, we select the object to 
						rotate. In our case, we want to rotate the entire triangle. The easiest way
						to select the entire triangle is by a Box selection. 
						Draw a box around the points to select the triangle. Then, choose 
						<b>Rotation</b> from the <b>Custom</b> menu in the Transform panel. 
						 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-3.png" alt = "Transformations">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> A dialog box will pop up asking for the
						angle of rotation. Type in '60' and click 'Okay.' To do the rotation, 
						click on the Rotate button 
						<img src="./images/rotate.png" style="width:30px" alt="Rotate Button">
						A copy of the triangle is created and then rotated about point O by the angle we entered. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-4.png" alt = "Transformations">
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
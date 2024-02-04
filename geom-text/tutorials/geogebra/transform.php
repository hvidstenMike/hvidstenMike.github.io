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
					Constructing Transformations in Geogebra
				</header>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						The tools used for constructing transformations such as reflections, rotations, 
						dilations, and translations
							are located under the Transformation button. This is the button that, by default,
							has an icon on top illustrating a reflection across a line. 
							If we click on this button, a menu will drop
							down with all of the possible transformation tools. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-intro11-2.png" alt = "GeoGebra Buttons">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						For example, here we have clicked on the 'Rotate around Point' menu option,
						making it the active tool on the top. If we now hover our mouse over this
							button, we will see a tooltip that tells us what geometric objects
							are needed to create a rotation. We are advised that we will need to 
							select an object to be rotated and then a point for the center of the rotation.
							After this selection, we will need to enter an angle of rotation.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-intro12.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						To illustrate how this works, we have created a point A and a triangle
						BCD. We click the Angle transformation button to make that
						tool active. Now, as mentioned above, we first need to select the object to 
						rotate. In our case, we want to rotate the entire triangle. The easiest way
						to select the entire triangle is by a Box selection. Right-click 
						(Mac OS: Hold the Ctrl key down, Mobile
						 devices: long-tap) and then 
						 draw a box around the points to select the triangle. Then, click on A
						to set it as the center of the rotation. A dialog box will pop up asking for the
						angle of rotation. Type in '45' and hit Okay. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-intro13.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						A dialog box will pop up asking for the
						angle of rotation. Type in '45' and hit Okay. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-intro14.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						A copy of the triangle is created and then rotated about point A by the angle we entered. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-intro15.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							If you want more general info
							on transformations in GeoGebra, there are numerous on-line tutorials. 
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
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
					Constructing Transformations
				</header>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						The tools used for constructing transformations such as reflections, rotations, 
						dilations, and translations
							are located under the <b>Modes</b> menu item. 
							If we click on this menu item, a sub-menu will drop
							down. The <b>Transformation</b> sub-sub-menu
							holds all of the possible transformation tools. 
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
						triangle about O by 60 degrees. Cinderella is a bit different than most dynamic geometry
							software in that there is no way to <em>directly</em> define a constant rotation
							angle. What we need to do is define a fixed geometric angle and measure it to get 
							the numeric angle. To define a fixed angle of 45 degrees, we create a line DE
								and then click the 'Draw Line With Fixed Angle' button
								<img src="./images/fixedAngleIcon.png" style="width:30px" 
								alt="Line with Fixed Angle Button">
									in the Toolbar. A dialog box will pop up asking for the angle. Type
									in '45' and hit return. (You can close this dialog box by clicking the 
									'x' in the upper right corner.)  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-2.png" alt = "Transformations">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						To construct the desired angle, we click and drag on line DE. A new line with the angle of
						45 degrees is created and we can move the line to wherever we wish. Let's move it to
						so that the angle's vertex is at point D.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-3.png" alt = "Transformations">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Now, we will find the numerical measure of this angle. Click on the Angle tool
						<img src="./images/angleIcon.png" style="width:30px" alt="Angle Button">
									in the Toolbar and then click on line DE and then the new rotated
									line. The 45 degree numerical measurement is now defined.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-4.png" alt = "Transformations">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						We do not need the lines and points defining the angle, so we will hide them. 
							Right-click (Mac OS: ctrl-click) on point D and Choose <b>Information</b>
							from the pop-up menu. The <em>Inspector</em> window will appear. In this window,
							we can modify many aspects of an object's appearance. We will hide point D
								by clicking the 'Visible' checkbox to de-select it. Keeping the
									Inspector window open, click on all of the other objects we want to hide and
									uncheck their 'Visible' checkboxes.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-5.png" alt = "Transformations">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Now, to carry out the desired rotation, we choose 
							<b>Rotate P|Ang</b> from the <b>Modes->Transformation</b> menu. 
							We click on point O (to mark it as the center of rotation)
							and we then click on the angle measurement. A new button will appear in the upper
							right corner. This button will act as our rotation tool.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-6.png" alt = "Transformations">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> To rotate the triangle, 
						click the Move/Select button and select the triangle by drawing a box around it.
						Then, click the new rotation button. A copy of the triangle is constructed and 
						rotated by 45 degrees about point O. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/transform-7.png" alt = "Transformations">
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
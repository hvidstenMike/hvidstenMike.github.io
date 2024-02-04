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
					Tutorial on Project 1
				</header>
				
				<div class = "tutorial-select-anchors" >
				<label class = "tutorial-label"> Page Topics: &nbsp;</label> 
					<select  name="page-links" onchange="location = this.value;">
					<option value="#golden-section">1.3.1 Golden Section</option>
					<option value="#golden-ratio">1.3.1 Construction of Golden Ratio</option>
					<option value="#golden-rectangle">1.3.2 Golden Rectangle</option>
					</select>
				</div>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "golden-section" class = "tutorial-p-head">
						1.3.1 Golden Section </span><br> 
						The first project in Chapter 1 involves using geometry software to construct the 
						golden ratio and a golden rectangle. 
						To begin, start up Cinderella. 
						Read through the introductory material from the text. 
						In this tutorial, we will not repeat all of 
						the instructions from the text, but instead cover the more complex points. 
						(You should have covered the basics of 
						using Cinderalla Tools, found on the
						web site for the text, before beginning this project.)
						We start by assuming
						that you have constructed a segment AB and attached a point C as 
						described in section 1.3.1.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj1-1.png" alt = "Project 1">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Now, we measure the distance from A to B by clicking on the Distance tool
							<img src="./images/distanceIcon.png" style="width:30px" alt="Distance Button">
							in the Toolbar and the clicking on point A and dragging to point B. 
							Likewise, measure the distance from 
							C to B.  We will now compute the ratio
							of the length of AB to CB. To do this, we will use the Function tool
							<img src="./images/functionIcon.png" style="width:30px" alt="Function Button">
							found in the bottom row of the Toolbar. Click this button and then 
							click somewhere in the main window. 
							A dialog box will pop up. Into this box, type '|A,B|/|C,B|' and click the
								'Equation' button.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj1-2.png" alt = "Project 1">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  A new entry is created in the window with the calculated ratio.
						Next, measure the distance from A to C and find the ratio 
							of the distance |B,C| to the AC distance. As we move C, we notice that there is a point
						where these two ratios seem to match. As mentioned in the text, we can 
						'do the math' to convince ourselves that if these two ratios match exactly, 
						the ratios are equal to the golden ratio.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj1-3.png" alt = "Project 1">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "golden-ratio" class = "tutorial-p-head">
						1.3.1 Construction of Golden Ratio </span><br>
						Construct segment AB. Then, click on the Midpoint tool
						<img src="./images/midpointIcon.png" style="width:30px" alt="Midpoint Button">
						and drag from A to B to 
						construct the midpoint C. Then, construct the perpendicular to AB at B. 
						(Click on the Perpendicular button 
						<img src="./images/perpIcon.png" style="width:30px" alt="Perpendicular Button">
						and then click and drag on segment AB until
						the perpendicular is set at B.)
						Then, carry out the constructions from the text to get a circle 
						with center B and radius point C, and the intersection point D of the circle 
						with the perpendicular at B.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj1-4.png" alt = "Project 1">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Next, hide the circle and construct segment AD and the circle d 
						with center D and radius 
						point B. Construct the intersection point F of d and AD. Finally,
						construct circle e with center A and radius point F and 
						construct the intersection point G of e and AB.	Measure 
							AG and GB and find their ratio. We see that we
						have <em> constructed</em> the golden ratio.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj1-5.png" alt = "Project 1">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "golden-rectangle" class = "tutorial-p-head">
						1.3.2 Construction of Golden Rectangle </span><br>
						You now have all of the tools necessary for the construction of the golden rectangle
						as described in the text.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj1-6.png" alt = "Project 1">
						</div>
					</div>
				</div>
		</div>
		<?php
				include('../../footer.php');
		?>
	</div>
  </body>
</html>
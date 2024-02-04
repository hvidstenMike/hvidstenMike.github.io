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
					Geogebra Tutorial on Project 1
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
						golden ratio and a golden rectangle. To begin, start up GeoGebra (Web or desktop). 
						Read through the introductory material. In this tutorial, we will not repeat all of 
						the instructions from the text, but instead cover the more complex points. 
						(You should have covered the basics of 
						using GeoGebra Tools, found on the
						web site for the text, before beginning this project.)
						We start by assuming
						that you have constructed a segment f=AB and attached a point C as described in section 1.3.1.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj1-1.png" alt = "Project 1">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Now, make the Segment Tool active 
							(click on the Line Button and choose the Segment menu item underneath).  
							Then, select A and C to create segment g=AC. Next select C and B to
							create segment h=CB. In the Input box at the bottom of the screen
							(bottom of the Algebra View in the Web App) we will compute the ratio
							of the length of f=AB to h=BC. To do this, we type in 'f/h' in the Input box
							and hit 'Enter' on the keyboard. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj1-2.png" alt = "Project 1">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  A new entry is created in the Algebra View with label 'a.' This 
						is a numerical object that records the ratio we just defined. 
						Next, create the ratio for 'h/g.' As we move C we notice that there is a point
						where these two ratios almost match. As mentioned in the text, we can 
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
						As instructed in the text, construct segment AB with midpoint C and 
						perpendicular at B (Midpoint tool is under the Point Button). 
						Then, carry out the constructions from the text to get a circle 
						c with center B and radius point C, and the intersection point D of the circle 
						with the perpendicular at B.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj1-4.png" alt = "Project 1">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Next, hide circle c and construct segment h=AD and the circle d 
						with center D and radius 
						point B. Construct the intersection point F of d and h. Finally,
						construct circle e with center A and radius point F and 
						construct the intersection point G of e and AB.	Construct
						i=AG and j=GB and then find the ratio a=i/j. We see that we
						get the golden ratio.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj1-5.png" alt = "Project 1">
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
							<img src="./images/geogebra-proj1-6.png" alt = "Project 1">
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
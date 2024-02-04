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
						To begin, start up Geometry Explorer. 
						Read through the introductory material from the text. 
						In this tutorial, we will not repeat all of 
						the instructions from the text, but instead cover the more complex points. 
						(You should have covered the basics of 
						using Geometry Explorer	Tools, found on the
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
						<p>  We will now compute the ratio
							of the length of AB to BC. To do this, select points A, B, and C
							(in that order) and choose <b>Ratio</b> from the 
							<b>Measure</b> menu. The new ratio will be added to our window.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj1-2.png" alt = "Project 1">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Next, we will compute the ratio of BC to AC. Select B, C, and A
						(in that order) and choose <b>Ratio</b> from the 
							<b>Measure</b> menu.
						As we move C, we notice that there is a point
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
						As instructed in the text, construct segment AB with midpoint C and 
						perpendicular at B (the Midpoint button 
						<img src="./images/midpoint.png"  style="width:30px" alt ="Midpoint Tool">
						is in the Construct panel). 
						Then, carry out the constructions from the text to get a circle 
						c with center B and radius point C, and the intersection point D of the circle 
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
						Next, hide circle c and construct segment AD and the circle d 
						with center D and radius 
						point B. Construct the intersection point F of d and AD. Finally,
						construct circle e with center A and radius point F and 
						construct the intersection point G of e and AB.	Select A, G, and B (in that order)
							and choose <b>Ratio</b> from the 
							<b>Measure</b> menu. We see that we
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
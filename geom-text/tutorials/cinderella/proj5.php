<! DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exploring Geometry - </title>
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
					Tutorial on Project 5
				</header>
				
				<div class = "tutorial-select-anchors" >
				<label class = "tutorial-label"> Page Topics: &nbsp;</label> 
					<select  name="page-links" onchange="location = this.value;">
					<option value="#construct">Construction </option>
					<option value="#dilate">Dilation</option>
					<option value="#trace">Tracing a Point</option>
					</select>
				</div>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "construct" class = "tutorial-p-head">
						Construction of a Bézier Curve </span><br>
						We start with three points A, B, and C, with segments from A to B and from
						B to C. We attach a point A' to segment AB and measure the distance from 
						A to A' and the distance from A to B. 
						Then, we calculate the ratio of AA' to AB by using the Function tool.
							(If you need a refresher on using the Function tool, see the tutorial on Project 4).
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj5-1.png" alt = "Project 5">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  <span id = "dilate" class = "tutorial-p-head">
						Dilation </span><br>
						The next step is to use this ratio as a dilation factor to dilate point
							C to B by this ratio.  Using the Point tool, create a point just to the right of
							segment BC. Change the label/identifier of this new 
							point by right-clicking on
							the point (Mac OS: ctrl-clicking) and choosing 'Information.' 
							In the dialog box that pops up click the Info tab 
							<img src="./images/infoTab.png" style="width:30px" alt="InfoTab">.
							Type B' in for the Identifier and hit the Return key. Then, you can close
							this dialog box by clicking the 'x' in the upper right corner. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj5-1-a.png" alt = "Project 5">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  The next step is to reset the x and y coordinates of B' so that 
							they represent the value of dilating C to B by the ratio we calculated above. 
							We do this by using the Function tool. Click this and then click in
							the middle of the window to bring up the Function Dialog box.  
							Type in <em> B'.xy = B +(C-B)*</em> and then click on the ratio 
							from the main window. The text in the Function box should look like the
							text shown here. Click 'Evaluate' and then click in the main window
							to update the screen. Move point A' and note how B' updates correspondingly. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj5-2.png" alt = "Project 5">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Next, 
						create segment A'B' and then dilate B' towards A' with the same ratio as we did
						above. (Go through the previous two steps for segment A'B'.) 
						This will create point ct. (Make sure that the identifier for A' is set to A'.)
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj5-3.png" alt = "Project 5">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "trace" class = "tutorial-p-head">Tracing a Point</span><br>
						We now will create a trace of point c(t). 
						To do this, we will use the Locus tool. Click on the Locus button
						<img src="./images/locusIcon.png" style="width:30px" alt="Locus Button"> in the Toolbar.
						To create a locus we click on point A' and then on point ct. A 'trace' of 
						the point ct is drawn, assuming A' moves along the entire length of AB. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj5-4.png" alt = "Project 5">
						</div>
					</div>
					
					<div class = "tutorial-end-comments">
						<p>
							The remaining constructions and exercises in Project 5 should now be doable.
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
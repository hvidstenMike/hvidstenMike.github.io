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
						A to A' and the distance from A to B. (Use the <b>Distance</b> tool under 
						the <b>Measure</b> menu.)
						Then, we calculate the ratio of AA' to AB by using the Calculator.
							(If you need a refresher on using the Calculator, see the tutorial on Project 4).
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
							C to B by this ratio.  The <b>Dilate...</b> tool is located under the 
							<b>Transform</b> menu.  To use this tool, we need to first select 
							the center of dilation (what point we are dilating towards). Click on point
							B and then choose <b>Mark Center</b> under the <b>Transform</b> menu. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj5-2.png" alt = "Project 5">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  The next step is to mark the dilation ratio. This is the ratio we just 
						calculated. Select this measurement in the main window and then 
						choose <b>Mark Scale Factor</b> under the <b>Transform</b> menu. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj5-3.png" alt = "Project 5">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Now, select point C and choose <b>Dilate...</b> under the <b>Transform</b> menu.
						A dialog box will pop up asking us to choose a type of dilation. Click 
						on 'Marked Ratio' and then click 'Dilate.'
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj5-4.png" alt = "Project 5">
						</div>
					</div>
					
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> A new point B' will be created with the desired dilation factor towards B. 
						Create segment A'B' and then dilate B' towards A' with the same ratio as we did
						above. This will create point c(t).
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj5-5.png" alt = "Project 5">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "trace" class = "tutorial-p-head">Tracing a Point</span><br>
						We now will create a trace of point c(t). 
						To do this, select point c(t) 
							Then, choose <b>Trace Point</b> under the <b>Display</b> menu. 
							As we move point A', all of the dilated points
							will move in kind, and point c(t) will leave a 'trace' of where it is moved to. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj5-6.png" alt = "Project 5">
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
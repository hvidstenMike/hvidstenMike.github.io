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
					Tutorial on Project 16 -  Koch Snowflake
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 16 explores a specific fractal curve - the Koch curve.
							The construction of this curve is <em>recursive</em> and so
							requires the creation of a Custom Tool. We create this tool by recording the
							construction of the template Koch curve and then recursively apply that recording.
							To start our recording choose <b>New Recording...</b> from the 
							<b>File</b> menu. A Recorder window will pop up. Click the 'Record' button
							to start recording our template construction.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-1.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> To start our template construction we create a segment AB. Note how the recorder
						records what we have done. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-2.png" alt = "Project 16">
						</div>
					</div>
					
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 Next, Mark point A as a center of dilation, define a custom dilation of scale factor 1/3 and 
						 dilate B towards A by this factor, yielding point C. 
						 (If you need a refresher on how to do dilations,
						 look at the tutorial for Project 5) Then, define a custom dilation of scale factor 2/3
						 and dilate B towards A to get point D.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-3.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Hide segment AB. We have split AB into three parts. We now create the 'bump' in the
						Koch template curve. Mark point C as a center of rotation and define a custom rotation
						of 60 degrees. then, rotate D about C to get point E. Finally, connect all the points with
						segments to finish the construction  of the template curve.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-4.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> The Recorder should have accurately recorded all of your steps. Do a quick 
						comparison to the Recorder shown here to make sure your construction was accurate,
						but do not stop the recorder yet.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-5.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> We will now instruct the recorder to do the replacement process for the 
						fractal Koch curve. We can do this using the <em>Loop</em> button in the Recorder window.
						Select points A and C and then click the Loop button. The Recorder records that we want the 
						entire construction of the template carried out on A and C. That is, 
						the roles of A and B get replaced by A and C and then the entire template construction 
						will be carried out.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-6.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Likewise, select C and E and click the Loop button, select E 
						and D and click the Loop button, and select D and B and click the Loop button.
						Then, click the Stop button in the recorder. Here is what the Recorder should look like. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-7.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Now, let's carry out the replacement process for the Koch curve. Clear the screen
							and create points A and B. Select both points. In the Recorder window,
							you will note that the 'Step', 'Play', and 'FF' buttons are active.
							Click 'Play.' a dialog box will pop up asking for a recursion level. 
							A value of '0' would mean that the recording would just do the basic template 
							construction and not loop at all. A value of '1' would mean that the recoding would loop 
							(or do a replacement) on each sub-segment of the template. A value of '2' would mean 
							replacing all sub-sub-segments, and so forth. Type in '2' and hit 'Okay.'
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-8.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> The recording will now play back each step of the replacement process, recursively descending 
						down segment levels as the template is used to to replace smaller and smaller segments. Watch closely
						to get a feel for how this recursive process works.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-9.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> There are a lot of labels here, so let's hide them by choosing <b>Hide All Labels</b>
							from the <b>View</b> menu. Also, let's click and drag points A and B to stretch the curve
							out a bit. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-10.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p>
							The remaining constructions and exercises in Project 16 should now be doable.
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
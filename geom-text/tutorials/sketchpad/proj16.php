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
					Tutorial on Project 16 -  Koch Snowflake
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 16 explores a specific fractal curve - the Koch curve.
							The construction of this curve is <em>recursive</em> and so
							requires the creation of a Custom Tool in Sketchpad. 
						 To create this tool, we start with the construction as outlined 
						 on page 456. This yields the Koch template curve shown, with points 
						 A, C, E, D, and B and segments joining these points. Create a segment 
						 from C to D. Color this segment white. This is to hide this middle segment in 
						 future uses of our tool. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-1.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Hide all of the labels and turn off the auto-labeling of points,
						 (<b>Edit</b>-> <b>Preferences...</b>)
						 to save clutter in our constructions.   
						Next, we define our custom tool. Tools are defined using the Custom Tool 
						button <img src="./images/toolIcon.png" style="width:30px" alt ="Custom Tool">
						in the Toolbar. To create a custom tool, we first select the object that the tool
						is to create. In our case, we select the whole template curve. 
						Then, we click on the Custom Tool button and choose <b>Create New Tool...</b>
							A dialog box will pop up. Label the tool 'Koch' and click 'OK.' 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-2.png" alt = "Project 16">
						</div>
					</div>
					
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 We will now use this new tool to replace each edge of our curve with a new copy of the
							template curve. Our new tool shows up under the Custom Tool button as a button named
							'Koch.' Click on this button to make it active and then select points A and C. 
							The tool carries out
							the construction steps we recorded, replacing the input points A and B by the points A
							and C. The net effect is a small copy of the template curve with endpoints A and C.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-3.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 Now apply the new tool
						 to the remaining segments (CE, ED, and DB). 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-4.png" alt = "Project 16">
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
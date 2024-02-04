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
					Geogebra Tutorial on Project 16 -  Koch Snowflake
				</header>
				
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Project 16 explores a specific fractal curve - the Koch curve.
							The construction of this curve is <em>recursive</em> and so
							requires the creation of a new Tool in GeoGebra. 
						 To create this tool, we start with the construction as outlined 
						 on page 456. This yields the Koch template curve shown, with points 
						 A, C, E, D, and B and segments joining these points. Create a segment 
						 from C to D (this is segment k in our construction). Make this segment 
						 a bit thicker and color it white. This is to hide this middle segment in 
						 future uses of our tool. Also, hide all labels, as we do not want labels
							cluttering up our tool's action. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-1.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Next, we define our custom tool. Tools are defined using the <b>Tools</b>
							menu at the top of the GeoGebra window. Choose <b>Create New Tool...</b>
							from under this menu. A dialog box will pop up. The first task is to select 
							all of the objects that arise from the construction, other than the two points 
							(A and B) we started with. These objects are called 'Output Objects'. 
							Select C, E, and D, and then select all of the segments visible in the Algebra View.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-2.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Once we have selected the output objects, we click on the second tab to
							select 'Input Objects.' GeoGebra will probably already have selected A and B 
							input. If not, select these now.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-3.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 To finish our custom Tool definition, click on the third tab and give your tool
							a name. A reasonable choice would be 'Koch.' We can also provide a tooltip
							to help users know what this tool expects as inputs when used. In our
							case, the tool would need to have two points to serve as A and B. When done,
							Click 'Finish' and a dialog box should pop up saying the tool was successfully created.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-4.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 We will now use this new tool to replace each edge of our curve with a new copy of the
							template curve. Our new tool shows up in the Toolbar as a button with
							a wrench icon. Click on this button and then select points A and C. The tool carries out
							the construction steps we recorded, replacing the input points A and B by the points A
							and C. The net effect is a small copy of the template curve with endpoints A and C.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-5.png" alt = "Project 16">
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
							<img src="./images/proj16-6.png" alt = "Project 16">
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
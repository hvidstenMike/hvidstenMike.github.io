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
					The Toolbar - Creating Lines and Segments
				</header>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "toolbar" class = "tutorial-p-head">Sketchpad Tool Bar </span><br>
						The main tools used to create geometric figures in Geometer's Sketchpad 
						are located in a vertical
						tool bar of buttons at the left side of 
						the application window. Some of these buttons have a small black triangle at the bottom right.
						Clicking once on any of these buttons reveals a list of menu items.  
						 For example, here we have clicked on the Segment button and dragged 
						over to the 
						Line menu item. Once we release the mouse, this tool becomes the active tool in that group. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/toolbar-1.png" alt = "Toolbar">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "basic-construction" class = "tutorial-p-head">Lines and Segments </span><br> 
						To illustrate the use of a tool in the Toolbar, we will create a line defined by two points. 
						Click on the Line Button and then click
							somewhere in the window and drag.  
							Notice that Sketchpad creates a point (A) where you first clicked and a second point(B) 
							where you released the mouse. These define the line. Note that Sketchpad does not automatically
							show labels for points. To see the label, we can right-click (Mac OS: ctrl-click)
								on a point and choose 'Show Label.' If we want Sketchpad to automatically
								label new points, we can go to the <b>Edit</B> menu and select <b>Preferences...</b>
								In the dialog that pops up, we can click on the 'Text' tab and then click 
								'Show Labels Automatically -- For All new Points.'
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/toolbar-2.png" alt = "Toolbar">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Now, let's create a segment. Click on the Line Button and drag over to 
						select the Segment menu item. 
						We have changed the functionality of the Line tool
						so that it is now a Segment tool. This is a fundamental technique used to provide for 
						multiple tools with just a few buttons. With the Segment Tool now active, click and drag to create a 
						segment.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/toolbar-3.png" alt = "Toolbar">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							Try experimenting with the various
							tools in the Tool Bar.  If you want more general info
							on using Geometer's Sketchpad, there are numerous on-line tutorials. 
							A nice brief intro is at <a href="http://0-www.learner.org.librus.hccs.edu/courses/learningmath/geometry/session4/part_a/tutorial.html">
							this site </a>.
							The Geometer's Sketchpad web site has resources at 
							<a href="http://www.keycurriculum.com/node/637.html">
								this page </a>.
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
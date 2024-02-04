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
					The Toolbar - Creating Lines and Segments
				</header>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "toolbar" class = "tutorial-p-head">Geometry Explorer Tool Bar </span><br>
						The main tools used to create geometric figures in Geometry Explorer 
						are located in a vertical
						Tool Panel of buttons at the left side of 
						the application window. The
						icons (pictures) on the buttons depict the function that the particular
						button serves. The Tool Panel is split into four sub-panels: Create,
						Construct, Transform, and Color Palette.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/toolbar-1.png" alt = "Toolbar">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "basic-construction" class = "tutorial-p-head">Lines and Segments </span><br> 
						To illustrate the use of a tool in the Tool Panel, we will create a line defined by two points. 
						Click on the Line Button (2nd button in 2nd row) and then click
							somewhere in the window and drag.  
							Notice that the program creates a point (A) where you first clicked and a second point(B) 
							where you released the mouse. These define the line. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/toolbar-2.png" alt = "Toolbar">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Now, let's create a segment. Click on the Segment Button and click and drag to create a 
						segment. Click on the Circle Button and create a circle. 
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
							on using Geometry Explorer, consult the Geometry Explorer User Guide,
							which can be downloaded at 
							<a href="http://www.gac.edu/~hvidsten/gex/guide.pdf">
							http://www.gac.edu/~hvidsten/gex/guide.pdf</a>. Note that this guide is a
							pdf file of about 5 mb.  The program also has help pages which can be accessed
							from the <b>Help</b> menu.
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
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
					The Toolbar - Creating Lines and Segments
				</header>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "toolbar" class = "tutorial-p-head">Cinderella Tool Bar </span><br>
						The main tools used to create geometric figures in Cinderella
						are located in a horizontal
						tool bar of buttons at the top of 
						the application window. The icons on the buttons describe the buttons use. Also, when the mouse
							hovers over a button, a tooltip pops up describing the button's use. 
						 For example, here we have hovered over the Segment button. 
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
						Click on the Line Button. The button will turn gray to show it is active. 
							Also, a textual description of how to use the tool will appear in a text field about
								a third of the way down the window (outlined in yellow here.) 
							Click and drag to construct the line. 
							Notice that Cinderella creates a point (A) where you first clicked and a second point(B) 
							where you released the mouse. These points define the line. 
							Note that Cinderella automatically
							shows labels for points (upper case) and for lines (lower case.) 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/toolbar-2.png" alt = "Toolbar">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Now, let's create a segment. Click on the Segment Button. Then,
							click and drag to create a 
						segment.  Find the Circle button and create a circle. 
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
							on using Cinderella, consult the Cinderella 
							<a href="http://doc.cinderella.de/tiki-index.php">
								 Documentation Site</a>.
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
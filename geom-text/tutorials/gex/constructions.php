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
					Constructing vs Creating Objects  
				</header>
				
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						In our projects, we make a distinction between <em> creating</em> 
							and <em> constructing </em> objects. Creating an object requires no 
							prior objects to exist. For example, if we use the Segment Tool 
							 we can click and drag to create a segment. Here we have created 
							a segment AB and a point C.  Suppose we want to construct the perpendicular
								to the segment through C.  We can construct the perpendicular
								by using the Perpendicular button. 
								This is one of the buttons in the Construct sub-panel of the
								Tool Panel. All of the tools in the Construct Panel will construct objects
								from <em>existing</em> objects that need to be 
								pre-selected. If no objects are selected,
								then all of these menu items will be inactive (grayed out).
									If we hover over the Perpendicular Button, we see at 
									the bottom of the page a short description of the objects that need
									to be selected in order to carry out the construction. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/construction-1.png" alt = "Constructions">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						To construct the perpendicular we need to select a point and a linear object
						(line, segment, or ray). 
						In the main window, click on the point C and then the segment. The 
						Perpendicular button will now be active. Once we click 
						on this button, 
						the perpendicular to the segment through C will be constructed.
						The perpendicularity of this line will be dynamically updated as we move 
							A, B, or C. This <em> dynamic </em> updating is one of the
							prime strengths of dynamic geometry software.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/construction-2.png" alt = "Constructions">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							If you want more general info
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
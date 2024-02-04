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
								by using the <b> Perpendicular Line</b> menu option under the 
								<b>Construct</b> menu. Under the <b>Construct</b> menu we see 
								a drop-down list of other construction tools. All of these involve objects that are
								<em> constructed</em> from existing objects. If no objects are selected,
								then all of these menu items will be inactive (grayed out).
									If we hover over the <b>Perpendicular Line</b> menu item, we see at 
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
						To construct the perpendicular we need to select a point and a line. 
						In the main window, click on the point C and the segment. The 
						<b>Perpendicular Line</b> menu item will now be active. Once we choose
						this menu item, 
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
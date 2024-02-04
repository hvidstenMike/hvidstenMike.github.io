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
					Constructing vs Creating Objects  
				</header>
				
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						In our projects, we make a distinction between <em> creating</em> 
							and <em> constructing </em> objects. Creating an object requires no 
							prior objects to exist. For example, if we use the Segment Tool (Under the Line
							Button) we can click and drag to create segments at will. Here we have created 
							a segment f=AB and a point C.  Suppose we want construct the perpendicular
								to f through C.  This requires f and C to exist.
								The fourth button from the left in the Tool Bar is by
								default the Perpendicular Line tool. If we click on this button, we saw
								a drop-down list of other tools. All of these involve lines that are
								<em> constructed</em> from existing objects. Those existing objects are 
								depicted in red. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-intro8.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						To construct the perpendicular, select the segment f.
						You will see a line perpendicular to f
						appear. Drag the cursor and click on C. The perpendicular to f through C is now constructed.
						The perpendicularity of this line will be dynamically updated as we move f or C. Select C
						and drag to move it around. 
						The perpendicular will update accordingly. This <em> dynamic </em> updating is one of the
							prime strengths of dynamic geometry software.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-intro9.png" alt = "GeoGebra Example">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							If you want more general info
							on using GeoGebra, there are numerous on-line tutorials. 
							A nice brief intro is at <a href="http://www.ms.uky.edu/~droyster/courses/fall10/MA341/Geogebra/Introduction%20to%20GeoGebra.pdf">
							www.ms.uky.edu </a>.
							The GeoGebra web site	
								is the definitive reference. 
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
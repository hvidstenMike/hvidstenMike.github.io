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
					Attaching Points to Objects
				</header>
				
				<div  id = "tutorial-content">
					
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> An action that we will often use for doing Projects from <em>Exploring Geometry</em>
						is that of 'attaching' a point to an object. Create a segment EF on the screen. 
						Click on the Point Button and then click somewhere
						along the segment EF. A point G will be created. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/attach-1.png" alt = "Attach Points">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> This point is attached to the segment in the sense that is constrained to move only along 
						that segment. Click the Move/Select Button
							<img src="./images/moveIcon.png" style="width:30px" alt="Move Button">
							and then click and drag G. You will find that you cannot drag G off of the segment. 
						It is attached to the segment.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/attach-2.png" alt = "Attach Points">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							If you want more general info
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
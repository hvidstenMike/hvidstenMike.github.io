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
					Undoing and Redoing Constructions 
				</header>
				
				<div  id = "tutorial-content">
					
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						If we make a mistake in a construction, we can always <em> undo</em> the construction.
						Under the <b>Edit</b> menu, the first two sub-menu items are <b>Undo</b>
						and <b>Redo</b>.						
						Clicking the Undo (Redo) button causes one construction step to be undone (redone). 
						You can always use the 
						Undo button to undo a construction to any prior state. 
						Undo and Redo also have keyboard shortcuts. To undo a step, we type Control-Z. 
						To redo	a step, we type Control-Y. 					
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/undo-1.png" alt = "Undo/Redo">
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
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
		<div id = "software-projects-main">
				<header class = "software-projects-header">
					Using Geometry Explorer for Exploring Geometry
				</header>
				<div class = "tutorial-comments">
					<p>
						The tutorials below are designed to help you carry out the explorations
						from the Projects in <em>Exploring Geometry</em>.
						If a Project is not listed, then it is assumed that the tools 
						needed for that project are covered in the <b>Geometry Explorer Tools</b>
						tutorials. As you progress through the projects, your mastery of
						Geometry Explorer will increase. Later tutorials will be much
						more concise than earlier tutorials.
					</p>
				</div>
				<div  id = "software-projects-menu-div">
				  <ul>
					
					<li class="software-projects-menu-item"><a href = "./intro-desktop.php"> 
						Using Geometry Explorer as a Desktop App
					</a></li>
					<li class="software-projects-menu-item">
						<span class="software-projects-menu-item-text"> Geometry Explorer Tools:</span> 
						<select  name="page-links" onchange="location = this.value;">
							<option value="">Select a Topic:</option>
							<option value="./toolbar.php">Tool Bar</option>
							<option value="./toolbar.php">Lines and Segments</option>
							<option value="./attach-points.php">Attaching Points</option>
							<option value="./selection.php">Selection</option>
							<option value="./intersection.php">Intersections</option>
							<option value="./constructions.php">Constructions</option>
							<option value="./measurements.php">Measurements</option>
							<option value="./transform.php">Transformations</option>
							<option value="./undo-redo.php">Undo/Redo</option>
						</select>
					</li>
					<li class="software-projects-menu-item">
						<span class="software-projects-menu-item-text"> Geometry Explorer Help for Projects</span> 
						<select  name="page-links" onchange="location = this.value;">
							<option value="">Select a Project:</option>
							<option value="./proj1.php">Project 1</option>
							<option value="./proj2.php">Project 2</option>
							<option value="./proj4.php">Project 4</option>
							<option value="./proj5.php">Project 5</option>
							<option value="./proj7.php">Project 7</option>
							<option value="./proj10.php">Project 10</option>
							<option value="./proj11.php">Project 11</option>
							<option value="./chap8.php">Chapter 8 Projects</option>
							<option value="./proj15.php">Project 15</option>
							<option value="./proj16.php">Project 16</option>
							<option value="./proj17.php">Project 17</option>
							<option value="./proj18.php">Project 18</option>
						</select>
					</li>
				  </ul>
				</div>
		</div>
		<?php
				include('../../footer.php');
		?>
	</div>
  </body>
</html>
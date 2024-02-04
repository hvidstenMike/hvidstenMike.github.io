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
					The Geometry Explorer Application
				</header>
				
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p><span id = "launch" class = "tutorial-p-head">Getting Geometry Explorer </span><br>
						Geometry Explorer is a dynamic geometry software package for exploring geometry.
						  The program is freely available. 
						  To access the program 
						   you can go to the <a href="http://www.gac.edu/~hvidsten/gex">
							Geometry Explorer Site </a> using any standard browser and follow the instructions. 
							The version of Geometry Explorer you should use is Geometry Explorer 3.0 or higher. 
						   </p>
						</div>
						<div class="tutorial-right">
							<img src="./images/download.png" alt="Geometry Explorer Site" />
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Once you have installed the program, you can locate and run the application. 
						Once the
						program has started up you should see a screen like the one shown here.
							Information on using Geometry Explorer to create geometric constructions is on 
							<a href="index.php"> this page </a>.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/gex.png" alt = "Geometry Explorer">
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
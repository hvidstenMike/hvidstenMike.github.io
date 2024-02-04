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
					GeoGebra as a Desktop Application
				</header>
				
				<div class = "tutorial-select-anchors" >
				<label class = "tutorial-label"> Page Topics: &nbsp;</label> 
					<select  name="page-links" onchange="location = this.value;">
					<option value="#launch">Launching GeoGebra</option>
					<option value="#more">To Learn More</option>
					</select>
				</div>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p><span id = "launch" class = "tutorial-p-head">Launching GeoGebra from the Desktop </span><br>
						GeoGebra is a dynamic geometry software package for exploring geometry, algebra, 
  						   statistics, calculus, and three-dimensional surfaces. GeoGebra is an open source 
						   program that is freely available. There are several ways to use 
						   GeoGebra. To download the program as a desktop application, 
						   you can go to www.geogebra.org using any standard browser. 
						   From the top menu, select the 'Download' item.
						   The version of GeoGebra you should use is GeoGebra 5 or higher.</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-download.png" alt="Launch GeoGebra on Web" />
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Scroll down until you see the download options for desktops. Click  
						the platform on which you want to install the program. A dialog box will
						pop up asking you to verify that you want to download the program. Click 'Save.'
						Another dialog box will pop up. Click 'Run' and then follow the on-screen instructions
						for installing the program on your computer.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-download2.png" alt="Launch GeoGebra on Web" />
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Once the program is installed, you can locate and run the program. Once the
						program has started up you should see a screen like the one shown here.
							Information on using GeoGebra to create geometric constructions is on 
							<a href="index.php"> this page </a>.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-download3.png" alt = "GeoGebra Buttons">
						</div>
					</div>
					
					<div class = "tutorial-end-comments">
						<p><span id = "more" class = "tutorial-p-head">To Learn More</span><br>
							If you want more general info on
							using GeoGebra, there are numerous on-line tutorials. 
							A nice brief intro is at <a href="http://www.ms.uky.edu/~droyster/courses/fall10/MA341/Geogebra/Introduction%20to%20GeoGebra.pdf">
							www.ms.uky.edu </a>.
							The GeoGebra web site is the definitive reference. 
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
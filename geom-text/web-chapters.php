<! DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exploring Geometry - Web Chapters</title>
	<link href='http://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet'  type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'  type='text/css'>
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="siteJS.js"> </script>
  </head>
  <body>
    <div id="wrapper">
		<nav>
			<?php
				include('menus.php');
			?>
		</nav>
		<div id = "web-chapters-main">
				<header class = "web-chapters-header">
					Web Chapters to Accompany Exploring Geometry
				</header>
				<div  id = "web-chapters-menu-div">
				  <ul>
					<li class="web-chapters-menu-item"><a href = "./web-chapters/toc.pdf"> 
						Table of Contents
					</a></li>
					<li class="web-chapters-menu-item"><a href = "./web-chapters/hilbert.pdf"> 
						Chapter 11 - Universal Foundations
					</a></li>
					<li class="web-chapters-menu-item"><a href = "./web-chapters/neutral.pdf"> 
						Chapter 12 - Foundations of Neutral Geometry
					</a></li>
					<li class="web-chapters-menu-item"><a href = "./web-chapters/euclid.pdf"> 
						Chapter 13 - Foundations of Euclidean Geometry
					</a></li>
					<li class="web-chapters-menu-item"><a href = "./web-chapters/elliptic.pdf"> 
						Chapter 14 - Foundations of Elliptic Geometry
					</a></li>
					<li class="web-chapters-menu-item"><a href = "./web-chapters/proj.pdf"> 
						Chapter 15 - Foundations of Projective Geometry
					</a></li>
					<li class="web-chapters-menu-item"><a href = "./web-chapters/complex.pdf"> 
						Chapter 16 - Complex Analytic Functions
					</a></li>
					<li class="web-chapters-menu-item"><a href = "./web-chapters/hyper-transf.pdf"> 
						Chapter 17 - Hyperbolic Transformations
					</a></li>
					<li class="web-chapters-menu-item"><a href = "./web-chapters/back.pdf"> 
						Bibliography and Index
					</a></li>
					<li class="web-chapters-menu-item"> 
						<span>If you are an Instructor and would like the solutions</span> <br>
						<span>manual for the
						Web Chapters, contact the author at</span><br>
						<span>hvidsten@gustavus.edu.</span 
					</li>
				  </ul>
				</div>
		</div>
		<?php
				include('footer.php');
		?>
	</div>
  </body>
</html>
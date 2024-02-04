<! DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exploring Geometry - First Edition</title>
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
		<div id = "content">
			<aside id="first-edition-aside">
				<a href="./first-edition.php"> <img src = "./images/firstEdition.jpg" alt="Exploring Geometry, 1st Ed"> </a>
			</aside>
		
			<article>
				<header class = "article-header">
					 Exploring Geometry, First Edition
				</header>
				<p>
					A Discovery-Based Approach to College Geometry.
					Developed with support from the 
						National Science Foundation 
						Grant #0230788.  Published 2005 by McGraw-Hill.  
				</p>
				<header class = "article-section">Support Materials</header>
				<ul class="article-list">
					<li> Instructor's Guide - contact the author</li>
					<li> <a href="./studentGuide-ed1.pdf"> Student Guide </a> with answers to selected exercises (~441kb). </li> 
					<li><a href="./first-edition/sample-syllabus.html">Sample syllabus
						</a> for a one-term course</li>
					<li><a href="./first-edition/sample-schedule.html">Detailed schedule
						</a>from Author's Fall 2003 Geometry course at Gustavus Adolphus College</li>
					<li> <a href="./first-edition/Errata-first-edition.html">Errata</a> (for first edition, first
							printing) (2005) </li>
					<li> <a href="./first-edition/Errata-first-edition-instructors-manual.html">Errata</a> (for
						Instructor's Manual, first edition) (2005) </li>
					<li><a href="http://homepages.gac.edu/~hvidsten/gex/index.html">Geometry Explorer</a> 
					software to dynamically explore projects in text. </li> 
				</ul>
			</article>
		</div>
		<?php
				include('footer.php');
		?>
	</div>
  </body>
</html>
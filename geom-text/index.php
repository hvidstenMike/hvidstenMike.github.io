<! DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Exploring Geometry</title>
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
			<aside>
				<a href="./index.php"> <img src = "./bookCover.jpg" alt="Exploring Geometry, 2nd Ed"> </a>
			</aside>
		
			<article>
				<header class = "article-header">
					 Exploring Geometry, Second Edition
				</header>
				<p>
					This text promotes student engagement with the beautiful ideas of geometry. 
					A system of experimentation followed by explanation 
					and proof is central. 
					Exploratory projects help students develop an 
					intuitive sense of how to prove results and visualize connections 
					between statements, making these connections real. Intuition leads to  
					conjectures needed for rigorous proof of theorems.
				</p>
				<header class = "article-section">Main Features</header>
				<ul class="article-list">
					<li> Projects used to explore topics and gain understanding.</li>
					<li> Free geometry software to explore non-Euclidean geometries is available from the author 
					at this 
					<a href="http://homepages.gac.edu/~hvidsten/gex/index.html"> download site. </a> </li> 
					<li> Coverage of Euclidean, Transformational, Hyperbolic, Elliptic, and Projective geometries. </li> 
					<li> Instructor's guide with complete answers to exercises. (Available from CRC Press) </li>
					<li> Student Guide with answers to selected exercises. </li>
					<li> All major dynamic geometry software programs can be used for projects. </li>
					
				</ul>
			</article>
		</div>
		<?php
				include('footer.php');
		?>
	</div>
  </body>
</html>
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
					Geogebra Tutorial on Project 4
				</header>
				
				<div class = "tutorial-select-anchors" >
				<label class = "tutorial-label"> Page Topics: &nbsp;</label> 
					<select  name="page-links" onchange="location = this.value;">
					<option value="#power-point">Power of a Point</option>
					<option value="#distance">Measuring Distance</option>
					<option value="#calculate">Calculating Products</option>
					</select>
				</div>
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "power-point" class = "tutorial-p-head">
						Power of a Point </span><br>
						In the first part of Project 4, we define the power of a point with respect to a
						circle. The first part of the project involves the construction of a circle
							c, a point P outside c, and two rays from P that each intersect the
							circle at two points. These are points P<sub>1</sub>, P<sub>2</sub>, 
							Q<sub>1</sub>, and Q<sub>2</sub>. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj4-1.png" alt = "Project 4">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  <span id = "distance" class = "tutorial-p-head">
						Measuring Distance </span><br>
						The next step is to find the distance from P to P<sub>1</sub>
						(denoted PP<sub>1</sub>), and the distances PP<sub>2</sub>,
						PQ<sub>1</sub>, PQ<sub>2</sub>.	To find these distances we will use the Distance tool.
							This is located under the button with the Angle icon. Click on the Angle button 
							and select the Distance tool. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj4-2.png" alt = "Project 4">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  With the Distance tool active, we click on the two points 
						for which we want to measure the distance. Click on P and P<sub>1</sub>,
						then P and P<sub>2</sub>, P and Q<sub>1</sub>, and finally P and Q<sub>2</sub>. 
						The four measurements are located on the screen. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj4-3.png" alt = "Project 4">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Now, we will compute products with these distances. To make these easier
						to carry out,we will shorten the names of the measurements. For each distance 
						measurement in the Algebra View, right click on the measurement and select 'Rename.'
						A dialog box will pop up allowing for the renaming of the measurement. Delete the 'distance'
						part of each name.  
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj4-4.png" alt = "Project 4">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "calculate" class = "tutorial-p-head">Calculating Products</span><br>
						The next step is to find the product of   PP<sub>1</sub> with  PP<sub>2</sub>
						and the product of  PQ<sub>1</sub> with  PQ<sub>2</sub>. In the text, we say to use
						a calculator to find this product. In GeoGebra, we calculate
						algebra quantities by typing in the 'Input' text field at the bottom of the screen.
						Type 'PP1 PP2' into the Input field and hit return. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj4-5.png" alt = "Project 4">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						A new Number value will appear in the Algebra View that displays this product.
						Now, calculate the product of  PQ<sub>1</sub> with  PQ<sub>2</sub>. 
						We note that these two products are the same, even as we move point P around.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/geogebra-proj4-6.png" alt = "Project 4">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p>
							The remaining constructions and exercises in Project 4 should now be doable.
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
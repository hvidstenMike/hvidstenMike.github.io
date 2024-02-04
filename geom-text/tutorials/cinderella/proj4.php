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
					Tutorial on Project 4
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
							<img src="./images/proj4-1.png" alt = "Project 4">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  <span id = "distance" class = "tutorial-p-head">
						Measuring Distance </span><br>
						The next step is to find the distance from P to P<sub>1</sub>
						(denoted PP<sub>1</sub>), and the distances PP<sub>2</sub>,
						PQ<sub>1</sub>, PQ<sub>2</sub>.	To find the distance
							from P to P<sub>1</sub> we click on the Distance tool
							<img src="./images/distanceIcon.png" style="width:30px" alt="Distance Button">
							in the Toolbar and then click on point P and drag to point P<sub>1</sub>.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj4-2.png" alt = "Project 4">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p>  Now, find the distances from P to P<sub>2</sub>,
						P to Q<sub>1</sub>, and P to Q<sub>2</sub>. 
						The four measurements will now be visible on the screen. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj4-3.png" alt = "Project 4">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> <span id = "calculate" class = "tutorial-p-head">Calculating Products</span><br>
						The next step is to find the product of   PP<sub>1</sub> with  PP<sub>2</sub>
						and the product of  PQ<sub>1</sub> with  PQ<sub>2</sub>. We will use the Function tool
							to find these products. Click on the Function tool
							<img src="./images/functionIcon.png" style="width:30px" alt="Function Button">
							in the Toolbar and then click in the middle of the window. 
							A dialog box will pop up for defining the product. Click on
							the PP<sub>1</sub> text from the main window. A term will appear (here 'dist0') 
							representing this measurement. Type in '*' for multiplication and then 
							click on the PP<sub>2</sub> text. Then, click 'Equation'
							to add this product to the main window.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj4-4.png" alt = "Project 4">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						Likewise, calculate the product of  PQ<sub>1</sub> with  PQ<sub>2</sub>. 
						We note that the two products we have calculated are the same, even as we move point P around.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj4-5.png" alt = "Project 4">
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
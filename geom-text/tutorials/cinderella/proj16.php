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
					Tutorial on Project 16 -  Koch Snowflake
				</header>
				
				<div class = "tutorial-end-comments">
						<p>
							Project 16 explores a specific fractal curve - the Koch curve.
							The construction of this curve is <em>recursive</em> and is a bit tricky in 
							Cinderella. If you want to follow the construction as outlined in the text,
							we suggest using one of the other software packages for the construction.
								If you are comfortable with complex numbers, we give a construction
								here that will create the curve.  
						</p>
				</div>
				<div class = "tutorial-select-anchors" >
				<div  id = "tutorial-content">
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						We start with two points A and B. We dilate B towards A by a factor of 1/3
						by using the Transformation Function tool. 
						Under the <b>Modes</b> menu choose <b>Transformation</b> 
							and then <b>Add Function</b>. Click in the working part of the
							window (middle part). A dialog box will pop up.
						Type in 'complex(A) + (#-complex(A))/3'.  The # in this equation represents
						an arbitrary point. We convert the given points to complex to carry out the algebra.
						Hit 'OK'. A button representing this transformation will appear in the upper right
							corner of the geometry window. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-1.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> Now, click the Move/Select button and then click on B and then the new transformation
							button. The dilated point C will be created. Likewise, define a function transformation
							to dilate B towards A by 2/3.  Then, select B and carry out this transformation to
							get point D.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-2.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> The next task is to rotate D about C by 30 degrees.  We will do this by a third function
						transformation. Under the <b>Modes</b> menu choose <b>Transformation</b> 
							and then <b>Add Function</b>. Click in the window and type in 
							'complex(C) + (#-complex(C))*exp(i*pi/3)'. The term 'exp(i*pi/3)' represents a rotation
							by 30 degrees when multiplied as a complex factor times another complex number. 
							Click 'OK' to define this third transformation. Then, select point D and click the third
							transformation button to get the rotated point E. We have now constructed the points for our
								Koch template curve. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-3.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 The next step is to define the replacement process for creating the Koch fractal curve.
							We will do this by defining Similarity transformations for each of the four
							sub-curves (AC, CE, ED, and DB) of our template curve. 
							For the first replacement, we have that the entire segment AB goes to AC. 
							Under the <b>Modes</b> menu choose <b>Transformation</b> 
							and then <b>Similarity</b>. Then, click A twice to denote that A goes to itself.
							Click B and then C to denote that B goes to C. A white arrow should appear showing
							B going to C. When you are finished a new transformation button 
							<img src="./images/similarity.png"  style="width:30px" alt ="Similarity">
							representing 
							this similarity will appear.
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-4.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 Define the other three similarities next. These are the ones where A goes to C and
						 B goes to E, A goes to E and B goes to D, and A goes to D and B goes to itself.
						 We have now defined four transformations that represent the replacement process 
						 for the Koch curve construction. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-5.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-row">
						<div class="tutorial-left">
						<p> 
						 We will now create an Iterated Function System (IFS) to carry out the 
						 successive stages of replacement for the Koch curve. In the text, we show how 
						 to do one replacement, then two replacements, etc. An IFS system carries out the 
						 many replacements in one recursive system, without showing intermediate steps. 
							To define the IFS system, we select all four of the similarities we have just 
							defined (hold the shift key down while selecting). Then,
							under the <b>Modes</b> menu choose <b>Special</b> 
							and then <b>Special/IFS</b>. The replacement process is repeatedly applied to the 
							original set of points, yielding the Koch snowflake curve. 
						</p>
						</div>
						<div class="tutorial-right">
							<img src="./images/proj16-6.png" alt = "Project 16">
						</div>
					</div>
					<div class = "tutorial-end-comments">
						<p>
							The remaining constructions and exercises in Project 16 should now be doable.
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
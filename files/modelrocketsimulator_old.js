var g   = 9.8; // [m/s²]
var freq = 100;
var dt   = 1/freq;
var simTime;
var canvas, ctx;
var rocketY;
var firstRenderTime;
var time = [], position=[];

window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60)} // simulate calling code 60 

window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function(requestID){clearTimeout(requestID)} //fall back

var target = document.getElementById('container');

function gid(id)
{
	return document.getElementById(id);
}

function init()
{
	canvas  = gid('rocketCanvas');
    ctx     = canvas.getContext('2d');
	drawRocket(0.0,0.0);
}

function sign(x)
{
	if(isNaN(x)) {
		return NaN;
	} else if(x === 0) {
		return x;
	} else {
		return (x > 0 ? 1 : -1);
	}
}

function transpose(array)
{
	var newArray = array[0].map(function(col, i) { 
	  return array.map(function(row) { 
	    return row[i] 
	  })
	});
	return newArray;
}

function chart(chartdata,id,charttitle,xaxistitle,yaxistitle,yfloor,xceiling)
{
	$(function () {
	    $(id).highcharts({
	        chart: {
	            type: 'spline'
	        },
		        title: {
	            text: charttitle
	        },
	        xAxis: {
	            type: 'spline',
	            title: {
	            	text: xaxistitle
	            },
	            floor: 0,
	            ceiling: xceiling,
	            gridLineWidth: 1
	        },
	        yAxis: {
	        	type: 'spline',
	        	title: {
	        		text: yaxistitle
	        	},
	        	floor: yfloor
	        },
	        legend: {
	        	enabled: false
	        },
	        series: [{
	            data: chartdata,
	            turboThreshold: 6000
	        }]
	    });
	});
}

function start()
{
	$("#container").css({"opacity":.5});
	launch();
}

function integrate(F0, fVals, delT)
{
	integralVals = [F0];
	for (var i=0; i< fVals.length-1; i++){
		integralVals[i+1] = integralVals[i]+ 0.5*(fVals[i]+fVals[i+1])*delT;
	}
	return integralVals;
}

function startAnimation(){
	rocketY=0.0;
	firstRenderTime = Date.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height)
	window.requestAnimationFrame(updateAnimation);
}

function updateAnimation(timestamp) {
	// Date.now() is in milliseconds 
	let elapsedTime = ((Date.now() - firstRenderTime)/1000);
    // Compute index in time array where elapsedTime is located	
	var indexT = Math.round(time.length*(elapsedTime/simTime));
	//console.log(elapsedTime, indexT);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	
	drawRocket(0,position[indexT]);
	if(indexT < time.length){
		window.requestAnimationFrame(updateAnimation);
	}
	else{
		console.log("done");
		$("#output").slideDown();
		$('html, body').animate({scrollTop: $("#results").offset().top}, 2000);
	}
}

function drawRocket(x,y){
	ctx.save();
	ctx.translate(canvas.width/2, canvas.height);
	ctx.scale(canvas.width/70.0, -canvas.height/70.0);
	ctx.translate(x,y);
	ctx.rect(0, 0, 0.5, 1);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.strokeStyle = "green";
	ctx.restore();
	
}

function launch()
{
	gid("launchbutton").blur();
	gid("altitude").innerHTML = "";
	gid("landing_time").innerHTML     = "";
	gid("landing_velocity").innerHTML = "";

	// Read entered values for parameters
	var rocketM  = parseFloat(gid("rocketMass").value)/1000;
	var engineM  = parseFloat(gid("engineMass").value)/1000;
	var fuelM  = parseFloat(gid("fuelMass").value)/1000;
	var burnTime = parseFloat(gid("burnTime").value);
	var totalImpulse = parseFloat(gid("totalImpulse").value);
	simTime = parseFloat(gid("simTime").value);
	console.clear()
	//console.log(rocketM, engineM, fuelM);
	
	var totalM = rocketM + engineM;
	var averageThrust = totalImpulse/burnTime;
	var fuelBurnRate = fuelM/burnTime;
	var simArrayLen = Math.round(simTime/dt);
	var burnArrayLen = Math.round(burnTime/dt)+1;
	var specificImpulse = totalImpulse/(fuelM*g);
	
	for(var i = 0 ; i < simArrayLen; i++ )
	{
		time[i] = i*dt;
	}

	var thrust = [];
	// Make an array of thrust values
	for(var i = 0 ; i < simArrayLen; i++ )
	{
		if(i < burnArrayLen) {
			thrust[i]= averageThrust;
		}
		else {
			thrust[i] = 0.0;
		}
	}
	// console.log(thrust);
	
	var mass = [];
	// Make an array of mass values
	for(var i = 0 ; i < simArrayLen; i++ )
	{
		if(i < burnArrayLen) {
			mass[i]= totalM - fuelBurnRate*time[i];
		}
		else {
			mass[i] =totalM-fuelM;
		}
	}
	//console.log(mass.slice(550,600));;
	
	var accel = [];
	// Make an array of acceleration values
	for(var i = 0 ; i < simArrayLen; i++ )
	{
		accel[i]= thrust[i]/mass[i] - g;
	}
	//console.log(accel.slice(550,600));
	
	var velocity = integrate(0.0, accel, dt);
	//console.log(velocity.slice(550,600));
	
	position = integrate(0.0, velocity, dt);
	//console.log(position.slice(550,600));
	
	var altitude = Math.max(...position);
	altitude = altitude.toFixed(1);
	//console.log(altitude);
	
	landingIndex = 10;
	for(var i=landingIndex; i<position.length; i++) {
		if(position[i] < 0.0){
			landingIndex = i;
			break;
		}
	}		
	//console.log(landingIndex);
	landingTime = (landingIndex/position.length)*simTime;
	landingTime = landingTime.toFixed(1);
	//console.log(landingTime);
	
	var landingV = velocity[landingIndex];
	landingV = landingV.toFixed(1);
	console.log(landingV);
	
	// Report Results and Graph a,v,s
	position = position.slice(0,landingIndex);
	velocity = velocity.slice(0,landingIndex);
	accel = accel.slice(0,landingIndex);
	gid("altitude").innerHTML = altitude.toString();
	gid("landing_time").innerHTML     =  landingTime.toString();
	gid("landing_velocity").innerHTML = landingV.toString();
	startAnimation();
    chart(transpose([time,position]),"#position","Position","Time / [s]","Position / [m]",0)
	chart(transpose([time,velocity]),"#velocity","Velocity","Time / [s]","Velocity / [m/s]",null)
	chart(transpose([time,accel]),"#acceleration","Acceleration","Time / [s]","Acceleration / [m/s²]",null)
	/* chart(transpose([t2,gees2]),"#gees","G-force","Time / [s]","G")
	chart(transpose([t2,m2]),"#mass","Mass","Time / [s]","Mass / [kg]")
	chart(transpose([t2,drag2]),"#drag","Drag","Time / [s]","Drag / [N]")
	chart(transpose([t2,thrust2]),"#thrust","Thrust","Time / [s]","Thrust / [N]",0,Burntime+0.1) */
	$("#container").css({"opacity":1});
	

}

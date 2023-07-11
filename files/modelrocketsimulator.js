var g   = 9.8; // [m/s²]
var rho = 1.2; // [kg/mÂ³]
var cd1 = 0.5;	// Drag coefficient of rocket.
var cd2 = 0.75; // Drag coefficient of parachute. Value is from http://www.rocketshoppe.com/info/The_Mathematics_of_Parachutes.pdf
var freq = 100;
var dt   = 1/freq;
var canvas, ctx; 
var rocketY;
var firstRenderTime;
var altitude;
var landingTime, landingV; 
var time = [], position=[], velocity=[];

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
	//drawRocket(0.0,0.0, 50.0);
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
	altitude = 0.0;
	landingTime = 5.0; 
	time = [];
	position=[];
	velocity=[];
	launch();
}

function integrateArray(F0, fVals, delT) {
	integralVals = [F0];
	for (var i=0; i< fVals.length-1; i++){
		integralVals[i+1] = integralVals[i]+ 0.5*(fVals[i]+fVals[i+1])*delT;
	}
	return integralVals;
}

function integrate(fa, fb, delT) {
	return 0.5*(fa+fb)*delT;
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
	var indexT = Math.round(time.length*(elapsedTime/landingTime));
	
	//console.log(elapsedTime, indexT);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	
	
	var canvasScale;
	if(altitude > 0.1){
		canvasScale = 1.1*altitude;
	}
	else {
		canvasScale = 50.0;
	}
	drawRocket(0,position[indexT], canvasScale);
	drawHouse(canvasScale);
	drawText(indexT);
	
	if(indexT < time.length){
		window.requestAnimationFrame(updateAnimation);
	}
	else{
		console.log("done");
		$("#output").slideDown();
		$('html, body').animate({scrollTop: $("#results").offset().top}, 2000);
	}
}

function drawRocket(x,y, canvasScale){
	ctx.save();
	ctx.translate(canvas.width/2, canvas.height);
	ctx.scale(canvas.width/canvasScale, -canvas.height/canvasScale);
	ctx.translate(x,y);
	ctx.rect(0, 0, canvasScale/40.0, canvasScale/20.0);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.strokeStyle = "green";
	ctx.restore();
	
}

function drawHouse(canvasScale){
    ctx.save();
	ctx.fillStyle="#975B5B";
    ctx.strokeStyle="black";
    ctx.lineWidth="3";
	var houseScale = canvasScale/11;
	ctx.scale(canvas.width/800/houseScale, canvas.height/800/houseScale);
	// Experimentally Derived!!
	ctx.translate(47*canvasScale-100, 72*canvasScale-560);
	
	var houseW = canvasScale/10.0;
	var houseH = canvasScale/5.0;
	var houseX = canvasScale/2.0;
    // Draw a triangle for the roof
    ctx.beginPath();
    ctx.moveTo(100,260);
    ctx.lineTo(300,10);
    ctx.lineTo(500,260);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // chimney
    ctx.fillRect(381, 60, 45, 120);
    ctx.strokeRect(381, 60, 45, 140);
    drawEllipse(ctx, 380, 55, 47, 14);
    ctx.fillRect(378, 198, 55, 5);

    // house walls
    ctx.fillRect(100, 260, 400, 300);
    ctx.strokeRect(100, 260, 400, 300);

    // windows
    ctx.fillStyle="black";
    ctx.fillRect(130, 300, 70, 45);
    ctx.fillRect(205, 300, 70, 45);
    ctx.fillRect(325, 300, 70, 45);
    ctx.fillRect(400, 300, 70, 45);
    ctx.fillRect(130, 350, 70, 45);
    ctx.fillRect(205, 350, 70, 45);
    ctx.fillRect(325, 350, 70, 45);
    ctx.fillRect(400, 350, 70, 45);
    ctx.fillRect(325, 425, 70, 45);
    ctx.fillRect(400, 425, 70, 45);
    ctx.fillRect(325, 475, 70, 45);
    ctx.fillRect(400, 475, 70, 45);

    // door lines
    ctx.beginPath();
    ctx.restore();
    ctx.moveTo(200, 423);
    ctx.lineTo(200, 560);
    ctx.moveTo(140,433);
    ctx.lineTo(140, 560);
    ctx.moveTo(260,434);
    ctx.lineTo(260, 560);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(199,562,140,1.355*Math.PI,1.65*Math.PI); // door arc
    ctx.stroke();

    // door handles
    ctx.beginPath();
    ctx.arc(185,510,5,0,2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(215,510,5,0,2*Math.PI);
    ctx.stroke();
	ctx.restore();
}

function drawText(indexT){
	ctx.save();
	ctx.font = "10px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Altitude:".concat(altitude.toString()," m"), 10, 10);
	var v = 0.0;
	if(indexT >= velocity.length){
		v = landingV;
	}
	else {
		v = velocity[indexT];
	}
	v = Number(v).toFixed(1);
	ctx.fillText("Velocity:".concat(v.toString()," m/sec"), 10, 20);
	ctx.restore();
}

function getThrustVal(totalImpulse, t, burnTime){
	if(t>burnTime){
		return 0.0;
	}
	var a = 3*totalImpulse/(burnTime*burnTime);
	var b = 2*a;
	
	if(t/burnTime < 0.66	){
		return a*t;
	}
	else {
		return -b*(t - burnTime);
	}
}

function launch()
{
	gid("launchbutton").blur();
	gid("altitude").innerHTML = "";
	gid("landing_time").innerHTML     = "";
	gid("landing_velocity").innerHTML = "";

	// Read entered values for parameters
	var rocketM  = parseFloat(gid("rocketMass").value)/1000;
	var rocketDiam = parseFloat(gid("rocketDiam").value)/1000;
	var engineM  = parseFloat(gid("engineMass").value)/1000;
	var fuelM  = parseFloat(gid("fuelMass").value)/1000;
	var burnTime = parseFloat(gid("burnTime").value);
	var totalImpulse = parseFloat(gid("totalImpulse").value);
	console.clear()
	//console.log(rocketM, engineM, fuelM);
	
	var A = Math.PI*Math.pow(rocketDiam/2,2);
	var totalM = rocketM + engineM;
	var averageThrust = totalImpulse/burnTime;
	var fuelBurnRate = fuelM/burnTime;
	var burnArrayLen = Math.round(burnTime/dt)+1;
	var specificImpulse = totalImpulse/(fuelM*g);
	
	var thrust = [], mass = [], drag; 
	var accel=[], gees=[]
	thrust[0] = 0.0; mass[0] = totalM; 
	accel[0] = 0.0; gees[0]=0.0;
	time[0]= 0.0; velocity[0] = 0.0; position[0]= 0.0;
    var totalGenImpulse = 0.0;
	
	var i;
	for(i=1; i<burnArrayLen; i++) {
		time[i] = i*dt;
		drag = -0.5*rho*cd1*A*Math.pow(velocity[i-1],2)*sign(velocity[i-1]);
		thrust[i]= getThrustVal(totalImpulse, time[i], burnTime) + drag;
		totalGenImpulse = totalGenImpulse +thrust[i]*dt;
		mass[i] = totalM - fuelBurnRate*time[i];
		accel[i]= thrust[i]/mass[i] - g;
		gees[i] = Math.abs(accel[i]/g+1);
		velocity[i] = velocity[i-1]+ integrate(accel[i-1], accel[i], dt);
		position[i] = position[i-1]+ integrate(velocity[i-1], velocity[i], dt);
		if(position[i] <0.0){
			velocity[i]=0.0;
			position[i]=0.0;
		}
	}
	//console.log(totalGenImpulse);
	while(position[i-1]>0.0){
		time[i] = i*dt;
		thrust[i]= 0.0;
		mass[i] = totalM - fuelM;
		accel[i]= -g;
		gees[i] = Math.abs(accel[i]/g);
		velocity[i] = velocity[i-1]+ integrate(accel[i-1], accel[i], dt);
		position[i] = position[i-1]+ integrate(velocity[i-1], velocity[i], dt);
		i=i+1;
	}
	
	landingTime = time[i-1];
	landingV = velocity[i-1];
	landingV = landingV.toFixed(1);
	//console.log(i, landingTime, landingV);
	
	altitude = Math.max(...position);
	altitude = altitude.toFixed(2);
	//console.log(altitude);
	
	var maxG = Math.max(...gees);
	maxG = maxG.toFixed(1);
	//console.log("maxG", maxG);
	
	// Report Results and Graph a,v,s
	gid("altitude").innerHTML = altitude.toString();
	gid("landing_time").innerHTML     =  landingTime.toString();
	gid("landing_velocity").innerHTML = landingV.toString();
	gid("maxG").innerHTML = maxG.toString();
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

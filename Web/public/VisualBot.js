/*==============================

	VisualBot.js
	
	Visual Robot Representation via HTML5 Canvas
	
	Crafted by Daniel Walnut

===============================*/

/*=======
Global Colours
========*/
var DriftingRed = "rgb(236, 60, 30)";
var SettleBlue = "rgb(80, 211, 251)";
var TapeBlack = "#000000";

function VisualBot(canvasObject, loadedCallback) {
	// Initialize Object
	var that = this;
	that.Canvas = canvasObject;
	var ctx = that.Canvas.getContext("2d");
	var RobotImage = new Image();
	RobotImage.src = "Outline.png";
	RobotImage.onload = function() {
		loadedCallback();
	}
	
	/*=======
	Robot State
	========*/
	that.Robot = new Object();
	that.Robot.SetPoints = new Object();
	that.Robot.Measurements = new Object();
	that.Robot.Measurements.PWM = new Array();
	that.Robot.Measurements.PWM[0] = 0.3;
	that.Robot.Measurements.PWM[1] = 0.6;
	that.Robot.Measurements.F = new Array();
	that.Robot.Measurements.F[0] = "3K";
	that.Robot.Measurements.F[1] = "100 ";
	that.Robot.Measurements.RPM = new Array();
	that.Robot.Measurements.RPM[0] = 250;
	that.Robot.Measurements.RPM[1] = 180;
	
	/*=======
	Robot Setpoints
	========*/
	that.Robot.SetPoints.RPM = new Array();
	that.Robot.SetPoints.RPM[0] = 270;
	that.Robot.SetPoints.RPM[1] = 150;
	that.Robot.SetPoints.CurveRadius = 32000;
	
	/*=======
	Robot Parameters
	========*/
	that.Robot.MaxRPM = 300;
	
	
	/*=======
	Visual Settings
	========*/	
	that.Visual = new Object();
	that.Visual.Size = 500;
	that.Visual.Margin = -50;
	
	/*=======
	Exposed functions
	========*/
	that.Render = function() {
		RenderCurveRadius(400, SettleBlue, 10);
		RenderCurveRadius(500, DriftingRed, 10);
		RenderCar();
		RenderMotorBox(0);
		RenderMotorBox(1);
	}

	/*=======
	Internal functions
	========*/	
	var RenderCar = function() {
		ctx.drawImage(RobotImage, that.Canvas.width/2 - that.Visual.Size/2, that.Canvas.height - that.Visual.Size - that.Visual.Margin, that.Visual.Size, that.Visual.Size);
	}
	
	var RenderCurveRadius = function(curveRadius, strokeStyle, lineWidth) {
		// Setup Pallette
		ctx.strokeStyle = strokeStyle;
		ctx.lineWidth = lineWidth;
		// Begin the path.
		ctx.beginPath();
		if(curveRadius > 0) {
			// Positive curve radius
			ctx.arc(that.Canvas.width/2 + curveRadius, that.Canvas.height/2 + that.Visual.Size/4, curveRadius, Math.PI, 1.75*Math.PI, false);
		}
		else {
			// Negative Curve Radius
			curveRadius = -curveRadius;
			ctx.arc(that.Canvas.width/2 - curveRadius, that.Canvas.height/2 + that.Visual.Size/4, curveRadius, 2*Math.PI, 1.25*Math.PI, true);
		}
		ctx.stroke();
	}
	
	var RenderMotorBox = function(motor) {
		var boxWidth = 200;
		var boxMargin = 120;
		var textYMargin = 18;
		var textSize = 14;
		var cellPadding = 15;
		var headingYMargin = 36;
		var headingSize = 36;
		var PWMDiagramHeight = 50;
		var barHeight = 30;
		// Calculate the top and left origin
		if(motor == 0) {
			var xBegin = that.Canvas.width/2 - that.Visual.Size/2 - boxMargin;
		}
		else {
			var xBegin = that.Canvas.width/2 + that.Visual.Size/2 + boxMargin - boxWidth;
		}
		var yBegin = that.Canvas.height/2 - 100;
		// Setup Y Cursor
		var yCursor = yBegin;
		// Draw top border
		// Setup colors and borders
		ctx.strokeStyle = TapeBlack;
		ctx.lineWidth = 6;
		ctx.beginPath();
		ctx.moveTo(xBegin, yCursor);
		ctx.lineTo(xBegin + boxWidth, yCursor);
		ctx.stroke();
		// Draw Block Heading
		yCursor += headingYMargin;	// Move Cursor
		ctx.font= headingSize + "px Futura";
		if(motor == 0) {
			ctx.fillText("Left Motor", xBegin, yCursor);
		}
		else {
			ctx.fillText("Right Motor", xBegin, yCursor);		
		}
		// Draw Separator
		yCursor += cellPadding;
		ctx.strokeStyle = TapeBlack;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(xBegin, yCursor);
		ctx.lineTo(xBegin + boxWidth, yCursor);
		ctx.stroke();
		// Draw PWM diagram
		yCursor += cellPadding;	// Move Cursor
		ctx.strokeStyle = DriftingRed;
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(xBegin, yCursor + PWMDiagramHeight);
		ctx.lineTo(xBegin, yCursor);
		ctx.lineTo(xBegin + boxWidth*that.Robot.Measurements.PWM[motor], yCursor);
		ctx.lineTo(xBegin + boxWidth*that.Robot.Measurements.PWM[motor], yCursor + PWMDiagramHeight);
		ctx.lineTo(xBegin + boxWidth, yCursor + PWMDiagramHeight);
		ctx.stroke();
		yCursor += PWMDiagramHeight;	// Move Cursor
		// Draw PWM Number
		yCursor += textYMargin + cellPadding;	// Move Cursor
		ctx.font= textSize + "px Futura";
		ctx.fillText((that.Robot.Measurements.PWM[motor]*100) + "% – " + that.Robot.Measurements.F[motor] + "Hz", xBegin, yCursor);
		// Draw Measured Speed bar
		yCursor += cellPadding;
		ctx.fillStyle = DriftingRed;
		ctx.fillRect(xBegin, yCursor, boxWidth*(that.Robot.Measurements.RPM[motor]/that.Robot.MaxRPM), barHeight);
		ctx.fillStyle = TapeBlack;
		yCursor += barHeight;
		// Draw Measured Speed Number
		yCursor += textYMargin + cellPadding;	// Move Cursor
		ctx.font= textSize + "px Futura";
		ctx.fillText((that.Robot.Measurements.RPM[motor]) + " RPM", xBegin, yCursor);
		// Draw Setpoint Speed bar
		yCursor += cellPadding;
		ctx.fillStyle = SettleBlue;
		ctx.fillRect(xBegin, yCursor, boxWidth*(that.Robot.SetPoints.RPM[motor]/that.Robot.MaxRPM), barHeight);
		ctx.fillStyle = TapeBlack;
		yCursor += barHeight;
		// Draw Setpoint Speed Number
		yCursor += textYMargin + cellPadding;	// Move Cursor
		ctx.font= textSize + "px Futura";
		ctx.fillText((that.Robot.SetPoints.RPM[motor]) + " RPM", xBegin, yCursor);
		// Draw bottom border
		yCursor += cellPadding;
		ctx.strokeStyle = TapeBlack;
		ctx.lineWidth = 6;
		ctx.beginPath();
		ctx.moveTo(xBegin, yCursor);
		ctx.lineTo(xBegin + boxWidth, yCursor);
		ctx.stroke();
	}
}
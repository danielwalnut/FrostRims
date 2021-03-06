/*==============================

	SettingsPanel.js
	
	View for the Settings panel.
	
	Requirements:
	
	1. CarRobot.js
	2. main.css (Some classes are used)
	3. CloudRobot
	
	Crafted by Daniel Walnut

===============================*/
/*==============================

	Usage:
	
	1. Build the necessary HTML.
		a. A settings button.
		b. A panel div
		c. All required sliders, with labels next to them, inside the panel div
	
	2. Create new SettingsPanel object, passing all those HTML objects, as well as car object.

===============================*/


function SettingsPanel(InputCarRobot, InputCloudRobot, settingsButton, settingsPanelDiv, desiredSpeedSlider, cruiseKdSlider, cruiseKpSlider, cruiseKiSlider, motorKpSlider, motorKdSlider, sharpnessSlider, corneringPBrakeSlider, corneringDBrakeSlider, decayRateSlider, desiredSpeedDisplay, cruiseKpDisplay, cruiseKdDisplay, cruiseKiDisplay, sharpnessDisplay, corneringPBrakeDisplay, corneringDBrakeDisplay, decayRateDisplay, motorKpDisplay, motorKdDisplay) {
	var that = this;
	
	/*======
	Build the object children
	=======*/
	that.SettingsButton = settingsButton;
	that.SettingsPanelDiv = settingsPanelDiv;
	that.DesiredSpeedSlider = desiredSpeedSlider;
	that.CruiseKdSlider = cruiseKdSlider;
	that.CruiseKpSlider = cruiseKpSlider;
	that.CruiseKiSlider = cruiseKiSlider;
	that.MotorKpSlider = motorKpSlider;
	that.MotorKdSlider = motorKdSlider;
	that.SharpnessSlider = sharpnessSlider;
	that.CorneringPBrakeSlider = corneringPBrakeSlider;
	that.CorneringDBrakeSlider = corneringDBrakeSlider;
	that.DecayRateSlider = decayRateSlider;
	that.DesiredSpeedDisplay = desiredSpeedDisplay;
	that.CruiseKpDisplay = cruiseKpDisplay;
	that.CruiseKdDisplay = cruiseKdDisplay;
	that.CruiseKiDisplay = cruiseKiDisplay;
	that.SharpnessDisplay = sharpnessDisplay;
	that.CorneringPBrakeDisplay = corneringPBrakeDisplay;
	that.CorneringDBrakeDisplay = corneringDBrakeDisplay;
	that.DecayRateDisplay = decayRateDisplay;
	that.MotorKpDisplay = motorKpDisplay;
	that.MotorKdDisplay = motorKdDisplay;

	that.CarRobot = InputCarRobot;
	that.CloudRobot = InputCloudRobot;
	
	/*======
	Create methods
	=======*/
	that.ShowSettings = function() {
		that.SettingsPanelDiv.className = "TopBarButton Activated";
		that.SettingsButton.className = "TopBarButton Activated";
	}
	
	that.HideSettings = function() {
		that.SettingsPanelDiv.className = "TopBarButton";
		that.SettingsButton.className = "TopBarButton";
	}
	
	that.ShowHideSettings = function() {
		// Show/Hide Panel
		if(that.SettingsPanelDiv.className != "TopBarButton Activated") {
			that.ShowSettings();
		}
		else {
			that.HideSettings();
		}
	}
	
	that.UpdateGUIToSettings = function() {
		// Capture the values
		that.DesiredSpeedSlider.value = that.CarRobot.Settings.DesiredSpeed;
		that.CruiseKpSlider.value = that.CarRobot.Settings.Cruise.Kp;
		that.CruiseKdSlider.value = that.CarRobot.Settings.Cruise.Kd;
		that.CruiseKiSlider.value = that.CarRobot.Settings.Cruise.Ki;
		that.SharpnessSlider.value = that.CarRobot.Settings.Cruise.Sharpness;
		that.MotorKpSlider.value = that.CarRobot.Settings.Motor.Kp;
		that.MotorKdSlider.value = that.CarRobot.Settings.Motor.Kd;
		that.CorneringPBrakeSlider.value = that.CarRobot.Settings.Cruise.PBrake;
		that.CorneringDBrakeSlider.value = that.CarRobot.Settings.Cruise.DBrake;
		that.DecayRateSlider.value = that.CarRobot.Settings.Cruise.DecayRate;
	
		// Update values on screen
		that.DesiredSpeedDisplay.innerText = that.CarRobot.Settings.DesiredSpeed;
		that.CruiseKpDisplay.innerText = that.CarRobot.Settings.Cruise.Kp;
		that.CruiseKdDisplay.innerText = that.CarRobot.Settings.Cruise.Kd;
		that.CruiseKiDisplay.innerText = that.CarRobot.Settings.Cruise.Ki;
		that.SharpnessDisplay.innerText = that.CarRobot.Settings.Cruise.Sharpness;
		that.CorneringPBrakeDisplay.innerText = that.CarRobot.Settings.Cruise.PBrake;
		that.CorneringDBrakeDisplay.innerText = that.CarRobot.Settings.Cruise.DBrake;
		that.DecayRateDisplay.innerText = that.CarRobot.Settings.Cruise.DecayRate;
		that.MotorKpDisplay.innerText = that.CarRobot.Settings.Motor.Kp;
		that.MotorKdDisplay.innerText = that.CarRobot.Settings.Motor.Kd;	
	}

	that.UpdateSettings = function() {
		// Capture the values
		that.CarRobot.Settings.DesiredSpeed = that.DesiredSpeedSlider.value;
		that.CarRobot.Settings.Cruise.Kp = that.CruiseKpSlider.value;
		that.CarRobot.Settings.Cruise.Kd = that.CruiseKdSlider.value;
		that.CarRobot.Settings.Cruise.Ki = that.CruiseKiSlider.value;
		that.CarRobot.Settings.Cruise.Sharpness = that.SharpnessSlider.value;
		that.CarRobot.Settings.Motor.Kp = that.MotorKpSlider.value;
		that.CarRobot.Settings.Motor.Kd = that.MotorKdSlider.value;
		that.CarRobot.Settings.Cruise.PBrake = that.CorneringPBrakeSlider.value;
		that.CarRobot.Settings.Cruise.DBrake = that.CorneringDBrakeSlider.value;
		that.CarRobot.Settings.Cruise.DecayRate = that.DecayRateSlider.value;
	
		// Update values on screen
		that.DesiredSpeedDisplay.innerText = that.CarRobot.Settings.DesiredSpeed;
		that.CruiseKpDisplay.innerText = that.CarRobot.Settings.Cruise.Kp;
		that.CruiseKdDisplay.innerText = that.CarRobot.Settings.Cruise.Kd;
		that.CruiseKiDisplay.innerText = that.CarRobot.Settings.Cruise.Ki;
		that.SharpnessDisplay.innerText = that.CarRobot.Settings.Cruise.Sharpness;
		that.CorneringPBrakeDisplay.innerText = that.CarRobot.Settings.Cruise.PBrake;
		that.CorneringDBrakeDisplay.innerText = that.CarRobot.Settings.Cruise.DBrake;
		that.DecayRateDisplay.innerText = that.CarRobot.Settings.Cruise.DecayRate;
		that.MotorKpDisplay.innerText = that.CarRobot.Settings.Motor.Kp;
		that.MotorKdDisplay.innerText = that.CarRobot.Settings.Motor.Kd;
		
		// Save
		that.CarRobot.SaveSettings();
	}
	
	/*======
	Assign Events
	=======*/	
	var mouseOverOnce = false;
	that.SettingsPanelDiv.onmouseenter = function() {
		mouseOverOnce = true;
	}
	
	that.SettingsPanelDiv.onmouseleave = that.HideSettings;
	that.SettingsButton.onclick = that.ShowHideSettings;
	
	that.DesiredSpeedSlider.oninput = that.UpdateSettings;
	that.CruiseKpSlider.oninput = that.UpdateSettings;
	that.CruiseKdSlider.oninput = that.UpdateSettings;
	that.CruiseKiSlider.oninput = that.UpdateSettings;
	that.SharpnessSlider.oninput = that.UpdateSettings;
	that.CorneringPBrakeSlider.oninput = that.UpdateSettings;
	that.CorneringDBrakeSlider.oninput = that.UpdateSettings;
	that.DecayRateSlider.oninput = that.UpdateSettings;
	that.MotorKpSlider.oninput = that.UpdateSettings;
	that.MotorKdSlider.oninput = that.UpdateSettings;
	
	that.DesiredSpeedSlider.onchange = that.CloudRobot.SendSettings;
	that.CruiseKpSlider.onchange = that.CloudRobot.SendSettings;
	that.CruiseKdSlider.onchange = that.CloudRobot.SendSettings;
	that.CruiseKiSlider.onchange = that.CloudRobot.SendSettings;
	that.SharpnessSlider.onchange = that.CloudRobot.SendSettings;
	that.CorneringPBrakeSlider.onchange = that.CloudRobot.SendSettings;
	that.CorneringDBrakeSlider.onchange = that.CloudRobot.SendSettings;
	that.DecayRateSlider.onchange = that.CloudRobot.SendSettings;
	that.MotorKpSlider.onchange = that.CloudRobot.SendSettings;
	that.MotorKdSlider.onchange = that.CloudRobot.SendSettings;

}
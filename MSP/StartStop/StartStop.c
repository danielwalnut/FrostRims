/*===============================

	# StartStop
	
	This module allows you to stop or start operation of the robot,
	with a pushbutton 
	
	## Resources used:
	
	1. P1.1
	2. PORT1 ISR
	3. TA0CCR1
	4. TA0CCR2
	5. TA2CCR1
	6. TA2CCR2
			
===============================*/

/*======
Includes
=======*/
#include "StartStop.h"
#include <msp430.h>
#include <stdlib.h>
#include "../Scheduler/Scheduler.h"
#include "Photon_SPI_module/Photon_SPI_Module.h"
#include "../Docking/Color_sensor/Color_sensor.h"

/*======
Static function prototypes
=======*/

/*================
	
	~~ stopRobotOperations ~~
	
	Turns on OFF indicator, Turns off motors and traps system into loop until S2 is pressed.
	
	Globals affected:	Port 1, P1.0, P1.1, 
						TA[0,2]CCR[1,2] also get reset.
							
================*/
static void stopRobotOperations();


/*======
Macros
=======*/
#define BUTTON_1 BIT1
#define RED_LED BIT0
#define DEBOUNCE_DELAY 20000
#define BUTTON_1_RELEASED (P1IN & BUTTON_1)
#define BUTTON_1_PRESSED (!BUTTON_1_RELEASED)

void setupStartStop() {
	P1DIR &= ~BUTTON_1;	//Button is an input
	P1DIR |= RED_LED;	// Stop sign
	P1OUT &= ~RED_LED;	// Clear the red.
	P1OUT |= BUTTON_1;	// Button has pull up resistor
	P1REN |= BUTTON_1;	// Setup the pull up
	P1IES |= BUTTON_1;	// On the falling edge
	P1IE |= BUTTON_1;	// Turn on interrupts for the button
	
	scheduleCallback(&robotPlayUpdate);
}

void stopRobot() {
	__disable_interrupt();	// Make sure interrupts are disabled
	stopRobotOperations();
	__enable_interrupt();	// Make sure interrupts are re-enabled
}

void stopRobotAtStation() {
    __disable_interrupt();  // Make sure interrupts are disabled
    // Indicate we are stopped.
    uint32_t previousCommandColor=0;
    previousCommandColor=Command_Color;
	P1OUT |= RED_LED;
	// Remember, GIE is already off, so we don't need to stop that.
	while(previousCommandColor==Command_Color)
	{
		TA0CCR1 = TA0CCR0*0.8;
		TA0CCR2 = TA0CCR0*0.8;
		TA2CCR1 = TA0CCR0*0.8;
		TA2CCR2 = TA0CCR0*0.8;
		InfoBoardUpdate();
		__delay_cycles(533334);
	}
	P1OUT &= ~RED_LED;
	cancelLoop();			// Throw away this loop.
	__enable_interrupt();   // Make sure interrupts are re-enabled
}

void Docking() {
    if((Color==1&&Command_Color==1)||(Color==2&&Command_Color==2)) {
        stopRobotAtStation();
    }
}

void robotPlayUpdate() {
	if(robotPlay == 0) {
		stopRobot();
	}
}

static void stopRobotOperations() {
	// Indicate we are stopped.
	P1OUT |= RED_LED;
	// Remember, GIE is already off, so we don't need to stop that.
	while(BUTTON_1_RELEASED) {
		TA0CCR1 = 0;
		TA0CCR2 = 0;
		TA2CCR1 = 0;
		TA2CCR2 = 0;
		InfoBoardUpdate();
		if(robotPlay == 1) {
			// Time to turn on!
			P1OUT &= ~RED_LED;
			return;
		}
	}
	
	// Button is being pressed again! Time to start again?
	__delay_cycles(DEBOUNCE_DELAY); // 1/4 of a second debounce
	if(BUTTON_1_PRESSED) {
		// Ok, it was really pressed. Now, let's wait until it is released.		
		while(BUTTON_1_PRESSED) {
			// Wait to be released
		}
	}
	// Time to turn on!
	P1OUT &= ~RED_LED;
}

void offlineStopRobotOperations() {
	// Indicate we are stopped.
	P1OUT |= RED_LED;
	// Remember, GIE is already off, so we don't need to stop that.
	while(BUTTON_1_RELEASED) {
		TA0CCR1 = 0;
		TA0CCR2 = 0;
		TA2CCR1 = 0;
		TA2CCR2 = 0;
		// NO INFOBOARD UPDATE
	}
	
	// Button is being pressed again! Time to start again?
	__delay_cycles(DEBOUNCE_DELAY); // 1/4 of a second debounce
	if(BUTTON_1_PRESSED) {
		// Ok, it was really pressed. Now, let's wait until it is released.		
		while(BUTTON_1_PRESSED) {
				// Wait to be released
		}
	}
	// Time to turn on!
	P1OUT &= ~RED_LED;
}

#pragma vector = PORT1_VECTOR
__interrupt void startStopISR() {
	if(P1IFG & BUTTON_1) {
		// Turn off Motors first
		TA0CCR1 = 0;
		TA0CCR2 = 0;
		TA2CCR1 = 0;
		TA2CCR2 = 0;
		
		// Button 1 is being pressed. Debounce it first
		__delay_cycles(DEBOUNCE_DELAY);
		
		//Check if it is still pressed.
		if(BUTTON_1_PRESSED) {
			while(BUTTON_1_PRESSED) {
				// Wait to be released
			}
			// Released!
			__delay_cycles(DEBOUNCE_DELAY); // debounce
			// Ok, check if is properly released.
			if(BUTTON_1_RELEASED) {
				// LET'S STOP EVERYTHING!
				stopRobotOperations();
			}
		}
		// Time to clean up and get outta here.	
		P1OUT &= ~RED_LED;
		P1IFG &= ~BUTTON_1;
	}
}

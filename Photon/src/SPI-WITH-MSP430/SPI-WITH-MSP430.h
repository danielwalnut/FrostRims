﻿/*=======================

# SPI-WITH-MSP430 module

Forked from Jeremy Ellis (MIT license)
Modified by: Tim Yue

Use at your own risk!?

# MSP430F5529 to Photon SPI Setup

	GND to GND
	P6.5 to A2   SS
	P4.3 to A3   SCK
	P4.2 to A4   MISO
	P4.1 to A5   MOSI
========================*/
#ifndef SPIMSP_H
#define SPIMSP_H

/*=======
Globals
========*/
#define NUM_PARAM 17

/*=======
Function prototypes
========*/

/*======
Externally defined variables
=======*/

// RPMLS: Left RPM Setpoint
extern int RPMLS;
// RPML: Left RPM
extern int RPML;
// RPMRS: Right RPM Setpoint
extern int RPMRS;
// RPMR: Right RPM
extern int RPMR;
// Left PWM Frequency register
extern int TA0CCR0_REG;
// Left PWM Frequency Forward duty cycle register
extern int TA0CCR1_REG;
// Left PWM Frequency Reverse duty cycle register
extern int TA0CCR2_REG;
// Right PWM Frequency register
extern int TA2CCR0_REG;
// Right PWM Frequency Forward duty cycle register
extern int TA2CCR1_REG;
// Right PWM Frequency Reverse duty cycle register
extern int TA2CCR2_REG;
// sensor: Sensor data (-1 - +1)
extern float lastSensorPosition;
extern char color; // color sensor reading
extern long unsigned int RGBColor;

extern char robotPlay; //  A “1” indicates the robot has to start running. A “0” indicates a stop signal.
extern unsigned long int timeStamp; // Timestamp of the latest SPI data

extern char sharpestCurve; // Tightest curve radius in cm
extern float cruiseKp; // Proportional gain of the lineCruiser
extern float cruiseKd; // Differential gain of the lineCruiser
extern float corneringDBrakeFactor; // Number between 0 and 1 to tell how much to slow down in tightening curves. 0 means never slows down. 1 means full stop on tightest curve.
extern float corneringPBrakeFactor; // Number between 0 and 1 to tell how much to slow down in a given curve. 0 means never slows down. 1 means full stop on tightest curve.
extern float motorKp; // Proportional gain of the motors.
extern float motorKd; // Differential gain of the motors.

extern float decayRate; // Decay rate of speed if robot misses the line
extern float cruiseKi; // Integrator constant
extern float Desired_Speed; // Desired speed
extern char commandColor; // Color of station to go to.
extern char desiredPathChosen; // The path to take. 0 for left, 1 for right.

/*======
~~SPIMSPLoop~~

Loop of this module

inputs: none
outputs: none
======*/
void SPIMSPLoop();

/*======
~~SPIMSPSetup~~

Setup this module

inputs: none
outputs: none

======*/
void SPIMSPSetup();


#endif
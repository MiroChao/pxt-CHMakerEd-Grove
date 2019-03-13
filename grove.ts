/*****************************************************************************
* | Description :	Chaihuo Grove extension for micro:bit
* | Developer   :   CH Makered
* | More Info   :	http://chmakered.com/
******************************************************************************/

enum DistanceUnit {
    //% block="cm"
    cm,
    //% block="inch"
    inch
}

/**
 * Provides access to CHMakerEd Grove blocks for pxt-microbit
 */
//% color=190 icon="\uf126" block= "Grove"
//% groups="['Sensor', 'Motor', 'Display']"
namespace Grove {

    /**
    * Get the distance from Grove-Ultrasonic Sensor
    */
    //% blockId=measureInCentimeters
    //% block="Ultrasonic Sensor $groveport|: distance in $Unit"
    //% group="Sensor"
    //% weight=100
    export function measureInCentimeters(groveport: DigitalPin, Unit: DistanceUnit): number {
        let duration = 0;
        let distance = 0;
        let distanceBackup = 0;

        pins.digitalWritePin(groveport, 0);
        control.waitMicros(2);
        pins.digitalWritePin(groveport, 1);
        control.waitMicros(10);
        pins.digitalWritePin(groveport, 0);

        duration = pins.pulseIn(groveport, PulseValue.High, 50000);

        if (Unit == DistanceUnit.cm) distance = duration * 153 / 58 / 100;
        else distance = duration * 153 / 148 / 100;

        if (distance > 0) distanceBackup = distance;
        else distance = distanceBackup;
        basic.pause(50);

        return distance;
    }

    /**
    * Set the speed of mini fan
    */
    //% blockId=minifan
    //% block="Mini Fan$analogport|: set speed to $speed"
    //% speed.min=0 speed.max=100
    //% speed.defl=50
    //% group="Motor"
    export function minifan(analogport: AnalogPin, speed: number) {
        
        pins.analogWritePin(analogport, pins.map(speed, 0, 100, 0, 1023));
    }

    /**
    * Turn on or off the mini fan motor
    */
    //% blockId=minifanOnOff
    //% block="Mini Fan$groveport|: turn $on"
    //% on.shadow="toggleOnOff"
    //% on.defl="true"
    //% group="Motor"
    export function minifanOnOff(groveport: DigitalPin, on: boolean) {
        if (on) {
            pins.digitalWritePin(groveport, 1);
        } else {
            pins.digitalWritePin(groveport, 0);
        }
    }

    /**
    * Set the servo angle
    */
    //% blockId=servo
    //% block="Servo$analogport|: set angle to $angle|°"
    //% angle.min=0 angle.max=180
    //% angle.defl=90
    //% group="Motor"
    export function servo(analogport: AnalogPin, angle: number) {
        pins.servoWritePin(analogport, pins.map(angle, 0, 180, 10, 180));
    }
}
enum GrovePort {
    //% block="P0"
    P0 = DigitalPin.P0,
    //% block="P1"
    P1 = DigitalPin.P1,
    //% block="P2"
    P2 = DigitalPin.P3,
    //% block="P8"
    P8 = DigitalPin.P8,
    //% block="P12"
    P12 = DigitalPin.P12,
    //% block="P16"
    P16 = DigitalPin.P16
}

enum AnalogPort {
    //% block="P0"
    P0 = AnalogPin.P0,
    //% block="P1"
    P1 = AnalogPin.P1,
    //% block="P2"
    P2 = AnalogPin.P2
}

enum DistanceUnit {
    //% block="cm"
    cm,
    //% block="inch"
    inch
}

/**
 * Provides access to CHMaker Ed Grove blocks for pxt-microbit
 */
//% color=190 icon="\uf126" block= "Grove"
//% groups="['Sensor', 'Motor', 'Display']"
namespace Grove {

    /**
    * Get the distance from Grove - Ultrasonic Sensor
    */
    //% blockId=measureInCentimeters
    //% block="Ultrasonic Sensor at $groveport| distance in $Unit"
    //% group="Grove Modules"
    //% weight=100
    export function measureInCentimeters(groveport: GrovePort, Unit: DistanceUnit): number {
        let duration = 0;
        let distance = 0;
        let distanceBackup = 0;
        let grove: number = groveport;

        pins.digitalWritePin(<DigitalPin>grove, 0);
        control.waitMicros(2);
        pins.digitalWritePin(<DigitalPin>grove, 1);
        control.waitMicros(10);
        pins.digitalWritePin(<DigitalPin>grove, 0);

        duration = pins.pulseIn(<DigitalPin>grove, PulseValue.High, 50000);


        if (Unit == DistanceUnit.cm) distance = duration * 153 / 58 / 100;
        else distance = duration * 153 / 148 / 100;

        if (distance > 0) distanceBackup = distance;
        else distance = distanceBackup;
        basic.pause(50);

        return distance;
    }

    /**
    * set the status of a digital output to high or low
    */
    //% blockId=set_Dout
    //% block="set digital pin $groveport| to $high"
    //% high.shadow="toggleHighLow"
    //% high.defl="true"
    //% group="Digital"
    //% weight=10
    export function set_Dout(groveport: GrovePort, high: boolean) {
        let grove: number = groveport;
        if (high) {
            pins.digitalWritePin(grove, 1);
        } else {
            pins.digitalWritePin(grove, 0);
        }
    }
}
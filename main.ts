enum GrovePort {
    //% block="P0"
    P0 = DigitalPin.P0,
    //% block="P1"
    P1 = DigitalPin.P1,
    //% block="P2"
    P2 = DigitalPin.P2,
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
    //% block="Ultrasonic Sensor at $grove| distance in $Unit"
    //% group="Grove Modules"
    //% weight=100
    export function measureInCentimeters(grove: GrovePort, Unit: DistanceUnit): number {
        let duration = 0;
        let distance = 0;
        let distanceBackup = 0;

        selectPins.grove = grove;

        selectPins.high = false;
        selectPins.select_grove_port(1);
        control.waitMicros(2);
        selectPins.high = true;
        selectPins.select_grove_port(1);
        control.waitMicros(10);
        selectPins.high = false;
        selectPins.select_grove_port(1);

        if (selectPins.grove == GrovePort.P0) {
            duration = pins.pulseIn(DigitalPin.P0, PulseValue.High, 50000); // Max duration 50 ms;
        } else if (selectPins.grove == GrovePort.P1) {
            duration = pins.pulseIn(DigitalPin.P1, PulseValue.High, 50000);
        } else if (selectPins.grove == GrovePort.P2) {
            duration = pins.pulseIn(DigitalPin.P2, PulseValue.High, 50000);
        } else if (selectPins.grove == GrovePort.P8) {
            duration = pins.pulseIn(DigitalPin.P8, PulseValue.High, 50000);
        } else if (selectPins.grove == GrovePort.P12) {
            duration = pins.pulseIn(DigitalPin.P12, PulseValue.High, 50000);
        } else if (selectPins.grove == GrovePort.P16) {
            duration = pins.pulseIn(DigitalPin.P16, PulseValue.High, 50000);
        }

        if (Unit == DistanceUnit.cm) distance = duration * 153 / 58 / 100;
        else distance = duration * 153 / 148 / 100;

        if (distance > 0) distanceBackup = distance;
        else distance = distanceBackup;
        basic.pause(50);

        return distance;
    }
}
/**
 * Copyright (c) 2016 Andrea Tino
 * File: evt.d.ts
 */

export module EVT {
    export class Evt {
        /**
         * Constructs a new instance of the Evt class.
         */
        constructor(root: HTMLElement);

        /**
         * Starts the system.
         */
        start();

        /**
         * Stops the system.
         */
        stop();

        /**
         * Collects events.
         */
        collect(): any;

        /**
         * Gets events collected.
         */
        eventData(): any;

        /**
         * Disposes the system.
         */
        dispose();
    }
}
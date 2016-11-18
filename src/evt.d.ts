/**
 * Copyright (c) 2016 Andrea Tino
 * File: evt.d.ts
 */

declare module EVT {
    export class Evt {
        /**
         * Constructs a new instance of the Evt class.
         */
        constructor(root: HTMLElement);

        /**
         * Starts the system.
         */
        start(): void;

        /**
         * Stops the system.
         */
        stop(): void;

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
        dispose(): void;
    }
}
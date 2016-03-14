/**
 * Copyright (c) 2015 Andrea Tino
 * File: eventBatch.ts
 */

import eventData = require('./eventData');

import EventData = eventData.EVT.EventData;

export module EVT {
	/**
	 * Class defining batch for events.
   * A batch is defined as a complete set of information for an event which consists of 
   * different events at the different phases they can occur accoridng to the DOM W3C specification.
	 */
	export class EventBatch {
		private internalAtCapture: EventData;
		private internalAtBubble: EventData;
		private internalAtTarget: EventData;
		
		/** 
		 * Gets the event data during capture time.
		 */
		public get atCapture(): EventData {
			return this.internalAtCapture;
		}
		
		/** 
		 * Sets the event data during capture time.
		 */
		public set atCapture(value: EventData) {
			EventBatch.checkPhaseConsistency(value.eventPhase, Event.CAPTURING_PHASE);
			this.internalAtCapture = value;
		}
		
		/** 
		 * Gets the event data during bubble time.
		 */
		public get atBubble(): EventData {
			return this.internalAtBubble;
		}
		
		/** 
		 * Sets the event data during bubble time.
		 */
		public set atBubble(value: EventData) {
			EventBatch.checkPhaseConsistency(value.eventPhase, Event.BUBBLING_PHASE);
			this.internalAtBubble = value;
		}
		
		/** 
		 * Gets the event data during target time.
		 */
		public get atTarget(): EventData {
			return this.internalAtTarget;
		}
		
		/** 
		 * Sets the event data during target time.
		 */
		public set atTarget(value: EventData) {
			EventBatch.checkPhaseConsistency(value.eventPhase, Event.AT_TARGET);
			this.internalAtTarget = value;
		}
		
		/**
		 * Returns a string representation of the object.
		 */
		public toString(): string {
			return "";
		}
		
		constructor() {
			this.internalAtCapture = null;
			this.internalAtBubble = null;
			this.internalAtTarget = null;
		}
		
		private static checkPhaseConsistency(actual: number, expected: number) {
			if (actual != expected) {
				throw new Error(
					"Event data is in phase " + actual + 
					"! Expected: " + expected
				);
			}
		}
	}
}

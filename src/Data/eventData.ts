/**
 * Copyright (c) 2015 Andrea Tino
 * File: eventData.ts
 */

/// <reference path="../eventId.ts"/>

module EVT {
	/**
	 * Class defining data for events.
	 */
	export class EventData {
		private internalId: EventId;
		
		/** 
		 * Gets or sets the timestamp.
		 */
		public timestamp: Date;
		
		/** 
		 * Gets the event id.
		 */
		public get id(): EventId {
			return this.internalId;
		}
		
		/** 
		 * Gets or sets the description.
		 */
		public description: string;
		
		/** 
		 * Gets or sets the event type.
		 */
		public eventType: string;
		
		/** 
		 * Gets or sets the event phase.
		 */
		public eventPhase: Number;
		
		constructor() {
			this.initialize;
		}
		
		/**
		 * Returns a string representation of the object.
		 */
		public toString(): string {
			return "";
		}
		
		private initialize() {
			this.timestamp = new Date();
		}
	}
}

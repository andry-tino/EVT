/**
 * Copyright (c) 2015 Andrea Tino
 * File: eventData.ts
 */

/// <reference path="../eventId.ts"/>

namespace EVT {
	/**
	 * Class defining data for events.
   * This class logs all basic information regarding events.
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
		public eventPhase: number;
		
		constructor(eventId?: EventId) {
			this.timestamp = new Date();
			this.internalId = (eventId != null) ? eventId : new EventId();
		}
		
		/**
		 * Returns a string representation of the object.
		 */
		public toString(): string {
			return "";
		}
	}
}

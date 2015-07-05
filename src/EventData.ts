/**
 * Copyright (c) 2015 Andrea Tino
 * File: EventData.ts
 */

/// <reference path="EventID.ts"/>

module EVT {
	/**
	 * Class defining data for events.
	 */
	export class EventData {
		private internalId: EventID;
		
		/** Gets or sets the timestamp. */
		public timestamp: Date;
		
		/** Gets the event id. */
		public get id(): EventID {
			return this.internalId;
		}
		
		/** Gets or sets the description. */
		public description: string;
		
		/** Gets or sets the event type. */
		public eventType: string;
		
		/** Gets or sets the event phase. */
		public eventPhase: Number;
		
		constructor() {
			this.initialize;
		}
		
		private initialize() {
			this.timestamp = new Date();
		}
	}
}

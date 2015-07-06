/**
 * Copyright (c) 2015 Andrea Tino
 * File: eventId.ts
 */

module EVT {
	/**
	 * Class defining IDs for events.
	 */
	export class EventId {
		private id: string;
		
		constructor() {
			this.id = "";
		}
		
		public toString(): string {
			return this.id;
		}
	}
}

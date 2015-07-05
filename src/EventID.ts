/**
 * Copyright (c) 2015 Andrea Tino
 * File: EventID.ts
 */

module EVT {
	/**
	 * Class defining IDs for events.
	 */
	export class EventID {
		private id: string;
		
		constructor() {
			this.id = "";
		}
		
		public toString(): string {
			return this.id;
		}
	}
}

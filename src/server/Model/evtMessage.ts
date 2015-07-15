/**
 * Copyright (c) 2015 Andrea Tino
 * File: evtMessage.ts
 */

/// <reference path="message.ts"/>

module EVT {
	/**
	 * Class describing EVT messages.
	 */
	export class EvtMessage implements Message {
		private internalName: string;
		private internalBody: string;
		
		/**
		 * The name of the message.
		 */
		public get name(): string {
			return this.internalName;
		}
		
		/**
		 * The body of the message.
		 */
		public get body(): string {
			return this.internalBody;
		}
		
		constructor(payload: string) {
			
		}
	}
}

/**
 * Copyright (c) 2015 Andrea Tino
 * File: message.ts
 */

module EVT {
	/**
	 * Interface describing messages.
	 */
	export interface Message {
		/**
		 * The name of the message.
		 */
		name: string;
		
		/**
		 * The body of the message.
		 */
		body: string;
	}
}

/**
 * Copyright (c) 2015 Andrea Tino
 * File: HTMLElement.ts
 */

module EVT {
	/**
	 * Extending HTMLElement intrface with stuff we need.
	 */
	export interface HTMLElement {
		/**
		 * We store data for tracking events into elements.
		 */
		evtData?: any;
	}
}


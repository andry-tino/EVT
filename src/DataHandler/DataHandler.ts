/**
 * Copyright (c) 2015 Andrea Tino
 * File: DataHandler.ts
 */

/// <reference path="../EventData.ts"/>

module EVT {
	/**
	 * Interface defining behavior for all classes acting as data handlers.
	 */
	export interface DataHandler {
		/**
		 * Gets the event data.
		 */
		data: EventData;
	}
}


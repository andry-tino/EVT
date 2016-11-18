/**
 * Copyright (c) 2015 Andrea Tino
 * File: eventCollector.ts
 */

/// <reference path="./volumeStream.ts"/>

namespace EVT {
	/**
	 * Interface defining behavior for all classes collecting events.
	 */
	export interface EventCollector {
		/**
		 * Collects data.
		 */
		collect(): VolumeStream;
	}
}

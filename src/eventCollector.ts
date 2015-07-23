/**
 * Copyright (c) 2015 Andrea Tino
 * File: eventCollector.ts
 */

import volumeStream = require('./volumeStream');

import VolumeStream = volumeStream.EVT.VolumeStream;

export module EVT {
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

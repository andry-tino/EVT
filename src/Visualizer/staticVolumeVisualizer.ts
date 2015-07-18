/**
 * Copyright (c) 2015 Andrea Tino
 * File: staticVolumeVisualizer.ts
 */

/// <reference path="volumeVisualizer.ts"/>

module EVT {
	/**
	 * Class for static visualization.
	 */
	export class StaticVolumeVisualizer implements VolumeVisualizer {
		public host: HTMLElement;
		
		/**
		 * Pushes a new volume stream to be blended with existing one.
		 */
		public push(volume: VolumeStream) {
			
		}
	}
}

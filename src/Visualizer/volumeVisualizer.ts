/**
 * Copyright (c) 2015 Andrea Tino
 * File: volumeVisualizer.ts
 */

/// <reference path="../volumeStream.ts"/>

module EVT {
	/**
	 * Interface defining behavior for all classes acting as visualizers.
	 */
	export interface VolumeVisualizer {
		/**
		 * Visualizers must require an host element.
		 */
		host: HTMLElement;
		
		/**
		 * Pushes a new volume stream to be blended with existing one.
		 */
		push(volume: VolumeStream): void;
	}
}

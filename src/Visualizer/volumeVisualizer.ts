/**
 * Copyright (c) 2015 Andrea Tino
 * File: volumeVisualizer.ts
 */

/// <reference path="../volumeStream.ts"/>

namespace EVT {
	/**
	 * Interface defining behavior for all classes acting as visualizers.
	 * 
	 * @export
	 * @interface VolumeVisualizer
	 */
	export interface VolumeVisualizer {
		/**
		 * Visualizers must require an host element.
		 * 
		 * @type {HTMLElement}
		 * @memberOf VolumeVisualizer
		 */
		host: HTMLElement;
		
		/**
		 * Pushes a new volume stream to be blended with existing one.
		 * 
		 * @param {VolumeStream} volume
		 * @memberOf VolumeVisualizer
		 */
		push(volume: VolumeStream): void;

		/**
		 * Renders the stream in the element.
		 * 
		 * @memberOf VolumeVisualizer
		 */
		render(): void;
	}
}

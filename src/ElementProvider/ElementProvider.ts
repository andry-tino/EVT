/**
 * Copyright (c) 2015 Andrea Tino
 * File: elementProvider.ts
 */

/// <reference path="../htmlElement.ts"/>

module EVT {
	/**
	 * Interface defining behavior for all classes acting as element providers.
	 */
	export interface ElementProvider {
		/**
		 * Gets the element in the iterative sequence.
		 */
		element: HTMLElement;
		
		/**
		 * Gets a value indicating whether the current element is the first.
		 */
		isFirst: boolean;
		
		/**
		 * Gets a value indicating whether the current element is the last.
		 */
		isLast: boolean;
	}
}

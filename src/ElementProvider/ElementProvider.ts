/**
 * Copyright (c) 2015 Andrea Tino
 * File: ElementProvider.ts
 */

module EVT {
	/**
	 * Interface defining behavior for all classes acting as element providers.
	 */
	export interface ElementProvider {
		/**
		 * Gets the element in the iterative sequence.
		 */
		Element: Element;
		
		/**
		 * Gets a value indicating whether the current element is the first.
		 */
		IsFirst: boolean;
		
		/**
		 * Gets a value indicating whether the current element is the last.
		 */
		IsLast: boolean;
	}
}

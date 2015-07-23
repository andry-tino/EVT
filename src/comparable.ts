/**
 * Copyright (c) 2015 Andrea Tino
 * File: comparable.ts
 */

export module EVT {
	/**
	 * Interface defining comparable objects.
	 */
	export interface Comparable<T> {
		/**
		 * Compares to the object.
		 * other: The other object to compare to.
		 * returns: 0 if equal, negative value if this < other, positive otherwise.
		 */
		compareTo(other: T): number;
	}
}

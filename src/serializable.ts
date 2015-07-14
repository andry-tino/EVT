/**
 * Copyright (c) 2015 Andrea Tino
 * File: serializable.ts
 */

module EVT {
	/**
	 * Interface defining serializable objects.
	 */
	export interface Serializable {
		/**
		 * Serializes the object.
		 */
		serialize(): string;
	}
}

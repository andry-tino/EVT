/**
 * Copyright (c) 2015 Andrea Tino
 * File: serializable.ts
 */

namespace EVT {
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

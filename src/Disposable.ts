/**
 * Copyright (c) 2015 Andrea Tino
 * File: disposable.ts
 */

namespace EVT {
	/**
	 * Interface defining disposable objects.
	 */
	export interface Disposable {
		/**
		 * Disposes the object.
		 */
		dispose(): void;
	}
}

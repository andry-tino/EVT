/**
 * Copyright (c) 2015 Andrea Tino
 * File: EventDataProvider.ts
 */

/// <reference path="EventData.ts"/>

module EVT {
	/**
	 * Interface defining behavior for all classes acting as event data providers.
	 */
	export interface EventDataProvider {
		/**
		 * Provides event data.
		 */
		EventData(): EventData;
	}
}

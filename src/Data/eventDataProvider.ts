/**
 * Copyright (c) 2015 Andrea Tino
 * File: eventDataProvider.ts
 */

/// <reference path="eventData.ts"/>
/// <reference path="../eventId.ts"/>

module EVT {
	/**
	 * Interface defining behavior for all classes acting as event data providers.
	 */
	export interface EventDataProvider {
		/**
		 * Provides event data.
		 */
		eventData(): EventData[];
		
		/**
		 * Gets a specific event basing on the id.
		 */
		getEventDataById(id: EventId): EventData;
		
		/**
		 * Adds an event data.
		 */
		addEventData(eventData: EventData);
		
		/**
		 * Gets the number of evend data stored in the specific implementation.
		 */
		length(): number;
	}
}

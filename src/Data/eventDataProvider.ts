/**
 * Copyright (c) 2015 Andrea Tino
 * File: eventDataProvider.ts
 */

import eventData = require('./eventData');
import eventBatch = require('./eventBatch');
import eventId = require('../eventId');

import EventData = eventData.EVT.EventData;
import EventBatch = eventBatch.EVT.EventBatch;
import EventId = eventId.EVT.EventId;

export module EVT {
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
		getEventBatchById(id: EventId): EventBatch;
		
		/**
		 * Adds an event data.
		 */
		addEventData(eventData: EventData): void;
		
		/**
		 * Gets the number of evend data stored in the specific implementation.
		 */
		length(): number;
	}
}

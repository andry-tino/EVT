/**
 * Copyright (c) 2015 Andrea Tino
 * File: evtEvent.ts
 */

import eventId = require('./eventId');

import EventId = eventId.EVT.EventId;

export module EVT {
	/**
	 * Interface defining data for events.
	 */
	export interface EvtEvent extends Event {
		/**
		 * Marks the event.
		 */
		evtEventId?: EventId;
	}
}

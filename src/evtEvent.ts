/**
 * Copyright (c) 2015 Andrea Tino
 * File: evtEvent.ts
 */

/// <reference path="eventId.ts"/>

module EVT {
	/**
	 * Class defining data for events.
	 */
	export interface EvtEvent extends Event {
		/**
		 * Marks the event.
		 */
		evtEventId?: EventId;
	}
}

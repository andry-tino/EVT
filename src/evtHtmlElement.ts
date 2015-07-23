/**
 * Copyright (c) 2015 Andrea Tino
 * File: evtHtmlElement.ts
 */

import eventData = require('./Data/eventData');

import EventData = eventData.EVT.EventData;

export module EVT {
	/**
	 * Extending HTMLElement intrface with stuff we need.
	 */
	export interface EvtHTMLElement extends HTMLElement {
		/**
		 * We store data for tracking events into elements.
		 */
		evtData?: Array<EventData>;
	}
}


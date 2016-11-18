/**
 * Copyright (c) 2015 Andrea Tino
 * File: elementInSituEventDataProvider.ts
 */

/// <reference path="./eventDataProvider.ts"/>
/// <reference path="./eventData.ts"/>
/// <reference path="./eventBatch.ts"/>
/// <reference path="../disposable.ts"/>
/// <reference path="../evtHtmlElement.ts"/>
/// <reference path="../eventId.ts"/>
/// <reference path="../evtEvent.ts"/>

namespace EVT {
	/**
	 * Class implementing a strategy for getting data from an element.
	 */
	export class ElementInSituEventDataProvider implements EventDataProvider, Disposable {
		private static evtElementAttributeName = "data-evt";
		
		private events = ["click"];
		private element: EvtHTMLElement;
		
    	// Core logic for tracking events as they traverse the element
		private handler = (e: Event) => {
			// Retrieving/initializing the event id
			var event: EvtEvent = <EvtEvent>e;
			event.evtEventId = event.evtEventId || new EventId();
			
			// Retrieving target
			var target = e.currentTarget;
			if (target != this.element) {
				console.log("Target/element inconsistency! Cannot perform EVT operations!");
				return;
			}
			
			// Defining data
			var eventData = new EventData(event.evtEventId);
			eventData.eventType = e.type;
			eventData.eventPhase = e.eventPhase;
			eventData.description = ""; // TODO: Add a description
			
			// Adding data
			this.element.evtData.push(eventData);
			console.log("Logged: t=" + eventData.timestamp.toString() + 
				" id=" + eventData.id + 
				" d=" + eventData.description);
		}
		
		/**
		 * Constructs a new instance of the class.
		 * element: The start element from which creating the sequence.
		 */
		constructor(element: HTMLElement) {
			if (!element) {
				throw new Error("Need an element!");
			}
			
			this.element = element;
			
			this.initializeElement();
		}
		
		/**
		 * Provides event data.
		 */
		public eventData(): EventData[] {
			return this.element.evtData;
		}
		
		/**
		 * Gets a specific event basing on the id.
		 */
		public getEventBatchById(id: EventId): EventBatch {
			return this.search(id);
		}
		
		/**
		 * Adds an event data.
		 * Remarks: Duplicates (same ID) not allowed, error on duplicate.
		 */
		public addEventData(eventData: EventData) {
			var duplicate = this.search(eventData.id);
			if (duplicate) {
				throw new Error("Duplicate not allowed for adding: " + duplicate.toString());
			}
			
			// Can add since not a duplicate
			this.element.evtData.push(eventData);
		}
		
		/**
		 * Gets the number of evend data stored in the specific implementation.
		 */
		public length(): number {
			return this.element.evtData.length;
		}
		
		/**
		 * Disposes data connected to element.
		 */
		public dispose() {
			this.element.evtData = null;
			
			// We remove the attribute
			ElementInSituEventDataProvider.unmark(this.element);
			// And finally remove handlers
			this.detachHandlers(this.element);
		}
		
		/**
		 * Returns a string representation of the object.
		 */
		public toString(): string {
			return "";
		}
		
		private initializeElement() {
			// The reason why we mark the element is because we want to
			// have feedback from the DOM that EVT is active on its and
			// which components.
			ElementInSituEventDataProvider.mark(this.element);
			
			this.element.evtData = this.element.evtData || new Array<EventData>();
			
			// Attaching handlers
			this.attachHandlers(this.element);
		}
		
		// Remember we can have more events for the same id: as many as the number of
		// event phases.
		private search(id: EventId): EventBatch {
			var batch = new EventBatch();
			var batchComplete = (b: EventBatch): boolean => {
				return b.atCapture != null &&
					   b.atBubble != null && 
					   b.atTarget != null;
			};
			var insertInBatch = (x: EventData, b: EventBatch) => {
				switch (x.eventPhase) {
				case Event.CAPTURING_PHASE:
					if (b.atCapture != null) {
						throw new Error("Batch already has atCapture!");
					}
					b.atCapture = x;
					break;
				case Event.BUBBLING_PHASE:
					if (b.atBubble != null) {
						throw new Error("Batch already has atBubble!");
					}
					b.atBubble = x;
					break;
				case Event.AT_TARGET:
					if (b.atTarget != null) {
						throw new Error("Batch already has atTarget!");
					}
					b.atTarget = x;
					break;
				default:
					throw new Error("Unexpected value for batch: " + x.eventPhase);
				}
			};
			
      // TODO: Improve by using dictionaries
			for (var index in this.element.evtData) {
				var item = this.element.evtData[index];
				
				if (item.id.compareTo(id) == 0) {
					insertInBatch(item, batch);
					if (batchComplete(batch)) {
						break;
					}
				}
			}
			
			return batch;
		}
		
		private attachHandlers(element: HTMLElement) {
			this.events.forEach(event => {
				element.addEventListener(event, this.handler, true); // Capture
				element.addEventListener(event, this.handler, false); // Bubble
			});
		}
		
		private detachHandlers(element: HTMLElement) {
			this.events.forEach(event => {
				element.removeEventListener(event, this.handler, true); // Capture
				element.removeEventListener(event, this.handler, false); // Bubble
			});
		}
		
		private static mark(element: HTMLElement) {
			element.setAttribute(ElementInSituEventDataProvider.evtElementAttributeName, "");
		}
		
		private static unmark(element: HTMLElement) {
			element.removeAttribute(ElementInSituEventDataProvider.evtElementAttributeName);
		}
	}
}

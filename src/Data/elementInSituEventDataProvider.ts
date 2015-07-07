/**
 * Copyright (c) 2015 Andrea Tino
 * File: elementInSituEventDataProvider.ts
 */
 
/// <reference path="eventDataProvider.ts"/>
/// <reference path="eventData.ts"/>
/// <reference path="../disposable.ts"/>
/// <reference path="../evtHtmlElement.ts"/>
/// <reference path="../eventId.ts"/>

module EVT {
	/**
	 * Class implementing a depth first element providing strategy.
	 */
	export class ElementInSituEventDataProvider implements EventDataProvider, Disposable {
		private static evtElementAttributeName = "data-evt";
		
		private element: EvtHTMLElement;
		
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
		public getEventDataById(id: EventId): EventData {
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
		}
		
		private search(id: EventId): EventData {
			for (var item in this.element.evtData) {
				if (item.id.compareTo(id) == 0) {
					return item;
				}
			}
			
			// Not found
			return null;
		}
		
		private static mark(element: HTMLElement) {
			element.setAttribute(ElementInSituEventDataProvider.evtElementAttributeName, "");
		}
		
		private static unmark(element: HTMLElement) {
			element.removeAttribute(ElementInSituEventDataProvider.evtElementAttributeName);
		}
	}
}

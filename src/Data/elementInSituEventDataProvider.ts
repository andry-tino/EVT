/**
 * Copyright (c) 2015 Andrea Tino
 * File: elementInSituEventDataProvider.ts
 */
 
/// <reference path="eventDataProvider.ts"/>
/// <reference path="../disposable.ts"/>
/// <reference path="../htmlElement.ts"/>

module EVT {
	/**
	 * Class implementing a depth first element providing strategy.
	 */
	export class ElementInSituEventDataProvider implements EventDataProvider, Disposable {
		private element: HTMLElement;
		
		/**
		 * Constructs a new instance of the class.
		 * element: The start element from which creating the sequence.
		 */
		constructor(element: HTMLElement) {
			if (!element) {
				throw new Error("Need an element!");
			}
			
			this.element = element;
			this.element.evtData = {};
			
			this.initializeElement();
		}
		
		/**
		 * Provides event data.
		 */
		public eventData(): EventData[] {
			return null;
		}
		
		/**
		 * Gets a specific event basing on the id.
		 */
		public getEventDataById(id: EventId): EventData {
			return null;
		}
		
		/**
		 * Gets the number of evend data stored in the specific implementation.
		 */
		public length(): Number {
			return 0;
		}
		
		/**
		 * Disposes data connected to element.
		 */
		public dispose() {
			
		}
		
		private initializeElement() {
			
		}
	}
}

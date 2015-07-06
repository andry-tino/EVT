/**
 * Copyright (c) 2015 Andrea Tino
 * File: evt.ts
 */

/// <reference path="ElementProvider/elementProvider.ts"/>
/// <reference path="eventCollector.ts"/>
/// <reference path="Data/elementInSituEventDataProvider.ts"/>
/// <reference path="disposable.ts"/>

module EVT {
	/**
	 * Class implementing all features by EVT and functrionalities
	 * to track events and export collected results.
	 */
	export class Evt implements EventCollector, Disposable {
		private root: Element;
		
		/** Gets or sets the element provider. */
		public elementProvider: ElementProvider;
		
		/** Gets or sets the data handler. */
		public eventDataProvider: EventDataProvider;
		
		/**
		 * Constructs a new instance of the Evt class.
		 * root: The element from which starting everything.
		 */
		constructor(root: Element) {
			if (!root) {
				throw new Error("root cannot be null!");
			}
			
			this.root = root;
			
			this.initialize();
		}
		
		public start() {
			// TODO: Implement
		}
		
		public stop() {
			
		}
		
		public collect(): any {
			
		}
		
		public eventData(): EventData {
			return null;
		}
		
		/**
		 * Disposes all resources.
		 */
		public dispose() {
			
		}
		
		private initialize() {
			// Providing default values
			this.elementProvider = null;
			this.eventDataProvider = null;
		}
	}
}


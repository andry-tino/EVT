/**
 * Copyright (c) 2015 Andrea Tino
 * File: evt.ts
 */

/// <reference path="ElementProvider/ElementProvider.ts"/>
/// <reference path="DataHandler/DataHandler.ts"/>
/// <reference path="EventDataProvider.ts"/>
/// <reference path="Disposable.ts"/>

module EVT {
	/**
	 * Class implementing all features by EVT and functrionalities
	 * to track events and export collected results.
	 */
	export class Evt implements EventDataProvider, Disposable {
		private root: Element;
		
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
		
		/** Gets or sets the element provider. */
		public elementProvider: ElementProvider;
		
		/** Gets or sets the data handler. */
		public dataHandler: DataHandler;
		
		public start() {
			// TODO: Implement
		}
		
		public stop() {
			
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
			this.dataHandler = null;
		}
	}
}


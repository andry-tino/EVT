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
		
		private elementProvider: ElementProvider;
		private dataHandler: DataHandler;
		
		/**
		 * Constructs a new instance of the Evt class.
		 * root: The element from which starting everything.
		 */
		constructor(root: Element) {
			if (!root) {
				throw new Error("root cannot be null!");
			}
			
			this.elementProvider = null;
			this.dataHandler = null;
			
			this.root = root;
		}
		
		/** Gets the ElementProvider */
		public get ElementProvider(): ElementProvider {
			if (!this.elementProvider) {
				// TODO: Create
			}
			return this.elementProvider;
		}
		
		/** Sets the ElementProvider */
		public set ElementProvider(value: ElementProvider) {
			this.elementProvider = value;
		}
		
		/** Gets the DataHandler */
		public get DataHandler(): DataHandler {
			if (!this.dataHandler) {
				// TODO: Create
			}
			return this.dataHandler;
		}
		
		/** Sets the DataHandler */
		public set DataHandler(value: DataHandler) {
			this.dataHandler = value;
		}
		
		public Start() {
			// TODO: Implement
		}
		
		public Stop() {
			
		}
		
		public EventData(): EventData {
			return null;
		}
		
		/**
		 * Disposes all resources.
		 */
		public Dispose() {
			
		}
	}
}


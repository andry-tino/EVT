/**
 * Copyright (c) 2015 Andrea Tino
 * File: evt.ts
 */

/// <reference path="ElementProvider/elementProvider.ts"/>
/// <reference path="ElementProvider/depthFirstElementProvider.ts"/>
/// <reference path="Data/eventDataProvider.ts"/>
/// <reference path="Data/elementInSituEventDataProvider.ts"/>
/// <reference path="eventCollector.ts"/>
/// <reference path="disposable.ts"/>
/// <reference path="evtHtmlElement.ts"/>

module EVT {
	/**
	 * Class implementing all features by EVT and functrionalities
	 * to track events and export collected results
	 * 
	 * Remarks:
	 * Not handling changes in the DOM.
	 */
	export class Evt implements EventCollector, Disposable {
		private root: HTMLElement;
		private dataProviders: EventDataProvider[];		
		private enabled: boolean;

		// Cached value
		private collectedData: any;
		
		/** 
		 * Gets or sets the element provider.
		 */
		public elementProvider: ElementProvider;
		
		/** 
		 * Gets or sets the procedure returning the event data provider.
		 */
		public eventDataProvider: (HTMLElement) => EventDataProvider;
		
		/**
		 * Constructs a new instance of the Evt class.
		 * root: The element from which starting everything.
		 */
		constructor(root: HTMLElement) {
			if (!root) {
				throw new Error("root cannot be null!");
			}
			
			this.root = root;
			this.dataProviders = new Array<EventDataProvider>();
			this.enabled = false;
			this.collectedData = null;
			
			this.initialize();
		}
		
		/**
		 * Starts the EVT process.
		 */
		public start() {
			this.enabled = true;
		}
		
		/**
		 * Stops the EVT process.
		 */
		public stop() {
			this.enabled = false;
		}
		
		/**
		 * Performs the collection operations.
		 */
		public collect(): any {
			if (this.collectedData) {
				return this.collectedData;
			}
			
			// TODO: Implement
		}
		
		public eventData(): EventData {
			return null;
		}
		
		/**
		 * Disposes all resources.
		 */
		public dispose() {
			if ((<any>this.elementProvider).dispose) {
				(<any>this.elementProvider).dispose();
			}
			
			this.dataProviders.forEach(dataProvider => {
				if ((<any>dataProvider).dispose) {
					(<any>dataProvider).dispose();
				}
			});
			this.dataProviders = null;
			
			this.elementProvider = null;
			this.eventDataProvider = null;
			
			if ((<any>this.collectedData).dispose) {
				(<any>this.collectedData).dispose();
			}
			this.collectedData = null;
		}
		
		private initialize() {
			// Providing default values
			this.elementProvider = new DepthFirstElementProvider(this.root);
			this.eventDataProvider = (element: HTMLElement) => new ElementInSituEventDataProvider(element);
			
			this.scanTree();
		}
		
		private scanTree() {
			while (!this.elementProvider.isLast) {
				var element = this.elementProvider.element; // Iterating
				this.dataProviders.push(this.eventDataProvider(element));
			}
		}
		
		private unscanTree() {
			this.dataProviders.forEach(dataProvider => {
				// TODO
			});
		}
	}
}


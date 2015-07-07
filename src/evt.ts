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
	 * to track events and export collected results.
	 */
	export class Evt implements EventCollector, Disposable {
		private root: Element;
		private elements: EvtHTMLElement[];
		
		private enabled: boolean;
		
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
		constructor(root: Element) {
			if (!root) {
				throw new Error("root cannot be null!");
			}
			
			this.root = root;
			this.enabled = false;
			
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
			// To implement
		}
		
		public eventData(): EventData {
			return null;
		}
		
		/**
		 * Disposes all resources.
		 */
		public dispose() {
			if ((<any>this.elementProvider).dispose) (<any>this.elementProvider).dispose();
		}
		
		private initialize() {
			// Providing default values
			this.elementProvider = new DepthFirstElementProvider(this.root);
			this.eventDataProvider = (element: HTMLElement) => new ElementInSituEventDataProvider(element);
		}
	}
}


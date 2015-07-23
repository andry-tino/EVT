/**
 * Copyright (c) 2015 Andrea Tino
 * File: evt.ts
 */

import elementProvider = require('./ElementProvider/elementProvider');
import depthFirstElementProvider = require('./ElementProvider/depthFirstElementProvider');
import eventDataProvider = require('./Data/eventDataProvider');
import elementInSituEventDataProvider = require('./Data/elementInSituEventDataProvider');
import eventData = require('./Data/eventData');
import eventCollector = require('./eventCollector');
import disposable = require('./disposable');
import evtHtmlElement = require('./evtHtmlElement');

import ElementProvider = elementProvider.EVT.ElementProvider;
import DepthFirstElementProvider = depthFirstElementProvider.EVT.DepthFirstElementProvider;
import EventDataProvider = eventDataProvider.EVT.EventDataProvider;
import ElementInSituEventDataProvider = elementInSituEventDataProvider.EVT.ElementInSituEventDataProvider;
import EventData = eventData.EVT.EventData;
import EventCollector = eventCollector.EVT.EventCollector;
import Disposable = disposable.EVT.Disposable;
import EvtHtmlElement = evtHtmlElement.EVT.EvtHTMLElement;

export module EVT {
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
		public eventDataProvider: (element: HTMLElement) => EventDataProvider;
		
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


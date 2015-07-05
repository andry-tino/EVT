/**
 * Copyright (c) 2015 Andrea Tino
 * File: ElementDistributedDataHandler.ts
 */
 
/// <reference path="DataHandler.ts"/>
/// <reference path="../Disposable.ts"/>
/// <reference path="../HTMLElement.ts"/>

module EVT {
	/**
	 * Class implementing a depth first element providing strategy.
	 */
	export class ElementDistributedDataHandler implements DataHandler, Disposable {
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
		 * Gets data.
		 */
		public get data(): EventData {
			return null;
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

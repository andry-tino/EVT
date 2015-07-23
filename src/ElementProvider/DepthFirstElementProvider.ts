/**
 * Copyright (c) 2015 Andrea Tino
 * File: depthFirstElementProvider.ts
 */

import elementProvider = require('./elementProvider');
import disposable = require('../disposable');

import ElementProvider = elementProvider.EVT.ElementProvider;
import Disposable = disposable.EVT.Disposable;

export module EVT {
	/**
	 * Class implementing a depth first element providing strategy.
	 */
	export class DepthFirstElementProvider implements ElementProvider, Disposable {
		private sequence: HTMLElement[];
		private cursor: number;
		
		/**
		 * Constructs a new instance of the class.
		 * root: The start element from which creating the sequence.
		 */
		constructor(root: HTMLElement) {
			if (!root) {
				throw new Error("Need an element!");
			}
			
			this.cursor = 0;
			
			this.sequence = new Array<HTMLElement>();
			this.buildSequence(root);
		}
		
		/**
		 * Gets the element in the iterative sequence.
		 */
		public get element(): HTMLElement {
			var element = this.sequence[this.cursor++ % this.sequence.length];
			
			// Preventing cursor from growing uncontrolled until it reaches high numbers
			this.cursor = ((this.cursor % this.sequence.length) == 0) ? 0 : this.cursor;
			
			return element;
		}
		
		/**
		 * Gets a value indicating whether the current element is the first.
		 */
		public get isFirst(): boolean {
			return (this.cursor % this.sequence.length) == 0;
		}
		
		/**
		 * Gets a value indicating whether the current element is the last.
		 */
		public get isLast(): boolean {
			return (this.cursor % this.sequence.length) == this.sequence.length - 1;
		}
		
		/**
		 * Disposes the object.
		 */
		public dispose() {
			this.sequence = null;
		}
		
		/**
		 * We build the sequence at construction time, so that we can iterate it
		 * without any cost. Construction is O(N) allowing iteration to be O(1).
		 */
		private buildSequence(element: HTMLElement) {
			if (!element) {
				return;
			}
			
			this.sequence.push(element);
			
			var children = element.children;
			for (var index in children) {
				var child = children[index];
				if (child.nodeType == Node.ELEMENT_NODE) {
					this.buildSequence(<HTMLElement>child);
				}
			}
		}
	}
}

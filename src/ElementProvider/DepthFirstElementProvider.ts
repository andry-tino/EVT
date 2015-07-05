/**
 * Copyright (c) 2015 Andrea Tino
 * File: DepthFirstElementProvider.ts
 */
 
/// <reference path="ElementProvider.ts"/>
/// <reference path="../Disposable.ts"/>

module EVT {
	/**
	 * Class implementing a depth first element providing strategy.
	 */
	export class DepthFirstElementProvider implements ElementProvider, Disposable {
		private sequence: Element[];
		private cursor: number;
		
		/**
		 * Constructs a new instance of the class.
		 * root: The start element from which creating the sequence.
		 */
		constructor(root: Element) {
			if (!root) {
				throw new Error("Need an element!");
			}
			
			this.cursor = 0;
			this.buildSequence(root);
		}
		
		/**
		 * Gets the element in the iterative sequence.
		 */
		public get element(): HTMLElement {
			return this.sequence[this.cursor++ % this.sequence.length];
		}
		
		/**
		 * Gets a value indicating whether the current element is the first.
		 */
		public get isFirst(): boolean {
			return this.cursor == 0;
		}
		
		/**
		 * Gets a value indicating whether the current element is the last.
		 */
		public get isLast(): boolean {
			return this.cursor == this.sequence.length - 1;
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
		private buildSequence(element: Element) {
			if (!element) {
				return;
			}
			
			this.sequence.push(element);
			
			var children = element.childNodes;
			for (var child in children) {
				if (child.nodeType == Node.ELEMENT_NODE) {
					this.buildSequence(child);
				}
			}
		}
	}
}

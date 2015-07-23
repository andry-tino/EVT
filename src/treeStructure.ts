/**
 * Copyright (c) 2015 Andrea Tino
 * File: treeStructure.ts
 */

import serializable = require('./serializable');
import treeStructure = require('./treeStructure');
import comparable = require('./comparable');

import Serializable = serializable.EVT.Serializable;
import TreeStructure = treeStructure.EVT.TreeStructure;
import Comparable = comparable.EVT.Comparable;

export module EVT {
	/**
	 * Class storing the XML structure analyzed.
	 */
	export class TreeStructure implements Serializable, Comparable<TreeStructure> {
		private nodes: string[];
		
		constructor() {
			this.nodes = new Array<string>();
		}
		
		/**
		 * Adds an element to the structure after converting it into a key.
		 */
		public add(element: HTMLElement) {
			
		}
		
		/**
		 * Tells whether a certain key is part of the structure or not.
		 */
		public exists(key: string): boolean {
			return false;
		}
		
		/**
		 * Serializes the object.
		 */
		public serialize(): string {
			return "";
		}
		
		/**
		 * Returns 0 if trees are the same, otherwise a non-zero number.
		 */
		public compareTo(other: TreeStructure): number {
			if (this.nodes.length != other.nodes.length) {
				return -1;
			}
			
			// Compare from one tree and then from the other one
			var cmp = (tree1: TreeStructure, tree2: TreeStructure) => {
				tree1.nodes.forEach(node => {
					if (!tree2.exists(node)) {
						return -1;
					}
				});
				return 0;
			};
			return cmp(this, other) + cmp(other, this);
		}
		
		private static element2key(element: HTMLElement): string {
			return "";
		}
	}
}

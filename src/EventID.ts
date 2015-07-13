/**
 * Copyright (c) 2015 Andrea Tino
 * File: eventId.ts
 */

/// <reference path="comparable.ts"/>

module EVT {
	/**
	 * Class defining IDs for events.
	 */
	export class EventId implements Comparable<EventId> {
		private static byteLength = 8;
		private static separator = "-";
		
		private nums: number[];
		
		/**
		 * Generates a new random ID.
		 */
		constructor() {
			this.nums = new Array<number>(EventId.byteLength);
			
			this.initialize();
		}
		
		/**
		 * Compares two objects.
		 */
		public compareTo(other: EventId): number {
			return 0;
		}
		
		/**
		 * Provides a string representation of the object.
		 */
		public toString(): string {
			var s4 = (num: number) => {
				return num.toString(16).substring(1);
			};
			
			var value = "";
			this.nums.forEach(item => {
				value += s4(item) + EventId.separator;
			});
			
			// Remember to remove last (exceeding) separator
			return value.substr(0, value.length - 1);
		}
		
		private initialize() {
			var rnd = () => {
				return 1 + Math.random();
			};
			var s4 = () => {
				return Math.floor(rnd() * 0x10000);
			};
			
			for (var i = 0; i < EventId.byteLength; i++) {
				this.nums[i] = s4();
			}
		}
	}
}

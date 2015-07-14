/**
 * Copyright (c) 2015 Andrea Tino
 * File: volumeStream.ts
 */

/// <reference path="serializable.ts"/>
/// <reference path="treeStructure.ts"/>

module EVT {
	/**
	 * An event point.
	 */
	class EventPoint {
		private timestamp: Date;
		private eventName: string;
	}
	
	/**
	 * An entry.
	 */
	class VolumeTimeline {
		private lineId: string;
		private points: EventPoint[];
	}
	
	/**
	 * Class final processable raw volume data.
	 */
	export class VolumeStream {
		private phase: number;
		private data: any;
		private tree: TreeStructure; // TBR
		private timelines: VolumeTimeline[];
		
		constructor() {
			this.phase = 0;
			this.data = null;
			this.tree = null;
		}
		
		/**
		 * Merges one volume into this.
		 */
		public merge(volume: VolumeStream) {
			if (!VolumeStream.areVolumesMergeable(this, volume)) {
				throw new Error("Volumes are not mergeable!");
			}
			
			// TODO: Implement logic
		}
		
		private static areVolumesMergeable(volume1: VolumeStream, volume2: VolumeStream): boolean {
			return volume1.tree.compareTo(volume2.tree) == 0;
		}
	}
}

/**
 * Copyright (c) 2015 Andrea Tino
 * File: evtServer.ts
 */

/// <reference path="../vendor/node.d.ts"/>
/// <reference path="../vendor/websocket.d.ts"/>

import WebSocket = require('websocket');

module EVT {
	/**
	 * Class implementing the EVT server.
	 */
	export class EvtServer {
		private defaultPort: number = 3000;
		private server: WebSocket.server;
		
		/**
		 * Runs the server.
		 */
		public run() {
			var port: number = process.env.PORT || this.defaultPort;
			this.server = new WebSocket.server();
			
			this.server.on('connect', connection => {
				connection.on('message', message => {
					try {
						
					} catch (e) {
						
					}
				});
			});
		}
		
		/**
		 * Stops the server.
		 */
		public stop() {
			
		}
	}
}

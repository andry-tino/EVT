/**
 * Copyright (c) 2015 Andrea Tino
 * File: default.ts
 */

/// <reference path="../../src/evt.d.ts"/>

export module EVT.Examples.Minimal {
  export class Default {
    /**
     * Runs the example.
     */
    public run() {
      var main = document.createElement("div");
      var title = document.createElement("h1");
      var box1 = this.createBox();

      main.className = "main";

      title.textContent = "Welcome to EVT Minimal example";

      main.appendChild(title);
      main.appendChild(box1);
      document.body.appendChild(main);

      // Start EVT
      (<any>window)["evt"] = new EVT.Evt(document.body);
      var evt = (<any>window)["evt"];
      evt.start();
    }
    
    private createBox() : HTMLElement {
      var container = document.createElement("div");
      container.className = "box";
      for (var i = 0, c = container; i < 4; i++) {
        var n = document.createElement("div");
        c.appendChild(n);
        c = n;
      }
      return container;
    }
  }
}

// Running
var main = new EVT.Examples.Minimal.Default();
main.run();

/**
 * Copyright (c) 2015 Andrea Tino
 * File: cssStyleRenderer.ts
 */

/// <reference path="./cssStyle.ts"/>

namespace EVT {
    /**
     * Renderer for CSS style.
     * 
     * @export
     * @class cssStyleRenderer
     */
    export class cssStyleRenderer {
        private readonly style: [CssStyle];

        // Cached quantities
        private renderedCss: string;

        /**
         * Creates an instance of cssStyleRenderer.
         * 
         * @param {[CssStyle]} style
         * @memberOf cssStyleRenderer
         */
        constructor(style: [CssStyle]) {
            if (!style) throw "Style must be defined!";

            this.style = style;
        }

        /**
         * Renders the CSS style.
         * 
         * @returns {string}
         * @memberOf cssStyleRenderer
         */
        public render(): string {
            if (!this.renderedCss) {
                this.renderedCss = "";
            }

            return this.renderedCss;
        }
    }
}
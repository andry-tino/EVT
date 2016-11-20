/**
 * Copyright (c) 2015 Andrea Tino
 * File: cssStyle.ts
 */

namespace EVT {
    /**
     * Interface for describing CSS styles.
     * 
     * @export
     * @interface CssStyle
     */
    export interface CssStyle {
        /**
         * The selector.
         * 
         * @type {[string]}
         * @memberOf CssStyle
         */
        selector: [string];

        /**
         * The array of rules.
         * 
         * @type {[CssRule]}
         * @memberOf CssStyle
         */
        rules: [CssRule];
    }

    /**
     * Describes a CSS rule.
     * 
     * @export
     * @interface CssRule
     */
    export interface CssRule {
        /**
         * The rule name.
         * 
         * @type {string}
         * @memberOf CssRule
         */
        name: string;
        
        /**
         * The value.
         * 
         * @type {string}
         * @memberOf CssRule
         */
        value: string;
    }
}
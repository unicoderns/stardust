import JSloth from "../lib/core";
/**
 * Batch commands.
 */
export default class Batch {
    /*** JSloth library */
    protected jsloth: JSloth;
    /*** Batch process */
    private exec;
    constructor(jsloth: JSloth);
    /**
     * Compile SCSS
     *
     * @param from Source style path
     * @param to Path for compiled styles
     * @param next
     */
    compileSCSS: (from: string, to: string) => Promise<any>;
    /**
     * Clean and copy public folder
     *
     * @param from Source path
     * @param to Path to place the copy
     * @param next
     */
    copyPublic: (from: string, to: string) => Promise<any>;
}

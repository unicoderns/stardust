import { Promise } from "es6-promise";
import { Lib } from "../lib/core";
/**
* Stardust Path
* Check the right path, search /core/ first and /app/ if is not found it.
*/
export default class JSPath {
    /*** Stardust library */
    protected lib: Lib;
    /*** Configuration methods */
    constructor(lib: Lib);
    /**
     * Get the new full path.
     *
     * @param file string Filename
     * @return void
     */
    get(type: string, app: string, file: string): Promise<string>;
}

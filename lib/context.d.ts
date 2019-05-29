import { Lib } from "../lib/core";
/**
* Stardust Context
* System context storage.
*/
export default class JSContext {
    /*** Basic */
    protected lib: Lib;
    /*** System Urls */
    baseURL: string;
    sourceURL: string;
    /*** Users Cache */
    protected userCache: any;
    /*** System Urls */
    private urls;
    /*** Configuration methods */
    constructor(lib: Lib, baseURL: string);
    /**
     * Set new url.
     *
     * @param token url token
     * @param url url path
     * @return void
     */
    setUrl(token: string, url: string): void;
    /**
     * Export full context.
     *
     * @return Object
     */
    export(): any;
}

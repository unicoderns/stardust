import { Router } from "express";
import { Lib } from "../lib/core";
import SysConfig from "../interfaces/config";
/**
 * Controller Abstract
 */
export default class Controller {
    protected lib: Lib;
    protected config: any;
    protected namespaces: string[];
    protected url: string;
    /**
     * Express Router instance
     *
     * @return Router
     */
    router: Router;
    /**
     * Load library, app configuration and install routes
     */
    constructor(lib: Lib, config: SysConfig, url: string, namespaces: string[]);
    /*** Init Controller */
    protected init(): void;
    /*** Setup Controller */
    setup(): void;
    /*** Define routes */
    protected routes(): void;
}

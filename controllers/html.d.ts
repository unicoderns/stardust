import Controller from "./core";
import SysConfig from "../interfaces/config";
import { Response, Request, Application } from "express";
import { Lib } from "../lib/core";
/**
 * Routes Abstract
 */
export default class HtmlController extends Controller {
    protected app: Application;
    /*** Init Controller */
    constructor(lib: Lib, config: SysConfig, url: string, namespaces: string[]);
    /*** Get configured app for engine */
    private getApp;
    /**
     * Load Routes
     *
     * @param req Request
     * @param res Response
     * @param file string
     * @param params object
     */
    protected render(req: Request, res: Response, file: string, params?: any): void;
}

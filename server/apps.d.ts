import SysConfig from "../interfaces/config";
import { Application, NextFunction } from "express";
import { Lib } from "../lib/core";
/**
 * Stardust apps related tools.
 */
export default class Apps {
    /*** List of apps (System + Custom) */
    private apps;
    /*** System configuration */
    private config;
    /*** Express app */
    private express;
    /*** library */
    private lib;
    /*** Batch server library */
    private batch;
    /**
     * Load configuration, library and Express application.
     *
     * @param config System configuration
     * @param lib Library
     * @param express Express app
     */
    constructor(config: SysConfig, lib: Lib, express: Application);
    /**
     * Start installation process
     *
     * @param next
     */
    install(next: NextFunction): void;
    /**
     * Return a empty app object
     *
     * @return app.App
     */
    private emptyApp;
    /**
     * Install a group of apps
     *
     * @param apps List of apps and configuration to install
     * @param type Apps family (system|apps)
     * @param next
     */
    private installApps;
    /**
     * Copy public folder, compile SCSS, load routes and apis.
     *
     * @param app App configuration.
     * @param type App family (system|apps)
     * @param next
     */
    private installApp;
    /**
     * Load and install routes
     *
     * @param app App configuration.
     * @param appType App family (system|apps)
     * @param routeType Route family (routes|dash|api)
     * @param basepath Url prefix
     * @param next
     */
    private loadRoutes;
    /**
     * Check if everything is done, and set done flag as true
     *
     * @param app App configuration.
     * @param next
     */
    private installed;
}

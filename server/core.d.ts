import * as app from "../interfaces/app";
import { Lib } from "../lib/core";
import { Application } from "express";
/**
 * Creates and configure an ExpressJS web server.
 *
 * @return express.Application
 */
export declare class Server {
    /*** Express instance */
    express: Application;
    /**
     * Stores the app port
     * @default port System environment port or 8080
     */
    protected port: number;
    /*** Default configuration filepath */
    protected configPath: string;
    protected defaultConfigPath: string;
    /*** Apps object */
    protected apps: app.App[];
    /*** library */
    protected lib: Lib;
    /**
     * Load configuration settings, set up Global Library and start installation.
     */
    constructor(dirname: string);
    /**
     * Install endpoints, configure and run the Express App instance and load middlewares
     */
    protected install(): void;
    /*** Configure Express middlewares */
    protected middleware(): void;
    /*** Run the server */
    protected start(): void;
}

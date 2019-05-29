import * as app from "../interfaces/app";
import JSloth from "../lib/core";
import { Application } from "express";
/**
 * Creates and configure an ExpressJS web server.
 *
 * @return express.Application
 */
export default class Core {
    /*** Express instance */
    express: Application;
    /**
     * Stores the app port
     * @default port System environment port or 8080
     * Please note: the unary + cast to number
     */
    protected port: number;
    /*** Default configuration filepath */
    protected configPath: string;
    protected defaultConfigPath: string;
    /*** Apps object */
    protected apps: app.App[];
    /*** JSloth library */
    protected jsloth: JSloth;
    /**
     * Load configuration settings, set up JSloth Global Library and start installation.
     */
    constructor();
    /**
     * Install endpoints, configure and run the Express App instance and load middlewares
     */
    protected install(): void;
    /*** Configure Express middlewares */
    protected middleware(): void;
    /*** Run the server */
    protected start(): void;
}

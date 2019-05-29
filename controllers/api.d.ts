import Controller from "./core";
import { RequestHandler } from "express";
/**
 * Routes Abstract
 */
export default class ApiController extends Controller {
    /**
     * Add url to context
     *
     * @param url Concatenated url across the imports
     * @param namespace Complete array of namespaces from imports.
     * @return void
     */
    private context;
    /**
     * Get Route
     *
     * @param url Concatenated url across the imports
     * @param namespace Complete array of namespaces from imports.
     * @param handlers Express request handlers.
     * @return void
     */
    protected get(path: string | RegExp | (string | RegExp)[], namespace: string, ...handlers: RequestHandler[]): void;
    /**
     * Post Route
     *
     * @param url Concatenated url across the imports
     * @param namespace Complete array of namespaces from imports.
     * @param handlers Express request handlers.
     * @return void
     */
    protected post(path: string | RegExp | (string | RegExp)[], namespace: string, ...handlers: RequestHandler[]): void;
    /**
     * Put Route
     *
     * @param url Concatenated url across the imports
     * @param namespace Complete array of namespaces from imports.
     * @param handlers Express request handlers.
     * @return void
     */
    protected put(path: string | RegExp | (string | RegExp)[], namespace: string, ...handlers: RequestHandler[]): void;
    /**
     * Delete Route
     *
     * @param url Concatenated url across the imports
     * @param namespace Complete array of namespaces from imports.
     * @param handlers Express request handlers.
     * @return void
     */
    protected delete(path: string | RegExp | (string | RegExp)[], namespace: string, ...handlers: RequestHandler[]): void;
}

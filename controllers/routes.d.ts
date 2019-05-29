import Controller from "./core";
/**
 * Routes Abstract
 */
export default class Routes extends Controller {
    /**
     * Load and install routes
     *
     * @param controller
     * @param url Concatenated url across the imports
     * @param namespace Current namespace name
     * @return express.Router
     */
    protected include(controller: any, url?: string, namespace?: string): void;
}

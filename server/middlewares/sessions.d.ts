/// <reference path="../../sources/server/types/express.d.ts" />
import { Request, Response, NextFunction, RequestHandler } from "express";
import { Lib } from "../../lib/core";
/**
 * Stardust Session Middlewares
 */
export default class Sessions {
    protected config: any;
    protected lib: Lib;
    /**
     * Load library, app configuration and install routes
     */
    constructor(lib: Lib);
    /**
     * Force an update context user
     *
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next Callback.
     */
    updateContext: (req: Request, res: Response, next: NextFunction) => void;
    /**
     * Get context user
     *
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next Callback.
     */
    context: (req: Request, res: Response, next: NextFunction) => void;
    /**
     * Session token verification
     *
     * @param res {Response} The response object.
     * @param format {string} Kind of reply.
     * @param json Custom json to reply.
     */
    private reply;
    /**
     * Session token verification
     *
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next Callback.
     */
    auth: (format?: string) => RequestHandler;
    isVerified: (format?: string) => RequestHandler;
    isAdmin: (format?: string) => RequestHandler;
}

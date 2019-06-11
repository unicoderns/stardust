"use strict";
////////////////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)                                                                  //
//                                                                                        //
// Copyright (C) 2016  Unicoderns SA - info@unicoderns.com - unicoderns.com               //
//                                                                                        //
// Permission is hereby granted, free of charge, to any person obtaining a copy           //
// of this software and associated documentation files (the "Software"), to deal          //
// in the Software without restriction, including without limitation the rights           //
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell              //
// copies of the Software, and to permit persons to whom the Software is                  //
// furnished to do so, subject to the following conditions:                               //
//                                                                                        //
// The above copyright notice and this permission notice shall be included in all         //
// copies or substantial portions of the Software.                                        //
//                                                                                        //
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR             //
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,               //
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE            //
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER                 //
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,          //
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE          //
// SOFTWARE.                                                                              //
////////////////////////////////////////////////////////////////////////////////////////////
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser")); // Parse incoming request bodies
const fse = __importStar(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan")); // Log requests
const apps_1 = __importDefault(require("./apps"));
const sessions_1 = __importDefault(require("./middlewares/sessions"));
const log_1 = __importDefault(require("./log"));
const core_1 = require("../lib/core");
/**
 * Creates and configure an ExpressJS web server.
 *
 * @return express.Application
 */
class Server {
    // ! Suppress strict initialization check due to Typescript design limitation
    // https://github.com/microsoft/TypeScript/issues/21132
    /**
     * Load configuration settings, set up Global Library and start installation.
     */
    constructor(dirname) {
        /**
         * Stores the app port
         * @default port System environment port or 8080
         */
        this.port = parseInt(process.env.PORT, 10) || 8080;
        /*** Default configuration filepath */
        this.configPath = "/../config.json";
        this.defaultConfigPath = "/../sample_config.json";
        /*** Apps object */
        this.apps = [];
        // Creating App
        this.express = express_1.default();
        log_1.default.hello();
        // Mount static files
        log_1.default.module("Static files published");
        this.express.use('/', express_1.default.static(dirname + '/../dist/static/'));
        let start = ((config) => {
            // Loading Global Library
            try {
                this.lib = new core_1.Lib(config, dirname);
            }
            catch (err) {
                console.error(err);
            }
            this.express.set("lib", this.lib);
            log_1.default.module("Core library loaded");
            this.express.set("token", this.lib.config.token); // secret token
            log_1.default.module("Configuration loaded");
            this.install();
        });
        // Loading Configuration
        fse.pathExists(dirname + this.configPath).then((exists) => {
            if (exists) {
                let config = require(dirname + this.configPath);
                start(config);
            }
            else {
                log_1.default.error("Configuration file not found");
                let config = require(dirname + this.defaultConfigPath);
                console.log(chalk_1.default.yellow("Sample config is used instead"));
                start(config);
            }
        }).catch(err => {
            log_1.default.error("Something went wrong");
            log_1.default.error(err);
        });
    }
    /**
     * Install endpoints, configure and run the Express App instance and load middlewares
     */
    install() {
        let appsModule;
        // Installing Middlewares
        this.middleware();
        // Installing Apps
        appsModule = new apps_1.default(this.lib.config, this.lib, this.express);
        appsModule.install((apps) => {
            this.apps = apps;
            this.start();
        });
    }
    /*** Configure Express middlewares */
    middleware() {
        let sessions = new sessions_1.default(this.lib);
        // Log hits using morgan
        if (this.lib.config.dev) {
            this.express.use(morgan_1.default("dev"));
        }
        else {
            this.express.use(morgan_1.default("combined"));
        }
        // Use body parser so we can get info from POST and/or URL parameters
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cookie_parser_1.default(this.lib.config.token));
        this.express.use(sessions.context);
        log_1.default.module("Middlewares loaded");
    }
    /*** Run the server */
    start() {
        let appCount = 0; // Number of checked apps so far
        let done = true; // All done
        let now = () => {
            // Everything is installed?
            if (done) {
                try {
                    // Errors
                    // 404
                    this.express.use(function (req, res, next) {
                        return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
                    });
                    // 500 - Any server error
                    this.express.use(function (err, req, res, next) {
                        return res.status(500).send({ error: err });
                    });
                    // Run                    
                    this.express.listen(this.port);
                    log_1.default.run(this.port);
                }
                catch (e) {
                    log_1.default.error(e);
                }
            }
        };
        this.apps.forEach((app) => {
            if (!app.done) {
                done = false;
            }
            appCount++;
            if (this.apps.length === appCount) {
                now();
            }
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=core.js.map
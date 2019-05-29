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
const cookieParser = __importStar(require("cookie-parser"));
const logger = __importStar(require("morgan")); // Log requests
const express = __importStar(require("express"));
const fse = __importStar(require("fs-extra"));
const apps_1 = __importDefault(require("./apps"));
const chalk_1 = __importDefault(require("chalk"));
const sessions_1 = __importDefault(require("../apps/auth/middlewares/sessions"));
const core_1 = __importDefault(require("../lib/core"));
const log_1 = __importDefault(require("./log"));
/**
 * Creates and configure an ExpressJS web server.
 *
 * @return express.Application
 */
class Core {
    /**
     * Load configuration settings, set up JSloth Global Library and start installation.
     */
    constructor() {
        /**
         * Stores the app port
         * @default port System environment port or 8080
         * Please note: the unary + cast to number
         */
        this.port = +process.env.PORT || 8080;
        /*** Default configuration filepath */
        this.configPath = "/../../../config.json";
        this.defaultConfigPath = "/../../../sample_config.json";
        /*** Apps object */
        this.apps = [];
        // Creating App
        this.express = express();
        log_1.default.hello();
        // Mount static files
        log_1.default.module("Static files published");
        this.express.use('/', express.static(__dirname + '/../../../dist/static/'));
        let start = ((config) => {
            // Loading JSloth Global Library
            try {
                this.jsloth = new core_1.default(config, __dirname);
            }
            catch (err) {
                console.error(err);
            }
            this.express.set("jsloth", this.jsloth);
            log_1.default.module("Core library loaded");
            this.express.set("token", this.jsloth.config.token); // secret token
            log_1.default.module("Configuration loaded");
            this.install();
        });
        // Loading Configuration
        fse.pathExists(__dirname + this.configPath).then((exists) => {
            if (exists) {
                let config = require(__dirname + this.configPath);
                start(config);
            }
            else {
                log_1.default.error("Configuration file not found");
                let config = require(__dirname + this.defaultConfigPath);
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
        appsModule = new apps_1.default(this.jsloth.config, this.jsloth, this.express);
        appsModule.install((apps) => {
            this.apps = apps;
            this.start();
        });
    }
    /*** Configure Express middlewares */
    middleware() {
        let sessions = new sessions_1.default(this.jsloth);
        // Log hits using morgan
        if (this.jsloth.config.dev) {
            this.express.use(logger("dev"));
        }
        else {
            this.express.use(logger("combined"));
        }
        // Use body parser so we can get info from POST and/or URL parameters
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cookieParser(this.jsloth.config.token));
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
                    // Errors and 404  
                    this.express.get("/*", function (req, res, next) {
                        return res.redirect("/errors/404/");
                    });
                    this.express.use(function (err, req, res, next) {
                        console.error(err);
                        if (!err.status) {
                            return res.redirect("/errors/500/");
                        }
                        else {
                            return res.redirect("/errors/" + err.status + "/");
                        }
                    });
                    // run
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
exports.default = Core;
//# sourceMappingURL=core.js.map
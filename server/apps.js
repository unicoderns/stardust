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
const fse = __importStar(require("fs-extra"));
const batch_1 = __importDefault(require("./batch"));
const log_1 = __importDefault(require("./log"));
/**
 * Stardust apps related tools.
 */
class Apps {
    /**
     * Load configuration, library and Express application.
     *
     * @param config System configuration
     * @param lib Library
     * @param express Express app
     */
    constructor(config, lib, express) {
        /*** List of apps (System + Custom) */
        this.apps = [];
        this.config = config;
        this.lib = lib;
        this.express = express;
        this.batch = new batch_1.default(lib);
    }
    /**
     * Start installation process
     *
     * @param next
     */
    install(next) {
        log_1.default.module("System apps scanned", "No system apps found", this.config.system_apps.length);
        this.installApps(this.config.system_apps, "system", next);
        log_1.default.module("Custom apps scanned", "No custom apps found", this.config.custom_apps.length);
        this.installApps(this.config.custom_apps, "apps", next);
        log_1.default.appTitle();
    }
    /**
     * Return a empty app object
     *
     * @return app.App
     */
    emptyApp() {
        let app = {
            config: {
                name: "",
                config: null
            },
            done: false,
            complete: {
                api: false,
                routes: false,
                dash: false,
                admin: false,
                public: false,
                scss: false
            },
            success: {
                api: false,
                routes: false,
                dash: false,
                admin: false,
                public: false,
                scss: false
            },
            errors: {
                api: "",
                routes: "",
                dash: "",
                admin: "",
                public: "",
                scss: "",
            }
        };
        return app;
    }
    /**
     * Install a group of apps
     *
     * @param apps List of apps and configuration to install
     * @param type Apps family (system|apps)
     * @param next
     */
    installApps(apps, type, next) {
        apps.forEach((item) => {
            let app = this.emptyApp();
            app.config = item;
            app.config.folder = type;
            this.apps.push(app);
            this.installApp(app, type, next);
        });
    }
    /**
     * Copy public folder, compile SCSS, load routes and apis.
     *
     * @param app App configuration.
     * @param type App family (system|apps)
     * @param next
     */
    installApp(app, type, next) {
        let appUrl = this.lib.context.sourceURL + "apps/";
        if (type == "system") {
            appUrl = this.lib.context.sourceURL + "system/apps/";
        }
        let compileSCSS = () => {
            this.batch.compileSCSS(appUrl + app.config.name, this.lib.context.baseURL + "dist/static/" + app.config.name).then((success) => {
                app.complete.scss = true;
                app.success.scss = success;
                this.installed(app, next);
            }).catch(err => {
                app.complete.scss = true;
                app.success.scss = false;
                app.errors.scss = err;
                console.error(err);
                this.installed(app, next);
            });
        };
        // No compilations for tests
        if (process.env.NODE_ENV == "test") {
            app.complete.public = true;
            app.success.public = false;
            app.complete.scss = true;
            app.success.scss = false;
        }
        else {
            this.batch.copyPublic(appUrl + app.config.name + "/public/", this.lib.context.baseURL + "dist/static/" + app.config.name).then((success) => {
                app.complete.public = true;
                app.success.public = success;
                compileSCSS(); // Wait the structure to compile
            }).catch(err => {
                app.complete.public = true;
                app.success.public = false;
                app.errors.public = err;
                console.error(err);
                compileSCSS(); // Wait the structure to compile
            });
        }
        // Installing regular routes
        this.loadRoutes(app, type, "routes", "", next);
        // Installing dash routes
        if ((app.config.dash) && (app.config.dash.activate)) {
            this.loadRoutes(app, type, "dash", "/dashboard", next);
        }
        else {
            app.complete.dash = true;
            app.success.dash = false;
        }
        // Installing admin routes
        if ((app.config.admin) && (app.config.admin.activate)) {
            this.loadRoutes(app, type, "admin", "/admin", next);
        }
        else {
            app.complete.dash = true;
            app.success.dash = false;
        }
        // Installing api routes
        this.loadRoutes(app, type, "api", "/api", next);
    }
    /**
     * Load and install routes
     *
     * @param app App configuration.
     * @param appType App family (system|apps)
     * @param routeType Route family (routes|dash|api)
     * @param basepath Url prefix
     * @param next
     */
    loadRoutes(app, appType, routeType, basepath, next) {
        let appUrl = this.lib.context.sourceURL + "apps/";
        if (appType == "system") {
            appUrl = this.lib.context.sourceURL + "system/apps/";
        }
        let appFileUrl = appUrl + app.config.name + "/" + routeType;
        fse.pathExists(appFileUrl + ".ts").then((exists) => {
            if (exists) {
                let url = basepath + (app.config.basepath || "/");
                let appRoute = require(appFileUrl);
                let route = new appRoute.Urls(this.lib, app.config, url, [app.config.name]);
                this.express.use(url, route.router);
                if (routeType == "routes") {
                    app.complete.routes = true;
                    app.success.routes = true;
                }
                else if (routeType == "dash") {
                    app.complete.dash = true;
                    app.success.dash = true;
                }
                else if (routeType == "admin") {
                    app.complete.admin = true;
                    app.success.admin = true;
                }
                else {
                    app.complete.api = true;
                    app.success.api = true;
                }
                this.installed(app, next);
            }
            else {
                if (routeType == "routes") {
                    app.complete.routes = true;
                    app.success.routes = false;
                }
                else if (routeType == "dash") {
                    app.complete.dash = true;
                    app.success.dash = false;
                }
                else if (routeType == "admin") {
                    app.complete.admin = true;
                    app.success.admin = false;
                }
                else {
                    app.complete.api = true;
                    app.success.api = false;
                }
                this.installed(app, next);
            }
        }).catch(err => {
            console.error(err);
        });
    }
    /**
     * Check if everything is done, and set done flag as true
     *
     * @param app App configuration.
     * @param next
     */
    installed(app, next) {
        function printError(err) {
            if ((err) && (err.length)) {
                log_1.default.moduleWarning(err);
            }
        }
        if ((app.complete.routes) && (app.complete.dash) && (app.complete.api) && (app.complete.public) && (app.complete.scss)) {
            log_1.default.app(app.config.name);
            log_1.default.appModule("Routes installed", "Routes not found", app.success.routes);
            printError(app.errors.routes);
            log_1.default.appModule("Dash routes installed", "Dash routes not found or deactivated", app.success.dash);
            printError(app.errors.dash);
            log_1.default.appModule("Admin routes installed", "Admin routes not found or deactivated", app.success.admin);
            printError(app.errors.admin);
            log_1.default.appModule("Endpoints installed", "Endpoints not found", app.success.api);
            printError(app.errors.api);
            if (app.config.engine != "angular") {
                log_1.default.appModule("Public folder published", "Public folder publication failed", app.success.public);
                printError(app.errors.public);
                log_1.default.appModule("Styles generated", "No styles to compile", app.success.scss);
                printError(app.errors.scss);
            }
            app.done = true;
            next(this.apps);
        }
    }
}
exports.default = Apps;
//# sourceMappingURL=apps.js.map
"use strict";
////////////////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)                                                                  //
//                                                                                        //
// Copyright (C) 2019  Unicoderns SA - info@unicoderns.com - unicoderns.com               //
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const core_1 = __importDefault(require("./core"));
/**
 * Routes Abstract
 */
class HtmlController extends core_1.default {
    /*** Init Controller */
    constructor(lib, config, url, namespaces) {
        super(lib, config, url, namespaces);
        this.app = this.getApp();
    }
    /*** Get configured app for engine */
    getApp() {
        let app = express_1.default();
        const compression = require("compression");
        app.set('view engine', 'ejs');
        app.use(compression());
        return app;
    }
    /**
     * Load Routes
     *
     * @param req Request
     * @param res Response
     * @param file string
     * @param params object
     */
    render(req, res, file, params = {}) {
        this.lib.path.get(this.config.folder, this.config.name, file).then((path) => {
            res.render(path, params);
        }).catch((err) => {
            console.error(err);
        });
    }
}
exports.default = HtmlController;
//# sourceMappingURL=html.js.map
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
const core_1 = __importDefault(require("./core"));
/**
 * Routes Abstract
 */
class ApiController extends core_1.default {
    /**
     * Add url to context
     *
     * @param url Concatenated url across the imports
     * @param namespace Complete array of namespaces from imports.
     * @return void
     */
    context(path, namespace) {
        var url = this.url + path;
        var token = "";
        url = url.replace(/\/\/+/g, '/'); // Remove double slashes
        token = this.namespaces.join(":") + ":" + namespace;
        this.lib.context.setUrl(token, url);
    }
    /**
     * Get Route
     *
     * @param url Concatenated url across the imports
     * @param namespace Complete array of namespaces from imports.
     * @param handlers Express request handlers.
     * @return void
     */
    get(path, namespace, ...handlers) {
        this.context(path, namespace);
        this.router.get(path, handlers);
    }
    /**
     * Post Route
     *
     * @param url Concatenated url across the imports
     * @param namespace Complete array of namespaces from imports.
     * @param handlers Express request handlers.
     * @return void
     */
    post(path, namespace, ...handlers) {
        this.context(path, namespace);
        this.router.post(path, handlers);
    }
    /**
     * Put Route
     *
     * @param url Concatenated url across the imports
     * @param namespace Complete array of namespaces from imports.
     * @param handlers Express request handlers.
     * @return void
     */
    put(path, namespace, ...handlers) {
        this.context(path, namespace);
        this.router.put(path, handlers);
    }
    /**
     * Delete Route
     *
     * @param url Concatenated url across the imports
     * @param namespace Complete array of namespaces from imports.
     * @param handlers Express request handlers.
     * @return void
     */
    delete(path, namespace, ...handlers) {
        this.context(path, namespace);
        this.router.delete(path, handlers);
    }
}
exports.default = ApiController;
//# sourceMappingURL=api.js.map
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fse = __importStar(require("fs-extra"));
const es6_promise_1 = require("es6-promise");
/**
* Stardust Path
* Check the right path, search /core/ first and /app/ if is not found it.
*/
class JSPath {
    /*** Configuration methods */
    constructor(lib) {
        this.lib = lib;
    }
    /**
     * Get the new full path.
     *
     * @param file string Filename
     * @return void
     */
    get(type, app, file) {
        let customPath = "../source/views/" + app + "/" + file;
        let path = "../source/apps/" + app + "/views/" + file;
        if (type == "system") {
            path = "../source/system/apps/" + app + "/views/" + file;
        }
        // Create promise
        const p = new es6_promise_1.Promise((resolve, reject) => {
            // Resolve promise
            fse.pathExists(this.lib.context.sourceURL + customPath + ".ejs").then((exist) => {
                if (exist) {
                    resolve(customPath);
                }
                else {
                    resolve(path);
                }
            }).catch((err) => {
                resolve(path);
                throw err;
            });
        });
        return p;
    }
}
exports.default = JSPath;
//# sourceMappingURL=path.js.map
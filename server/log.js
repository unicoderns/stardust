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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
/**
 * Log in the terminal.
 */
class Log {
    constructor() {
        /**
         * JSloth welcome message
         */
        this.hello = () => {
            // No log for tests
            if (process.env.NODE_ENV != "test") {
                console.log("");
                console.log("**********************************************************");
                console.log("*                                                        *");
                console.log("*        ██╗███████╗██╗      ██████╗ ████████╗██╗  ██╗   *");
                console.log("*        ██║██╔════╝██║     ██╔═══██╗╚══██╔══╝██║  ██║   *");
                console.log("*        ██║███████╗██║     ██║   ██║   ██║   ███████║   *");
                console.log("*   ██   ██║╚════██║██║     ██║   ██║   ██║   ██╔══██║   *");
                console.log("*   ╚█████╔╝███████║███████╗╚██████╔╝   ██║   ██║  ██║   *");
                console.log("*    ╚════╝ ╚══════╝╚══════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝   *");
                console.log("*                                        by Unicoderns   *");
                console.log("*                                                        *");
                console.log("**********************************************************");
                console.log("*                                                        *");
                console.log("*                        Welcome                         *");
                console.log("*                                                        *");
                console.log("**********************************************************");
                console.log("");
                console.log(chalk_1.default.bgBlackBright("                          Core                            "));
                console.log("");
            }
        };
        /**
         * Log an error
         */
        this.error = (text) => {
            console.error(chalk_1.default.red(text));
        };
        /**
         * Log a warning
         */
        this.moduleWarning = (text) => {
            console.error(chalk_1.default.yellow(text));
        };
        /**
         * Log a module
         */
        this.module = (text, fail, number) => {
            // No log for tests
            if (process.env.NODE_ENV != "test") {
                let log = "  ✔ ";
                if (number) {
                    log = log + text + " (" + number + ")";
                }
                else if (number === 0) {
                    log = log + fail;
                }
                else {
                    log = log + text;
                }
                console.log(chalk_1.default.green(log));
            }
        };
        /**
         * Log apps section
         */
        this.appTitle = () => {
            // No log for tests
            if (process.env.NODE_ENV != "test") {
                console.log("");
                console.log(chalk_1.default.bgBlackBright("                          Apps                            "));
            }
        };
        /**
         * Log an app
         */
        this.app = (text) => {
            // No log for tests
            if (process.env.NODE_ENV != "test") {
                console.log("");
                console.log(chalk_1.default.yellow(" ⚝  ") + text.toUpperCase().charAt(0) + text.substring(1) + " app...");
                console.log("");
            }
        };
        /**
         * Log app steps
         */
        this.appModule = (text, fail, success) => {
            let log = "";
            // No log for tests
            if (process.env.NODE_ENV != "test") {
                if (success) {
                    log = "    ✔ " + text;
                    console.log(chalk_1.default.green(log));
                }
                else {
                    log = "    ✘ " + fail;
                    console.error(chalk_1.default.gray(log));
                }
            }
        };
        /**
         * Log system run
         */
        this.run = (port) => {
            // No log for tests
            if (process.env.NODE_ENV != "test") {
                console.log("");
                console.log(chalk_1.default.bgBlackBright("                          Run                             "));
                console.log("");
                console.log(" The magic happens on port " + port + " ☆ﾟ.*･｡ﾟ");
                console.log("");
            }
        };
    }
}
exports.default = new Log();
//# sourceMappingURL=log.js.map
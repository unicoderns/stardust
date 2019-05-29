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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = __importStar(require("nodemailer"));
const AWS = __importStar(require("aws-sdk"));
const connection_1 = require("@unicoderns/orm/connection");
const cerberus_1 = __importDefault(require("@unicoderns/cerberus"));
const context_1 = __importDefault(require("./context"));
const path_1 = __importDefault(require("./path"));
/**
 * Stardust Library Loader
 */
class Lib {
    /*** Configuration methods */
    constructor(config, baseURL) {
        let expiration = -1;
        let session = "stateful";
        this.config = config;
        this.context = new context_1.default(this, baseURL);
        this.path = new path_1.default(this);
        this.db = new connection_1.DB({
            dev: config.dev,
            connection: config.dbconnection
        });
        let authConfig = config.system_apps.find((x) => x.name == 'auth');
        if (authConfig) {
            expiration = authConfig.config.expiration;
            session = authConfig.config.session;
        }
        this.cerberus = new cerberus_1.default({
            dev: config.dev,
            token: config.token,
            DB: this.db,
            settings: {
                expiration: expiration,
                session: session
            }
        });
        AWS.config.accessKeyId = config.aws.ses.accessKeyId;
        AWS.config.secretAccessKey = config.aws.ses.secretAccessKey;
        AWS.config.region = config.aws.ses.region;
        this.mail = nodemailer.createTransport({
            SES: new AWS.SES({
                apiVersion: '2010-12-01'
            })
        });
    }
}
exports.Lib = Lib;
//# sourceMappingURL=core.js.map
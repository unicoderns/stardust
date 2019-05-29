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

import * as nodemailer from "nodemailer";
import * as AWS from "aws-sdk";

import { DB } from "@unicoderns/orm/connection";

import cerberus from "@unicoderns/cerberus";

import Config from "../interfaces/config";

import JSContext from "./context";
import JSPath from "./path";

/**
 * Stardust Library Loader
 */
export class Lib {
    public config: Config;

    public context: JSContext;
    public cerberus: cerberus;
    public path: JSPath;
    public db: DB;
    public mail: nodemailer.Transporter;

    /*** Configuration methods */
    constructor(config: Config, baseURL: string) {
        let expiration = -1;
        let session = "stateful";

        this.config = config;
        this.context = new JSContext(this, baseURL);
        this.path = new JSPath(this);

        this.db = new DB({
            dev: config.dev,
            connection: config.dbconnection
        });
        let authConfig = config.system_apps.find((x: any) => x.name == 'auth');
        if (authConfig) {
            expiration = authConfig.config.expiration;
            session = authConfig.config.session;
        }
        this.cerberus = new cerberus({
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
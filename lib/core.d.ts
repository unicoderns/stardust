import * as nodemailer from "nodemailer";
import { DB } from "@unicoderns/orm/connection";
import cerberus from "@unicoderns/cerberus";
import Config from "../interfaces/config";
import JSContext from "./context";
import JSPath from "./path";
/**
 * Stardust Library Loader
 */
export declare class Lib {
    config: Config;
    context: JSContext;
    cerberus: cerberus;
    path: JSPath;
    db: DB;
    mail: nodemailer.Transporter;
    /*** Configuration methods */
    constructor(config: Config, baseURL: string);
}

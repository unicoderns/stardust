import { Connection } from "@unicoderns/orm";
import * as App from "./app";
/*** Configuration interface */
interface SysConfig {
    dev: boolean;
    dbconnection: Connection;
    aws: AWS;
    system_apps: App.Config[];
    custom_apps: App.Config[];
    token: string;
}
interface AWS {
    ses: SES;
}
interface SES {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    noreply: string;
}
export default SysConfig;

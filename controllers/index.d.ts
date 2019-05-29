/**
* Unicoderns Stardust Controller central module
*/
import ApiController from "./api";
import CoreController from "./core";
import HTMLController from "./html";
import RoutesController from "./routes";
export declare const Controllers: {
    Api: typeof ApiController;
    Core: typeof CoreController;
    Html: typeof HTMLController;
    Routes: typeof RoutesController;
};

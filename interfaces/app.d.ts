/*** App interface. */
export interface App {
    config: Config;
    done: boolean;
    complete: Status;
    success: Status;
    errors: Errors;
}
/*** Dash config interface. */
export interface Dash {
    activate: boolean;
}
/*** Admin config interface. */
export interface Admin {
    activate: boolean;
}
/*** App configuration interface. */
export interface Config {
    name: string;
    dash?: Dash;
    admin?: Admin;
    engine?: string;
    basepath?: string;
    folder?: string;
    config: any;
}
/*** App status interface. */
export interface Status {
    api: boolean;
    public: boolean;
    routes: boolean;
    dash: boolean;
    admin: boolean;
    scss: boolean;
}
/*** App errors interface. */
export interface Errors {
    api: string;
    public: string;
    routes: string;
    dash: string;
    admin: string;
    scss: string;
}

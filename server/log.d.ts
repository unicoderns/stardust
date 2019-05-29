/**
 * Log in the terminal.
 */
declare class Log {
    /**
     * JSloth welcome message
     */
    hello: () => void;
    /**
     * Log an error
     */
    error: (text: string) => void;
    /**
     * Log a warning
     */
    moduleWarning: (text: string) => void;
    /**
     * Log a module
     */
    module: (text: string, fail?: string | undefined, number?: number | undefined) => void;
    /**
     * Log apps section
     */
    appTitle: () => void;
    /**
     * Log an app
     */
    app: (text: string) => void;
    /**
     * Log app steps
     */
    appModule: (text: string, fail: string, success: boolean) => void;
    /**
     * Log system run
     */
    run: (port: number) => void;
}
declare const _default: Log;
export default _default;

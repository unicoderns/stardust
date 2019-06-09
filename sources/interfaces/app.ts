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
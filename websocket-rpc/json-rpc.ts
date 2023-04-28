type JSONRPC = "2.0";

export enum Methods {
  ping = "ping",
  echo = "echo",
}

export interface IRequest {
  jsonrpc: JSONRPC;
  method: string;
  params?: Object | number | string | boolean;
  id: string;
}

export interface IResponse {
  jsonrpc: JSONRPC;
  result?: string | Object;
  error?: string | Object;
  id: string;
}

export interface IError {
  code: number;
  message: string;
  data: string | Object;
}

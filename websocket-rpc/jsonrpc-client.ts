/**
 * Normal asenkron, event tabanli websocket request reponse
 *
 * Minimum errorhandling, boilerplate
 *
 * bir map olsun bu request'in id'sini o map'a koy
 * sonra bir interval ile bu map'in degerini kontrol et
 * onmessage'da gelen response'lar bu map'a koyulsun
 * interval bu response'u yakalayinca map'dan get etsin ve responsa koysun
 * daha sonra mapden kaldirsin
 */
import { RawData, WebSocket } from "ws";

import { PORT, logger } from "./config";
import { IRequest, IResponse, Methods } from "./json-rpc";

class JSONRPCClient {
  private ws: WebSocket;
  private serverUrl: string;
  private connected: boolean;
  private requestId: number;
  private responseMap: Map<string, IResponse>;

  constructor(url: string) {
    this.ws = new WebSocket(url);
    this.serverUrl = url;
    this.connected = false;
    this.responseMap = new Map<string, IResponse>();
    this.requestId = 0;

    this.ws.on("error", console.error);
    this.ws.on("open", () => {
      logger.info("websocket connection opened");
    });
    this.ws.on("message", (data, isBinary) => {
      logger.info(data.toString());
      let response = JSON.parse(data.toString()) as IResponse;
      logger.trace(response);
      this.responseMap.set(response.id, response);
      logger.info(response, "received response");
    });
  }

  // TODO
  async connect() {
    let openRetry = 20; // 2 sn
    let intervalMs = 250; // timeout 5 sn
    await new Promise<void>((resolve, reject) => {
      let interval = setInterval(() => {
        logger.trace("checking open socket");
        if (this.ws.readyState === WebSocket.OPEN) {
          logger.trace("socket is open");
          this.connected = true;
          clearInterval(interval);
          resolve();
        }
        if (--openRetry === 0) {
          clearInterval(interval);
          reject("socket open timeout");
        }
      }, intervalMs);
    });
  }

  async call(
    method: Methods,
    params?: Object | number | string | boolean
  ): Promise<IResponse | undefined> {
    switch (method) {
      case Methods.ping:
        {
          let requestId = this.requestId++; //? json-rpc'de uuid ne kadar mantikli?
          let request = {
            id: requestId.toString(),
            jsonrpc: "2.0",
            method: Methods.ping,
          } as IRequest;
          logger.info(request, "sending request");
          this.ws.send(JSON.stringify(request));
          return await this.getResponse(requestId.toString());
        }
        break;

      case Methods.echo:
        {
          let requestId = this.requestId++; //? json-rpc'de uuid ne kadar mantikli?
          let request = {
            id: requestId.toString(),
            jsonrpc: "2.0",
            method: Methods.echo,
            params: params,
          } as IRequest;
          logger.info(request, "sending request");
          this.ws.send(JSON.stringify(request));
          // reqeust neden gitmiyor ?
          return await this.getResponse(requestId.toString());
        }
        break;

      default:
        break;
    }
    return;
  }

  /**
   * Bu promise, async/await neyi nasil yapiyor duzgunce ogren suanda "calisyor gibi"
   * @param requestId
   * @returns
   */
  private async getResponse(requestId: string): Promise<IResponse | undefined> {
    // Burasi bir fonksiyona refactor edilebilir
    // Promise API ve async/await daha duzgun kullanilabilir
    let openRetry = 20; // 2 sn
    let intervalMs = 250; // timeout 5 sn
    let response = await new Promise<IResponse>((resolve, reject) => {
      let interval = setInterval(() => {
        logger.trace("checking response map");
        let response = this.responseMap.get(requestId);
        logger.trace(response);
        if (response !== undefined) {
          logger.trace("responce received");
          this.responseMap.delete(requestId);
          clearInterval(interval);
          resolve(response);
        }
        if (--openRetry === 0) {
          clearInterval(interval);
          reject("response timeout");
        }
      }, intervalMs);
    }).catch((error) => {
      logger.error(error);
      return undefined;
    });
    return response;
  }

  disconnect() {
    this.ws.close();
  }
}

// TODO
// async function blockingPing(client: JSONRPCClient) {}

async function blocking() {
  let wsServerURL = "ws://localhost:8081";
  let client = new JSONRPCClient(wsServerURL);
  await client.connect();

  let start = process.hrtime();
  logger.info((await client.call(Methods.echo, "1"))?.result);
  logger.info((await client.call(Methods.echo, "2"))?.result);
  logger.info((await client.call(Methods.echo, "3"))?.result);
  logger.info((await client.call(Methods.echo, "4"))?.result);
  logger.info((await client.call(Methods.echo, "5"))?.result);
  logger.info(process.hrtime(start).toString());
  client.disconnect();
}

async function nonBlocking() {
  let wsServerURL = "ws://localhost:8081";
  let client = new JSONRPCClient(wsServerURL);
  await client.connect();

  await new Promise<void>((resolve) => {
    let start = process.hrtime();
    Promise.all([
      client.call(Methods.echo, "1"),
      client.call(Methods.echo, "2"),
      client.call(Methods.echo, "3"),
      client.call(Methods.echo, "4"),
      client.call(Methods.echo, "5"),
    ]).then(() => {
      logger.info(process.hrtime(start).toString());
      resolve();
    });
  });

  client.disconnect();
}

async function main() {
  // blocking(); // ~10 sn
  nonBlocking(); // ~3 sn
}

main().catch(logger.error);

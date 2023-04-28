import { WebSocketServer, RawData } from "ws";

import { PORT, logger } from "./config";
import { IRequest, IResponse, Methods } from "./json-rpc";

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", function connection(ws, req) {
  logger.info({ remote: req.socket.remoteAddress }, "new connection");

  ws.on("error", logger.error);
  ws.on("message", async (data, isBinary) => {
    try {
      logger.debug(data.toString(), "data");
      let request = JSON.parse(data.toString()) as IRequest;
      logger.debug(request, "request");
      logger.debug(request.params, "params");

      switch (request.method) {
        case Methods.ping:
          {
            let pingResponse: IResponse = {
              jsonrpc: "2.0",
              id: request.id,
              result: "pong",
            };
            await new Promise<void>((resolve) => {
              setTimeout(() => {
                resolve();
              }, Math.random() * 5000);
            });
            logger.info(pingResponse, "sending repsonse");
            ws.send(JSON.stringify(pingResponse));
          }
          break;

        case Methods.echo:
          {
            logger.info(request, "received rquest");
            let echoResponse: IResponse = {
              jsonrpc: "2.0",
              id: request.id,
              result: request.params,
            };
            await new Promise<void>((resolve) => {
              setTimeout(() => {
                resolve();
              }, Math.random() * 3000);
            });
            logger.info(echoResponse, "sending repsonse");
            ws.send(JSON.stringify(echoResponse), (error) => {
              if (error !== undefined) {
                logger.error(error);
              }
            });
          }
          break;

        default:
          logger.warn("hehe");
          break;
      }
    } catch (error) {
      logger.error(error);
    }
  });
});

/**
 * Expected message is json-rpc request object
 */
const message = (data: RawData, isbinary: boolean) => {};

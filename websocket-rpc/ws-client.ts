/**
 * Normal asenkron, event tabanli websocket request reponse
 */
import { RawData, WebSocket } from "ws";
import { PORT, logger } from "./config";
import { IRequest, IResponse, Methods } from "./json-rpc";

const ws = new WebSocket(`ws://localhost:${PORT}`);

ws.on("error", console.error);

ws.on("open", function open() {
  ws.send(JSON.stringify({ merhaba: "zalim dunya" }));
});

ws.on("message", (data, isBinary) => {
  logger.info(data.toString());
  let response = JSON.parse(data.toString()) as IResponse;
  logger.info(response, "received response");
});

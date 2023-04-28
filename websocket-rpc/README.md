# websocket-rpc

websocket-rpc playground.

## jsonrpc-client.ts

event tabanli websocket apisi ustune senkron calisabilen bir json-rpc' client'i

```ts
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
```

## jsonrpc-server.ts

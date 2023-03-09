import { BaseWallet, JsonRpcProvider, SigningKey, Wallet, formatUnits } from 'ethers';

const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL, undefined, undefined);
let wallet: BaseWallet;

const ethFacade = {
  initWallet: (privateKey: string | undefined) => {
    if (privateKey === undefined) {
      wallet = Wallet.createRandom(provider);
      return;
    }

    // https://docs.ethers.org/v6/api/utils/#HexString
    if (privateKey.slice(0, 2) !== '0x') privateKey = '0x' + privateKey;

    wallet = new BaseWallet(new SigningKey(privateKey), provider);
  },

  getAccount: (): string | null => {
    return wallet.address;
  },

  getBlockHeight: (): Promise<number> => {
    return provider.getBlockNumber();
  },

  // Neden burada basina async istediki ne farki var ?
  getNetworkId: async (): Promise<number> => {
    return provider.getNetwork().then((network) => {
      return Number(network.chainId);
    });
  },

  getNetwork: async (): Promise<string> => {
    return provider
      .getNetwork()
      .then((network) => {
        // console.log(network.toJSON());
        return JSON.stringify(network.toJSON(), null, '\t');
      })
      .catch((reason) => {
        // console.log(reason);
        return JSON.stringify(reason, null, '\t');
      });
  },

  getTxByHash: async (txHash: string): Promise<string> => {
    // TODO simdilik hardcoded
    // txHash = '0x13261e9b34cd9bdfdf4e07daab3d9ac465e0e0df8d679d2a7128751fa099be7d';
    return provider
      .getTransaction(txHash)
      .then((txResponse) => {
        return JSON.stringify(txResponse, null, '\t');
      })
      .catch((reason) => {
        // console.log(reason);
        return JSON.stringify(reason, null, '\t');
      });
  },

  getBlockByNumber: async (blockNumber: number): Promise<string> => {
    return provider
      .getBlock(blockNumber)
      .then((block) => {
        return JSON.stringify(block, null, '\t');
      })
      .catch((reason) => {
        // console.log(reason);
        return JSON.stringify(reason, null, '\t');
      });
  },

  getEthBalance: async (account: string): Promise<string> => {
    return provider
      .getBalance(account)
      .then((balance) => {
        return formatUnits(balance, 'ether');
      })
      .catch((reason) => {
        return JSON.stringify(reason, null, '\t');
      });
  },

  getBalance: async (account: string): Promise<string> => {
    return provider
      .getBalance(account)
      .then((balance) => {
        return JSON.stringify({ balance: Number(balance) }, null, '\t');
      })
      .catch((reason) => {
        // console.log(reason);
        return JSON.stringify(reason, null, '\t');
      });
  },
};

export { ethFacade };

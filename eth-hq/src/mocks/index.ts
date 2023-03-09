let blockNumber = 0;

// setInterval(() => {
//   blockNumber++;
//   // console.log(blockNumber);
// }, 2000);

const mocks = {
  getNetworkId: async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('29');
      }, 1000);
    });
  },

  getBlockNumber: async (): Promise<number> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(blockNumber);
      }, 100);
    });
  },
};

export { mocks };

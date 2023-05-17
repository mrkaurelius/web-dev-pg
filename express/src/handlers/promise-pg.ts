import express, { Express, NextFunction, Request, Response, Router } from 'express';

export function myPromisePgHandler(req: Request, res: Response, next: NextFunction) {
  console.log('route icinde');

  interface IMyPromiseResult {
    ahmet: string;
    mahmut: number;
  }

  let myPromise = new Promise<IMyPromiseResult>((resolve, reject) => {
    let doReject = false;

    if (doReject) {
      reject({ message: 'reject ettim cunku keyfim' });
    }

    setTimeout(() => {
      resolve({ ahmet: 'resolve ettim cunku keyfim', mahmut: 29 });
    }, 2000);
  })
    .then((result) => {
      console.log(`myPromiseResult ${JSON.stringify(result)}`);

      //? bu error bir sekilde handle ediliyor?
      //? default error handler
      let doThrow = true;
      if (doThrow) {
        throw new Error('express bu izdiraba dayanabilecek mi?');
      }

      res.json(result);
    })
    .catch((err) => {
      // > You must catch errors that occur in asynchronous code invoked by route handlers
      // > or middleware and pass them to Express for processing. For example:

      // catch sadece rejectleri degil throw edilen errorleri de yakaliyor
      console.log(`error catch edildi ${err}`);
      next(err); //! error'u yakalayip erorr handler middleware'e gondermek lazim.
    });

  // boyle de kullanilabilir yukaridaki gibi de kullanilabilir.
  // myPromise.then((value) => {
  //   console.log('then calisiyor');
  //   console.log(value);
  // });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myPromisePgHandler = void 0;
function myPromisePgHandler(req, res, next) {
    console.log('route icinde');
    let myPromise = new Promise((resolve, reject) => {
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
exports.myPromisePgHandler = myPromisePgHandler;

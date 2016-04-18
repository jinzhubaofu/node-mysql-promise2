/**
 * @file Promise 化回调
 * @author leon <ludafa@outlook.com>
 */

const slice = Array.prototype.slice;

function promisify(fn, context, args) {

    return new Promise(function (resolve, reject) {

        const callback = function (error, result) {

            if (error) {
                return reject(error);
            }

            return resolve(result);

        };

        args = slice.call(args).concat(callback);

        fn.apply(context, args);

    });

}

module.exports = promisify;

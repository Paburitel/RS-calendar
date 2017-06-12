export function logger(store) {
    return function (next) {
        return function (action) {
            // console.log('[ACTION]', action);
            return next(action);
        }
    }
}


var ddd = exports = module.exports = {};
ddd.fn = function (b) {
    return function (b) {
        console.log(b);
    }
}
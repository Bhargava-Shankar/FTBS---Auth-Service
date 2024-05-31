var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var responseBody = /** @class */ (function () {
    function responseBody(status, data, message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
    return responseBody;
}());
var res = new responseBody("success", ["something"]);
console.log(__assign({}, res));

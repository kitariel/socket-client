"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var guards = {
    isEncrypted: function (_a) {
        var encryption = _a.config.encryption;
        return !!encryption;
    },
    isEncryptedAndTransparent: function (_a) {
        var _b = _a.config, encryption = _b.encryption, transparent = _b.transparent;
        return !!encryption && !!transparent;
    },
    isEncryptedButNotTransparent: function (_a) {
        var _b = _a.config, encryption = _b.encryption, transparent = _b.transparent;
        return !!encryption && !transparent;
    },
    isTransparent: function (_a, _) {
        var transparent = _a.config.transparent;
        return !!transparent;
    },
    isNotActiveEndpoint: function (_a, _b) {
        var data = _a.data;
        var endpoint = _b.endpoint;
        return (data === null || data === void 0 ? void 0 : data.active_endpoint.host) !== endpoint.host;
    },
};
exports.default = guards;

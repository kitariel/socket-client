"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../../util");
// Todo: Need to rework, logging with verbose config.
var append = util_1.log("Socket Client");
var loggers = {
    logInitializingSocket: function (_a) {
        var endpoint = _a.endpoint, verbose = _a.config.verbose;
        if (verbose) {
            console.log(append(), "Initializing Socket Client: " + (endpoint === null || endpoint === void 0 ? void 0 : endpoint.host));
        }
    },
    logSocketConnectionError: function (_a) {
        var endpoint = _a.endpoint, verbose = _a.config.verbose;
        if (verbose) {
            console.log(append(), "Socket Client Connection Error: " + (endpoint === null || endpoint === void 0 ? void 0 : endpoint.host));
        }
    },
    logSocketConnected: function (_a) {
        var endpoint = _a.endpoint, verbose = _a.config.verbose;
        if (verbose) {
            console.log(append(), "Socket Client Connected: " + (endpoint === null || endpoint === void 0 ? void 0 : endpoint.host));
        }
    },
    logSocketDisconnected: function (_a) {
        var endpoint = _a.endpoint, verbose = _a.config.verbose;
        if (verbose) {
            console.log(append(), "Socket Client Disconnected: " + (endpoint === null || endpoint === void 0 ? void 0 : endpoint.host));
        }
    },
    logSocketClientUnlocked: function (_a) {
        var endpoint = _a.endpoint, verbose = _a.config.verbose;
        if (verbose) {
            console.log(append(), "Socket Client " + (endpoint === null || endpoint === void 0 ? void 0 : endpoint.host) + ", unlocked");
        }
    },
};
exports.default = loggers;

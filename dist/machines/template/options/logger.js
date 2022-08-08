"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../../util");
var append = util_1.log("Socket Client");
var loggers = {
    logStarting: function (_a) {
        var verbose = _a.config.verbose;
        if (verbose) {
            console.log(append(), "Started");
        }
    },
    logInitialized: function (_a) {
        var verbose = _a.config.verbose;
        if (verbose) {
            console.log(append(), "Initialized");
        }
    },
    logRunning: function (_a) {
        var verbose = _a.config.verbose;
        if (verbose) {
            console.log(append(), "Running");
        }
    },
    logConnected: function (_a) {
        var verbose = _a.config.verbose;
        if (verbose) {
            console.log(append(), "Connected");
        }
    },
    logMessage: function (_a, event) {
        var verbose = _a.config.verbose;
        if (verbose) {
            console.log(append(), "Message", event);
        }
    },
    logSend: function (_a, event) {
        var verbose = _a.config.verbose;
        if (verbose) {
            console.log(append(), "Message", event);
        }
    },
    logListening: function (_a) {
        var verbose = _a.config.verbose;
        if (verbose) {
            console.log(append(), "Listening");
        }
    },
    logSocketClientEndpointLock: function (_a, _b) {
        var verbose = _a.config.verbose;
        var endpoint = _b.endpoint;
        if (verbose) {
            console.log(append(), "Locked endpoint: " + (endpoint === null || endpoint === void 0 ? void 0 : endpoint.host));
        }
    },
    logSocketClientDisconnection: function (_a, _b) {
        var verbose = _a.config.verbose;
        var endpoint = _b.endpoint;
        if (verbose) {
            console.log(append(), "Socket Client Disconnected: " + (endpoint === null || endpoint === void 0 ? void 0 : endpoint.host));
        }
    },
};
exports.default = loggers;

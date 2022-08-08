"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var services = {
    spawnSocketClientEndpoints: function (_a) {
        var server_endpoints = _a.config.server_endpoints;
        return function (send) {
            server_endpoints.map(function (endpoint) {
                return send({
                    type: "SPAWN_ENDPOINT",
                    payload: endpoint,
                });
            });
            send("SPAWN_DONE");
        };
    },
};
exports.default = services;

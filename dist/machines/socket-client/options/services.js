"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = __importDefault(require("socket.io-client"));
var services = {
    initializeClient: function (_a) {
        var endpoint = _a.endpoint, token = _a.token;
        return function (send) {
            var socket = socket_io_client_1.default(endpoint.host, {
                query: { access_token: token },
            });
            send({
                type: "SOCKET_CREATED",
                socket: socket,
            });
            var connectHandler = function () { return send("SOCKET_CONNECTED"); };
            var reconnectionErrorHandler = function (error) {
                return send({
                    type: "SOCKET_CONNECTION_ERROR",
                    error: error,
                });
            };
            // A problem with 'error' event in the
            // latest version of socket.io
            // socket.on('error', (e: Error) => {
            //     // send('SOCKET_CONNECTION_ERROR')
            // })
            socket.once("connect", connectHandler);
            socket.on("reconnect_error", reconnectionErrorHandler);
            return function () {
                socket.removeListener("connect", connectHandler);
                socket.removeListener("reconnect_error", reconnectionErrorHandler);
            };
        };
    },
    connectionListener: function (_a) {
        var socket = _a.socket, endpoint = _a.endpoint;
        return function (send) {
            // const connectHandler = () => send("SOCKET_CONNECTED");
            var connectHandler = function () {
                send("SOCKET_CONNECTED");
                setTimeout(function () {
                    send({
                        type: "PONG",
                        endpoint: endpoint,
                    });
                }, 3000);
            };
            var disconnectHandler = function (error) {
                return send({
                    type: "SOCKET_DISCONNECTED",
                    error: error,
                    endpoint: endpoint,
                });
            };
            var reconnectionErrorHandler = function (error) {
                return send({
                    type: "SOCKET_RECONNECTION_ERROR",
                    error: error,
                    endpoint: endpoint,
                });
            };
            socket === null || socket === void 0 ? void 0 : socket.on("connect", connectHandler);
            socket === null || socket === void 0 ? void 0 : socket.on("disconnect", disconnectHandler);
            socket === null || socket === void 0 ? void 0 : socket.on("reconnect_error", reconnectionErrorHandler);
            return function () {
                socket === null || socket === void 0 ? void 0 : socket.removeListener("connect", connectHandler);
                socket === null || socket === void 0 ? void 0 : socket.removeListener("disconnect", disconnectHandler);
                socket === null || socket === void 0 ? void 0 : socket.removeListener("reconnect_error", reconnectionErrorHandler);
            };
        };
    },
    socketEventListeners: function (_a) {
        var socket = _a.socket, event_name = _a.config.event_name;
        return function (send) {
            var responseEventHandler = function (payload) {
                send({
                    type: "MESSAGE",
                    payload: payload,
                });
            };
            socket === null || socket === void 0 ? void 0 : socket.on(event_name, responseEventHandler);
            return function () {
                socket === null || socket === void 0 ? void 0 : socket.removeListener(event_name, responseEventHandler);
            };
        };
    },
    connectionPing: function (_a) {
        var socket = _a.socket, endpoint = _a.endpoint;
        return function (send) {
            var hearbeat = setInterval(function () {
                socket === null || socket === void 0 ? void 0 : socket.emit("SERVER_PING");
            }, 3000);
            var pingHearbeatHandler = function () {
                send({
                    type: "PONG",
                    endpoint: endpoint,
                });
            };
            socket === null || socket === void 0 ? void 0 : socket.on("SERVER_PONG", pingHearbeatHandler);
            return function () {
                socket === null || socket === void 0 ? void 0 : socket.removeListener("SERVER_PONG", pingHearbeatHandler);
                clearInterval(hearbeat);
            };
        };
    },
};
exports.default = services;

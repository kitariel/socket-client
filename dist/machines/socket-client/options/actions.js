"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xstate_1 = require("xstate");
var logger_1 = __importDefault(require("./logger"));
var actions = __assign(__assign({}, logger_1.default), { assignSocketInstance: xstate_1.assign({
        socket: function (_, _a) {
            var socket = _a.socket;
            return socket;
        },
    }), sendPingHeartbeatToParent: xstate_1.sendParent(function (_, event) { return event; }), sendParentSocketDisconnected: xstate_1.sendParent(function (_, event) { return event; }), sendParentEvent: xstate_1.sendParent(function (_, event) { return event; }), emitTransaction: function (_a, _b) {
        var socket = _a.socket, default_event_name = _a.config.event_name;
        var _c = _b.event_name, event_name = _c === void 0 ? default_event_name : _c, payload = _b.payload;
        socket === null || socket === void 0 ? void 0 : socket.emit(event_name, payload);
    }, sendParentSocketInstance: xstate_1.sendParent(function (_a) {
        var socket = _a.socket;
        return {
            type: "SOCKET_CONNECTED",
            socket: socket,
        };
    }) });
exports.default = actions;

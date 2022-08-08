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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./../../../util");
var logger_1 = __importDefault(require("./logger"));
var xstate_1 = require("xstate");
// Utilities
var util_2 = require("../../../util");
// Machine
var socket_client_1 = require("../../socket-client");
var actions = __assign(__assign({}, logger_1.default), { spawnEndpoints: xstate_1.assign(function (_a, _b) {
        var _c;
        var data = _a.data, config = _a.config;
        var payload = _b.payload;
        var host = payload.host;
        // const { socket_clients_ref = {} } = data;
        var socket_clients_ref = data === null || data === void 0 ? void 0 : data.socket_clients_ref;
        var token = config.token;
        return {
            data: __assign(__assign({}, data), { socket_clients_ref: __assign(__assign({}, socket_clients_ref), (_c = {}, _c[host] = xstate_1.spawn(socket_client_1.spawnMachine({
                    endpoint: payload,
                    token: token,
                    config: config,
                }), host), _c)) }),
        };
    }), lockSocketClient: xstate_1.send("LOCK_OBTAINED", {
        to: function (_, _a) {
            var endpoint = _a.endpoint;
            return endpoint.host;
        },
    }), assignActiveEndpoint: xstate_1.assign(function (_a, _b) {
        var data = _a.data;
        var endpoint = _b.endpoint;
        return {
            data: __assign(__assign({}, data), { active_endpoint: endpoint }),
        };
    }), saveEmitsToBuffer: xstate_1.assign(function (_a, _b) {
        var data = _a.data;
        var payload = _b.payload;
        return {
            data: __assign(__assign({}, data), { emit_buffer: __spreadArrays(data === null || data === void 0 ? void 0 : data.emit_buffer, [payload]) }),
        };
    }), sendToParent: xstate_1.sendParent(function (_, event) { return event; }), removeActiveEndpoint: xstate_1.assign(function (_a) {
        var data = _a.data;
        return {
            data: __assign(__assign({}, data), { active_endpoint: null }),
        };
    }), encryptAndsendToActiveEndpoint: xstate_1.send(function (_a, _b) {
        var encryption = _a.config.encryption;
        var type = _b.type, payload = _b.payload, event_name = _b.event_name;
        var _c = encryption, encryption_key = _c.encryption_key, encryption_iv = _c.encryption_iv;
        var message = util_2.serializeToJSON(payload);
        var new_message = util_2.encrypt(message, encryption_key, encryption_iv);
        return {
            type: type,
            event_name: event_name,
            payload: new_message,
        };
    }, {
        to: function (context) {
            var active_endpoint = context.data.active_endpoint;
            return active_endpoint.host;
        },
    }), sendToActiveEndpoint: xstate_1.send(function (_, event) { return event; }, {
        to: function (context) {
            var active_endpoint = context.data.active_endpoint;
            return active_endpoint.host;
        },
    }), decryptAndSendPayloadToParent: xstate_1.sendParent(function (_a, _b) {
        var encryption = _a.config.encryption;
        var payload = _b.payload;
        var _c = encryption, encryption_key = _c.encryption_key, encryption_iv = _c.encryption_iv;
        var envelope = util_1.decrypt(payload, encryption_key, encryption_iv);
        var message = util_1.deserializeFromJSON(envelope);
        return message;
    }), decryptAndWrapSendToParent: xstate_1.sendParent(function (_a, _b) {
        var encryption = _a.config.encryption;
        var type = _b.type, payload = _b.payload;
        var _c = encryption, encryption_key = _c.encryption_key, encryption_iv = _c.encryption_iv;
        var envelope = util_1.decrypt(payload, encryption_key, encryption_iv);
        var message = util_1.deserializeFromJSON(envelope);
        return {
            type: type,
            payload: message,
        };
    }), sendPayloadToParent: xstate_1.sendParent(function (_, _a) {
        var payload = _a.payload;
        return payload;
    }), wrapAndSendToParent: xstate_1.sendParent(function (_, _a) {
        var type = _a.type, payload = _a.payload;
        return {
            type: type,
            payload: payload,
        };
    }) });
exports.default = actions;

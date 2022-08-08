"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    id: "socket-client",
    initial: "initializing",
    states: {
        initializing: {
            entry: ["logInitializingSocket"],
            invoke: {
                id: "initialize-client",
                src: "initializeClient",
            },
            on: {
                SOCKET_CREATED: {
                    actions: [
                        "assignSocketInstance",
                    ],
                },
                SOCKET_CONNECTED: {
                    target: "running",
                },
                SOCKET_CONNECTION_ERROR: {
                    actions: ["logSocketConnectionError"],
                },
            },
        },
        running: {
            invoke: {
                src: "connectionListener",
            },
            initial: "connected",
            states: {
                connected: {
                    always: {
                        actions: ["logSocketConnected"],
                        target: "unlocked",
                    },
                },
                disconnected: {
                    entry: ["logSocketDisconnected", "sendParentSocketDisconnected"],
                    on: {
                        SOCKET_CONNECTED: {
                            target: "connected",
                        },
                    },
                },
                unlocked: {
                    id: "unlocked",
                    entry: "logSocketClientUnlocked",
                    invoke: {
                        src: "connectionPing",
                    },
                    on: {
                        SOCKET_DISCONNECTED: {
                            target: "disconnected",
                        },
                        PONG: {
                            actions: ["sendPingHeartbeatToParent"],
                        },
                        LOCK_OBTAINED: {
                            target: "locked",
                        },
                    },
                },
                locked: {
                    entry: "sendParentSocketInstance",
                    invoke: [
                        {
                            src: "socketEventListeners",
                        },
                    ],
                    on: {
                        SOCKET_DISCONNECTED: {
                            target: "disconnected",
                        },
                        MESSAGE: {
                            actions: ["sendParentEvent"],
                        },
                        SEND: {
                            actions: ["emitTransaction"],
                        },
                    },
                },
            },
        },
    },
};
exports.default = config;

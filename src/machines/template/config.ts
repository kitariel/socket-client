import { MachineConfig, AnyStateNodeDefinition } from "xstate";
import { IContext, IMachineEvents } from "./types";

const config: MachineConfig<
  IContext,
  AnyStateNodeDefinition,
  IMachineEvents
> = {
  initial: "start",
  states: {
    start: {
      entry: ["logStarting"],
      invoke: [
        {
          src: "spawnSocketClientEndpoints",
        },
      ],
      on: {
        SPAWN_ENDPOINT: {
          actions: ["spawnEndpoints"],
        },
        SPAWN_DONE: {
          actions: ["logInitialized"],
          target: "wait_for_connection",
        },
      },
      exit: [],
    },
    wait_for_connection: {
      on: {
        PONG: {
          target: "listening",
          actions: [
            "lockSocketClient",
            "assignActiveEndpoint",
            "logSocketClientEndpointLock",
          ],
        },
        // SEND: {
        //   cond: "bufferingIsEnabled",
        //   actions: ["saveEmitsToBuffer"],
        // },
      },
    },
    listening: {
      entry: ["logListening"],
      on: {
        SOCKET_CONNECTED: {
          actions: ["sendToParent"],
        },
        SOCKET_CONNECTION_ERROR: {
          actions: ["sendToParent"],
        },
        SOCKET_DISCONNECTED: [
          {
            cond: "isNotActiveEndpoint",
            actions: ["logSocketClientDisconnection"],
          },
          {
            target: "wait_for_connection",
            actions: [
              "removeActiveEndpoint",
              "sendToParent",
              "logSocketClientDisconnection",
            ],
          },
        ],
        SEND: [
          {
            cond: "isEncrypted",
            actions: ["logSend", "encryptAndsendToActiveEndpoint"],
          },
          {
            actions: ["logSend", "sendToActiveEndpoint"],
          },
        ],
        MESSAGE: [
          {
            cond: "isEncryptedAndTransparent",
            actions: ["logMessage", "decryptAndSendPayloadToParent"],
          },
          {
            cond: "isEncryptedButNotTransparent",
            actions: ["logMessage", "decryptAndWrapSendToParent"],
          },
          {
            cond: "isTransparent",
            actions: ["logMessage", "sendPayloadToParent"],
          },
          {
            actions: ["logMessage", "wrapAndSendToParent"],
          },
        ],
      },
    },
  },
};

export default config;

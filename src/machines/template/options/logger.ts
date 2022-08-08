import { ActionFunctionMap } from "xstate";
import { IContext, IMachineEvents } from "../types";
import { log } from "../../../util";

const append = log("Socket Client");

const loggers: ActionFunctionMap<IContext, IMachineEvents> = {
  logStarting: ({ config: { verbose } }) => {
    if (verbose) {
      console.log(append(), "Started");
    }
  },
  logInitialized: ({ config: { verbose } }) => {
    if (verbose) {
      console.log(append(), "Initialized");
    }
  },
  logRunning: ({ config: { verbose } }) => {
    if (verbose) {
      console.log(append(), "Running");
    }
  },
  logConnected: ({ config: { verbose } }) => {
    if (verbose) {
      console.log(append(), "Connected");
    }
  },
  logMessage: ({ config: { verbose } }, event) => {
    if (verbose) {
      console.log(append(), "Message", event);
    }
  },
  logSend: ({ config: { verbose } }, event) => {
    if (verbose) {
      console.log(append(), "Message", event);
    }
  },
  logListening: ({ config: { verbose } }) => {
    if (verbose) {
      console.log(append(), "Listening");
    }
  },
  logSocketClientEndpointLock: ({ config: { verbose } }, { endpoint }) => {
    if (verbose) {
      console.log(append(), `Locked endpoint: ${endpoint?.host}`);
    }
  },
  logSocketClientDisconnection: ({ config: { verbose } }, { endpoint }) => {
    if (verbose) {
      console.log(append(), `Socket Client Disconnected: ${endpoint?.host}`);
    }
  },
};

export default loggers;

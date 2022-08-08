import { ActionFunctionMap } from "xstate";
import { IMachineContext, IMachineEvents } from "../types";
import { log } from "../../../util";

// Todo: Need to rework, logging with verbose config.
const append = log("Socket Client");

const loggers: ActionFunctionMap<IMachineContext, IMachineEvents> = {
  logInitializingSocket: ({ endpoint, config: { verbose } }) => {
    if (verbose) {
      console.log(append(), `Initializing Socket Client: ${endpoint?.host}`);
    }
  },
  logSocketConnectionError: ({ endpoint, config: { verbose } }) => {
    if (verbose) {
      console.log(
        append(),
        `Socket Client Connection Error: ${endpoint?.host}`
      );
    }
  },
  logSocketConnected: ({ endpoint, config: { verbose } }) => {
    if (verbose) {
      console.log(append(), `Socket Client Connected: ${endpoint?.host}`);
    }
  },
  logSocketDisconnected: ({ endpoint, config: { verbose } }) => {
    if (verbose) {
      console.log(append(), `Socket Client Disconnected: ${endpoint?.host}`);
    }
  },
  logSocketClientUnlocked: ({ endpoint, config: { verbose } }) => {
    if (verbose) {
      console.log(append(), `Socket Client ${endpoint?.host}, unlocked`);
    }
  },
};

export default loggers;

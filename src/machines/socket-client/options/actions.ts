import { Socket } from "socket.io-client";
import { ActionFunctionMap, assign, sendParent } from "xstate";
import { IMachineContext, IAssignSocketInstanceEvent, ISend } from "../types";
import logger from "./logger";

const actions: ActionFunctionMap<IMachineContext, any> = {
  ...logger,
  assignSocketInstance: assign({
    socket: (_, { socket }: IAssignSocketInstanceEvent) => socket,
  }),
  sendPingHeartbeatToParent: sendParent((_, event) => event),
  sendParentSocketDisconnected: sendParent((_, event) => event),
  sendParentEvent: sendParent((_, event) => event),
  emitTransaction: (
    { socket, config: { event_name: default_event_name } },
    { event_name = default_event_name, payload }: ISend
  ) => {
    socket?.emit(event_name!, payload);
  },
  sendParentSocketInstance: sendParent(({ socket }) => {
    return {
      type: "SOCKET_CONNECTED",
      socket,
    };
  }),
};

export default actions;

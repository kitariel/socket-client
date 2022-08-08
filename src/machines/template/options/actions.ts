import { decrypt, deserializeFromJSON } from "./../../../util";
import { ActionFunctionMap } from "xstate";
import { IContext, ISend, IMessage } from "../types";
import logger from "./logger";
import { assign, spawn, send, sendParent } from "xstate";

// Utilities
import { serializeToJSON, encrypt } from "../../../util";

// Machine
import { spawnMachine } from "../../socket-client";

const actions: ActionFunctionMap<IContext, any> = {
  ...logger,
  spawnEndpoints: assign(({ data, config }, { payload }) => {
    const { host } = payload;
    // const { socket_clients_ref = {} } = data;
    const socket_clients_ref = data?.socket_clients_ref;
    const { token } = config;

    return {
      data: {
        ...data,
        socket_clients_ref: {
          ...socket_clients_ref,
          [host]: spawn(
            spawnMachine({
              endpoint: payload,
              token,
              config,
            }),
            host
          ),
        },
      },
    };
  }),
  lockSocketClient: send("LOCK_OBTAINED", {
    to: (_, { endpoint }) => endpoint!.host,
  }),
  assignActiveEndpoint: assign(({ data }, { endpoint }) => {
    return {
      data: {
        ...data,
        active_endpoint: endpoint,
      },
    };
  }),
  saveEmitsToBuffer: assign(({ data }, { payload }) => {
    return {
      data: {
        ...data,
        emit_buffer: [...data?.emit_buffer!, payload],
      },
    };
  }),
  sendToParent: sendParent((_, event) => event),
  removeActiveEndpoint: assign(({ data }) => {
    return {
      data: {
        ...data,
        active_endpoint: null,
      },
    };
  }),
  encryptAndsendToActiveEndpoint: send<IContext, any>(
    ({ config: { encryption } }, { type, payload, event_name }: ISend) => {
      const { encryption_key, encryption_iv } = encryption!;
      const message = serializeToJSON(payload);
      const new_message = encrypt(message, encryption_key, encryption_iv);

      return {
        type,
        event_name,
        payload: new_message,
      };
    },
    {
      to: (context) => {
        const { active_endpoint } = context.data!;
        return active_endpoint!.host;
      },
    }
  ),
  sendToActiveEndpoint: send((_, event) => event, {
    to: (context) => {
      const { active_endpoint } = context.data!;
      return active_endpoint!.host;
    },
  }),
  decryptAndSendPayloadToParent: sendParent(
    ({ config: { encryption } }, { payload }: IMessage<string>) => {
      const { encryption_key, encryption_iv } = encryption!;
      const envelope = decrypt(payload, encryption_key, encryption_iv);
      const message = deserializeFromJSON(envelope);

      return message;
    }
  ),
  decryptAndWrapSendToParent: sendParent(
    ({ config: { encryption } }, { type, payload }: IMessage<string>) => {
      const { encryption_key, encryption_iv } = encryption!;
      const envelope = decrypt(payload, encryption_key, encryption_iv);
      const message = deserializeFromJSON(envelope);

      return {
        type,
        payload: message,
      };
    }
  ),
  sendPayloadToParent: sendParent((_, { payload }: IMessage) => payload),
  wrapAndSendToParent: sendParent((_, { type, payload }: IMessage) => {
    return {
      type,
      payload,
    };
  }),
};

export default actions;

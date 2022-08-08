import { AnyEventObject } from "xstate";
import { Socket } from "socket.io-client";

export interface IRecord<TEntry> {
  [key: string]: TEntry;
}

export interface IModuleData {}

export interface IAES_256_CBC_CIPHER_PARAMS {
  encryption_key: string;
  encryption_iv: string;
}

export interface IModuleConfig {
  transparent?: boolean;
  verbose?: boolean;
  encryption?: IAES_256_CBC_CIPHER_PARAMS;
  server_endpoints: IEndpointConfig[];
  buffer_enabled?: boolean;
  token?: string;
  event_name?: string;
}

export interface IMachineContext {
  socket?: typeof Socket;
  token?: string;
  endpoint: IEndpointConfig;
  config: IModuleConfig;
}

export interface IMachineSchema {
  states: {
    initializing: {};
    running: {
      states: {
        connected: {};
        disconnected: {};
        unlocked: {};
        locked: {};
      };
    };
  };
}

export interface IMachineEvents {
  type:
    | "SOCKET_CREATED"
    | "SOCKET_CONNECTED"
    | "SOCKET_CONNECTION_ERROR"
    | "SOCKET_DISCONNECTED"
    | "MESSAGE"
    | "SEND"
    | "SOCKET_RECONNECTION_ERROR"
    | "PONG"
    | "LOCK_OBTAINED";
  payload?: any;
  endpoint?: IEndpointConfig;
}

export interface IEndpointConfig {
  host: string;
}

export interface IAssignSocketInstanceEvent {
  type: string;
  socket: typeof Socket;
}

export interface IMachineEvent {
  type: string;
  payload: any;
}

export interface IModuleEnvelope {
  created_date?: string; //Date<ISOString>
  updated_date?: string; //Date<ISOString>
  event_name?: string;
}

export interface ISend<TPayload = AnyEventObject> {
  type: "SEND";
  // envelope: IModuleEnvelope;
  payload: TPayload;
  event_name?: string;
}

export interface IMessage<TPayload = AnyEventObject> {
  type: "MESSAGE";
  envelope: IModuleEnvelope;
  payload: TPayload;
}

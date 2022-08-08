import { AnyEventObject, Actor } from "xstate";
import { Socket } from "socket.io-client";

export interface IMachineEvents extends AnyEventObject {
  type:
    | "SPAWN_ENDPOINT"
    | "SPAWN_DONE"
    | "PONG"
    | "SEND"
    | "SOCKET_CONNECTED"
    | "SOCKET_CONNECTION_ERROR"
    | "SOCKET_DISCONNECTED"
    | "SEND"
    | "MESSAGE";
  payload?: any;
  endpoint?: IEndpointConfig;
}

export interface IRecord<TEntry> {
  [key: string]: TEntry;
}
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

export interface IModuleData {
  socket?: typeof Socket;
  active_endpoint?: IEndpointConfig | null;
  emit_buffer?: ISend[];
  socket_clients_ref?: {
    [key: string]: Actor;
  };
}

export interface IModuleEnvelope {
  created_date: string; //Date<ISOString>
  updated_date: string; //Date<ISOString>
  event_name?: string;
}

export interface IContext {
  data?: IModuleData;
  config: IModuleConfig;
}

export interface IMachineSchema {
  states: {
    start: {};
    wait_for_connection: {};
    listening: {};
  };
}

export interface IAssignEndpointEvent extends IMachineEvents {
  endpoint?: IEndpointConfig;
}

export interface IEndpointConfig {
  host: string;
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

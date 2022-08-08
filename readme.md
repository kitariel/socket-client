# XState Socket Client Module

## Description

A spawnable Socket Client that enables inter-xstate-machine communication between multiple server endpoints.

## Context

```typescript
import { AnyEventObject } from "xstate";

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
}

export interface IModuleData {}

export interface IModuleEnvelope {
  created_date?: string; //Date<ISOString>
  updated_date?: string; //Date<ISOString>
  event_name?: string;
}

export interface IContext {
  data?: IModuleData;
  config: IModuleConfig;
}
```

## Module Events

Interact with an instance of this machine with the following events.

```typescript
// parent machine to this module.
export interface ISend<TPayload = AnyEventObject> {
  type: "SEND";
  envelope: IModuleEnvelope;
  payload: TPayload;
}

// This module to parent machine. Sent when config.transparent = false
export interface IMessage<TPayload = AnyEventObject> {
  type: "MESSAGE";
  envelope: IModuleEnvelope;
  payload: TPayload;
}

// This module to parent machine. Sent when config.transparent = true
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
```

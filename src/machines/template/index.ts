import { Machine, interpret } from "xstate";
import { IContext, IModuleConfig } from "./types";
import config from "./config";
import options from "./options";

const default_config: IModuleConfig = {
  server_endpoints: [],
  transparent: true,
  verbose: false,
  encryption: undefined,
  buffer_enabled: false,
  token: "",
  event_name: "MESSAGE",
};

export const spawn = (context: IContext) => Machine(
  {
    ...config,
    context: {
      config: {
        ...default_config,
        ...context.config,
      },
    },
  },
  options
);

export const Interpret = (context: IContext) => {
  const machine = spawn(context);
  const service = interpret(machine);
  return service;
};

import { Machine, interpret } from "xstate";
import config from "./config";
import options from "./options/index";
import { IMachineContext } from "./types";

export const spawnMachine = (context: IMachineContext) =>
  Machine(
    { ...config, context },
    options
  );

export const interpretMachine = (context: IMachineContext) => {
  const machine = spawnMachine(context);
  const service = interpret(machine);

  return service;
};

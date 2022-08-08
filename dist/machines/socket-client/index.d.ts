import { IMachineContext } from "./types";
export declare const spawnMachine: (context: IMachineContext) => import("xstate").StateMachine<IMachineContext, any, import("./types").IMachineEvents, {
    value: any;
    context: IMachineContext;
}>;
export declare const interpretMachine: (context: IMachineContext) => import("xstate").Interpreter<IMachineContext, any, import("./types").IMachineEvents, {
    value: any;
    context: IMachineContext;
}>;
//# sourceMappingURL=index.d.ts.map
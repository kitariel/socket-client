import { DelayFunctionMap } from "xstate";
import { IMachineContext, IMachineEvents } from "../types";

const delays: DelayFunctionMap<IMachineContext, IMachineEvents> = {};

export default delays;

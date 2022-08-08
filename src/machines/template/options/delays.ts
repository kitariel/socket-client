import { DelayFunctionMap } from "xstate";
import { IContext, IMachineEvents } from "../types";

const delays: DelayFunctionMap<IContext, IMachineEvents> = {};

export default delays;

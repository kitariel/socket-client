import { ConditionPredicate } from "xstate";
import { IMachineContext, IMachineEvents } from "../types";
import { IRecord } from "../types";

const guards: IRecord<ConditionPredicate<IMachineContext, IMachineEvents>> = {};

export default guards;

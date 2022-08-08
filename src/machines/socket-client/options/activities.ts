import { ActivityConfig } from "xstate";
import { IMachineContext, IMachineEvents } from "../types";
import { IRecord } from "../types";

const activities: IRecord<ActivityConfig<IMachineContext, IMachineEvents>> = {};

export default activities;

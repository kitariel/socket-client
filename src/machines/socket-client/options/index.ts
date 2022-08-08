import { MachineOptions } from "xstate";
import { IMachineContext, IMachineEvents } from "../types";

import actions from "./actions";
import activities from "./activities";
import delays from "./delays";
import guards from "./guards";
import services from "./services";

const options: MachineOptions<IMachineContext, IMachineEvents> = {
  actions,
  activities,
  delays,
  guards,
  services,
};

export default options;

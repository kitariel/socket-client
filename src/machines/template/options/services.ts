import { ServiceConfig } from "xstate";
import { IContext, IMachineEvents } from "../types";
import { IRecord } from "../types";

const services: IRecord<ServiceConfig<IContext, IMachineEvents>> = {
  spawnSocketClientEndpoints: ({ config: { server_endpoints } }) => (send) => {
    server_endpoints.map((endpoint) =>
      send({
        type: "SPAWN_ENDPOINT",
        payload: endpoint,
      })
    );

    send("SPAWN_DONE");
  },
};

export default services;

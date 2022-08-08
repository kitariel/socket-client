import { ConditionPredicate } from "xstate";
import { IContext, IMachineEvents } from "../types";
import { IRecord } from "../types";

const guards: IRecord<ConditionPredicate<IContext, IMachineEvents>> = {
  isEncrypted: ({ config: { encryption } }) => !!encryption,
  isEncryptedAndTransparent: ({ config: { encryption, transparent } }) =>
    !!encryption && !!transparent,
  isEncryptedButNotTransparent: ({ config: { encryption, transparent } }) =>
    !!encryption && !transparent,
  isTransparent: ({ config: { transparent } }, _) => !!transparent,
  isNotActiveEndpoint: ({ data }, { endpoint }) =>
    data?.active_endpoint!.host !== endpoint!.host,
};

export default guards;

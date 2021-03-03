import { ActionType } from "typesafe-actions";

declare module "typesafe-actions" {
  interface Types {
    RootAction: ActionType<typeof import("./root-action").default>;
  }
}

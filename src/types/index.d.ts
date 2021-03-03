import { ActionType } from "typesafe-actions";
import { StateType } from "typesafe-actions";

declare module "JobcoinTypes" {
  export type Store = StateType<typeof import("../store/index").default>;

  // temp solution to type issue that is causing error when using the push action inside the epic.
  export type RootAction = ActionType<
    typeof import("../store/root-action").default
  >;

  export type RootState = StateType<
    ReturnType<typeof import("../store/root-reducer").default>
  >;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

declare interface NodeModule {
  hot?: { accept: (path: string, callback: () => void) => void };
}

declare interface System {
  import<T = any>(module: string): Promise<T>;
}

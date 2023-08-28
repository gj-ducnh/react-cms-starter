import { IProfile } from "./User";

export interface IStoreState {
  app: {
    loading: boolean;
    profile: IProfile;
  };
}

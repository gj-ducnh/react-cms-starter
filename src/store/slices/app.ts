import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { httpService } from "../../apis/httpService";
import { IProfile } from "../../interfaces/User";
import { sleep } from "../../common/helpers/utils";

export const getProfile = createAsyncThunk(
  "app/profile",
  async (state, action) => {
    // For UX:
    const startTime = Date.now();

    const { data: profile }: any = await httpService
      .get<IProfile>("/profile")
      .catch(() => ({ data: { name: "Duc" } }));

    const endTime = Date.now();

    if (endTime - startTime < 1000) {
      await sleep(500);
    }

    return profile;
  }
);

const appSlice = createSlice({
  name: "app",
  initialState: {
    loading: true,
    profile: null,
  },
  reducers: {
    toggleLoading: {
      reducer: (state, action: PayloadAction<boolean>) => {
        console.log(state, action.payload);
        state.loading = action.payload;
      },
      prepare: (v: boolean) => {
        return {
          payload: v,
        };
      },
    },
  },
  extraReducers: {
    [getProfile.fulfilled.toString()]: (state: any, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    [getProfile.rejected.toString()]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { reducer: appReducer } = appSlice;
export const { toggleLoading } = appSlice.actions;

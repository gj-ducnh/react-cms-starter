import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { httpService } from "../apis/httpService";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from "../common/constants/localStorageKeys";
import { IStoreState } from "../interfaces/Store";
import { IProfile } from "../interfaces/User";
import { paths } from "../routes/path";
import { getProfile, toggleLoading } from "../store/slices/app";
import { useLocalStorage } from "./useLocalStorage";

export interface IAuthenticatedData {
  accessToken: string;
  refreshToken: string;
  profile?: IProfile;
}

export const useCredential = () => {
  const appState = useSelector((state: IStoreState) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [refreshToken] = useLocalStorage(REFRESH_TOKEN);
  const [accessToken] = useLocalStorage(ACCESS_TOKEN);

  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleRefreshToken = useCallback(async () => {
    if (refreshToken) {
      const resp = await httpService.requestRefreshToken(refreshToken);
      if (resp) {
      }
      if (resp?.expiredIn) {
        const timeout = new Date(resp.expiredIn).getMilliseconds() - Date.now();
        timeRef.current = setTimeout(() => {
          handleRefreshToken();
        }, timeout);
      }
    }
  }, [refreshToken]);

  useEffect(() => {
    handleRefreshToken();
    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
    };
  }, [handleRefreshToken]);

  useEffect(() => {
    if (!appState.profile && accessToken) {
      dispatch(getProfile())
        .unwrap()
        .catch(() => {
          dispatch(dispatch(toggleLoading(false)));
        });
    } else {
      dispatch(toggleLoading(false));
      //  navigate({
      //   pathname: paths.LOGIN,
      //   search: createSearchParams({
      //     from: location.pathname,
      //   }).toString(),
      // });
    }
  }, [appState.profile, accessToken, dispatch, navigate, location.pathname]);
};

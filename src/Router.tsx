import React, { useLayoutEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { IProfile } from "./interfaces/User";
import { IRouteItem, routes } from "./routes";
import { paths } from "./routes/path";

export interface IRouterProps {
  profile?: IProfile;
}
export interface IWrapperProps {
  profile?: IProfile;
  route?: IRouteItem;
  children: React.ReactNode;
}

const Wrapper: React.FC<IWrapperProps> = ({ children, profile, route }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    // should be go out auth page when user have login
    if ([paths.LOGIN, paths.REGISTER].includes(location.pathname) && profile) {
      navigate(paths.HOME);
    }
    // should be go to auth page when user not yet login
    if (
      ![paths.LOGIN, paths.REGISTER].includes(location.pathname) &&
      !profile
    ) {
      navigate(paths.LOGIN);
    }
  }, [profile, navigate, location]);

  return <>{children}</>;
};

export const Router: React.FC<IRouterProps> = ({ profile }) => {
  return (
    <>
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              Component={() => (
                <route.layout key={route.path} profile={profile}>
                  <Wrapper route={route} profile={profile}>
                    <route.component />
                  </Wrapper>
                </route.layout>
              )}
            />
          );
        })}
      </Routes>
    </>
  );
};

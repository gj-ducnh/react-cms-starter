import React from "react";
import { BlankLayout } from "../common/components/layouts/blank";
import { DarkLayout } from "../common/components/layouts/dark";
import { Login } from "../pages/auth/login";
import { Register } from "../pages/auth/register";
import { HomePage } from "../pages/home";
import { paths } from "./path";

export interface IRouteItem {
  path: string;
  auth: boolean;
  component: React.FC;
  layout: React.FC<any>;
}

export const routes: IRouteItem[] = [
  {
    path: paths.LOGIN,
    auth: false,
    component: Login,
    layout: BlankLayout,
  },
  {
    path: paths.REGISTER,
    auth: false,
    component: Register,
    layout: BlankLayout,
  },
  {
    path: paths.HOME,
    auth: true,
    component: HomePage,
    layout: DarkLayout,
  },
];

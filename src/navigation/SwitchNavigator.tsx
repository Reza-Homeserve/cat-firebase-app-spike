import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { Dashboard } from "../screens/Dashboard";
import { ForgottenPassword } from "../screens/ForgottenPassword";
import { LOGIN, REGISTER, FORGOTTON_PASSWORD, DASHBOARD } from "../constants";

const routes = createSwitchNavigator(
  {
    [LOGIN]: {
      screen: Login,
    },
    [REGISTER]: {
      screen: Register,
    },
    [DASHBOARD]: {
      screen: Dashboard,
    },
    [FORGOTTON_PASSWORD]: {
      screen: ForgottenPassword,
    },
  },
  {
    initialRouteName: LOGIN,
  }
);

export const SwitchNavigator = createAppContainer(routes);

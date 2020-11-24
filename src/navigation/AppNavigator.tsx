import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { Dashboard } from "../screens/Dashboard";
import { ForgottenPassword } from "../screens/ForgottenPassword";
import { LOGIN, REGISTER, FORGOTTON_PASSWORD, DASHBOARD } from "../constants";
import { Header } from "../components/molecules";
import { theme } from "../theme";

const defaultNavigationOptions = {
  headerShown: true,
  headerTitle: () => <Header />,
  headerStyle: {
    height: 100, // Specify the height of your custom header,
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 2,
  },
};

const DashboardStack = createStackNavigator({
  [DASHBOARD]: {
    screen: Dashboard,
    navigationOptions: {
      ...defaultNavigationOptions,
    },
  },
});

const AuthStack = createStackNavigator({
  [LOGIN]: {
    screen: Login,
    navigationOptions: {
      ...defaultNavigationOptions,
    },
  },
  [REGISTER]: {
    screen: Register,
    navigationOptions: {
      ...defaultNavigationOptions,
    },
  },
  [FORGOTTON_PASSWORD]: {
    screen: ForgottenPassword,
    navigationOptions: {
      ...defaultNavigationOptions,
    },
  },
});

const App = createSwitchNavigator({
  AUTH: {
    screen: AuthStack,
  },
  LOGGED_IN: {
    screen: DashboardStack,
  },
});

export const AppNavigator = createAppContainer(App);

import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import OTPScreen from "../screens/OTPScreen";
import HomeScreen from "../screens/HomeScreen";
import LoadingScreen from "../screens/LoadingScreen";
import ListStudent from "../screens/ListStudent";
const MainStack = createStackNavigator(
  {
    Loading: { screen: LoadingScreen, navigationOptions: { header: null } },
    LoginScreen: { screen: LoginScreen, navigationOptions: { header: null } },
    OTPScreen: { screen: OTPScreen, navigationOptions: { header: null } },
    HomeScreen: { screen: HomeScreen, navigationOptions: { header: null } },
    ListStudent: { screen: ListStudent, navigationOptions: { header: null } }
  },
  {
    initialRouteName: "Loading"
  }
);

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // Main: MainTabNavigator,
    Signin: MainStack
  })
);

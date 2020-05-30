import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LedgerScreen from '../screens/Ledger';
import CalendarTabNavigator from './CalendarTabNavigator';
import AddExpenseDataScreen from '../screens/Ledger/AddExpenseDataScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config: any = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: '홈',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'md-home'} />
};

// HomeStack.path = '';

const LedgerStack = createStackNavigator(
  {
    Ledger: LedgerScreen,
    Calendar: {
      screen: CalendarTabNavigator,
      navigationOptions: {
        header: null
      }
    },
    AddExpenseData: AddExpenseDataScreen
  },
  {
    ...config,
    mode: 'modal'
  }
);

LedgerStack.navigationOptions = ({ navigation }) => {
  // NOTE hide tabBar inside [Calendar] stack
  let tabBarVisible = true;
  let routeName = navigation.state.routes[navigation.state.index].routeName;
  if (routeName === 'Calendar' || routeName === 'AddExpenseData') {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: '장부',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={'ios-wallet'} />
    ),
    tabBarVisible
  };
};

// LedgerStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: '설정',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-options'} />
  )
};

// SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    LedgerStack,
    SettingsStack
  },
  {
    initialRouteName: 'LedgerStack'
  }
);

// tabNavigator.path = '';

export default tabNavigator;

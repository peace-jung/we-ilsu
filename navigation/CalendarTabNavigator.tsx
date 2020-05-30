import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CalendarMonthlyScreen from '../screens/Ledger/CalendarMonthlyScreen';
import CalendarWeeklyScreen from '../screens/Ledger/CalendarWeeklyScreen';
import CalendarDailyScreen from '../screens/Ledger/CalendarDailyScreen';

const config: any = Platform.select({
  web: { headerMode: 'screen' },
  default: { mode: 'card' }
});

const MonthlyStack = createStackNavigator(
  {
    Monthly: CalendarMonthlyScreen
  },
  config
);

MonthlyStack.navigationOptions = {
  tabBarLabel: '월간',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type={'MaterialCommunityIcons'}
      focused={focused}
      name={'calendar-multiselect'}
    />
  )
};

// MonthlyStack.path = '';

const WeeklyStack = createStackNavigator(
  {
    Weekly: CalendarWeeklyScreen
  },
  config
);

WeeklyStack.navigationOptions = {
  tabBarLabel: '주간',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type={'MaterialCommunityIcons'}
      focused={focused}
      name={'calendar-week'}
    />
  )
};

// WeeklyStack.path = '';

const DailyStack = createStackNavigator(
  {
    Daily: CalendarDailyScreen
  },
  config
);

DailyStack.navigationOptions = {
  tabBarLabel: '일간',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-today'} />
  )
};

// DailyStack.path = '';

const tabNavigator = createBottomTabNavigator({
  MonthlyStack,
  WeeklyStack,
  DailyStack
});

// tabNavigator.path = '';

export default tabNavigator;

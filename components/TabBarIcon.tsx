import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  const Comp = (() => {
    switch (props.type) {
      case 'Ionicons':
        return Ionicons;
      case 'MaterialCommunityIcons':
        return MaterialCommunityIcons;
      default:
        return Ionicons;
    }
  })();

  return (
    <Comp
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

TabBarIcon.defaultProps = {
  type: 'Ionicons'
};

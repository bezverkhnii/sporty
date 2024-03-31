import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserScreen from '../screens/UserScreen';
import DiaryScreen from '../screens/DiaryScreen';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Diary"
        component={DiaryScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;

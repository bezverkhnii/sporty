import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserScreen from '../screens/UserScreen';
import DiaryScreen from '../screens/DiaryScreen';
import {useEffect, useState, useLayoutEffect} from 'react';
import OnboardingScreen from '../screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../constants/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  // console.log(isFirstLaunch);

  //in case of onboarding screen will be added
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      console.log(value, 'val');
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName={isFirstLaunch ? 'Onboarding' : 'User'}
        screenOptions={{
          tabBarActiveTintColor: COLORS.green,
          tabBarStyle: {
            backgroundColor: COLORS.primary,
            height: 70,
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Diary"
          component={DiaryScreen}
          options={{
            headerShown: false,
            tabBarBadge: 1,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon="calendar-days"
                size={25}
                style={{color: focused ? COLORS.green : COLORS.transparent}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon
                icon="user"
                size={25}
                style={{color: focused ? COLORS.green : COLORS.transparent}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{
            tabBarStyle: {display: 'none'},
            headerShown: false,
            tabBarButton: () => null,
          }}
        />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default AppStack;

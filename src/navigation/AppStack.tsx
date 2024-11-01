import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserScreen from '../screens/UserScreen';
import DiaryScreen from '../screens/DiaryScreen';
import {useEffect, useState} from 'react';
import OnboardingScreen from '../screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../constants/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import SportyAI from '../screens/SportyAI';
import {Image, View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(false); //this needs to be changed to edit onboarding
  console.log(isFirstLaunch, 'first launch');

  // in case of onboarding screen will be added
  // useEffect(() => {
  //   AsyncStorage.getItem('alreadyLaunched').then(value => {
  //     console.log(value, 'val');
  //     if (value == null) {
  //       AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
  //       setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   });
  // }, []);

  // if (isFirstLaunch === null) {
  //   return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  // }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName={isFirstLaunch ? 'Onboarding' : 'User'}
        screenOptions={{
          tabBarActiveTintColor: COLORS.green,
          tabBarStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 15,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: 'rgba(40, 40, 40, 1)',
            height: 70,
            borderRadius: 100,
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            // tabBarBadge: 1,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  padding: 20,
                  borderRadius: 100,
                  backgroundColor: focused
                    ? COLORS.green
                    : 'rgba(51, 51, 51, 0.9)',
                  top: 14,
                }}>
                <FontAwesomeIcon
                  icon="house"
                  size={25}
                  style={{
                    color: focused ? COLORS.primary : COLORS.white,
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Diary"
          component={DiaryScreen}
          options={{
            headerShown: false,
            // tabBarBadge: 1,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  padding: 20,
                  borderRadius: 100,
                  backgroundColor: focused
                    ? COLORS.green
                    : 'rgba(51, 51, 51, 0.9)',
                  top: 14,
                }}>
                <FontAwesomeIcon
                  icon="chart-simple"
                  size={25}
                  style={{
                    color: focused ? COLORS.primary : COLORS.white,
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="SportyAI"
          component={SportyAI}
          options={{
            headerShown: false,
            // tabBarBadge: 'NEW',
            tabBarIcon: ({focused}) => (
              // <FontAwesomeIcon
              //   icon="calendar-days"
              //   size={25}
              //   style={{color: focused ? COLORS.green : COLORS.transparent}}
              // />
              <View
                style={{
                  backgroundColor: focused
                    ? COLORS.green
                    : 'rgba(51, 51, 51, 0.9)',
                  borderRadius: 100,
                  padding: 19,
                  overflow: 'hidden',
                  top: 14,
                }}>
                <Image
                  source={{
                    uri: 'https://f4.bcbits.com/img/0009644394_23.jpg',
                    width: 30,
                    height: 30,
                  }}
                  style={{
                    borderRadius: 100,
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Friends"
          component={FriendsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  top: 14,
                  backgroundColor: focused
                    ? COLORS.green
                    : 'rgba(51, 51, 51, 0.9)',
                  padding: 20,
                  borderRadius: 100,
                }}>
                <FontAwesomeIcon
                  icon="users"
                  size={25}
                  style={{
                    color: focused ? COLORS.primary : COLORS.white,
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  top: 14,
                  backgroundColor: focused
                    ? COLORS.green
                    : 'rgba(51, 51, 51, 0.9)',
                  padding: 20,
                  borderRadius: 100,
                }}>
                <FontAwesomeIcon
                  icon="user"
                  size={25}
                  style={{
                    color: focused ? COLORS.primary : COLORS.white,
                  }}
                />
              </View>
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

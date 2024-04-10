import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserScreen from '../screens/UserScreen';
import DiaryScreen from '../screens/DiaryScreen';
import {useEffect, useState} from 'react';
import OnboardingScreen from '../screens/OnboardingScreen';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  console.log(isFirstLaunch);
  let routeName = 'User';

  //in case of onboarding screen will be added
  // useEffect(() => {
  //   AsyncStorage.getItem('alreadyLaunched').then(value => {
  //     if (value == null) {
  //       AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
  //       setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  // }, []);

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'User';
  }

  return (
    <Tab.Navigator initialRouteName={routeName}>
      {!isFirstLaunch}
      {
        <>
          <Tab.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{
              tabBarStyle: {display: 'none'},
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="User"
            component={UserScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      }
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

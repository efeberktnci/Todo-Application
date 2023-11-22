import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../pages/SplashScreen';
import OnboardingScreen from '../pages/OnboardingScreen';
import TaskListScreen from '../pages/TaskListScreen';
import AddTaskScreen from '../pages/AddTaskScreen';
import colors  from '../themes/Colors';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName='TaskList' screenOptions={{
      headerStyle:{
        backgroundColor: colors.background.primary,
      },
      headerTintColor: colors.text,
      headerBackTitleVisible: false,
    }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="TaskList" component={TaskListScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
    </Stack.Navigator>
  );
}
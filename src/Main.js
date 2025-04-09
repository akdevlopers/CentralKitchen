import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import PasswordReset from './screens/ForgetPassword';
import VerifyCode from './screens/VerifyCode';
import NewPassword from './screens/NewPassword';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="PasswordReset" 
          component={PasswordReset} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="VerifyCode" 
          component={VerifyCode} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="NewPassword" 
          component={NewPassword} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

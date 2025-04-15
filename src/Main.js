import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import PasswordReset from './screens/ForgetPassword';
import VerifyCode from './screens/VerifyCode';
import NewPassword from './screens/NewPassword';
import Home from './screens/Home';
import Institution from './screens/Insitution';
import InstritutionDetails from './screens/InstritutionDetails';
import EditProfile from './screens/EditProfile';
import History from './screens/History';
import Commission from './screens/Commission';
import CommissionDetail from './screens/CommissionDetail';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      console.log(token ? `${token} : From Main Page` : "No Token Found")

    };

    fetchToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
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
        <Stack.Screen
          name="Institution"
          component={Institution}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InstritutionDetails"
          component={InstritutionDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Commission"
          component={Commission}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CommissionDetail"
          component={CommissionDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

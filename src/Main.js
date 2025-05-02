import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';

import LoginScreen from './screens/LoginScreen';
import PasswordReset from './screens/ForgetPassword';
import VerifyCode from './screens/VerifyCode';
import NewPassword from './screens/NewPassword';
import Home from './screens/Home';
import Institution from './screens/Insitution';
import InstritutionDetails from './screens/InstritutionDetails';
import EditProfile from './screens/EditProfile';
import History from './screens/History';
import HistoryDetails from './screens/HistoryDetails';
import Commission from './screens/Commission';
import CommissionDetail from './screens/CommissionDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
        console.log(token ? `${token} : From Main Page` : 'No Token Found');
      } catch (error) {
        console.error('Error fetching token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userToken ? 'Home' : 'Login'}>
        
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PasswordReset"
          component={PasswordReset}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyCode"
          component={VerifyCode}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Institution"
          component={Institution}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InstritutionDetails"
          component={InstritutionDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HistoryDetails"
          component={HistoryDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Commission"
          component={Commission}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CommissionDetail"
          component={CommissionDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
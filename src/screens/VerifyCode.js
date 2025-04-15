import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

const VerifyCode = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const route = useRoute();
  const { userEmail } = route.params;

  const handleOtp= async () => {
    const user = { email: userEmail, emailotp: otp };
    console.log(user, "otp check")
    try {
      const response = await fetch(
        'https://teachercanteen.akprojects.co/api/v1/kitchenpasswordresetupdate',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (json.status) {
        navigation.navigate('NewPassword', {json});
        console.log('Otp verify successfully:', json);
      } else {
        console.log('Failed to Verify otp:', json);
      }
      return json;
    } catch (error) {
      console.error('Otp sent Failed:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity
        style={{backgroundColor: 'Black'}}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.heading}>Enter Your Security Code</Text>
      <Text style={styles.subHeading}>
        We sent a six-digit security code to {'\n'} {userEmail}
      </Text>

      <TextInput
        placeholder="Enter the Security Code"
        placeholderTextColor="#999"
        style={styles.input}
        value={otp}
        keyboardType='numeric'
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.button} onPress={handleOtp}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <Text style={styles.label}>
        Didn’t receive code?{' '}
        <TouchableOpacity>
          <Text style={{color: '#E4572E'}}>
            Resend
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default VerifyCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subHeading: {
    fontSize: 18,
    color: '#7D7D7D',
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#E4572E',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  label: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

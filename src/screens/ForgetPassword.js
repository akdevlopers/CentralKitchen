import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PasswordReset = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    const user = { email };
    console.log(user);
    try {
      const response = await fetch(
        'https://teachercanteen.akprojects.co/api/v1/kitchenpasswordreset',
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
        navigation.navigate('VerifyCode', { userEmail: email });
        console.log('Otp sent successfully:', json);
      } else {
        console.log('Failed to sent otp:', json);
      }
      return json;
    } catch (error) {
      console.error('Login Failed:', error.message);
    }
  };


  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity style={{ backgroundColor: 'Black' }} onPress={() => navigation.goBack()} >
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.heading}>Password Reset</Text>
      <Text style={styles.subHeading}>
        Enter the registered email to reset password
      </Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordReset;

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
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 30,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
  },
  button: {
    backgroundColor: '#E4572E',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  Icon: {

  },
});

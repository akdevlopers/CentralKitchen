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
  const [email, setEmail] = useState('');
  const route = useRoute();
  const { userEmail } = route.params;

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
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewPassword')}>
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

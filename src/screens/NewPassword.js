import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NewPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity
        style={{backgroundColor: 'Black'}}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {/* New Password */}
      <Text style={styles.heading}>Set New Password</Text>
      <Text style={styles.label}>New Password</Text>
      <TextInput
        placeholder="Enter New Password"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      {/* Confirm New Password */}
      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        placeholder="Enter Confirm Password"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.button} >
        <Text style={styles.buttonText}>Save Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewPassword;

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
  Icon: {},
});

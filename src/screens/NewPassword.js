import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import IconIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { BaseUrl } from '../API/Global';

const NewPassword = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const route = useRoute();
  const { json } = route.params;
  console.log(json.result)

  const handleUpdatePassword = async () => {
    const user = {
      password: newPassword,
      confirmpassword: confirmPassword,
      ids: json.result.empid
    };
    console.log(user, "otp check")
    try {
      const response = await fetch(
        `${BaseUrl}kitchenpasswordupdate`,
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
        setTimeout(() => {
          setShowModal(true);
        }, 400);
        setTimeout(() => {
          setShowModal(false);
          navigation.navigate('Login');
        }, 1000);
        console.log('Password Updated:', json);
      } else {
        setTimeout(() => {
          setErrorModal(true);
        }, 500);
      }
      return json;
    } catch (error) {
      console.error('Update Password Failed:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity
        style={{ backgroundColor: 'Black' }}
        onPress={() => navigation.goBack()}>
        <IconIcon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {/* New Password */}
      <Text style={styles.heading}>Set New Password</Text>
      <Text style={styles.label}>New Password</Text>
      <TextInput
        placeholder="Enter New Password"
        placeholderTextColor="#999"
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
      />
      {/* Confirm New Password */}
      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        placeholder="Enter Confirm Password"
        placeholderTextColor="#999"
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.button} onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Save Password</Text>
      </TouchableOpacity>

      {/* Successfull Model */}

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 25,
              borderRadius: 15,
              width: '80%',
              alignItems: 'center',
            }}>
            <View
              style={{
                marginBottom: 15,
              }}>
              <Icon name="check-circle" size={54} color="#2e7d32" />
            </View>

            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>
              Success
            </Text>
            <Text style={{ color: '#777', textAlign: 'center' }}>
              User Verified Successfully
            </Text>
          </View>
        </View>
      </Modal>

      {/* Incorect Modal  */}

      <Modal
        visible={errorModal}
        transparent
        animationType="fade"
        onRequestClose={() => setErrorModal(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 25,
              borderRadius: 15,
              width: '80%',
              alignItems: 'center',
            }}>
            <View
              style={{
                marginBottom: 15,
              }}>
              <Icon name="times-circle" size={54} color="#ff4757" />
            </View>

            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>
              Failed
            </Text>
            <Text style={{ color: '#777', textAlign: 'center' }}>
              Incorrect Email or Password
            </Text>
            <TouchableOpacity
              onPress={() => setErrorModal(false)}
              style={{
                marginTop: 20,
                backgroundColor: '#ff4757',
                paddingVertical: 10,
                paddingHorizontal: 25,
                borderRadius: 8,
              }}>
              <Text style={{ color: '#fff' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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

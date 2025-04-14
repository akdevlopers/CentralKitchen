import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const { height } = Dimensions.get('window');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const user = { email, password }
    setLoading(true);

    try {
      const response = await fetch('https://teachercanteen.akprojects.co/api/v1/kitchenlogin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (json.status) {
        await AsyncStorage.setItem("userToken", json.result.token);
        setTimeout(() => {
          setShowModal(true);
          setEmail('');
          setPassword('');
        }, 400);
        setTimeout(() => {
          setShowModal(false);
          navigation.navigate('Home', { user });
        }, 1000);
        console.log('Login Success:', json);
      } else {
        setTimeout(() => {
          setErrorModal(true);
        }, 500);
        console.log('Login Failed:', json);
      }
      return json;

    } catch (error) {
      console.error('Login Failed:', error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View
      style={{
        flex: 1,
        paddingTop: height * 0.2,
        padding: 20,
        backgroundColor: '#fff',
      }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#333' }}>
        Welcome back!
      </Text>
      <Text
        style={{
          fontSize: 28,
          color: '#333',
          marginBottom: 20,
          fontWeight: 'bold',
        }}>
        Glad to see you, Again!
      </Text>

      <Text style={{ marginBottom: 5, color: '#555' }}>Email</Text>
      <TextInput
        placeholder="Enter email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 12,
          marginBottom: 15,
          color: '#333',
          fontWeight: 'bold',
        }}
      />

      <Text style={{ marginBottom: 5, color: '#555' }}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 12,
          marginBottom: 15,
          color: '#333',
          fontWeight: 'bold',
        }}
      />

      <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#292D32',
          padding: 15,
          borderRadius: 8,
        }}>
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          Login
        </Text>
      </TouchableOpacity>

      {/* Login Successfull Model  */}

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

      {/* Incorect Credential Modal  */}

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

      {/* Loading Model */}

      {loading && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={true}
          onRequestClose={() => { }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.loaderBox}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Logging in...</Text>
            </View>
          </View>
        </Modal>
      )}

    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
  },
  forgotText: {
    alignSelf: 'flex-end',
    marginBottom: 30,
    color: '#aaa',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // loading\
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
});

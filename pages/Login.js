import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text, Image } from 'react-native';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate("Main");
    // Here you can implement your authentication logic
    if (username === 'user' && password === 'password') {
      Alert.alert('Login Successful', 'Welcome back!');
    } else {
      // Alert.alert('Login Failed', 'Invalid username or password. Please try again.');
    }
  };

  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Redirect to sign up screen.');
    navigation.navigate("Signup")
  };

  return (
    <View style={styles.container}>
      <Image
        style={{width: 200,
          height: 200,
          resizeMode: 'stretch',
        marginBottom: '10%'}}
        source={require('../logo.jpeg')}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#FFFFFF"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#FFFFFF"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} color="#121212" />
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#545353', // Background color
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212', // Box color
    borderRadius: 5,
    backgroundColor: '#121212', // Box color
    color: '#FFFFFF', // Text color
  },
  signUpText: {
    marginTop: 20,
    color: '#FFFFFF', // Text color
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;

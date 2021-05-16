import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Custom imports:
import logo from './assets/logo.png';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>Press the button below to share a photo from your phone with a friend!</Text>
      <Image source={logo} style={styles.logo} />
      <Image source={{ uri: "https://images.everydayhealth.com/images/diet-nutrition/how-many-calories-are-in-a-banana-1440x810.jpg?sfvrsn=be4504bc_0" }}
        style={styles.logo} />

      <TouchableOpacity
        onPress={() => alert('Select a photo!')}
        style={styles.buttonBg}>
        <Text style={styles.button}>Pick a photo</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  baseText: {
    color: '#7b6079',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    fontSize: 20,
    color: '#eec4c4'
  },
  buttonBg: {
    backgroundColor: '#7b6079',
    padding: 20,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#eec4c4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 159,
    margin: 20,
    borderRadius: 5,
  }
});

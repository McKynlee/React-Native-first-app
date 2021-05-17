import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';
import * as SplashScreen from 'expo-splash-screen';

// Custom imports:
import logo from './assets/logo.png';

// Keep Splash screen on page for 5 seconds when app loads:
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);


export default function App() {
  // Local state to capture user's selected image
  const [selectedImage, setSelectedImage] = React.useState(null);

  // Use Expo image picker to open user's local photos on phone when button is pressed
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    // If no image selected then stop running this function
    if (pickerResult.cancelled === true) {
      return;
    }

    // If an image is selected, capture the uri in local state
    // Account for Chrome not being supported by Expo to share files, and send URI instead
    if (Platform.OS === 'web') {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    }
  }


  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  // Display selected image:
  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.buttonBg}>
          <Text style={styles.button}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>Press the button below to share a photo from your phone with a friend!</Text>
      <Image source={logo} style={styles.logo} />
      <Image source={{ uri: "https://images.everydayhealth.com/images/diet-nutrition/how-many-calories-are-in-a-banana-1440x810.jpg?sfvrsn=be4504bc_0" }}
        style={styles.logo} />

      <TouchableOpacity
        onPress={openImagePickerAsync}
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
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    borderRadius: 5,
  }
});

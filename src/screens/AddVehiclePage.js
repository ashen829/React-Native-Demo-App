import React, { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddVehiclePage = () => {
  const [photo, setPhoto] = useState(null);
  const [regNo, setRegNo] = useState('');

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'image', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error:', response.errorMessage);
      } else {
        setPhoto(response.assets[0]);
      }
    });
  };

  const takePhoto = () => {
    launchCamera({ mediaType: 'image', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera error:', response.errorMessage);
      } else {
        setPhoto(response.assets[0]);
      }
    });
  };

  const saveVehicle = async () => {
    if (!regNo.trim()) {
      Alert.alert('Validation', 'Please enter a registration number');
      return;
    }

    if (!photo) {
      Alert.alert('Validation', 'Please select or take a photo');
      return;
    }

    const formData = new FormData();
    formData.append('regNo', regNo);
    formData.append('image', {
      uri: photo.uri,
      type: photo.type || 'image/jpeg',
      name: photo.fileName || 'photo.jpg',
    });

    try {
      const response = await fetch('http://172.236.136.110:8080/api/vehicles/save/newVehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Success', 'Vehicle saved successfully!');
        setRegNo('');
        setPhoto(null);
      } else {
        const errorText = await response.text();
        Alert.alert('Error', `Failed to save vehicle: ${errorText}`);
      }
    } catch (error) {
      Alert.alert('Error', `Network error: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Add New Vehicle</Text>

        <Text style={styles.label}>Registration Number</Text>
        <TextInput
          placeholder="e.g., CAD-6005"
          value={regNo}
          onChangeText={setRegNo}
          style={styles.input}
        />

        <Text style={styles.label}>Vehicle Image</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Select from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
        </View>

        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={styles.previewImage}
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={saveVehicle}>
          <Text style={styles.saveButtonText}>Save Vehicle</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  inner: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
    marginVertical: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  previewImage: {
    width: 250,
    height: 200,
    marginVertical: 16,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddVehiclePage;

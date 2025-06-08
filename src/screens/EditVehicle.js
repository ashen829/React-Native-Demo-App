import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';

const EditVehicle = ({ route, navigation }) => {
  const { id, regNo } = route.params;
  const [newRegNo, setNewRegNo] = useState(regNo);
  const [image, setImage] = useState(null);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", response.errorMessage || "Image selection failed");
        return;
      }
      const asset = response.assets[0];
      setImage(asset);
    });
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("regNo", newRegNo);
    if (image) {
      formData.append("image", {
        uri: image.uri,
        type: image.type,
        name: image.fileName || "vehicle.jpg",
      });
    }

    try {
      const response = await fetch(`http://172.236.136.110:8080/api/vehicles/update/newVehicle/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const json = await response.json();
      if (json.status) {
        Alert.alert("Success", "Vehicle updated successfully");
        navigation.goBack();
      } else {
        Alert.alert("Failed", "Failed to update vehicle");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "An error occurred during update");
    }
  };

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("regNo", regNo);

    try {
      const response = await fetch(`http://172.236.136.110:8080/api/vehicles/delete/newVehicle`, {
        method: "DELETE",
        body: formData,
      });

      const json = await response.json();
      if (json.status) {
        Alert.alert("Deleted", "Vehicle deleted successfully");
        navigation.popToTop();
      } else {
        Alert.alert("Failed", "Failed to delete vehicle");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "An error occurred during deletion");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Registration Number:</Text>
      <TextInput
        style={styles.input}
        value={newRegNo}
        onChangeText={setNewRegNo}
      />

      <Button title="Choose Image" onPress={handleSelectImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.previewImage}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Update" onPress={handleUpdate} />
        <Button title="Delete" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  previewImage: {
    width: 200,
    height: 120,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
});

export default EditVehicle;

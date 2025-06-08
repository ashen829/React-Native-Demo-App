import React, { useEffect, useState } from "react";
import { Text, View, Image, ActivityIndicator, StyleSheet, Button } from "react-native";

const ViewVehicle = ({ route, navigation }) => {
  const { id } = route.params;
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://172.236.136.110:8080/api/vehicles/get/newVehicle/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status) setVehicle(json.data);
      })
      .catch((err) => console.error("Error fetching vehicle:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading vehicle...</Text>
      </View>
    );
  }

  if (!vehicle) {
    return (
      <View style={styles.center}>
        <Text>Vehicle not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {vehicle.image && <Image source={{ uri: vehicle.image }} style={styles.image} />}
      <Text style={styles.title}>Registration No: {vehicle.regNo}</Text>

      {/* Edit Button */}
      <View style={styles.buttonWrapper}>
        <Button
          title="Edit Vehicle"
          onPress={() => navigation.navigate('Edit Vehicle', { id, regNo: vehicle.regNo })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonWrapper: {
    marginTop: 30,
    width: '80%',
  },
});

export default ViewVehicle;

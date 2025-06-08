import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const VehicleCard = ({ id, regNo, image, navigation }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('View Vehicle', { id })}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.text}>{regNo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    height: 150,
    width: '100%',
  },
  text: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VehicleCard;

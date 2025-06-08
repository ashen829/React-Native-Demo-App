import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const HomePage = ({ navigation }) => {
  console.log('HomePage rendered!');
  return (
    <ImageBackground
      source={require('../assets/homepage-background.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to the Vehicle App</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Add Vehicle')}
          >
            <Text style={styles.buttonText}>➕ Add Vehicle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Search Vehicle')}
          >
            <Text style={styles.buttonText}>🔍 Search Vehicle</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffffffcc',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
});

export default HomePage;

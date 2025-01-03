import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Onboarding = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('/login'); // Navigate to the login screen
  };

  return (
    <View style={styles.container}>
      <Image
  source={require('../assets/images/airline2.png')} // Adjust the path based on the file structure
  style={styles.image}
  resizeMode="contain"
/>
      <Text style={styles.title}>Explore The Beautiful World!</Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007BFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  skipText: {
    color: '#777',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Onboarding;

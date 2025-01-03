// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { useLocalSearchParams } from "expo-router";

// const Home = () => {
//   const { username } = useLocalSearchParams(); // Read passed params

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome, {username || "Guest"}!</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 24, fontWeight: "bold" },
// });

// export default Home;


import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const Onboarding = () => {
    const { username } = useLocalSearchParams();
  const router = useRouter();

  const handleNext = () => {
    router.push('/login'); // Navigate to the login screen
  };

  return (
    <View style={styles.container}>
      <Image
  source={require('../assets/images/airplane.png')} // Adjust the path based on the file structure
  style={styles.image}
  resizeMode="contain"
/>
      <Text style={styles.title}>Welcome, {username || "Guest"}!</Text>
      <View style={styles.footer}>
      <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/airlines")}>
        <Text style={styles.nextText}>Airplane Information</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/flightList")}>
        <Text style={styles.nextText}>Airplane Schedule</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.icon} />
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
    flexDirection: 'column',
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
    color: '#000',
    fontSize: 16,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#777',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  },
});

export default Onboarding;

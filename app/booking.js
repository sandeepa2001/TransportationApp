// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location'; // For location access
// import axios from 'axios';

// const BookingScreen = () => {
//   const [pickup, setPickup] = useState('');
//   const [destination, setDestination] = useState('');
//   const [region, setRegion] = useState(null);
//   const [userLocation, setUserLocation] = useState(null); // Store user's location

//   // Fetch user location on load
//   useEffect(() => {
//     const getLocation = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Permission to access location was denied');
//         return;
//       }
//       const location = await Location.getCurrentPositionAsync({});
//       setUserLocation(location.coords);
//       setRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       });
//     };

//     getLocation();
//   }, []);

//   const handleBooking = async () => {
//     try {
//       // Make a POST request to JSONPlaceholder
//       const response = await axios.post(
//         'https://jsonplaceholder.typicode.com/posts',  // URL to post data
//         {
//           title: pickup,  // Simulating 'pickup' as the 'title' field
//           body: destination, // Simulating 'destination' as the 'body' field
//           userId: 1, // Static userId to mimic booking data
//         }
//       );
//       alert(`Ride booked! Your booking ID is: ${response.data.id}`); // Shows ID of the booking
//     } catch (error) {
//       alert('Failed to book ride!');
//     }
//   };
  

//   return (
//     <View style={styles.container}>
//       {region ? (
//         <MapView
//           style={styles.map}
//           region={region}
//           onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
//         >
//           {userLocation && (
//             <Marker
//               coordinate={userLocation}
//               title="Your Location"
//               description="This is your current location"
//             />
//           )}

//           {/* Sri Lanka Location - Colombo */}
//           <Marker
//             coordinate={{ latitude: 6.9271, longitude: 79.8612 }} // Coordinates for Colombo, Sri Lanka
//             title="Colombo"
//             description="Capital city of Sri Lanka"
//           />
//         </MapView>
//       ) : (
//         <Text>Loading map...</Text>
//       )}

//       <View style={styles.form}>
//         <Text>Pickup Location</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Pickup Location"
//           value={pickup}
//           onChangeText={setPickup}
//         />
//         <Text>Destination</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Destination"
//           value={destination}
//           onChangeText={setDestination}
//         />
//         <Button title="Book Ride" onPress={handleBooking} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 0.7,
//   },
//   form: {
//     flex: 0.3,
//     padding: 10,
//   },
//   input: {
//     borderWidth: 1,
//     padding: 8,
//     marginVertical: 10,
//     borderRadius: 5,
//     borderColor: '#ccc',
//   },
// });

// export default BookingScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key

const BookingScreen = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    const getUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    getUserLocation();
  }, []);

  // Fetch directions between pickup and destination
  const getDirections = async (pickup, destination) => {
    const origin = `${userLocation.latitude},${userLocation.longitude}`;
    const destinationLatLon = `${destination.lat},${destination.lon}`;
    
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destinationLatLon}&key=${GOOGLE_MAPS_API_KEY}`;
    
    try {
      const response = await axios.get(url);
      const data = response.data.routes[0].legs[0];
      
      const points = data.steps.map(step => {
        return {
          latitude: step.end_location.lat,
          longitude: step.end_location.lng,
        };
      });
      
      setDirections(points);
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch directions');
    }
  };

  const handleBooking = async () => {
    if (!pickup || !destination) {
      Alert.alert('Error', 'Please provide pickup and destination locations');
      return;
    }

    Alert.alert('Ride booked!', `Pickup: ${pickup}, Destination: ${destination}`);
    // You can replace this with an API call to book the ride
  };

  return (
    <View style={styles.container}>
      {region ? (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation
        >
          {userLocation && (
            <Marker coordinate={userLocation} title="Your Location" description="Current location" />
          )}
          {directions.length > 0 && (
            <Polyline coordinates={directions} strokeColor="blue" strokeWidth={4} />
          )}
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}

      <View style={styles.form}>
        <Text>Pickup Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Pickup Location"
          value={pickup}
          onChangeText={setPickup}
        />
        <Text>Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Destination"
          value={destination}
          onChangeText={setDestination}
        />
        <Button title="Get Directions" onPress={() => getDirections(pickup, destination)} />
        <Button title="Book Ride" onPress={handleBooking} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 0.7,
  },
  form: {
    flex: 0.3,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
});

export default BookingScreen;

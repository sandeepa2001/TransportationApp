import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCount } from '../context/CountContext'; // Import useCount hook to access count state

const Airlines = () => {
  const router = useRouter();
  const { count, incrementCount } = useCount(); // Extract count and function to update it
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the airline data from an external API
  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await axios.get(
          'https://api.aviationstack.com/v1/airlines',
          {
            params: { access_key: '0edfbbd99f2b73f8cbd782d022825214' }, // Replace with your API key
          }
        );
        setAirlines(response.data.data || []);
      } catch (error) {
        console.error('Error fetching airlines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAirlines();
  }, []);

  // Render each airline item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => incrementCount()} // Increment count when airline item is clicked
    >
      <Image
        source={{ uri: `https://flagsapi.com/${item.country_iso2}/flat/64.png` }}
        style={styles.flag}
      />
      <View style={styles.textContainer}>
        <Text style={styles.airlineName}>
          {item.airline_name || 'Unknown Airline'}
        </Text>
        <Text style={styles.countryName}>
          {item.country_name || 'Unknown Country'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top bar with back icon */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Flight Information</Text>
        <View style={{ width: 30 }} /> {/* Placeholder for alignment */}
      </View>
      <FlatList
        data={airlines}
        keyExtractor={(item) => item.airline_id?.toString() || `key-${Math.random()}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      {/* Floating Button to show the click count */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity style={styles.floatingButton}>
          <Text style={styles.floatingButtonText}>{count}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 16,
    paddingTop: 50,
  },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContainer: { padding: 10 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  flag: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  textContainer: { justifyContent: 'center' },
  airlineName: { fontSize: 16, fontWeight: 'bold' },
  countryName: { fontSize: 14, color: '#666' },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 1,
  },
  floatingButton: {
    backgroundColor: '#ff6347',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Airlines;

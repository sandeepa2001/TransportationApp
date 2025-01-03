import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import axios from "axios";
import { useRouter } from 'expo-router';
import Ionicons from "react-native-vector-icons/Ionicons";

const FlightInfoApp = () => {
  const router = useRouter();
  const [response, setResponse] = useState([]); // For storing API response data
  const [loading, setLoading] = useState(false); // For loading state

  // Convert time to 12-hour clock
  const formatTo12HourClock = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Calculate flight duration
  const calculateFlightDuration = (departureScheduled, arrivalScheduled) => {
    const departureTime = new Date(departureScheduled);
    const arrivalTime = new Date(arrivalScheduled);

    const durationInMilliseconds = arrivalTime - departureTime;

    const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours} hours ${minutes} minutes`;
  };

  // Fetch flight data from AviationStack API
  const fetchFlights = async () => {
    const apiKey = "0edfbbd99f2b73f8cbd782d022825214"; // Replace with your API key
    const url = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}`;

    try {
      setLoading(true);
      const response = await axios.get(url);
      setResponse(response.data.data || []); // Safely access 'data' key
    } catch (error) {
      console.error("Error fetching flight data:", error);
      setResponse([]); // Set empty array if an error occurs
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch flight data on component mount
  useEffect(() => {
    fetchFlights();
  }, []); // Empty dependency array means this will run once when the component mounts

  // Render each flight card
  const renderFlight = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.airportCode}>{item.departure.iata || "N/A"}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.flightIcon}>----✈️----</Text>
          <Text style={styles.duration}>
            {calculateFlightDuration(item.departure.scheduled, item.arrival.scheduled)}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.airportCode}>{item.arrival.iata || "N/A"}</Text>
        </View>
      </View>
      <View style={styles.timeSection}>
        <View>
          <Text style={styles.time}>
            {formatTo12HourClock(item.departure.scheduled || new Date())}
          </Text>
        </View>
        <View style={styles.rightAlign}>
          <Text style={styles.time}>
            {formatTo12HourClock(item.arrival.scheduled || new Date())}
          </Text>
        </View>
      </View>

      <Text style={styles.flightDetails}>Departure: {item.departure.airport || "N/A"}</Text>
      <Text style={styles.flightDetails}>Arrival: {item.arrival.airport || "N/A"}</Text>

      <View style={styles.footer}>
        <Text style={styles.flightDetails}>Airline: {item.airline.name || "N/A"}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top bar with back icon */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push("/home")}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Airplane Schedule</Text>
        <View style={{ width: 30 }} /> {/* Placeholder for alignment */}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={response}
          renderItem={renderFlight}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
      {/* Footer with home icon */}
      {/* <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => router.push("/airlines")}>
          <Ionicons name="home" size={30} color="#fff" style={styles.footerIcon} />
        </TouchableOpacity>
      </View> */}
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
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  airportCode: {
    fontSize: 18,
    fontWeight: "bold",
  },
  flightIcon: {
    fontSize: 18,
  },
  duration: {
    fontSize: 14,
    color: "gray",
    marginBottom: 4,
  },
  timeSection: {
    marginTop: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  time: {
    fontSize: 14,
    color: "#333",
  },
  flightDetails: {
    fontSize: 14,
    color: "gray",
  },
  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerContainer: {
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
    alignItems: "center",
  }
});

export default FlightInfoApp;

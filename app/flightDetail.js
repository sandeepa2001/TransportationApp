import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const FlightCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.airportCode}>LGA</Text>
        <Text style={styles.flightTime}>23:00 hours</Text>
        <Text style={styles.airportCode}>DAD</Text>
      </View>

      <View style={styles.body}>
        <View>
          <Text style={styles.time}>8:00 AM</Text>
          <Text style={styles.date}>August 28, 2021</Text>
        </View>
        <View>
          <Text style={styles.time}>7:00 AM</Text>
          <Text style={styles.date}>August 29, 2021</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Image
          style={styles.logo}
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Qatar_Airways_Logo.png" }} // Example logo
        />
        <Text style={styles.price}>$340</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    margin: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  airportCode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  flightTime: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#777",
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 20,
    resizeMode: "contain",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});

export default FlightCard;

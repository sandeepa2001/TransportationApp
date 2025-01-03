import React from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useCount } from "../context/CountContext";

const HomeScreen = () => {
  const { count, setCount } = useCount();

  const data = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

  const handleItemPress = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <View style={styles.container}>
      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={handleItemPress}>
            <Text style={styles.listItemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Floating Button */}
      <View style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{count}</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listItemText: {
    fontSize: 18,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#ff5722",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  floatingButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

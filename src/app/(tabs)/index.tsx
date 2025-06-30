import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { LegendList } from "@legendapp/list";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const timeClock = () => {
  console.log("Time clock action triggered");
  router.push("/pages");
};

const items = [
  {
    id: "1",
    title: "Item 1",
    description: "Gradient Time of Day",
    action: timeClock,
  },
  { id: "2", title: "Item 2", description: "Description 2" },
  { id: "3", title: "Item 3", description: "Description 3" },
];

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <Text style={styles.text}>Home</Text>
        <LegendList
          data={items}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={item.action}
              style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
            >
              <Text style={styles.text2}>{item.title}</Text>
              <Text style={styles.text2}>{item.description}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          recycleItems
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
  text2: {
    fontSize: 16,
    color: "red",
    marginVertical: 5,
  },
});

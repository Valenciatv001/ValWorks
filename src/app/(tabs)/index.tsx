import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { LegendList } from "@legendapp/list";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const items = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
];

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.text}>Home</Text>
        <LegendList
          data={items}
          renderItem={({ item }) => (
            <Text style={styles.text2}>{item.title}</Text>
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
    justifyContent: "center",
    alignItems: "center",
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

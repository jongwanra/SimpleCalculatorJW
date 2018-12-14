import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperView} />
        <View style={styles.lowerView} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  upperView: {
    flex: 34,
    backgroundColor: "red"
  },

  lowerView: {
    flex: 64,
    backgroundColor: "yellow"
  }
});

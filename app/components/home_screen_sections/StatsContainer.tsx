import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import TopContainer from "./TopContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { dataSlice } from "../../redux/slices/data";
import { colorPalette } from "../../util/consts/colorPalette";

export default function AgeDisplay() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);

  function colorMap(stat: number) {
    if (stat >= 50) {
      return "rgb(67, 232, 2)";
    } else if (50 > stat && stat >= 20) {
      return "rgb(252, 226, 48)";
    } else if (stat < 20) {
      return "red";
    }
  }

  const styles = StyleSheet.create({
    container: {
      width: 185,
      height: 200,
      position: "absolute",
      right: 30,
      top: 150,
      backgroundColor: "#f5f5f5",
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 2 },
      shadowRadius: 10,
      shadowOpacity: 0.9,
      elevation: 10,
      borderRadius: 15,
    },
    content: {
      flexDirection: "column",
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
    },
    text: {
      fontSize: 15,
      paddingTop: 5,
      paddingBottom: 5,
      fontWeight: "500",
      color: colorPalette.primaryColor,
    },
    bar: {
      height: 15,
      backgroundColor: "blue",
    },
    happiness: {
      width: `${data.happiness}%`,
      backgroundColor: colorMap(data.happiness),
    },
    health: {
      width: `${data.health}%`,
      backgroundColor: colorMap(data.health),
    },
    looks: {
      width: `${data.looks}%`,
      backgroundColor: colorMap(data.looks),
    },
    smarts: {
      width: `${data.intelligence}%`,
      backgroundColor: colorMap(data.intelligence),
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Happiness: {data.happiness}%</Text>
        <View style={[styles.bar, styles.happiness]}></View>
        <Text style={styles.text}>Health: {data.health}%</Text>
        <View style={[styles.bar, styles.health]}></View>
        <Text style={styles.text}>Looks: {data.looks}%</Text>
        <View style={[styles.bar, styles.looks]}></View>
        <Text style={styles.text}>Smarts: {data.intelligence}%</Text>
        <View style={[styles.bar, styles.smarts]}></View>
      </View>
    </SafeAreaView>
  );
}

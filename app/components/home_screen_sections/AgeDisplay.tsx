import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addMessage, incrementAge } from "../../redux/slices/data";
import { colorPalette } from "../../util/consts/colorPalette";

export default function AgeDisplay() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);

  function handleIncrement() {
    dispatch(incrementAge(1));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>{data.age}</Text>
        <Text style={styles.subText}>years old</Text>
        <Text onPress={handleIncrement} style={styles.increment}>
          +
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    position: "absolute",
    left: 30,
    top: 150,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 20,
    shadowOpacity: 0.9,
    elevation: 10,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    color: colorPalette.primaryColor,
  },
  subText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colorPalette.primaryColor,
  },
  increment: {
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: colorPalette.primaryColor,
  },
});

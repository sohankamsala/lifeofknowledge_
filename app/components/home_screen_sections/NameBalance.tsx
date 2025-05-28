import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { StyleSheet } from "react-native";

export default function NameBalance() {
  const data = useSelector((state: RootState) => state.data);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {data.name[0]} {data.name[1]}
      </Text>
      <Text style={styles.text}>Bank Balance:</Text>
      <Text style={styles.text}>${data.money.toFixed(2)}</Text>
    </View>
  );
}

const AGE_DISPLAY_WIDTH = 120; 
const NAME_BALANCE_WIDTH = 180; 

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 295,
    left: 30 + AGE_DISPLAY_WIDTH / 2 - NAME_BALANCE_WIDTH / 2,
    width: NAME_BALANCE_WIDTH,
    alignItems: "center", 
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    color: "white"
  },
});

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colorPalette } from "../../util/consts/colorPalette";

type GenericButtonProps = {
  onPress: () => void;
  text: string;
  style?: object;
};

function GenericButton({ onPress, text, style }: GenericButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colorPalette.secondaryColor,
    padding: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginTop: 40,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colorPalette.textColor,
  },
});

export default GenericButton;

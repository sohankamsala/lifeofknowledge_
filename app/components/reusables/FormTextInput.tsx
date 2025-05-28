import { colorPalette } from "../../util/consts/colorPalette";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";

interface FormTextInputProps {
  initialValue?: string;
  placeholder: string;
  setValue: (text: string) => void;
  label: string;
  isRequired?: boolean;
  isPassword?: boolean;
}

export const FormTextInput: React.FC<FormTextInputProps> = (props) => {
  const initialValue = props.initialValue ?? "";

  return (
    <View style={styles.inputContainer}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.inputLabel}>{props.label}</Text>
        {props.isRequired && (
          <Text style={{ color: "red", fontSize: 20 }}>*</Text>
        )}
      </View>
      <TextInput
        style={styles.input}
        onChangeText={props.setValue}
        value={initialValue}
        placeholder={props.placeholder}
        secureTextEntry={props.isPassword}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginTop: 24,
  },
  inputLabel: {
    color: colorPalette.textColor,
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: colorPalette.borderColor,
    borderRadius: 10,
    backgroundColor: colorPalette.inputBackground,
    fontSize: 16,
    color: colorPalette.primaryColor,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
});

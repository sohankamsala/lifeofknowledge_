import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMajor } from "@/app/redux/slices/data";
import { setPopupState } from "@/app/redux/slices/popups";
import { RootState } from "@/app/redux/store";
import CustomDropdown from "../../CustomDropdown";

const majors = [
  { label: "Not go to college", value: "no_college", color: "red" },
  {
    label: "Computer Science",
    value: "computer_science",
    icon: require("@/assets/images/react-logo.png"),
  },
  { label: "Business Administration", value: "business" },
  { label: "Engineering", value: "engineering" },
  { label: "Psychology", value: "psychology" },
  { label: "Biology", value: "biology" },
  { label: "Economics", value: "economics" },
  { label: "English Literature", value: "english" },
  { label: "Political Science", value: "political_science" },
  { label: "Mathematics", value: "mathematics" },
  { label: "Chemistry", value: "chemistry" },
];

function Major() {
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);

  function handleMajorSelection() {
    if (selected) {
      const selectedMajor = majors.find((major) => major.value === selected);
      if (selectedMajor) {
        const message =
          selectedMajor.value === "no_college"
            ? "You've decided not to go to college."
            : `You've chosen to major in ${selectedMajor.label}.`;

        dispatch(
          addMessage({
            text: message,
            year: data.age,
            popup: true,
          })
        );
      }

      dispatch(setMajor(selectedMajor))
    }
  }

  const renderOption = (item: any) => (
    <View style={styles.optionContainer}>
      {item.icon && <Image source={item.icon} style={styles.icon} />}
      <Text style={[styles.optionText, item.color && { color: item.color }]}>
        {item.label}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Path</Text>
      <Text style={styles.subtitle}>
        Will you go to college? If so, what would you like to study?
      </Text>
      <CustomDropdown
        data={majors}
        value={selected}
        onChange={(item: any) => setSelected(item.value)}
        placeholder="Select an option"
        searchPlaceholder="Search options..."
      />
      {selected && (
        <TouchableOpacity onPress={handleMajorSelection} style={styles.button}>
          <Text style={styles.buttonText}>Confirm Choice</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  button: {
    marginTop: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default Major;

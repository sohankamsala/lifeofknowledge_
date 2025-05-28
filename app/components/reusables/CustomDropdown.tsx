import React from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface CustomDropdownProps {
  data: { label: string; value: string }[];
  placeholder?: string;
  searchPlaceholder?: string;
  value: string;
  onChange: (item: { label: string; value: string }) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  data,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  value,
  onChange,
}) => {
  return (
    <Dropdown
      data={data}
      labelField="label"
      valueField="value"
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      search
      maxHeight={300}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      value={value}
      onChange={onChange}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: 200,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default CustomDropdown;

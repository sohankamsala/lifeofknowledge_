import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import StatsContainer from "../components/home_screen_sections/StatsContainer";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TopContainer from "../components/home_screen_sections/TopContainer";
import AgeDisplay from "../components/home_screen_sections/AgeDisplay";
import NameBalance from "../components/home_screen_sections/NameBalance";
import Storyline from "../components/home_screen_sections/Storyline";
import BottomContainer from "../components/home_screen_sections/BottomContainer";
import Popup from "../components/reusables/Popup";
import Checks from "../checks/Checks";
import { colorPalette } from "../util/consts/colorPalette";

export default function HomeScreen() {
  const data = useSelector((state: RootState) => state.data);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <View style={styles.container}>
      <TopContainer />
      <StatsContainer />
      <AgeDisplay />
      <NameBalance />
      <Storyline />
      <BottomContainer />
      <Checks />
      <Popup />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.primaryColor,
  },
  signOutButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  signOutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

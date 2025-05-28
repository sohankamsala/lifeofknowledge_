import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import jobsList, { Job } from "../util/consts/jobsList";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TopContainer from "../components/home_screen_sections/TopContainer";
import Popup from "../components/reusables/Popup";
import QuestionsPopup from "../components/reusables/QuestionsPopup";
import { Activity } from "./Activities";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setPopupState } from "../redux/slices/popups";
import { colorPalette } from "../util/consts/colorPalette";
function Jobs() {
  const navigation = useNavigation();
  const gameData = useSelector((state: RootState) => state.data);
  const popupsData = useSelector((state: RootState) => state.popups);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  function handleApply(job: Job) {
    dispatch(
      setPopupState({ whichPopup: "jobapplication", open: true, job: job })
    );
  }

  function renderActivity(item: Job) {
    return (
      <TouchableOpacity style={styles.activityItem}>
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>
            {item.salary.toLocaleString()}$ per year
          </Text>
        </View>
        <TouchableOpacity
          style={styles.apply}
          onPress={() => {
            handleApply(item);
          }}
        >
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <TopContainer />
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>
          Jobs{" "}
          {gameData.career.major?.value != null && "no_college" && undefined
            ? "in " + gameData.career.major?.label
            : ""}
        </Text>
        <FlatList
          data={jobsList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderActivity(item)}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
      <QuestionsPopup />
      <Popup />
    </>
  );
}

export default Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.primaryColor,
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    padding: 15,
    textAlign: "center",
    color: "white",
    marginTop: 50
  },
  list: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colorPalette.primaryColor,
  },
  subtitle: {
    fontSize: 14,
    color: colorPalette.placeholderColor,
  },
  apply: {
    height: 30,
    width: 70,
    backgroundColor: colorPalette.primaryColor,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
  },
  applyText: {
    color: colorPalette.textColor,
    textAlign: "center",
  },
});

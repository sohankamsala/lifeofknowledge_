import React, { useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TopContainer from "../components/home_screen_sections/TopContainer";
import { StyleSheet } from "react-native";
import { colorPalette } from "../util/consts/colorPalette";
import { useNavigation } from "expo-router";
import { Job } from "../util/consts/jobsList";

export default function ProgressTracking() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const data = useSelector((state: RootState) => state.data);
  const popupData = useSelector((state: RootState) => state.popups)

  function diseaseString() {
    if (data.diseases.toString() == "") {
        return "None"
    } else {    
        return data.diseases.map((disease) => disease.name).join(", ");
    }
  }

  function jobString() {
    if (data.diseases.toString() == "") {
        return "None"
    } else{
        return data.career.jobs.map((job: Job) => job.name).join(", ")
    }
  }

  return (
    <>
      <TopContainer />
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Progress Tracking</Text>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Performance</Text>
          <View style={styles.progressItem}>
            <Text style={styles.label}>Accuracy:</Text>
            <Text style={styles.value}>{data.progress.accuracy}%</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.label}>Questions Answered:</Text>
            <Text style={styles.value}>{data.progress.questionsAnswered}</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.label}>Difficulty:</Text>
            <Text style={styles.value}>{popupData.questionsPopup.difficulty}</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.label}>Subjects:</Text>
            <Text style={styles.value}>{popupData.questionsPopup.subjects}</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.label}>Theme:</Text>
            <Text style={styles.value}>{popupData.questionsPopup.specifications}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Life Stats</Text>
          <View style={styles.progressItem}>
            <Text style={styles.label}>Diseases:</Text>
            <Text style={styles.value}>{diseaseString()}</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.label}>Job:</Text>
            <Text style={styles.value}>{jobString()}</Text>
          </View>
          <View style={styles.progressItem}>
            <Text style={styles.label}>Current Salary:</Text>
            <Text style={styles.value}>${data.career.salary.toLocaleString()}</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    padding: 15,
    textAlign: "center",
    color: "white",
    marginTop: 50,
  },
  section: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 3,
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: colorPalette.primaryColor,
    marginBottom: 10,
  },
  progressItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: colorPalette.primaryColor,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: colorPalette.secondaryColor,
  },
});

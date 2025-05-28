import React, { act, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { setPopupState } from "../redux/slices/popups";
import TopContainer from "../components/home_screen_sections/TopContainer";
import Popup from "../components/reusables/Popup";
import QuestionsPopup from "../components/reusables/QuestionsPopup";
import Gym from "../components/reusables/popups/self/Gym";
import { colorPalette } from "../util/consts/colorPalette";

export interface Activity {
  title: string;
  subtitle: string;
  relationship: boolean;
}

export default function Activities() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [whichPopup, setWhichPopup] = useState("");

  const params = useLocalSearchParams();
  const { relationshipName, activities: activitiesJson } = params;
  const activities: Activity[] = JSON.parse(activitiesJson as string);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    // dispatch(closeAll());
  }, []);

  function handleSelect(activity: Activity) {
    if (activity.relationship) {
      dispatch(
        setPopupState({
          whichPopup: activity.title.toLowerCase(),
          open: true,
          relationshipName: relationshipName.toString().split(" ") as [
            string,
            string
          ],
        })
      );
    } else {
      dispatch(
        setPopupState({ whichPopup: activity.title.toLowerCase(), open: true })
      );
    }
  }

  const renderActivity = (item: Activity) => (
    <TouchableOpacity
      onPress={() => {
        handleSelect(item);
      }}
      style={styles.activityItem}
    >
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <TopContainer />
      <SafeAreaView style={styles.container}>
        {relationshipName ? (
          <Text style={styles.header}>Activities with {relationshipName}</Text>
        ) : (
          <Text style={styles.header}>Activities</Text>
        )}
        <FlatList
          data={activities}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.primaryColor,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    padding: 15,
    textAlign: "center",
    color: "white",
    zIndex: 1000,
    marginTop: 60,
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
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
});

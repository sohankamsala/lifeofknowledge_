import { colorPalette } from "../../util/consts/colorPalette";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GenericButton from "../reusables/GenericButton";
import { router } from "expo-router";
import { getUser } from "@/functions/http_triggers/getUser";
import { updateGameState } from "@/functions/http_triggers/updateGameState";
import { updatePopupState } from "@/functions/http_triggers/updatePopupState";
import { RootState } from "@/app/redux/store";

export default function Storyline() {
  const messages = useSelector((state: any) => state.data.messages);

  const profileData = useSelector((state: RootState) => state.userProfile);
   const gameData = useSelector((state: RootState) => state.data);
   const popupsData = useSelector((state: RootState) => state.popups);

  const dispatch = useDispatch();
  const scrollViewRef = useRef<ScrollView>(null);

  async function handleSignout() {
    router.replace("/screens/Login");

    console.log("called signout");
    const user = await getUser(profileData.username);
    if (user) {
      console.log("found user");
      updateGameState(user, gameData);
      updatePopupState(user, popupsData);
    }

    router.replace("/");
  }

  const groupedMessages: Record<string, string[]> = messages.reduce(
    (
      acc: Record<string, string[]>,
      message: { year: number; text: string }
    ) => {
      const yearKey = message.year.toString();
      acc[yearKey] = acc[yearKey] || [];
      acc[yearKey].push(message.text);
      return acc;
    },
    {}
  );

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.shadowContainer}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {Object.entries(groupedMessages).map(([year, texts]) => (
          <View key={year} style={styles.yearGroup}>
            <Text style={styles.yearHeader}>Year {year}:</Text>
            {texts.map((text, index) => (
              <Text key={index} style={styles.text}>
                {text}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
      <GenericButton
        style={styles.signOut}
        text={"Sign Out"}
        onPress={handleSignout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  signOut: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "red",
  },
  shadowContainer: {
    position: "absolute",
    top: 385,
    left: "5%",
    width: "90%",
    height: 280,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    borderRadius: 15,
    padding: 15,
  },
  contentContainer: {
    paddingBottom: 15,
  },
  yearGroup: {
    marginBottom: 15,
  },
  text: {
    fontSize: 12,
    color: colorPalette.primaryColor,
  },
  yearHeader: {
    fontSize: 23,
    marginBottom: 5,
    color: colorPalette.primaryColor,
  },
});

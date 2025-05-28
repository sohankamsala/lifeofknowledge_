import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { StyleSheet } from "react-native";
import { AzureOpenAI } from "openai";
import { RootState } from "../../../../redux/store";
import secrets from "../../../../../secrets";
import { useRouter } from "expo-router";
import { resetGame } from "@/app/redux/slices/data";
import { resetPopupsState, setSection } from "../../../../redux/slices/popups";
import { Section } from "../../../../screens/Signup";

function Death() {
  const gameData = useSelector((state: RootState) => state.data);
  const popupData = useSelector((state: RootState) => state.popups);
  const [quote, setQuote] = useState("Generating quote...");
  const router = useRouter();
  const dispatch = useDispatch();

  const ref = useRef<ViewShot>(null);

  function diseaseString() {
    return gameData.diseases.map((disease) => disease.name).join(", ");
  }

  function handleNewLife() {
    dispatch(resetGame());
    dispatch(resetPopupsState());
    dispatch(setSection(Section.NEWLIFE));
    router.replace("/screens/Signup");
  }

  async function generateQuote() {
    const client = new AzureOpenAI({
      endpoint: secrets.deployments[0].endpoint,
      apiKey: secrets.deployments[0].apiKey,
      apiVersion: secrets.deployments[0].apiVersion,
      deployment: secrets.deployments[0].deployment,
    });

    try {
      const result = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an AI that generates brief, insightful quotes about a person's life based on their stats at the time of death. The quote should be witty, profound, or ironic, and no longer than 15 words.",
          },
          {
            role: "user",
            content: `Generate a quote for a person who died at age ${
              gameData.age
            } with the following stats:
              Health: ${gameData.health}/100
              Happiness: ${gameData.happiness}/100
              Intelligence: ${gameData.intelligence}/100
              Looks: ${gameData.looks}/100
              Money: $${gameData.money}
              Diseases: ${diseaseString()}
              Number of relationships: ${gameData.relationships?.length || 0},`,
          },
        ],
        model: "",
      });

      if (result.choices && result.choices.length > 0) {
        setQuote(result.choices[0].message.content!.trim());
      }
    } catch (err) {
      console.log("Error generating quote:", err);
      setQuote("Life: a journey of unexpected twists and turns.");
    }
  }

  useEffect(() => {
    generateQuote();
  }, []);

  async function handleShare() {
    if (Platform.OS === "ios") {
      ref!.current!.capture()!.then(async (uri: any) => {
        try {
          console.log(uri);

          const asset = await MediaLibrary.createAssetAsync(uri);
          await MediaLibrary.saveToLibraryAsync(uri);

          const instagramUrl = "instagram://share";
          const url = `${instagramUrl}`;

          await Linking.openURL(url);
        } catch (error) {
          console.error("Error sharing to Instagram: ", error);
          Alert.alert("Error", "An error occurred while sharing.");
        }
      });
    } else {
      Alert.alert(
        "Sharing Unavailable",
        "This feature is only available on iOS."
      );
    }
  }

  return (
    <ViewShot
      ref={ref}
      options={{ fileName: "YouDied", format: "jpg", quality: 0.9 }}
    >
      <View style={styles.gravestone}>
        <Text style={styles.title}>RIP</Text>
        <Text style={styles.name}>
          {gameData.name[0] + " " + gameData.name[1]}
        </Text>
        <Text style={styles.age}>Age: {gameData.age}</Text>
        <Text style={styles.quote}>"{quote}"</Text>

        <View style={styles.fields}>
          <Text style={styles.field}>
            <Text style={styles.label}>Money:</Text> $
            {gameData.money.toLocaleString()}
          </Text>

          <Text style={styles.field}>
            <Text style={styles.label}>Accuracy: </Text>
            {gameData.progress.accuracy}%
          </Text>

          <Text style={styles.field}>
            <Text style={styles.label}>Questions Answered: </Text>
            {gameData.progress.questionsAnswered}
          </Text>

          <Text style={styles.field}>
            <Text style={styles.label}>Subjects Quizzed On:</Text> "
            {popupData.questionsPopup.subjects}", difficulty of "
            {popupData.questionsPopup.difficulty}"
            {popupData.questionsPopup.specifications && (
              <>, "{popupData.questionsPopup.specifications}"</>
            )}
          </Text>
        </View>

        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share on Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNewLife} style={styles.newLifeButton}>
          <Text style={styles.shareButtonText}>New Life</Text>
        </TouchableOpacity>
      </View>
    </ViewShot>
  );
}

const styles = StyleSheet.create({
  gravestone: {
    padding: 10,
    backgroundColor: "#3a3a3a",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#555",
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 8,
    alignItems: "center",
    margin: 15,
    zIndex: 500,
    overflow: "visible",
    },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  age: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  quote: {
    fontSize: 20,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 20,
    color: "#ddd",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  fields: {
    marginTop: 15,
    paddingHorizontal: 15,
    width: "100%",
  },
  field: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
    textAlign: "left",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  label: {
    fontWeight: "bold",
    color: "#6bc7f2", // Blue color for labels
  },
  subField: {
    fontSize: 16,
    color: "#eee",
    marginBottom: 5,
    marginLeft: 10,
    textAlign: "left",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  shareButton: {
    backgroundColor: "#E1306C",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  shareButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  newLifeButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
});

export default Death;

import React, { useState } from "react";
import { router } from "expo-router";
import { Text, StyleSheet, Image, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { colorPalette } from "../../util/consts/colorPalette";
import { FormTextInput } from "../reusables/FormTextInput";

import { loadSavedDataState } from "../../redux/slices/data";
import { loadSavedPopupsState } from "../../redux/slices/popups";
import { getUser } from "../../../functions/http_triggers/getUser";
import { useDispatch } from "react-redux";
import { setSessionUsername } from "../../redux/slices/profile";
import CarouselIndicator from "../reusables/CarouselIndicator";
import GenericButton from "../reusables/GenericButton"; 

export function LoginFormContent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  const submitForm = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (username !== "test") {
      try {
        const user = await getUser(username);
        if (!user) {
          setShowErrorMessage(true);
        } else {
          setShowErrorMessage(false);
          if (username) {
            dispatch(setSessionUsername(username));
          }
          dispatch(loadSavedDataState(JSON.parse(String(user.gameState))));
          dispatch(loadSavedPopupsState(JSON.parse(String(user.popupState))));
          router.replace("/screens/HomeScreen");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        Alert.alert("An error occurred during authentication.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      console.log("Test user logged in");
      router.replace("/screens/HomeScreen");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../../assets/images/logo.png")}
        />
        <Text style={styles.title}>Log In</Text>
        <FormTextInput
          placeholder="Enter username"
          label="Username"
          initialValue={username}
          setValue={setUsername}
        />
        <FormTextInput
          placeholder="Enter password"
          label="Password"
          isPassword={true}
          initialValue={password}
          setValue={setPassword}
        />
        {showErrorMessage && (
          <Text style={styles.errorMessage}>User doesn't exist</Text>
        )}

        <GenericButton onPress={submitForm} text="Continue" />

        <GenericButton
          onPress={() => router.back()}
          text="Back"
          style={styles.backButton} 
        />

        <CarouselIndicator stages={5} currentStage={2} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.primaryColor,
    alignItems: "center",
    padding: 40,
  },
  logo: {
    height: 200,
    width: 200,
  },
  title: {
    color: colorPalette.textColor,
    fontWeight: "700",
    fontSize: 60,
    marginBottom: 4,
    textAlign: "center",
    marginTop: 10
  },
  errorMessage: {
    width: "100%",
    marginStart: 15,
    color: "red",
    marginTop: 10,
  },
  backButton: {
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: "#fa5568",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

  },
});

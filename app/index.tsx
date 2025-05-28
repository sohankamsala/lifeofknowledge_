import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  AppState,
} from "react-native";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import { colorPalette } from "./util/consts/colorPalette";
import Tutorial from "./screens/Tutorial";
import { saveGameState } from "./redux/slices/data";
import { savePopupsState } from "./redux/slices/popups";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { getUser } from "@/functions/http_triggers/getUser";
import { updateGameState } from "@/functions/http_triggers/updateGameState";
import { updatePopupState } from "@/functions/http_triggers/updatePopupState";
import CarouselIndicator from "./components/reusables/CarouselIndicator";
import GenericButton from "./components/reusables/GenericButton";

export default function Home() {
  const navigation = useNavigation();
  const router = useRouter();

  const gameData = useSelector((state: RootState) => state.data);
  const popupsData = useSelector((state: RootState) => state.popups);
  const profileData = useSelector((state: RootState) => state.userProfile);
  const [logOrSign, setLogOrSign] = useState("LoginFormContent.tsx");

  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (nextAppState === "background" || nextAppState === "inactive") {
          const user = await getUser(profileData.username);
          if (user) {
            updateGameState(user, gameData);
            updatePopupState(user, popupsData);
          }
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, [gameData, popupsData]);

  return (
    <View style={styles.container}>
      <MotiView
        from={{ translateY: 100, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 10, stiffness: 80 }}
      >
        <TouchableOpacity style={styles.innerContainer}>
          <Text style={styles.heading}>Welcome</Text>
          <Image
            style={styles.logo}
            source={require("../assets/images/logo.png")}
          />
          <GenericButton
            text="Sign In"
            onPress={() => router.push("/screens/Login")}
            style={styles.signInButton}
          />
          <GenericButton
            text="Sign Up"
            onPress={() => {
              router.replace("/screens/Signup");
              setLogOrSign("SignupFormContent.tsx");
            }}
            style={styles.signUpButton}
          />
          <GenericButton
            text="Test Skip"
            onPress={() => {
              router.replace("/screens/HomeScreen");
              setLogOrSign("SignupFormContent.tsx");
            }}
            style={styles.testSkipButton}
          ></GenericButton>
        </TouchableOpacity>
        <CarouselIndicator stages={5} currentStage={1} />
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 50,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 5,
  },
  heading: {
    fontSize: 40,
    color: colorPalette.primaryColor,
    fontWeight: "bold",
    marginBottom: 15,
    // fontFamily: "Jersey-25"
  },
  logo: {
    height: 180,
    width: 180,
    marginBottom: 20,
    borderRadius: 10,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 30,
  },
  signUpButton: {
    backgroundColor: colorPalette.primaryColor,
    marginTop: 10,
  },
  testSkipButton: {
    backgroundColor: "red",
    marginTop: 10,
  },
  goButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  signInButton: {
    backgroundColor: colorPalette.secondaryColor,
    marginTop: 10,
  },
});

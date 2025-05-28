import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigationState } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { colorPalette } from "../../util/consts/colorPalette";

export default function TopContainer() {
  const data = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();
  const router = useRouter();

  const accuracy = data.progress.accuracy;
  const questionsAnswered = data.progress.questionsAnswered;

  const currentRouteName = useNavigationState(
    (state) => state.routes[state.index].name
  );

  function handleBack() {
    router.replace("/screens/HomeScreen");
  }

  if (currentRouteName === "screens/HomeScreen") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.buttonContainer}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                router.replace("/screens/ProgressTracking");
              }}
            >
              <Text style={styles.buttonText}>View Progress Tracking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.text}>{"⬅️ Go Back"}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    backgroundColor: colorPalette.primaryColor,
    zIndex: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 20,
    shadowOpacity: 0.5,
    elevation: 10,
    width: "100%",
    height: 120,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 15,
    marginBottom: 30,
  },
  logo: {
    width: 50,
    height: 50,
  },
  button: {
    backgroundColor: colorPalette.secondaryColor,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 250,
    height: 50,
    marginLeft: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colorPalette.textColor,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    height: "100%",
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
});

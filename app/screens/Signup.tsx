import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { SignupFormContent } from "../components/auth_forms/SignupFormContent";
import { NewLifeFormContent } from "../components/auth_forms/NewLifeFormContent";
import { useNavigation } from "expo-router";
import { colorPalette } from "../util/consts/colorPalette";
import Tutorial from "./Tutorial";
import { setSection } from "../redux/slices/popups";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

export enum Section {
  SIGNUP = "SIGNUP",
  TUTORIAL = "TUTORIAL",
  NEWLIFE = "NEWLIFE",
}

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const popupsData = useSelector((state: RootState) => state.popups);

  const section = popupsData.section;

  function doSection(param: Section) {
    dispatch(setSection(param));
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
        {section === Section.SIGNUP ? (
          <SignupFormContent updateSection={doSection} />
        ) : section === Section.TUTORIAL ? (
          <Tutorial
            onFinish={() => {
              dispatch(setSection(Section.NEWLIFE));
            }}
          />
        ) : (
          <NewLifeFormContent updateSection={doSection} />
        )}
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
    height: 150,
    width: 150,
    marginBottom: 20,
  },
});

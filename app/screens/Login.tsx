import React, { useEffect } from "react";
import { LoginFormContent } from "../components/auth_forms/LoginFormContent";
import { useNavigation } from "expo-router";
import CarouselIndicator from "../components/reusables/CarouselIndicator";

export default function LoginScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <>
      <LoginFormContent />
    </>
  );
}

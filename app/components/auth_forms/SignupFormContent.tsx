import React, { useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";
import { colorPalette } from "../../util/consts/colorPalette";
import { FormTextInput } from "../reusables/FormTextInput";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUser } from "../../../functions/http_triggers/createUser";
import { getUser } from "../../../functions/http_triggers/getUser";
import { useDispatch } from "react-redux";
import { initialState as gameInitialState } from "../../redux/slices/data";
import { initialState as popupInitialState } from "../../redux/slices/popups";
import { setSessionUsername } from "../../redux/slices/profile";
import { Section } from "../../screens/Signup";
import { useRouter } from "expo-router";
import CarouselIndicator from "../reusables/CarouselIndicator";
import GenericButton from "../reusables/GenericButton";

const schemaPromise = import("zod").then(({ z }) =>
  z
    .object({
      username: z
        .string({ required_error: "Username is required" })
        .min(1, "Username is required"),
      password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
);

export const SignupFormContent: React.FC<{ updateSection: (section: Section) => void }> = (props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [schema, setSchema] = useState<any>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: async (data, context, options) => {
      const s = schema || (await schemaPromise);
      setSchema(s); 
      return zodResolver(s)(data, context, options);
    },
  });

  const submitForm = async (data: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      const user = await getUser(data.username);
      if (user) {
        Alert.alert("User already exists. Did you mean to login?");
      } else {
        await createUser(
          data.username,
          data.password,
          gameInitialState,
          popupInitialState
        );
        if (data.username) {
          dispatch(setSessionUsername(data.username));
        }
        props.updateSection(Section.TUTORIAL);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      Alert.alert("An error occurred during authentication. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Text style={styles.title}>Create Account</Text>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormTextInput
            label="Username"
            placeholder="Enter username"
            isRequired={true}
            initialValue={value}
            setValue={onChange}
          />
        )}
      />
      {errors.username?.message && (
        <Text style={styles.errorMessage}>{errors.username.message.toString()}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormTextInput
            label="Password"
            placeholder="Enter password"
            isRequired={true}
            initialValue={value}
            setValue={onChange}
            isPassword={true}
          />
        )}
      />
      {errors.password?.message && (
        <Text style={styles.errorMessage}>{errors.password.message.toString()}</Text>
      )}

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormTextInput
            label="Confirm password"
            placeholder="Enter password again"
            isRequired={true}
            initialValue={value}
            setValue={onChange}
            isPassword={true}
          />
        )}
      />
      {errors.confirmPassword?.message && (
        <Text style={styles.errorMessage}>
          {errors.confirmPassword.message.toString()}
        </Text>
      )}

      <GenericButton onPress={handleSubmit(submitForm as SubmitHandler<unknown>)} text="Continue" />

      <GenericButton
        onPress={() => {
          router.replace("/");
        }}
        text="Back"
        style={styles.backButton}
      />

      <CarouselIndicator stages={5} currentStage={2} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colorPalette.textColor,
    fontWeight: "700",
    fontSize: 35,
    marginBottom: 4,
    textAlign: "center",
  },
  errorMessage: {
    width: "100%",
    marginStart: 15,
    color: "red",
    marginTop: 10,
    fontSize: 14,
  },
  backButton: {
    backgroundColor: "#fa5568",
    marginTop: 20,
  },
});

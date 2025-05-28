import React from "react";
import { StyleSheet, Text, TouchableOpacity, Alert } from "react-native";

import { Section } from "@/app/screens/Signup";
import { colorPalette } from "@/app/util/consts/colorPalette";

import { resetGame } from "@/app/redux/slices/data";
import {
  resetPopupsState,
  setQuestionParams,
  setSection,
} from "@/app/redux/slices/popups";
import hasSpecialCharacters from "@/app/util/hasSpecialCharacters";

import { useDispatch } from "react-redux";
import { FormTextInput } from "../reusables/FormTextInput";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import CarouselIndicator from "../reusables/CarouselIndicator";

const schema = z.object({
  gradeLevel: z.string({ required_error: "Difficulty is required" }),
  subjects: z
    .string({ required_error: "Subjects are required" })
    .min(1, "Subjects are required"),
  theme: z.string().optional(),
});
// .refine(
//   (data) => {
//     if (data.gradeLevel.match(/[^\d]/)) {
//       return false;
//     }
//     const gradeNum = parseInt(data.gradeLevel);
//     return !isNaN(gradeNum) && gradeNum >= 1 && gradeNum <= 12;
//   },
//   {
//     message: "Grade level must be between 1 and 12",
//     path: ["gradeLevel"],
//   }
// );

interface NewLifeFormContentProps {
  updateSection: (section: Section) => void;
}

export const NewLifeFormContent: React.FC<NewLifeFormContentProps> = (
  props
) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleCreateNewLife = (data: {
    gradeLevel: string;
    subjects: string;
    theme?: string;
  }) => {
    dispatch(resetGame());
    dispatch(resetPopupsState());
    if (
      hasSpecialCharacters(data.subjects) ||
      hasSpecialCharacters(data.gradeLevel)
    ) {
      Alert.alert("Invalid input", "Only use letters, numbers, and spaces");
    } else {
      const theme = data.theme && data.theme.length > 0 ? data.theme : "none";
      dispatch(
        setQuestionParams({
          difficulty: data.gradeLevel,
          subjects: data.subjects,
          specifications: theme,
        })
      );
      router.push("/screens/HomeScreen");
    }
  };
  return (
    <>
      <Text style={styles.title}>Create Your New Life</Text>
      <Controller
        control={control}
        name="gradeLevel"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormTextInput
            initialValue={value}
            placeholder="Enter difficulty (1-12) or other(phd, college, very hard, etc..)"
            label="Difficulty"
            isRequired={true}
            setValue={onChange}
          />
        )}
      />
      {errors.gradeLevel && (
        <Text style={styles.errorMessage}>{errors.gradeLevel.message}</Text>
      )}
      <Controller
        control={control}
        name="subjects"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormTextInput
            initialValue={value}
            placeholder="Enter subjects (separate by commas)"
            label="Subjects"
            isRequired={true}
            setValue={onChange}
          />
        )}
      />
      {errors.subjects && (
        <Text style={styles.errorMessage}>{errors.subjects.message}</Text>
      )}
      <Controller
        control={control}
        name="theme"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormTextInput
            initialValue={value}
            placeholder="Enter theme (optional)"
            label="Theme"
            setValue={onChange}
          />
        )}
      />
      {errors.theme && (
        <Text style={styles.errorMessage}>{errors.theme.message}</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleCreateNewLife)}
      >
        <Text style={styles.buttonText}>+ Create New Life</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          dispatch(setSection(Section.TUTORIAL))
          router.replace("/screens/Signup")
        }}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <CarouselIndicator stages={5} currentStage={4} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colorPalette.textColor,
    marginBottom: 12,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    color: colorPalette.textColor,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: colorPalette.borderColor,
    borderRadius: 10,
    backgroundColor: colorPalette.inputBackground,
    fontSize: 16,
    color: colorPalette.primaryColor,
  },
  errorMessage: {
    width: "100%",
    marginStart: 15,
    color: "red",
    marginTop: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: colorPalette.secondaryColor,
    padding: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginTop: 40,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colorPalette.textColor,
  },
  backButton: {
    backgroundColor: "#fa5568",
    padding: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    height: 50,
    marginBottom: 5,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
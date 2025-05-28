import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import { colorPalette } from "../util/consts/colorPalette";
import CarouselIndicator from "../components/reusables/CarouselIndicator";

const tutorialSteps = [
  {
    heading: "📚 Gamify Your Learning Experience!",
    subheading:
      "Master Math, Science, History, and Language Arts with quizzes, puzzles, and progress tracking.",
    bullets: [
      "✔️ Interactive quizzes for all subjects.",
      "✔️ Engaging puzzles that make learning fun.",
      "✔️ Track progress, unlock levels, and challenge yourself!",
    ],
    isIntro: true,
  },
  {
    heading: "Welcome to Your New Life!",
    subheading: "Create your unique learning experience.",
    bullets: ["Set grade level and difficulty.", "Add custom preferences."],
    image: require("../../assets/tutorial/newlife.png"),
  },
  {
    heading: "How It Works",
    subheading: "Your choices shape the experience.",
    bullets: [
      "Subjects decide your questions.",
      "Difficulty sets the challenge.",
      "Customize with timed tests or limits.",
    ],
  },
  {
    heading: "Activities",
    subheading: "Boost your stats and have fun!",
    bullets: [
      "Increase stats through activities.",
      "Enjoy life while acing quizzes!",
    ],
    image: require("../../assets/tutorial/activities.png"),
  },
  {
    heading: "Let's Get Started!",
    subheading: "Set up your profile and begin!",
    bullets: ["Tap 'GO!' to start.", "Fill in details.", "Learn and have fun!"],
  },
];

export default function Tutorial({ onFinish }: { onFinish: () => void }) {
  const [tutorialIndex, setTutorialIndex] = useState(0);

  function handleNextStep() {
    if (tutorialIndex < tutorialSteps.length - 1) {
      setTutorialIndex(tutorialIndex + 1);
    } else {
      onFinish();
    }
  }

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 10, stiffness: 80 }}
      style={[
        styles.tutorialContainer,
        tutorialSteps[tutorialIndex].isIntro && styles.introContainer,
      ]}
    >
      <MotiView
        key={tutorialIndex}
        from={{ opacity: 0, translateX: 50 }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -50 }}
        transition={{ type: "spring", damping: 10, stiffness: 80 }}
        style={{ alignItems: "center" }}
      >
        <Text
          style={[
            styles.tutorialHeading,
            tutorialSteps[tutorialIndex].isIntro && styles.introHeading,
          ]}
        >
          {tutorialSteps[tutorialIndex].heading}
        </Text>
        <Text
          style={[
            styles.tutorialSubheading,
            tutorialSteps[tutorialIndex].isIntro && styles.introSubheading,
          ]}
        >
          {tutorialSteps[tutorialIndex].subheading}
        </Text>

        <View style={{ alignSelf: "flex-start" }}>
          {tutorialSteps[tutorialIndex].bullets.map((point, index) => (
            <Text
              key={index}
              style={[
                styles.tutorialBullet,
                tutorialSteps[tutorialIndex].isIntro && styles.introBullet,
              ]}
            >
              • {point}
            </Text>
          ))}
        </View>
      </MotiView>

      <MotiView
        from={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ type: "timing", duration: 1500, loop: true }}
      >
        <TouchableOpacity style={styles.button} onPress={handleNextStep}>
          <Text style={styles.buttonText}>
            {tutorialIndex === tutorialSteps.length - 1 ? "Start!" : "Next"}
          </Text>
        </TouchableOpacity>
      </MotiView>

      <CarouselIndicator
        stages={tutorialSteps.length}
        currentStage={tutorialIndex}
      />
    </MotiView>
  );
}

const styles = StyleSheet.create({
  tutorialContainer: {
    width: "85%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center", // Keeps content centered vertically
  },
  introContainer: {
    backgroundColor: "#f4f8ff",
    borderWidth: 2,
    borderColor: colorPalette.primaryColor,
    padding: 15, // Reduced padding to prevent excessive spacing
  },
  tutorialHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d3f4e",
    marginBottom: 10,
    textAlign: "center",
  },
  introHeading: {
    fontSize: 26, // Slightly smaller to prevent overflow
    fontWeight: "bold",
    color: "#004aad",
    textTransform: "uppercase",
    marginBottom: 5, // Reduce space
  },
  tutorialSubheading: {
    fontSize: 18,
    color: "#4a5b6c",
    marginBottom: 15,
    textAlign: "center",
  },
  introSubheading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0055cc",
    marginBottom: 10, // Reduce space
  },
  tutorialBullet: {
    fontSize: 16,
    color: "#2d3f4e",
    marginBottom: 5,
    textAlign: "left",
  },
  introBullet: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003399",
  },
  button: {
    backgroundColor: colorPalette.secondaryColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

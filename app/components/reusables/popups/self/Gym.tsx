import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Keyboard } from "react-native";
import {
  addMessage,
  decrementHappiness,
  decrementHealth,
  decrementLooks,
  decrementMoney,
  incrementHappiness,
  incrementHealth,
  incrementLooks,
} from "@/app/redux/slices/data";
import {
  generateQuestions,
  setQuestionPopupOpen,
} from "@/app/redux/slices/popups";
import CustomDropdown from "../../CustomDropdown";
import { RootState } from "@/app/redux/store";
import { exerciseList } from "@/app/util/consts/exerciseList";
import getRandomInt from "@/app/util/getRandomInt";

const DAY_PASS_COST = 20;

function Gym() {
  const [selected, setSelected] = useState("");
  const [weight, setWeight] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const popups = useSelector((state: RootState) => state.popups);

  const choices = exerciseList.map((exercise) => ({
    label: exercise.name,
    value: exercise.name,
  }));

  const canAffordDayPass = data.money >= DAY_PASS_COST;

  useEffect(() => {
    if (!popups.questionsPopup.isOpen && quizCompleted) {
      const selectedExercise = exerciseList.find(
        (exercise) => exercise.name === selected
      );

      if (selectedExercise) {
        const weightNum = parseFloat(weight);
        let failChance;
        if (popups.questionsPopup.pass) {
          failChance = Math.min(0.05 + (weightNum - 10) / 1000, 0.5);
          failChance = Math.max(failChance, 0);
        } else {
          failChance = 1;
        }

        const exerciseFailed = Math.random() < failChance;

        if (!exerciseFailed) {
          dispatch(
            addMessage({
              text: `${selectedExercise.successMessage} You lifted ${weight} lbs.`,
              year: data.age,
              popup: true,
            })
          );
          dispatch(
            incrementHealth(getRandomInt(1, 3) + Math.floor(weightNum / 15))
          );
          dispatch(
            incrementLooks(getRandomInt(2, 5) + Math.floor(weightNum / 20))
          );
          dispatch(
            incrementHappiness(getRandomInt(1, 3) + Math.floor(weightNum / 30))
          );
        } else {
          dispatch(
            addMessage({
              text: `${selectedExercise.injuryMessage} The ${weight} lbs were too much.`,
              year: data.age,
              popup: true,
            })
          );
          dispatch(
            decrementHealth(getRandomInt(1, 4) + Math.floor(weightNum / 15))
          );
          dispatch(
            decrementLooks(getRandomInt(1, 3) + Math.floor(weightNum / 20))
          );
          dispatch(
            decrementHappiness(getRandomInt(1, 3) + Math.floor(weightNum / 30))
          );
        }
      }

      setQuizCompleted(false);
      setSelected("");
      setWeight("");
    }
  }, [popups.questionsPopup.isOpen]);

  function handleExercise() {
    if (!canAffordDayPass) {
      return;
    }
    dispatch(generateQuestions({ amount: 5 }));
    dispatch(setQuestionPopupOpen(true));
    setQuizCompleted(true);
    dispatch(decrementMoney(DAY_PASS_COST));
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gym Fitness</Text>
      <Text style={styles.treatmentsSubtitle}>Get shredded!</Text>
      <CustomDropdown
        data={choices}
        value={selected}
        onChange={(item: any) => canAffordDayPass && setSelected(item.value)}
        placeholder="Select an exercise"
        searchPlaceholder="Search exercises..."
      />
      <TextInput
        style={[styles.input, !canAffordDayPass && styles.disabledInput]}
        onChangeText={(text) => canAffordDayPass && setWeight(text)}
        value={weight}
        placeholder="Enter weight (lbs)"
        placeholderTextColor="#999"
        keyboardType="numeric"
        editable={canAffordDayPass}
      />
      {selected && weight && (
        <TouchableOpacity
          onPress={handleExercise}
          style={[styles.button, !canAffordDayPass && styles.disabledButton]}
          disabled={!canAffordDayPass}
        >
          <Text style={styles.buttonText}>
            Build that body! (${DAY_PASS_COST})
          </Text>
        </TouchableOpacity>
      )}
      {!canAffordDayPass && (
        <Text style={styles.errorText}>
          You can't afford a day pass. Current balance: ${data.money}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  treatmentsSubtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
    color: "black",
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "#888",
  },
  button: {
    marginTop: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  noDiseasesText: {
    marginTop: 20,
    fontSize: 18,
    color: "#999",
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 8,
  },
});

export default Gym;

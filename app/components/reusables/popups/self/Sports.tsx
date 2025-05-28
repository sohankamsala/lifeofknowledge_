import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import popups, {
  generateQuestions,
  setQuestionPopupOpen,
} from "@/app/redux/slices/popups";
import { addMessage, decrementMoney } from "@/app/redux/slices/data";
import { sportsList } from "@/app/util/consts/sportsList";
import CustomDropdown from "../../CustomDropdown";

export default function Sports() {
  const [selected, setSelected] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const gameData = useSelector((state: RootState) => state.data);

  let userBalance = gameData.money;

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const popups = useSelector((state: RootState) => state.popups);

  const choices = sportsList.map((sports) => ({
    label: `${sports.name} ($${sports.price})`,
    value: sports.name,
  }));

  useEffect(() => {
    if (!popups.questionsPopup.isOpen && quizCompleted) {
      const selectedSport = sportsList.find((dest) => dest.name === selected);

      if (selectedSport && data.money >= selectedSport.price) {
        if (
          popups.questionsPopup.pass &&
          data.health > 50 &&
          data.age > 12 &&
          data.age < 24
        ) {
          const badLuck = Math.random() < 0.1;
          const message = badLuck
            ? selectedSport.badOutcome
            : selectedSport.goodOutcome;

          dispatch(
            addMessage({
              text: message,
              year: data.age,
              popup: true,
            })
          );
        } else {
          dispatch(
            addMessage({
              text: selectedSport.badOutcome,
              year: data.age,
              popup: true,
            })
          );
        }
      }

      setQuizCompleted(false);
      setSelected("");
    }
  }, [popups.questionsPopup.isOpen, quizCompleted]);

  function handleSport() {
    const selectedSport = sportsList.find((sport) => sport.name === selected);
    if (selectedSport && data.money >= selectedSport.price) {
      dispatch(decrementMoney(selectedSport.price));
      dispatch(
        addMessage({
          text: `You are trying out for ${selected} for $${selectedSport.price}`,
          year: data.age,
          popup: false,
        })
      );
      dispatch(generateQuestions({ amount: 5 }));
      dispatch(setQuestionPopupOpen(true));
      setQuizCompleted(true);
    } else {
      dispatch(
        addMessage({
          text: "You didn't have enough money!",
          year: data.age,
          popup: true,
        })
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Participate in a sport</Text>
      <Text style={styles.treatmentsSubtitle}>Get some exercise in!</Text>
      <CustomDropdown
        data={choices}
        value={selected}
        onChange={(item: any) => setSelected(item.value)}
        placeholder="Select a sport"
        searchPlaceholder="Search sports"
      />
      {selected && (
        <TouchableOpacity onPress={handleSport} style={styles.button}>
          <Text style={styles.buttonText}>Go bring a trophy home!</Text>
        </TouchableOpacity>
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

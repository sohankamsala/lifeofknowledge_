import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, decrementMoney } from "@/app/redux/slices/data";
import {
  generateQuestions,
  setQuestionPopupOpen,
} from "@/app/redux/slices/popups";
import CustomDropdown from "../../CustomDropdown";
import { RootState } from "@/app/redux/store";
import { destinationList } from "@/app/util/consts/destinationList";

function Vacation() {
  const [selected, setSelected] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const popups = useSelector((state: RootState) => state.popups);

  const choices = destinationList.map((destination) => ({
    label: `${destination.name} ($${destination.price})`,
    value: destination.name,
  }));

  useEffect(() => {
    if (!popups.questionsPopup.isOpen && quizCompleted) {
      const selectedDestination = destinationList.find(
        (dest) => dest.name === selected
      );

      if (selectedDestination) {
        if (popups.questionsPopup.pass) {
          const badLuck = Math.random() < 0.1;
          const message = badLuck
            ? selectedDestination.badTimeMessage
            : selectedDestination.goodTimeMessage;

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
              text: selectedDestination.badTimeMessage,
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

  function handleVacation() {
    const selectedDestination = destinationList.find(
      (dest) => dest.name === selected
    );
    if (selectedDestination && data.money >= selectedDestination.price) {
      dispatch(decrementMoney(selectedDestination.price));
      dispatch(
        addMessage({
          text: `You took a trip to ${selected} for $${selectedDestination.price}`,
          year: data.age,
          popup: false,
        })
      );
      dispatch(generateQuestions({ amount: 5}));
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
      <Text style={styles.title}>Go on a vacation</Text>
      <Text style={styles.treatmentsSubtitle}>
        Life is better in flip flops
      </Text>
      <CustomDropdown
        data={choices}
        value={selected}
        onChange={(item: any) => setSelected(item.value)}
        placeholder="Select a destination"
        searchPlaceholder="Search destinations"
      />
      {selected && (
        <TouchableOpacity onPress={handleVacation} style={styles.button}>
          <Text style={styles.buttonText}>Let's go on vacation!</Text>
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

export default Vacation;

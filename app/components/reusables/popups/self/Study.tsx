import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  decrementIntelligence,
  decrementMoney,
  incrementIntelligence,
  removeDisease,
} from "@/app/redux/slices/data";
import {
  generateQuestions,
  setQuestionPopupOpen,
} from "@/app/redux/slices/popups";
import CustomDropdown from "../../CustomDropdown";
import { RootState } from "@/app/redux/store";
import { bookList } from "@/app/util/consts/bookList";
import getRandomInt from "@/app/util/getRandomInt";

function Study() {
  const [selected, setSelected] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const popups = useSelector((state: RootState) => state.popups);

  const choices = bookList.map((book) => ({
    label: book.title,
    value: book.title,
  }));

  useEffect(() => {
    if (!popups.questionsPopup.isOpen && quizCompleted) {
      if (popups.questionsPopup.pass) {
        dispatch(
          addMessage({
            text: `You finished ${selected}!`,
            year: data.age,
            popup: true,
          })
        );
        incrementIntelligence(getRandomInt(2, 10));
      } else {
        dispatch(
          addMessage({
            text: `You didn't finish ${selected} and slept midway through!`,
            year: data.age,
            popup: true,
          })
        );
        decrementIntelligence(getRandomInt(4, 11));
      }
      setQuizCompleted(false);
      setSelected("");
    }
  }, [popups.questionsPopup.isOpen, quizCompleted]);

  function handleReading() {


    dispatch(generateQuestions({ amount: 5}));
    dispatch(setQuestionPopupOpen(true));
    setQuizCompleted(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study</Text>
      <Text style={styles.treatmentsSubtitle}>Get more knowledge</Text>
      <CustomDropdown
        data={choices}
        value={selected}
        onChange={(item: any) => setSelected(item.value)}
        placeholder="Select a book"
        searchPlaceholder="Search book..."
      />
      {selected && (
        <TouchableOpacity onPress={handleReading} style={styles.button}>
          <Text style={styles.buttonText}>Hit the books!</Text>
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

export default Study;

import { addJob, addMessage } from "@/app/redux/slices/data";
import {
  generateQuestions,
  setPopupState,
  setQuestionPopupOpen,
} from "@/app/redux/slices/popups";
import { RootState } from "@/app/redux/store";
import jobsList, { Job } from "@/app/util/consts/jobsList";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

function JobApplication() {
  const popupData = useSelector((state: RootState) => state.popups);
  const gameData = useSelector((state: RootState) => state.data);

  const [quizCompleted, setQuizCompleted] = useState(false);

  const dispatch = useDispatch();

  const desiredJob: Job | undefined = popupData.popup.job;

  useEffect(() => {
    if (!popupData.questionsPopup.isOpen && quizCompleted) {
      if (popupData.questionsPopup.pass) {
        if (desiredJob?.major?.label == gameData.career.major?.label) {
          dispatch(
            addMessage({
              popup: true,
              text: "You got the job!",
              year: gameData.age,
            })
          );

          dispatch(addJob(popupData.popup.job));
        } else {
          dispatch(
            addMessage({
              popup: true,
              text: "Wrong major beta!",
              year: gameData.age,
            })
          );
        }
      } else {
        dispatch(
          addMessage({
            popup: true,
            text: "You flunked the interview!",
            year: gameData.age,
          })
        );
      }
    }
  }, [quizCompleted, popupData.questionsPopup.isOpen]);

  function handleApplication() {
    dispatch(generateQuestions({ amount: 10 }));
    dispatch(setQuestionPopupOpen(true));
    setQuizCompleted(true);
  }

  return (
    <>
      <Text style={styles.title}>Applying for: {desiredJob?.name}</Text>
      <Text style={styles.subtitle}>You've got this!</Text>
      <TouchableOpacity onPress={handleApplication} style={styles.button}>
        <Text style={styles.buttonText}>Interview</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
});

export default JobApplication;

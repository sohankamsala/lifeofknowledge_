import { addMessage, decrementMoney } from "@/app/redux/slices/data";
import { generateQuestions, setPopupState, setQuestionPopupOpen } from "@/app/redux/slices/popups";
import { RootState } from "@/app/redux/store";
import getRandomInt from "@/app/util/getRandomInt";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

function Movies() {
  const popupsData = useSelector((state: RootState) => state.popups);
  const gameData = useSelector((state: RootState) => state.data)
  const dispatch = useDispatch()

  const TICKET_COST = 25

  let relationshipName = popupsData.popup.relationshipName?.[0];

  function handlePayment() {
    if (gameData.money >= TICKET_COST){
      dispatch(generateQuestions({amount: 5}))
      dispatch(setQuestionPopupOpen(true))

      if (popupsData.questionsPopup.pass) {
        if (getRandomInt(1, 101) <= (60 + gameData.happiness / 3)) {
          dispatch(addMessage({popup: true, text: `You had a great time with ${relationshipName}`, year: gameData.age}))
        } else {
          dispatch(addMessage({popup: true, text: `You and ${relationshipName} didn't have a good time... it was awkward`, year: gameData.age}))
        }
      } else {
        dispatch(addMessage({popup: true, text: `You and ${relationshipName} didn't have a good time... it was awkward`, year: gameData.age}))
      }

      dispatch(decrementMoney(TICKET_COST))
    }
  }

  return (
    <>
      <Text style={styles.title}>The Movies!</Text>
      <Text style={styles.subtitle}>Going with: {relationshipName}</Text>
      <TouchableOpacity onPress={handlePayment} style={styles.button}>
        <Text style={styles.buttonText}>Pay for tickets and snacks: {TICKET_COST}$</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
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
});

export default Movies;

import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Button } from "react-native";
import { AzureOpenAI } from "openai";
import { useRouter } from "expo-router";
import { number } from "zod";
import getRandomInt from "@/app/util/getRandomInt";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import {
  generateQuestions,
  setPopupState,
  setQuestionPopupOpen,
} from "@/app/redux/slices/popups";
import {
  addMessage,
  decrementMoney,
  incrementMoney,
  setMoney,
} from "@/app/redux/slices/data";

export default function Lotteryy() {
  const [selected, setSelected] = useState("");
  const [doPayment, setDoPayment] = useState(false);
  const gameData = useSelector((state: RootState) => state.data);

  const price = 100;
  const jackpot = getRandomInt(1000, 5000);
  const randomnum = getRandomInt(0, 100);
  const usernum = getRandomInt(0, 100);

  let userBalance = gameData.money;

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const popups = useSelector((state: RootState) => state.popups);

  function handlePayment() {
    if (userBalance >= price) {
      dispatch(
        generateQuestions({
          amount: 5,
        })
      );
      dispatch(setQuestionPopupOpen(true));
      setDoPayment(true);

      dispatch(
        addMessage({
          text: "You won the lottery!!!!!",
          year: data.age,
          popup: true,
        })
      );

      if (popups.questionsPopup.pass) {
        if (userBalance >= price) {
          dispatch(decrementMoney(price));
        }
        if (usernum == randomnum) {
          dispatch(incrementMoney(jackpot));
          dispatch(
            addMessage({
              text: "You won the lottery!!!!!",
              year: data.age,
              popup: true,
            })
          );
        } else {
          dispatch(
            addMessage({
              text: "You didn't win the lottery! Guess you can't win them all!",
              year: data.age,
              popup: true,
            })
          );
        }
      } else {
        dispatch(
          addMessage({
            text: "You couldn't afford the lottery ticket!",
            year: data.age,
            popup: true,
          })
        );
      }
    } else {
      //   dispatch(setPopupState({ whichPopup: "", open: f}));
      dispatch(
        addMessage({
          text: `You couldn't afford the lottery ticket`,
          year: data.age,
          popup: true,
        })
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lottery Ticket</Text>
      <TouchableOpacity onPress={handlePayment} style={styles.button}>
        <Text style={styles.buttonText}>Buy Lottery Ticket for $100</Text>
      </TouchableOpacity>
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

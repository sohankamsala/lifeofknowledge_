import {
  addMessage,
  decrementMoney,
  decrementRelationshipBond,
  incrementRelationshipBond,
} from "@/app/redux/slices/data";
import {
  generateQuestions,
  setPopupState,
  setQuestionPopupOpen,
} from "@/app/redux/slices/popups";
import { RootState } from "@/app/redux/store";
import getRandomInt from "@/app/util/getRandomInt";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

function Conversation() {
  const popupsData = useSelector((state: RootState) => state.popups);
  const gameData = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();

  const [message, setMessage] = useState<null | String>(null);

  let relationshipName = popupsData.popup.relationshipName?.[0];

  function handleGo() {
    dispatch(generateQuestions({ amount: 5 }));
    dispatch(setQuestionPopupOpen(true));

    if (popupsData.questionsPopup.pass) {
      let randomNumber = getRandomInt(1, 100);

      randomNumber += gameData.intelligence / 18;
      randomNumber += gameData.happiness / 18;
      randomNumber += gameData.looks / 18;

      if (randomNumber > 30) {
        dispatch(
          addMessage({
            year: gameData.age,
            text:
              "You and " +
              relationshipName +
              " had a boring and awkward conversation...",
            popup: true,
          })
        );
        dispatch(
          decrementRelationshipBond({
            name: [
              popupsData.popup.relationshipName![0],
              popupsData.popup.relationshipName![1],
            ],
            amount: 15,
          })
        );
      } else {
        dispatch(
          addMessage({
            year: gameData.age,
            text:
              "You and " +
              relationshipName +
              " had a great time talking together!",
            popup: true,
          })
        );
        dispatch(
          incrementRelationshipBond({
            name: [
              popupsData.popup.relationshipName![0],
              popupsData.popup.relationshipName![1],
            ],
            amount: 15,
          })
        );
      }
    } else {
      dispatch(
        addMessage({
          year: gameData.age,
          text:
            "You and " +
            relationshipName +
            " had a boring and awkward conversation...",
          popup: true,
        })
      );
      dispatch(
        decrementRelationshipBond({
          name: [
            popupsData.popup.relationshipName![0],
            popupsData.popup.relationshipName![1],
          ],
          amount: 15,
        })
      );
    }
  }

  return (
    <>
      <Text style={styles.title}>Let's have a talk!</Text>
      <Text style={styles.subtitle}>Conversation with: {relationshipName}</Text>
      <TextInput
        style={[styles.input]}
        onChangeText={(text: string) => setMessage(text)}
        placeholder={"Message"}
        placeholderTextColor="#999"
        inputMode="text"
      />
      {message ? (
        <TouchableOpacity onPress={handleGo} style={styles.button}>
          <Text style={styles.buttonText}>
            {"What will you and " + relationshipName + " talk about?"}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleGo} style={styles.disabledButton}>
          <Text style={styles.disabledButtonText}>
            {"What will you and " + relationshipName + " talk about?"}
          </Text>
        </TouchableOpacity>
      )}
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
  disabledButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    color: "black",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  disabledButtonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
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
});

export default Conversation;

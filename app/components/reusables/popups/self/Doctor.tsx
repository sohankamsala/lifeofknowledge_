import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  decrementMoney,
  removeDisease,
} from "@/app/redux/slices/data";
import {
  setPopupState,
  setQuestionPopupOpen,
  generateQuestions,
} from "@/app/redux/slices/popups";
import CustomDropdown from "../../CustomDropdown";
import { RootState } from "@/app/redux/store";

function Doctor() {
  const [selected, setSelected] = useState("");
  const [cost, setCost] = useState(0);
  const [doPayment, setDoPayment] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const popups = useSelector((state: RootState) => state.popups);

  function handlePayment() {
    if (data.money >= cost) {
      dispatch(
        generateQuestions({
          amount: 15,
        })
      );
      dispatch(setQuestionPopupOpen(true));
      setDoPayment(true);
    } else {
      dispatch(setPopupState({ whichPopup: "", open: false }));
      dispatch(
        addMessage({
          text: `You couldn't afford treatment for ${selected}`,
          year: data.age,
          popup: true,
        })
      );
    }
  }

  useEffect(() => {
    if (doPayment && !popups.questionsPopup.isOpen) {
      dispatch(decrementMoney(cost));

      const selectedDisease = data.diseases.find(
        (disease) => disease.name === selected
      );
      if (selectedDisease) {
        if (popups.questionsPopup.pass) {
          const baseSuccessChance = 0.9;
          const ageFactorReduction = data.age / 200;
          const diseaseLevelFactor = selectedDisease.level * 0.05;
          const successChance =
            baseSuccessChance - ageFactorReduction - diseaseLevelFactor;

          if (Math.random() < successChance) {
            console.log(`Treatment successful: ${selectedDisease.cureMessage}`);
            dispatch(removeDisease(selected));
            dispatch(
              addMessage({
                text: `Treatment successful: ${selectedDisease.cureMessage}`,
                year: data.age,
                popup: true,
              })
            );
          } else {
            console.log(`The treatment for ${selected} was unsuccessful.`);
            dispatch(
              addMessage({
                text: `The treatment for ${selected} was unsuccessful.`,
                year: data.age,
                popup: true,
              })
            );
          }
        } else {
          dispatch(
            addMessage({
              text: `You failed! The treatment for ${selected} was unsuccessful.`,
              year: data.age,
              popup: true,
            })
          );
        }
      }
      setDoPayment(false);
      setSelected("");
    }
  }, [popups.questionsPopup.isOpen]);

  const choices = data.diseases.map((disease) => ({
    label: disease.name,
    value: disease.name,
  }));

  useEffect(() => {
    if (selected) {
      const selectedDisease = data.diseases.find(
        (disease) => disease.name === selected
      );
      const newCost = selectedDisease
        ? selectedDisease.level *
          parseFloat((Math.random() * (107 - 83) + 83).toFixed(2))
        : 0;
      setCost(newCost);
    }
  }, [selected, data.diseases]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Professional</Text>
      <Text style={styles.treatmentsSubtitle}>Seek Treatment for:</Text>
      {choices.length > 0 ? (
        <CustomDropdown
          data={choices}
          value={selected}
          onChange={(item: any) => setSelected(item.value)}
          placeholder="Select a disease"
          searchPlaceholder="Search diseases..."
        />
      ) : (
        <Text style={styles.noDiseasesText}>No diseases to treat!</Text>
      )}
      {selected && (
        <TouchableOpacity onPress={handlePayment} style={styles.button}>
          <Text style={styles.buttonText}>Pay ${cost.toFixed(2)}</Text>
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

export default Doctor;

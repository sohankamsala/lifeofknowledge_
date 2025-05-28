import { Action, createSlice } from "@reduxjs/toolkit";
import { generateRandomName } from "../../util/generateNames";
import { Disease } from "../../util/consts/diseasesList";
import { WritableDraft } from "immer";
import dummyQuestions, {Question, QuestionPopupState} from "../../util/consts/questionsList";
import { clampValue } from "../../util/clampValues";
import {
  Relationship,
  FamilyMessage,
  generateInitialFamily,
} from "../../util/familyGenerator";
import generateGPTQuestions from "../../../functions/generateGPTQuestions";
import * as SecureStore from "expo-secure-store";
import { Major } from "../../util/consts/majorList";
import { Job } from "../../util/consts/jobsList";
import { act } from "react";
import { getUser } from "../../../functions/http_triggers/getUser";
import { Car } from "../../util/consts/carsList";
import { House } from "../../util/consts/housesList";
import { startScreenTransition } from "react-native-reanimated";

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

interface Message {
  id: number;
  text: string;
  year: number;
  popup: boolean;
}

export interface Asset {
  amount: number;
  item: House | Car;
}

export interface Career {
  jobs: Job[];
  experience: number;
  major: Major | null;
  salary: number;
}
export interface Progress {
  questionsAnswered: number;
  accuracy: number;
  correctQuestions: number;
}
export interface DataState {
  happiness: number;
  looks: number;
  health: number;
  money: number;
  intelligence: number;
  age: number;
  name: string[];
  diseases: Disease[];
  messages: (Message | FamilyMessage)[];
  alive: boolean;
  accidentChance: number;
  relationships: Relationship[];
  career: Career;
  progress: Progress;
  assets: Asset[];
}

const initialFamilyState = generateInitialFamily();

export const initialState: DataState = {
  happiness: getRandomInt(80, 100),
  looks: getRandomInt(40, 100),
  health: getRandomInt(70, 100),
  money: 100000, // Example range for money
  intelligence: getRandomInt(50, 100),
  age: 17,
  name: generateRandomName(),
  diseases: [],
  messages: [
    {
      id: 1,
      text: "You were born",
      year: 0,
      popup: false,
    },
    ...initialFamilyState.messages,
  ],
  alive: true,
  accidentChance: 5,
  relationships: initialFamilyState.relationships,
  career: {
    experience: 0,
    jobs: [],
    major: null,
    salary: 0,
  },
  progress: {
    questionsAnswered: 0,
    accuracy: 100,
    correctQuestions: 0,
  },
  assets: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    decrementHappiness: (state, action) => {
      state.happiness = clampValue(state.happiness - action.payload, 0, 100);
    },
    incrementHappiness: (state, action) => {
      state.happiness = clampValue(state.happiness + action.payload, 0, 100);
    },
    setHappiness: (state, action) => {
      state.happiness = clampValue(action.payload, 0, 100);
    },
    decrementLooks: (state, action) => {
      state.looks = clampValue(state.looks - action.payload, 0, 100);
    },
    incrementLooks: (state, action) => {
      state.looks = clampValue(state.looks + action.payload, 0, 100);
    },
    setLooks: (state, action) => {
      state.looks = clampValue(action.payload, 0, 100);
    },
    decrementHealth: (state, action) => {
      state.health = clampValue(state.health - action.payload, 0, 100);
    },
    incrementHealth: (state, action) => {
      state.health = clampValue(state.health + action.payload, 0, 100);
    },
    setHealth: (state, action) => {
      state.health = clampValue(action.payload, 0, 100);
    },
    decrementMoney: (state, action) => {
      state.money -= action.payload;
    },
    incrementMoney: (state, action) => {
      state.money += action.payload;
    },
    incrementExperience: (state, action) => {
      state.career.experience += action.payload;
    },
    setMoney: (state, action) => {
      state.money = action.payload;
    },
    decrementAge: (state, action) => {
      state.age -= action.payload;
    },
    incrementAge: (state, action) => {
      if (state.alive) {
        state.age += action.payload;

        state.messages.push({
          text: `You're now ${state.age}`,
          year: state.age,
          id: state.messages[state.messages.length - 1].id + 1,
          popup: false,
        });
      }
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
    decrementIntelligence: (state, action) => {
      state.intelligence = clampValue(
        state.intelligence - action.payload,
        0,
        100
      );
    },
    incrementIntelligence: (state, action) => {
      state.intelligence = clampValue(
        state.intelligence + action.payload,
        0,
        100
      );
    },
    setIntelligence: (state, action) => {
      state.intelligence = clampValue(action.payload, 0, 100);
    },
    setAlive: (state, action: { payload: boolean }) => {
      state.alive = action.payload;
    },
    incrementAccidentChance: (state, action: { payload: number }) => {
      state.accidentChance += action.payload;
    },
    decrementAccidentChance: (state, action: { payload: number }) => {
      state.accidentChance -= action.payload;
    },
    setAccidentChance: (state, action: { payload: number }) => {
      state.accidentChance = action.payload;
    },
    addMessage: (
      state,
      action: { payload: { year: number; text: string; popup: boolean } }
    ) => {
      const { year, text, popup } = action.payload;

      state.messages.push({
        id: state.messages[state.messages.length - 1].id,
        text: text,
        year: year,
        popup: popup,
      });
    },
    removeMessage: (
      state,
      action: { payload: { year: number; text: string; popup: boolean } }
    ) => {
      console.log("forgot to implement");
    },
    addDisease: (
      state,
      action: {
        payload: {
          name: string;
          level: 1 | 2 | 3 | 4;
          cureMessage: string;
          contractedMessage: string;
        };
      }
    ) => {
      const { name, level, cureMessage, contractedMessage } = action.payload;

      const exists = state.diseases.some((disease) => disease.name == name);

      if (!exists) {
        state.diseases.push({
          name: name,
          level: level,
          cureMessage: cureMessage,
          contractedMessage: contractedMessage,
        });
      }
    },
    removeDisease: (state, action: { payload: string }) => {
      const diseaseName = action.payload;

      // console.log("removing " + action.payload)

      state.diseases = state.diseases.filter(
        (disease) => disease.name !== diseaseName
      );
    },

    incrementRelationshipBond: (
      state,
      action: { payload: { name: string[]; amount: number } }
    ) => {
      const relationship = state.relationships.find(
        (r) =>
          r.name[0] === action.payload.name[0] &&
          r.name[1] === action.payload.name[1]
      );
      if (relationship) {
        relationship.bond = clampValue(
          relationship.bond + action.payload.amount,
          0,
          100
        );
      }
    },
    decrementRelationshipBond: (
      state,
      action: { payload: { name: string[]; amount: number } }
    ) => {
      const relationship = state.relationships.find(
        (r) =>
          r.name[0] === action.payload.name[0] &&
          r.name[1] === action.payload.name[1]
      );
      if (relationship) {
        relationship.bond = clampValue(
          relationship.bond - action.payload.amount,
          0,
          100
        );
      }
    },
    setRelationshipBond: (
      state,
      action: { payload: { name: string[]; value: number } }
    ) => {
      const relationship = state.relationships.find(
        (r) =>
          r.name[0] === action.payload.name[0] &&
          r.name[1] === action.payload.name[1]
      );
      if (relationship) {
        relationship.bond = clampValue(action.payload.value, 0, 100);
      }
    },
    setMajor: (state, action) => {
      state.career.major = action.payload;
    },
    saveGameState: (state) => {
      SecureStore.setItemAsync("gameData", JSON.stringify(state))
        .then(() => console.log("Saved the game's state."))
        .catch((error: any) => console.log("Failed to save game state", error));
    },
    loadSavedDataState: (state, action: { payload: any }) => {
      Object.assign(state, action.payload);
    },
    resetGame: (state) => {
      Object.assign(state, initialState);
    },
    addJob: (state, action: { payload: Job | undefined }) => {
      if (action.payload) {
        state.career.jobs.push(action.payload);
      }
    },
    addAnsweredQuestion: (state, action: { payload: { correct: boolean } }) => {
      state.progress.questionsAnswered += 1;

      if (action.payload.correct) {
        state.progress.correctQuestions += 1;
      }

      state.progress.accuracy = Math.trunc(
        (state.progress.correctQuestions / state.progress.questionsAnswered) *
          100
      );
    },
    setJob: (state, action: { payload: Job }) => {
      state.career.jobs[0] = action.payload;
    },
    setSalary: (state, action) => {
      state.career.salary = action.payload;
    },
    addAsset: (
      state,
      action: { payload: { item: House | Car; amount: number } }
    ) => {
      const { item, amount } = action.payload;

      const existingAsset = state.assets.find(
        (asset) => asset.item.name === item.name
      );

      if (existingAsset) {
        existingAsset.amount += amount;
      } else {
        state.assets.push({ item, amount });
      }
    },
  },
});

export const {
  setSalary,
  decrementHappiness,
  incrementHappiness,
  setHappiness,
  decrementLooks,
  incrementLooks,
  setLooks,
  decrementHealth,
  incrementHealth,
  setHealth,
  decrementMoney,
  incrementMoney,
  setMoney,
  decrementIntelligence,
  incrementIntelligence,
  setIntelligence,
  incrementAge,
  decrementAge,
  setAge,
  setAlive,
  incrementAccidentChance,
  incrementExperience,
  decrementAccidentChance,
  setAccidentChance,
  addMessage,
  removeMessage,
  addDisease,
  removeDisease,
  // closeAll,
  // setQuestionPopupOpen,
  // setQuestionPopupPass,
  // generateQuestions,
  // setQuestions,
  // setQuestionsLoading,
  // setPopupState,
  incrementRelationshipBond,
  decrementRelationshipBond,
  setMajor,
  saveGameState,
  loadSavedDataState,
  resetGame,
  addJob,
  addAnsweredQuestion,
  setJob,
  addAsset,
} = dataSlice.actions;

export default dataSlice.reducer;

import dummyQuestions from "@/app/util/consts/questionsList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { create } from "react-test-renderer";
import * as SecureStore from "expo-secure-store";
import { Job } from "@/app/util/consts/jobsList";
import { Section } from "@/app/screens/Signup";

interface PopupState {
  open: boolean;
  whichPopup: string;
  relationshipName?: [string, string];
  job?: Job;
  forceReload?: any;
  queue: {
    open: boolean;
    whichPopup: string;
    relationshipName?: [string, string];
  }[];
}

interface Question {
  options: string[];
  text: string;
  id: number;
  correctAnswer: string;
}

interface QuestionPopupState {
  isOpen: boolean;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswer: string[];
  pass: boolean;
  subjects: string;
  difficulty: string;
  specifications: string;
  amount: number;
  loading: boolean;
  questionsTrigger: number;
}

export interface DataState {
  popup: PopupState;
  questionsPopup: QuestionPopupState;
  section: Section;
}

export const initialState: DataState = {
  popup: {
    open: false,
    whichPopup: "",
    queue: [],
    forceReload: "sdfsdf",
  },
  questionsPopup: {
    isOpen: false,
    questions: dummyQuestions,
    currentQuestionIndex: 0,
    userAnswer: [],
    pass: false,
    subjects: "math",
    difficulty: "very easy",
    specifications: "none",
    amount: 10,
    loading: false,
    questionsTrigger: 0,
  },
  section: Section.SIGNUP,
};

const popupsSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    setQuestionPopupOpen: (state, action) => {
      state.questionsPopup.isOpen = action.payload;
    },
    setQuestionPopupPass: (state, action: { payload: boolean }) => {
      state.questionsPopup.pass = action.payload;
    },
    generateQuestions: (state, action: { payload: { amount: number } }) => {
      const nothing = "doNothing call middleware"
    },
    setQuestions: (state, action: { payload: Question[] }) => {
      state.questionsPopup.questions = action.payload;
    },
    setQuestionsLoading: (state, action: { payload: boolean }) => {
      state.questionsPopup.loading = action.payload;
    },
    setPopupState: (state, action: { payload: Omit<PopupState, "queue"> }) => {
      const payload = { ...action.payload, queue: state.popup.queue || [] };

      if (payload.open) {
        if (!state.popup.open) {
          state.popup.open = payload.open;
          state.popup.whichPopup = payload.whichPopup;
          state.popup.relationshipName = payload.relationshipName;
          state.popup.job = payload.job;
        } else {
          state.popup.queue.push(payload);
        }
      } else {
        if (state.popup.queue.length > 0) {
          const nextPopup = state.popup.queue.shift();
          if (nextPopup) {
            state.popup.open = nextPopup.open;
            state.popup.whichPopup = nextPopup.whichPopup;
            state.popup.relationshipName = nextPopup.relationshipName;
            state.popup.job = payload.job;
          } else {
            state.popup.open = false;
            state.popup.whichPopup = "";
            state.popup.relationshipName = undefined;
            state.popup.job = undefined;
          }
        } else {
          state.popup.open = false;
          state.popup.whichPopup = "";
          state.popup.relationshipName = undefined;
        }
      }
    },
    setQuestionParams: (
      state,
      action: {
        payload: {
          difficulty: string;
          subjects: string;
          specifications: string;
        };
      }
    ) => {
      state.questionsPopup.difficulty = action.payload.difficulty;
      state.questionsPopup.subjects = action.payload.subjects;
      state.questionsPopup.specifications = action.payload.specifications;
    },
    savePopupsState: (state) => {
      SecureStore.setItemAsync("popupsData", JSON.stringify(state))
        .then(() => console.log("Popups state saved successfully"))
        .catch((error) => console.error("Failed to save popups state", error));
    },
    loadSavedPopupsState: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetPopupsState: (state) => {
      Object.assign(state, initialState);
    },
    forceReload: (state) => {
      const oldOne = state.popup;

      Object.assign(oldOne, state.popup);

      Object.assign(state.popup, {
        whichPopup: "sdfsdf",
        open: false,
        queue: state.popup.queue,
      });

      Object.assign(state.popup, oldOne);
    },
    setSection: (state, action: { payload: Section }) => {
      state.section = action.payload;
    },
  },
});

export const {
  setQuestionPopupOpen,
  setQuestionPopupPass,
  generateQuestions,
  setQuestions,
  setQuestionsLoading,
  setPopupState,
  setQuestionParams,
  savePopupsState,
  loadSavedPopupsState,
  resetPopupsState,
  forceReload,
  setSection,
} = popupsSlice.actions;

export default popupsSlice.reducer;

import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { addMessage } from "../slices/data";
import { setPopupState } from "../slices/popups";

export const educationProgressionMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);

  if (action.type === "data/incrementAge") {
    const state = store.getState().data;

    const messages: Record<number, string> = {
      6: "You began elementary school.",
      11: "Middle school has commenced!",
      14: "Your Freshman life at high school has begun.",
      18: "You've graduated high school, what will you major in college?",
      24: "You're out of university, time to find a job!",
    };

    const text = messages[state.age];
    if (text) {
      store.dispatch(addMessage({ text, year: state.age, popup: state.age !== 18 }));
      if (state.age === 18) {
        store.dispatch(setPopupState({ whichPopup: "", open: false }));
        store.dispatch(setPopupState({ whichPopup: "major", open: true }));
      }
    }
  }

  return result;
};

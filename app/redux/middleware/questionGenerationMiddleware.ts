import { Middleware } from "@reduxjs/toolkit";
import {
  generateQuestions,
  setQuestions,
  setQuestionsLoading,
} from "../slices/popups";
import generateGPTQuestions from "@/functions/generateGPTQuestions";
import { RootState } from "../store";

export const questionGenerationMiddleware: Middleware<{}, RootState> =
  (storeAPI) => (next) => async (action) => {
    if (generateQuestions.match(action)) {

      const state = storeAPI.getState().popups.questionsPopup;

      const { subjects, difficulty, specifications } = state;
      const amount = action.payload.amount;

      storeAPI.dispatch(setQuestionsLoading(true));

      try {
        const questions = await generateGPTQuestions(
          amount,
          subjects,
          difficulty,
          specifications
        );

        if (questions === false) {
          console.warn(
            "Invalid or unparsable subjects/difficulty/specifications."
          );
        } else {
          storeAPI.dispatch(setQuestions(questions));
        }
      } catch (err) {
        console.error("Error generating questions:", err);
      }

      storeAPI.dispatch(setQuestionsLoading(false));
    }

    return next(action);
  };

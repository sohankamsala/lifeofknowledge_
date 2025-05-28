import { Middleware } from "@reduxjs/toolkit";
import {
  incrementHealth,
  incrementHappiness,
  incrementLooks,
  incrementIntelligence,
  decrementHappiness,
  decrementLooks,
  incrementAccidentChance,
} from "../slices/data";
import getRandomInt from "@/app/util/getRandomInt";

let prevAge: number | null = null;

const randomAdjust: Middleware = (store) => (next) => (action) => {
  const result = next(action); // Apply the action

  const state = store.getState();
  const currentAge = state.data.age;
  if (state.data.alive && prevAge !== currentAge) {
    prevAge = currentAge;

    const dispatch = store.dispatch;
    const { looks, health, happiness, intelligence } = state.data;

    dispatch(incrementHealth(getRandomInt(-2, 3)));
    dispatch(incrementHappiness(getRandomInt(-2, 3)));
    dispatch(incrementLooks(getRandomInt(-2, 3)));
    dispatch(incrementIntelligence(getRandomInt(-2, 3)));

    if (looks < 20) {
      dispatch(decrementHappiness(getRandomInt(4, 7)));
    }
    if (health < 40) {
      dispatch(decrementHappiness(getRandomInt(3, 5)));
    }
    if (happiness < 50) {
      dispatch(decrementLooks(getRandomInt(2, 5)));
    }

    if (intelligence < 40) {
      dispatch(incrementAccidentChance(1));
      if (intelligence < 20) {
        dispatch(incrementAccidentChance(2));
      }
    }
  }

  return result;
};

export default randomAdjust;

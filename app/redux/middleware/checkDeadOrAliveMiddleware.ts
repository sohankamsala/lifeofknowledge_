import { Middleware } from "@reduxjs/toolkit";
import { setAlive } from "../slices/data";

export const checkDeadOrAliveMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState().data;

  if (state.happiness <= 0 || state.health <= 0) {
    store.dispatch(setAlive(false));
  }

  return result;
};

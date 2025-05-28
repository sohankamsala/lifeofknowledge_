import { Middleware } from "@reduxjs/toolkit";
import { addDisease, addMessage, decrementHealth, removeDisease } from "../slices/data";
import { Disease, diseasesList } from "@/app/util/consts/diseasesList";
import getRandomInt from "@/app/util/getRandomInt";

export const checkForDiseaseMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);

  if (action.type === "data/incrementAge") {
    const state = store.getState().data;
    const contractedDisease = diseasesList[getRandomInt(0, diseasesList.length)];

    state.diseases.forEach((disease: Disease) => {
      if (disease.level === 1) {
        store.dispatch(removeDisease(disease.name));
        store.dispatch(
          addMessage({
            text: contractedDisease.cureMessage,
            year: state.age,
            popup: false,
          })
        );
      }
    });

    if (state.diseases.length < 2) {
      const rand = Math.random() * 200 + 1;
      if (rand < 1.5 * (state.age / 10)) {
        const alreadyHas = state.diseases.some((d: Disease) => d.name === contractedDisease.name);
        if (!alreadyHas) {
          store.dispatch(addDisease(contractedDisease));
          store.dispatch(
            addMessage({
              text: contractedDisease.contractedMessage,
              year: state.age,
              popup: true,
            })
          );
        }
      }
    }

    state.diseases.forEach((disease: Disease) => {
      let dec = 0;
      if (disease.level === 4) dec = getRandomInt(7, 10);
      else if (disease.level === 3) dec = getRandomInt(5, 7);
      else if (disease.level === 2) dec = getRandomInt(6, 8);
      else if (disease.level === 1) dec = getRandomInt(4, 6);
      store.dispatch(decrementHealth(dec));
    });
  }

  return result;
};

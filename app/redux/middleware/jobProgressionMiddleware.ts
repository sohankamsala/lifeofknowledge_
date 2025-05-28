import { Middleware } from "@reduxjs/toolkit";
import {
  addMessage,
  incrementExperience,
  incrementMoney,
  setJob,
  setSalary,
} from "../slices/data";
import jobsList from "@/app/util/consts/jobsList";
import getRandomInt from "@/app/util/getRandomInt";

export const jobProgressionMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);
  const state = store.getState().data;

  if (action.type === "data/incrementAge") {
    state.career.jobs.forEach(() => {
      store.dispatch(incrementMoney(state.career.salary));
    });

    if (state.age >= 24) {
      store.dispatch(incrementExperience(1));
    }

    if (state.career.jobs.length >= 1 && state.career.major) {
      const currentJob = state.career.jobs[0];
      let nextLevel = Math.min(currentJob.level + 1, 5);

      const nextLevelJob = jobsList.find(
        (job) =>
          job.major?.value === currentJob.major?.value &&
          job.level === nextLevel
      );

      if (!nextLevelJob) return result;

      let chance = 15;

      if (state.career.major.label === nextLevelJob.major?.label) {
        chance += getRandomInt(8, 15);
      }

      if (state.intelligence >= 80) chance += state.intelligence / 15;
      else if (state.intelligence <= 40) chance -= state.intelligence / 30;

      chance += Math.min(state.career.experience / 7, 20);

      if (state.looks >= 70) chance += state.looks / 45;
      else if (state.looks <= 40) chance -= state.looks / 50;

      chance -= (nextLevelJob.level - currentJob.level) * 5;
      chance -= nextLevelJob.level * 2.5;

      if (state.age >= 50) chance -= (state.age - 50) * 2;

      chance += getRandomInt(-10, 10);

      if (getRandomInt(1, 100) <= chance) {
        store.dispatch(setJob(nextLevelJob));
        const newSalary = nextLevelJob.level === 5
          ? nextLevelJob.salary + getRandomInt(1, 100) * state.career.experience * 30
          : nextLevelJob.salary;

        store.dispatch(setSalary(newSalary));
        store.dispatch(
          addMessage({
            popup: true,
            text:
              nextLevelJob.level === 5
                ? `Salary increase! Your new salary is ${newSalary.toLocaleString()}`
                : `You got promoted to ${nextLevelJob.name}! Your new salary is ${newSalary.toLocaleString()}`,
            year: state.age,
          })
        );
      }
    }
  }

  return result;
};

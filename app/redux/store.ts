import { configureStore, Store } from "@reduxjs/toolkit";
import dataReducer from "./slices/data";
import popupsReducer from "./slices/popups";
import userProfileReducer from "./slices/profile";
import randomAdjust from "./middleware/randomAdjust";
import { checkDeadOrAliveMiddleware } from "./middleware/checkDeadOrAliveMiddleware";
import { educationProgressionMiddleware } from "./middleware/educationProgressionMiddleware";
import { jobProgressionMiddleware } from "./middleware/jobProgressionMiddleware";
import { checkForDiseaseMiddleware } from "./middleware/checkForDiseaseMiddleware";
import { questionGenerationMiddleware } from "./middleware/questionGenerationMiddleware";

const store: Store = configureStore({
  reducer: {
    data: dataReducer,
    popups: popupsReducer,
    userProfile: userProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      questionGenerationMiddleware,
      checkDeadOrAliveMiddleware,
      checkForDiseaseMiddleware,
      educationProgressionMiddleware,
      jobProgressionMiddleware,
      randomAdjust
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

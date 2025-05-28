import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfileState {
  username: string;
}

const initialState: UserProfileState = {
  username: "",
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setSessionUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setSessionUsername } = userProfileSlice.actions;
export default userProfileSlice.reducer;

/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */
import {configureStore} from "@reduxjs/toolkit";

import usersSlice from "./users";

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

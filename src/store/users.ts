/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

const usersEndpoint = "https://jsonplaceholder.typicode.com/users";

interface IState {
  fetching: boolean;
  fetchError: string;
  data: any[];
}

const initialState: IState = {
  fetching: false,
  fetchError: '',
  data: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchBegin(state) {
      state.fetching = true;
      state.fetchError = '';
    },
    fetchSuccess(state, action: PayloadAction<any[]>) {
      state.fetching = false;
      state.data = action.payload;
    },
    fetchError(state, action: PayloadAction<string>) {
      state.fetching = false;
      state.fetchError = action.payload;
      state.data = [];
    }
  },
});

export const usersActions = usersSlice.actions;

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    dispatch(usersActions.fetchBegin());
    try {
      const response = await fetch(usersEndpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch users.');
      }
      const users: any[] = await response.json();
      dispatch(usersActions.fetchSuccess(users));
    } catch (e) {
      dispatch(usersActions.fetchError(e.message || 'Failed to fetch users information.'))
    }
  };
};

export default usersSlice;

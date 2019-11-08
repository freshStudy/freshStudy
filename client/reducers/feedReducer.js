import * as types from '../constants/feedActionTypes';

const initialState = {
  history: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_FEED:
      const newHistory = [...state.history];
      newHistory.push(action.payload);
      return {
        history: newHistory,
      };
    default:
      return state;
  }
};

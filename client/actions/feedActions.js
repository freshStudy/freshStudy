import * as types from '../constants/feedActionTypes';

export const updateFeed = (correct) => ({
  type: types.UPDATE_FEED,
  payload: correct,
});

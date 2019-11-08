import { combineReducers } from 'redux';
import game from './gameReducer';
import user from './userReducer';
import feed from './feedReducer';

export default combineReducers({
  game,
  user,
  feed,
});

import * as types from '../constants/gameActionTypes';

const initialState = {
  isGameOver: false,
  isPlaying: false,
  isPaused: false,
  activeCardIndex: 0,
  answerHistory: [],
  cards: [],
  allHistory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.START_NEW_GAME:
      return {
        ...state,
        isPlaying: true,
        isPaused: false,
        activeCardIndex: 0,
        answerHistory: [],
        cards: action.payload,
      };
    case types.END_GAME:
      const newHistory = action.payload || state.allHistory;
      return {
        isGameOver: true,
        isPlaying: false,
        isPaused: false,
        activeCardIndex: 0,
        answerHistory: [],
        cards: [],
        allHistory: newHistory,
      }
    case types.PAUSE_GAME:
      return {
        ...state,
        isPlaying: false,
        isPaused: true,
      };
    case types.RESUME_GAME:
      return {
        ...state,
        isPlaying: true,
        isPaused: false,
      };
    case types.ATTEMPT_ANSWER:
      const newState = { ...state };
      newState.answerHistory = [...newState.answerHistory];
      newState.activeCardIndex += 1;
      if (newState.activeCardIndex >= newState.cards.length) newState.isGameOver = true;
      newState.answerHistory.push(action.payload);
      return newState;
    case types.RETURN_TO_MAIN_MENU:
      return {
        ...state,
        isPlaying: false,
      }
    case types.UPDATE_HISTORY:
      return {
        ...state,
        allHistory: action.payload,
      };
    default:
      return state;
  }
};

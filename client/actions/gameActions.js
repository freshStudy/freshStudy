import * as types from '../constants/gameActionTypes';
import messageTypes from '../constants/messageTypes';
import { emit, emitAction } from '../services/socket.service';

export const startNewGame = () => dispatch => { 
  fetch('/questions')
    .then(res => res.json())
    .then(data => {
      emit(messageTypes.START);
      dispatch({
        type: types.START_NEW_GAME,
        payload: data,
      });
    })
    .catch(console.error);
};

export const endGame = () => (dispatch, getState) => {
  const state = getState();
  if (!state.user.isLoggedIn) return dispatch({
    type: types.END_GAME,
  });
  const options = {
    method: 'POST',
    body: JSON.stringify({
      id: state.user.userData.id,
      numQs: state.game.answerHistory.length,
      numCorrect: state.game.answerHistory.reduce((acc, cur) => acc + cur),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch('/results', options)
    .then(res => res.json())
    .then(data => dispatch({
      type: types.END_GAME,
      payload: data,
    }))
    .catch(console.error);
};

export const getHistory = () => dispatch => {
  fetch('/results')
    .then(res => res.json())
    .then(data => dispatch({
      type: types.UPDATE_HISTORY,
      payload: data,
    }))
    .catch(console.error);
};

export const pauseGame = () => ({
  type: types.PAUSE_GAME,
});

export const resumeGame = () => ({
  type: types.RESUME_GAME,
});

export const attemptAnswer = emitAction(isCorrect => ({
  key: messageTypes.ANSWER,
  type: types.ATTEMPT_ANSWER,
  payload: isCorrect,
}));

export const returnToMainMenu = () => ({
  type: types.RETURN_TO_MAIN_MENU
});

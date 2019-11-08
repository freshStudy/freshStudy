import io from 'socket.io-client';
import * as actions from '../actions';

const socket = io('ws://localhost:3000',
  { transports: ['websocket'] }
);

socket.on('answer', msg => {
  console.log(msg);
});

export const emitAction = action => {
  return (...args) => {
    const result = action.call(this, ...args);
    console.log(result);
    if (socket) socket.emit(result.key, { payload: result.payload, type: result.type });
    return result;
  };
};

export const emit = (key, ...args) => {
  if (socket) socket.emit(key, ...args);
}

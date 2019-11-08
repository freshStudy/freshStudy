import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/gameActions';
import GameScreen from '../components/GameScreen';

const mapStateToProps = ({ game }) => ({
  activeCardIndex: game.activeCardIndex,
  answerHistory: game.answerHistory,
  cards: game.cards,
  isGameOver: game.isGameOver,
});

const mapDispatchToProps = dispatch => ({
  attemptAnswer: (correct) => dispatch(actions.attemptAnswer(correct)),
  endGame: () => dispatch(actions.endGame()),
});

const GameContainer = (props) => {
  useEffect(() => {
    if (props.isGameOver) setTimeout(props.endGame, 2000);
  }, [props.isGameOver]);

  return (
    <GameScreen {...props} />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
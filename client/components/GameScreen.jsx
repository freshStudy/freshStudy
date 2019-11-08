import React from 'react';
import Card from './Card';
import NewGamePrompt from './NewGamePrompt';

export default ({
  activeCardIndex,
  cards,
  isGameOver,
  attemptAnswer,
  startNewGame,
  isLoggedIn,
  answerHistory,
}) => {
  const numCorrectAnswers = answerHistory.reduce((acc, cur) => {
    return acc + cur
  }, 0);
  let wrongAnswers;
  if (!isGameOver) {
    wrongAnswers = [cards[activeCardIndex].ans_one];
    if (cards[activeCardIndex].ans_two) {
      wrongAnswers.push(cards[activeCardIndex].ans_two);
      if (cards[activeCardIndex].ans_three) wrongAnswers.push(cards[activeCardIndex].ans_three);
    }
  }

  return (
    <div className="gamePage">

      {(isGameOver
        ? (<>
            <p>Game over!</p>
            <NewGamePrompt startNewGame={startNewGame} isLoggedIn={isLoggedIn} />
          </>)
          : <Card
            key={cards[activeCardIndex].id}
            question={cards[activeCardIndex].question}
            correctAns={cards[activeCardIndex].ans_correct}
            wrongAnswers={wrongAnswers}
            attemptAnswer={attemptAnswer}
            answerHistory={answerHistory}
          />
        )}
      <p className="gamescreen-score-text">You have answered {numCorrectAnswers} {numCorrectAnswers === 1 ? 'question' : 'questions'} correctly.</p>
    </div>
  );
};

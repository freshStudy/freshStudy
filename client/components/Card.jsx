import React, { useState, useEffect } from 'react';
import { useSpring, useTrail, animated, interpolate } from 'react-spring';

const correctReactionTextArr = ['THIS PLEASES ME', 'I HAVE TAUGHT YOU WELL', 'YOU HAVE A BRIGHT FUTURE'];
const incorrectReactionTextArr = ['SNUGGLE HARDER', 'DISAPPOINTED', 'THERE IS NO TRY'];

export default ({ question, correctAns, wrongAnswers, attemptAnswer, answerHistory }) => {
  console.log('top of Card')

  ///////////////////////////////////
  // CONST: format question + answers
  ///////////////////////////////////
  // randomize answers
  const allAnswers = wrongAnswers.concat(correctAns);
  const indices = Object.keys(allAnswers).sort(() => Math.random() - 0.5);
  // concat question + randomized answers for react-spring mapping
  const cardTextArr = [question].concat(indices.map(i => allAnswers[i]));

  let gifImageClassName = 'gifImage';
  if (answerHistory.length > 0) {
    // pick up where we left off from the previous question correct/incorrect transition
    const previousAnswerResult = answerHistory[answerHistory.length - 1];
    gifImageClassName = previousAnswerResult ? 'correct' : 'incorrect';
  }

  ///////////////////
  // HOOKS: useState
  ///////////////////
  // declare 'animationEvent' trigger
  const [ animationEvent, setAnimationEvent ] = useState('enterLeft');
  // save answerStatus (true/false) to send to parent component when spring exit animation concludes
  // make this const outside of func?
  const [ answerStatus, setAnswerStatus ] = useState(false);
  // save state of reaction gif for the next question gifCurtain close animation


  /////////////////////////////
  // HOOKS: useSpring, useTrail
  /////////////////////////////
  // fade in/out 'gifCurtain' to reveal animation 
  const [ curtainSpring, setCurtainSpring] = useSpring(() => ({opacity: 0}));
  // create a spring for each question + answers
  const [ trail, setTrail, stopTrail ] = useTrail(indices.length + 1, () => ({ xy: [-200, 100], o: 0}));



  //////////////////////
  // EVENT HANDLERS
  /////////////////////
  // onclick handler
  const handleAttempt = answer => {
    //console.log(`In handleAttempt with answer: ${answer}. Correct is: ${correctAns}`);
    setAnswerStatus(answer === correctAns);
    if (answer !== correctAns) {
      setAnimationEvent('exitDown');
    } else {
      setAnimationEvent('exitUp');
    }
  }
  /////
  // 'restSpringCounter' and 'onRestSpring' allow us to wait until the last spring-enabled animated element
  // has exited the game screen. Then we notify the parent component of user's answer status.
  let restSpringCounter;
  const onRestSpring = () => {
    if (--restSpringCounter === 0) {
      return attemptAnswer(answerStatus); 
    }
  }
  /////
  // run when new 'animationEvent' state is set
  useEffect(() => {
    let randomIndex;

    switch (animationEvent) {
      case 'enterLeft':
        document.getElementById('reactionGif').className = gifImageClassName;
        setTrail({to: {xy: [20, 100], o: 1}});
        setCurtainSpring({from: {opacity: 0}, to: {opacity: 1}});
        break;
      case 'exitUp':
        restSpringCounter = cardTextArr.length - 1;
        document.getElementById('reactionGif').className = 'correct';

        randomIndex = Math.floor(Math.random() * Math.floor(correctReactionTextArr.length - 1));
        document.getElementById('reactionText').innerHTML = correctReactionTextArr[randomIndex];


        setTrail({to: {xy: [20, -200], o: 0}, onRest: onRestSpring});
        setCurtainSpring({from: {opacity: 1}, to: {opacity: 0}});
        break;
      case 'exitDown':
        restSpringCounter = cardTextArr.length - 1;
        document.getElementById('reactionGif').className = 'incorrect';
       
        randomIndex = Math.floor(Math.random() * Math.floor(incorrectReactionTextArr.length - 1));
        document.getElementById('reactionText').innerHTML = incorrectReactionTextArr[randomIndex];

        setTrail({to: {xy: [20, 400], o: 0}, onRest: onRestSpring});
        setCurtainSpring({from: {opacity: 1}, to: {opacity: 0}});
        break;
      default:
        console.log(`animationEvent '${animationEvent}' not recognized`);
    }
    
  }, [animationEvent]);



  ///////////////
  // RENDER TIME!
  ///////////////
  return (
    <div className="card-container" style={{   width: '500px',
                                    height: '600px',
                                    margin: 'auto',
                                    overflow: 'hidden'
                                }}>

    <div id="reactionGif"></div>
    <span id="reactionText" className="card-reaction-text"></span>
  
    <animated.div className="gifCurtain" style={curtainSpring}></animated.div>


    {trail.map(({ xy, o }, i) => {
      if (i > 0) return (
        <animated.div
          className='card-answer-text'
          key={cardTextArr[i]} 
          onClick={(i > 0 ?  () => handleAttempt(cardTextArr[i]) : null)}
          style={{
            cursor: (i > 0 ? 'pointer' : 'default'),
            marginBottom: (i > 0 ? '10px' : '20px'),
            fontSize: (i > 0 ? '22px' : '30px'),
            transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`),
            opacity: o.interpolate(o => o),
            overflowWrap: 'break-word',
            fontFamily:  `'Archivo Narrow', sans-serif`,
        }}>
          {`${i}. ${cardTextArr[i]}`}                 
        </animated.div>
      )
      return (
        <animated.div
          className='card-question-text'
          key={cardTextArr[i]} 
          style={{
            cursor: (i > 0 ? 'pointer' : 'default'),
            marginBottom: (i > 0 ? '10px' : '20px'),
            fontSize: (i > 0 ? '22px' : '30px'),
            transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`),
            opacity: o.interpolate(o => o),
            overflowWrap: 'break-word',
            fontFamily:  `'Archivo Narrow', sans-serif`,
        }}>
          {cardTextArr[i]}                 
        </animated.div>
      )
    })}
    </div>
  );
}

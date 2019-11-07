import React, { useState, useEffect } from 'react';
import {useSpring, useTrail, animated, interpolate} from 'react-spring';



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

   


  ///////////////////
  // HOOKS: useState
  ///////////////////
  // declare 'animationEvent' trigger
  const [ animationEvent, setAnimationEvent ] = useState('enterLeft');
  // save answerStatus (true/false) to send to parent component when spring exit animation concludes
  // make this const outside of func?
  const [ answerStatus, setAnswerStatus ] = useState(false);
  // save state of reaction gif for the next question gifCurtain close animation
  const [ showGif, setShowGif ] = useState('gifImage');


  /////////////////////////////
  // HOOKS: useSpring, useTrail
  /////////////////////////////
  // fade in/out 'gifCurtain' to reveal animation 
  const [ curtainSpring, setCurtainSpring] = useSpring(() => ({opacity: 0}));
  // create a spring for each question + answers
  const [ trail, setTrail, stopTrail ] = useTrail(indices.length, () => ({ xy: [-200, 100], o: 0}));



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
    switch (animationEvent) {
      case 'enterLeft':
        //console.log("TCL: answerStatus", answerStatus)
        setTrail({to: {xy: [20, 100], o: 1}});
        setCurtainSpring({from: {opacity: 0}, to: {opacity: 1}});
        break;
      case 'exitUp':
        restSpringCounter = cardTextArr.length - 1;
        setShowGif('correct');
        setTrail({to: {xy: [20, -200], o: 0}, onRest: onRestSpring});
        setCurtainSpring({from: {opacity: 1}, to: {opacity: 0}});
        break;
      case 'exitDown':
        restSpringCounter = cardTextArr.length - 1;
        setShowGif('incorrect');
        setTrail({to: {xy: [20, 400], o: 0}, onRest: onRestSpring});
        setCurtainSpring({from: {opacity: 1}, to: {opacity: 0}});
        break;
      default:
        console.log(`animationEvent '${animationEvent}' not recognized`);
    }
    
  }, [animationEvent]);
  ///////
  // run when 'showGif' is updated
  useEffect(() => {
      document.getElementById('reactionGif').className = showGif;
  }, [showGif]);



  ///////////////
  // RENDER TIME!
  ///////////////
  return (
    <div style={{   width: '500px',
                    height: '600px',
                    backgroundColor: '#0ff',
                    margin: 'auto',
                    overflow: 'hidden'
                }}>

    <div id="reactionGif"></div>
    <div id="reactionText" className="card-reaction-text"></div>
  
    <animated.div className="gifCurtain" style={curtainSpring}>hello</animated.div>


    {trail.map(({ xy, o }, i) => (
    <animated.div   key={cardTextArr[i]} 
                    onClick={(i > 0 ?  () => handleAttempt(cardTextArr[i]) : undefined)}
                    style={{   
                            cursor: (i > 0 ? 'pointer' : 'default'),
                            marginBottom: (i > 0 ? '10px' : '20px'),
                            fontSize: (i > 0 ? '18px' : '24px'),
                            transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`),
                            opacity: o.interpolate(o => o),
                            overflowWrap: 'break-word',
                            width: '90%'
                            }}>
    {(i > 0 ? `${i}. ` : '')}{cardTextArr[i]}                           
    </animated.div>))}
    </div>
  );
}

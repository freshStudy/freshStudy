import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GameContainer from './GameContainer';
import NavBar from '../components/NavBar';
import MainMenu from '../components/MainMenu';
import StatsContainer from './StatsContainer';

const mapStateToProps = ({ game, user }) => ({
  isPlaying: game.isPlaying,
  isPaused: game.isPaused,
  user: user.userData,
  isLoggedIn: user.isLoggedIn,
  isLoading: user.isLoading,
});

const mapDispatchToProps = dispatch => ({
  startNewGame: () => dispatch(actions.startNewGame()),
  login: (username, password) => dispatch(actions.login(username, password)),
  register: newUserData => dispatch(actions.register(newUserData)),
  logout: (isLoggedIn) => dispatch(actions.logout(isLoggedIn)),
  verify: () => dispatch(actions.verify()),
  pause: () => dispatch(actions.pauseGame()),
  resume: () => dispatch(actions.resumeGame()),
  returnToMainMenu: () => dispatch(actions.returnToMainMenu()),
});

const MainContainer = ({
  isPlaying,
  isPaused,
  startNewGame,
  user,
  isLoggedIn,
  isLoading,
  login,
  register,
  logout,
  verify,
  pause,
  resume,
  returnToMainMenu,
}) => {
  useEffect(() => {
    verify();
  }, []);

  return (
    <div className="container">
      <NavBar
        user={user}
        isLoggedIn={isLoggedIn}
        isPlaying={isPlaying}
        logout={logout}
        pause={pause}
        returnToMainMenu={returnToMainMenu}
      />
      {isLoading && 'Loading...'}
      {!isLoading && (
        isPlaying === true
          ? <GameContainer
              startNewGame={startNewGame}
              isLoggedIn={isLoggedIn}
            />
          : <MainMenu
              startNewGame={startNewGame}
              user={user}
              isLoggedIn={isLoggedIn}
              login={login}
              register={register}
              resume={resume}
              isPaused={isPaused}
            />
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

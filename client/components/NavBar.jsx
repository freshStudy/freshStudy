import React from 'react';

export default ({ user, isLoggedIn, logout, isPlaying, pause, returnToMainMenu }) => {
  return (
    <div id="navbar">
      <div id="navbar-title">Fresh Study</div>
      <div className="navbar-login-container">
      {isPlaying && isLoggedIn
        && (
          <>
            <div>Playing as {user.username}</div>
            <button onClick={() => {logout(true); returnToMainMenu(); }}>Log Out</button>
          </>
        )}
      {isPlaying && !isLoggedIn
        && (
          <>
            <div className="playingAsGuestonGamePage">Playing as Guest</div>
            <button onClick={() => pause()} className="signInGamePage">Sign In</button>
          </>
        )}
      {!isPlaying && isLoggedIn
        && (
          <button onClick={() => {logout(true); returnToMainMenu(); }}>Log Out</button>
        )}
        </div>
    </div>
  )
}
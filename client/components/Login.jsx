import React, { useState } from 'react';


export default ({
  login,
  handleToggle,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) login(username, password);
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
      <div style={{ marginTop: '40px',
                    width: '100%',
                    textAlign: 'center'
                    }}>Don't have an account?
        <button type="button" onClick={handleToggle}>Create Account Here!</button>
      </div>
      </>
  );
};

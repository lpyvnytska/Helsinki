import React from 'react';

const LoginForm = ({
  handleLogin,
  handlePasswordChange,
  handleUserNameChange,
  username,
  password,
}) => {
  return (
    <form method='POST' onSubmit={(event) => handleLogin(event)}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={(event) => handleUserNameChange(event)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={(event) => handlePasswordChange(event)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;

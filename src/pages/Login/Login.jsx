import { Button, FormControl, InputLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useStore from '../../stores/useRequestStore';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { userId, login } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate('/');
    }
  }, [userId]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: 20,
      }}>
      <h1>Login</h1>
      <FormControl
        sx={{
          minWidth: 120,
        }}>
        <InputLabel id='username-label'></InputLabel>
        <TextField
          labelId='username-label'
          id='username'
          value={username}
          label='Username'
          onChange={(e) => {
            setUsername(e.target.value);
          }}></TextField>
      </FormControl>
      <FormControl
        sx={{
          minWidth: 120,
        }}>
        <InputLabel id='password-label'></InputLabel>
        <TextField
          labelId='password-label'
          id='password'
          value={password}
          label='Password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}></TextField>
      </FormControl>
      <Button
        variant='contained'
        onClick={() => {
          login(username, password);
        }}>
        Login
      </Button>
      <Button
        variant='contained'
        onClick={() => {
          navigate('/signup');
        }}>
        dont have an account?
      </Button>
    </div>
  );
};

export default Login;

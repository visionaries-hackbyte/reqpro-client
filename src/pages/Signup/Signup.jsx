import { Button, FormControl, InputLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useStore from '../../stores/useRequestStore';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { userId, signUp } = useStore();
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
      <h1>Signup</h1>
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
          signUp(username, password);
        }}>
        Signup
      </Button>
      <Button
        variant='contained'
        onClick={() => {
          navigate('/login');
        }}>
        alreaady have an account?
      </Button>
    </div>
  );
};

export default Signup;

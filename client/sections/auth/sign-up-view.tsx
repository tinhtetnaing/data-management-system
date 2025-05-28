import React from 'react';
import { useState } from 'react';
import Head from 'next/head';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Iconify } from '../../components/iconify';

// ----------------------------------------------------------------------

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function SignUpView() {
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (!PASSWORD_REGEX.test(value)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      );
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordError('');

    if (!validatePassword(password)) {
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, { name, email, password });
      router.push('/?message=Registration successful! Please sign in.');
    } catch (err) {
      setError(err.response?.data.message || 'Registration failed');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const renderForm = (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
          {error}
        </Alert>
      )}
      <TextField
        fullWidth
        required
        name="name"
        label="Name"
        sx={{ mb: 3 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        required
        name="email"
        type="email"
        label="Email address"
        sx={{ mb: 3 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        required
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        error={!!passwordError}
        helperText={passwordError}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={password}
        onChange={handlePasswordChange}
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
      >
        Sign Up
      </Button>
    </Box>
  );

  return (
    <>
      <Head>
        <title>Sign Up | Data Management System</title>
      </Head>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign Up</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Already have an account? 
          <Link href="/" variant="subtitle2" sx={{ ml: 0.5 }}>
            Sign In
          </Link>
        </Typography>
      </Box>
      {renderForm}
      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
        </Typography>
      </Divider>
    </>
  );
}

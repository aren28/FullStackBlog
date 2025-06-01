'use client';

import React, { useState } from 'react';
import { login } from './actions';
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Divider,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import ForgotPassword from '@/app/components/ForgotPassword';
import { GoogleIcon } from '@/app/components/SocialIcons';
import AppTheme from '@/app/shard-theme/AppTheme';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
  height: 'calc((1 - var(--template-frame-height, 0)) * (100dvh - 1px))',
  minHeight: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'url(img/login_bg.png)',
    backgroundRepeat: 'round',
  },
}));

const Register = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateInputs = (email: string, password: string) => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('有効なメールアドレスを入力してください。');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('パスワードは6文字以上である必要があります。');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);

    const valid = validateInputs(data.get('email') as string, data.get('password') as string);

    console.log('handleSubmit', emailError, passwordError);

    if (emailError || passwordError) {
      console.log('入力エラーがあります。');
      return;
    }

    if (!valid) {
      console.log('入力が無効です。');
      return;
    }

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    try {
      event.preventDefault();
      await login(data);
    } catch (error) {
      console.error('ログイン失敗:', error);
    }
  };

  return (
    <AppTheme>
      <CssBaseline />
      <SignInContainer>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            ログイン画面
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            method="post"
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email" sx={{ color: 'white' }}>
                Eメールアドレス
              </FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                slotProps={{
                  input: {
                    sx: {
                      backgroundColor: 'white',
                      '&::placeholder': {
                        color: 'gray',
                      },
                    },
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" sx={{ color: 'white' }}>
                パスワード
              </FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                slotProps={{
                  input: {
                    sx: {
                      backgroundColor: 'white',
                      '&::placeholder': {
                        color: 'gray',
                      },
                    },
                  },
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="情報を保存する(TEST MODE)"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button type="submit" fullWidth variant="contained">
              ログイン
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              パスワードお忘れですか?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Googleでサインイン
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              アカウント登録しますか？{' '}
              <Link href="#" variant="body2" sx={{ alignSelf: 'center' }}>
                無料登録
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
};

export default Register;

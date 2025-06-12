'use client';

import React, { useState } from 'react';
import { signup } from '../actions';
import { ToastContainer } from 'react-toastify';
import {
  Box,
  Button,
  CssBaseline,
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
import AppTheme from '@/shard-theme/AppTheme';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';

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

const SignUpContainer = styled(Stack)(({ theme }) => ({
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
    backgroundImage: 'url(/img/common_bg.png)',
    backgroundRepeat: 'round',
  },
}));

const SignUp = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const router = useRouter();
  const { showSuccess, showInfo } = useToast();

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
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const valid = validateInputs(data.get('email') as string, data.get('password') as string);

    if (emailError || passwordError) {
      console.log('入力エラーがあります。');
      return;
    }

    if (!valid) {
      console.log('入力が無効です。');
      return;
    }

    showInfo('アカウント登録中...');

    try {
      event.preventDefault();
      await signup(data);
      showSuccess('アカウント登録が完了しました。ログインしてください。');
      router.push('/auth/login');
    } catch (error) {
      console.error('ログイン失敗:', error);
    }
  };

  return (
    <AppTheme>
      <CssBaseline />
      <ToastContainer />
      <SignUpContainer>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            無料登録画面
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
                      color: 'black',
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
                      color: 'black',
                      '&::placeholder': {
                        color: 'gray',
                      },
                    },
                  },
                }}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              無料登録
            </Button>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              アカウント登録してますか？{' '}
              <Link href="/auth/login" variant="body2" sx={{ alignSelf: 'center' }}>
                ログイン
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
};

export default SignUp;

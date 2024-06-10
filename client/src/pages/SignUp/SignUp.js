import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './SignUp.module.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import services from '../../util/services';
import { decodeJWToken } from '../../util/helperFunc';
import { userActions } from '../../store/userSlice';
import Spinner from '../../components/Spinner/Spinner';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState();
  const id = location.state?.id;

  const fetchAllData = async (id) => {
    try {
      const result = await services.findUserById(id);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(id){
      fetchAllData(id);
    }
  }, [id]);

  

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const loginInfo = {
        ...(id && { id }),
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        ...(!id && { password: data.get('password') })
      };

      console.log(loginInfo)
      const result = await services.postUser(loginInfo);

      let token = result.data;
      localStorage.setItem('token', token);
      const userDoc = decodeJWToken(token);
      dispatch(
        userActions.login({
          user: userDoc,
        })
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div className={styles.SignUp}>
      
      <ThemeProvider theme={defaultTheme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size='small'
                    autoComplete='given-name'
                    name='firstName'
                    defaultValue={data ? data.firstName : ''}
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size='small'
                    required
                    fullWidth
                    id='lastName'
                    defaultValue={data ? data.lastName : ''}
                    label='Last Name'
                    name='lastName'
                    autoComplete='family-name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size='small'
                    required
                    fullWidth
                    defaultValue={data ? data.email : ''}
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                  />
                </Grid>
                {!id && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        size='small'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='new-password'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox value='allowExtraEmails' color='primary' />
                        }
                        label='I want to receive inspiration, marketing promotions and updates via email.'
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                {id ? 'Update' : 'Sign Up'}
              </Button>
              {!id && (
                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <Link href='/login' variant='body2'>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      
    </div>
  );
};

export default SignUp;

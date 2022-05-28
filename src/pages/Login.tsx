import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { grey } from '@mui/material/colors';

import { setIn, ValidationErrors } from 'final-form';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { ValidationError } from 'yup';
import {
  fetchProfile,
  loginUser,
  setAccessToken
} from '../services/auth.service';
import {
  AuthResponse,
  AuthUser,
  authUserSchema,
  userSchema
} from '../types/validation/UserSchema';

import { setUser } from '../features/user/userSlice';
import { useStateDispatch } from '../features/store';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useStateDispatch();

  const onSubmit = async (formData: AuthUser) => {
    setLoading(true);
    try {
      console.log({ formData });

      const response = await loginUser(formData);
      const data: AuthResponse = await response.json();

      if (response.status !== 200) {
        setSnackbarMessage(data.message!);
        setLoading(false);
        setSnackbar(true);
      } else {
        setAccessToken(data.token);

        const profile = await fetchProfile();

        dispatch(setUser(profile.result));
        setLoading(false);
        navigate('/profile');
      }

      console.log({ response, data });
    } catch (error: any) {
      setLoading(false);
      setSnackbarMessage(error.message || error);
      setSnackbar(true);
    }
  };

  const validate = async (values: AuthUser) => {
    try {
      await authUserSchema.validate(values, { abortEarly: false });
    } catch (e: any) {
      const errorsObject = e.inner?.reduce(
        (errors: ValidationErrors, error: ValidationError) => {
          return setIn(errors as object, error.path!, error.message);
        },
        {}
      );

      console.log({ errorsObject });

      return errorsObject;
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Container maxWidth='xs'>
        <Typography variant='h4' marginTop={4} marginBottom={4}>
          Войти
        </Typography>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Stack spacing={2} justifyContent='center'>
                <Field name='email'>
                  {(props) => (
                    <TextField
                      type='email'
                      variant='standard'
                      label='Email'
                      name={props.input.name}
                      value={props.input.value}
                      error={!!props.meta.error}
                      helperText={props.meta.error}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>

                <Field name='password'>
                  {(props) => (
                    <FormControl error={!!props.meta.error} variant='standard'>
                      <InputLabel htmlFor='filled-adornment-password'>
                        Пароль
                      </InputLabel>
                      <Input
                        id='filled-adornment-password'
                        type={showPassword ? 'text' : 'password'}
                        value={props.input.value}
                        onChange={props.input.onChange}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      ></Input>
                      <FormHelperText>{props.meta.error}</FormHelperText>
                    </FormControl>
                  )}
                </Field>
                <Box sx={{ m: 1, position: 'relative', width: 'min-content' }}>
                  <Button type='submit' variant='contained' disabled={loading}>
                    Войти
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: grey['A700'],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px'
                      }}
                    />
                  )}
                </Box>
              </Stack>
            </form>
          )}
        />
      </Container>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbar}
        onClose={() => setSnackbar(false)}
        message={snackbarMessage}
      />
    </>
  );
}

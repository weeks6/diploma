import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
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
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import { registerUser } from '../services/auth.service';
import { setupSystem } from '../services/system.service';
import { User, userSchema } from '../types/validation/UserSchema';

const Setup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formData: User) => {
    setLoading(true);
    try {
      const response = await setupSystem(formData);
      console.log({ response });
      if (response.status === 200) {
        navigate('/login');
      } else {
        setSnackbar(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const validate = async (values: User) => {
    try {
      await userSchema.validate(values, { abortEarly: false });
    } catch (e: any) {
      const errorsObject = e.inner.reduce(
        (errors: ValidationErrors, error: ValidationError) => {
          return setIn(errors as object, error.path!, error.message);
        },
        {}
      );

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
      <Container maxWidth='md'>
        <Typography variant='h4' marginTop={4}>
          Установка системы
        </Typography>
        <Typography variant='h5' marginBottom={2}>
          Профиль администратора
        </Typography>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Stack spacing={2} justifyContent='center'>
                    <Field name='name'>
                      {(props) => (
                        <TextField
                          type='text'
                          variant='standard'
                          label='Ф.И.О'
                          name={props.input.name}
                          value={props.input.value}
                          error={!!props.meta.error}
                          helperText={props.meta.error}
                          onChange={props.input.onChange}
                        />
                      )}
                    </Field>

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
                        <FormControl
                          error={!!props.meta.error}
                          variant='standard'
                        >
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
                    <Box
                      sx={{ m: 1, position: 'relative', width: 'fit-content' }}
                    >
                      <Button
                        type='submit'
                        variant='contained'
                        disabled={loading}
                      >
                        Создать
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
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbar}
        onClose={() => setSnackbar(false)}
        message='При создании аккаунт произошла ошибка'
      />
    </>
  );
};

export default Setup;

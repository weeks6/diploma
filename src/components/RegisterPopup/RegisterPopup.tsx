import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogActionsProps,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  Stack,
  TextField
} from '@mui/material';
import { setIn, ValidationErrors } from 'final-form';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { ValidationError } from 'yup';
import { registerUser } from '../../services/auth.service';
import { User, userSchema } from '../../types/validation/UserSchema';

type TProps = {
  opened: boolean;
  onSuccessSubmit: () => void;
  onClose: any;
};

const RegisterPopup = ({ opened, onClose, onSuccessSubmit }: TProps) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const onSubmit = async (formData: User) => {
    setLoading(true);
    try {
      const response = await registerUser(formData);
      onSuccessSubmit();
      console.log({ response });
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
      <Dialog open={opened} onClose={onClose} fullWidth={true} maxWidth='md'>
        <DialogTitle>Новый пользователь</DialogTitle>
        <DialogContent>
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
                </Stack>
                <DialogActions>
                  <Button onClick={onClose} type='button' disabled={loading}>
                    Отмена
                  </Button>
                  <Button type='submit' disabled={loading}>
                    Создать
                  </Button>
                </DialogActions>
              </form>
            )}
          />
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbar}
        onClose={() => setSnackbar(false)}
        message='При создании аккаунт произошла ошибка'
      />
    </>
  );
};

export default RegisterPopup;

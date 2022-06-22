import Delete from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
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
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

import { grey } from '@mui/material/colors';

import { setIn, ValidationErrors } from 'final-form';
import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { ValidationError } from 'yup';
import RegisterPopup from '../components/RegisterPopup/RegisterPopup';
import {
  deleteUser,
  makeAdminUser,
  registerUser,
  userList
} from '../services/auth.service';
import { User, userSchema } from '../types/validation/UserSchema';

export default function Register() {
  const [opened, setOpened] = useState(false);
  const [users, setUsers] = useState([]);

  const handleClickOpen = () => {
    setOpened(true);
  };

  const handlePopupClose = () => {
    setOpened(false);
  };

  const onSuccessSubmit = () => {
    init();
    handlePopupClose();
  };

  const onUserDelete = async (id: number) => {
    try {
      await deleteUser(id);
      init();
    } catch (error) {
      console.log(error);
    }
  };

  const onUserAdmin = async (id: number) => {
    try {
      await makeAdminUser(id);
      init();
    } catch (error) {
      console.log(error);
    }
  };

  const init = async () => {
    try {
      const users = await userList();

      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Container>
        <Grid container gap={4} marginTop={2} marginBottom={2}>
          <Grid item>
            <Typography variant='h6'>Пользователи</Typography>
          </Grid>
          <Grid item>
            <Button variant='contained' size='small' onClick={handleClickOpen}>
              Создать пользователя
            </Button>
          </Grid>
          <RegisterPopup
            opened={opened}
            onClose={handlePopupClose}
            onSuccessSubmit={onSuccessSubmit}
          />
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='Таблица пользователей'>
            <TableHead>
              <TableRow>
                <TableCell>Имя</TableCell>
                <TableCell>Почта</TableCell>
                <TableCell>Роль</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.role !== 'ADMIN' && (
                      <IconButton
                        aria-label='Сделать администратором'
                        onClick={() => onUserAdmin(user.id)}
                      >
                        <AdminPanelSettings />
                      </IconButton>
                    )}
                  </TableCell>

                  <TableCell>
                    {user.role !== 'ADMIN' && (
                      <IconButton
                        aria-label='Удалить'
                        onClick={() => onUserDelete(user.id)}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

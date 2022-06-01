import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { useState } from 'react';
import { removeAccessToken } from '../../services/auth.service';
import { useStateDispatch } from '../../features/store';
import { initialUserState, setUser } from '../../features/user/userSlice';

export default function Appbar() {
  const { user, loggedIn, isAdmin } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useStateDispatch();

  const logoutUser = () => {
    removeAccessToken();
    dispatch(setUser(initialUserState));
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {location.pathname !== '/setup' && (
        <AppBar position='static'>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
              {/* <Button color='inherit' sx={{ mr: 1 }} component={Link} to='/'>
                Главная
              </Button> */}

              {/* {loggedIn && (
                <Button
                  color='inherit'
                  sx={{ mr: 1 }}
                  component={Link}
                  to='/profile'
                >
                  Профиль
                </Button>
              )} */}

              {loggedIn && (
                <Button
                  color='inherit'
                  sx={{ mr: 1 }}
                  component={Link}
                  to='/inventory'
                >
                  Оборудование
                </Button>
              )}

              {!loggedIn && (
                <Button
                  color='inherit'
                  sx={{ mr: 1 }}
                  component={Link}
                  to='/login'
                >
                  Вход
                </Button>
              )}
              {loggedIn && isAdmin && (
                <Button color='inherit' component={Link} to='/register'>
                  Пользователи
                </Button>
              )}
            </Box>
            {loggedIn && (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  variant='outlined'
                  color='inherit'
                  sx={{ mr: 1 }}
                  onClick={logoutUser}
                >
                  Выйти
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
}

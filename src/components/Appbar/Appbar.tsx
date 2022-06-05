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
import {
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';

const NavigationMenu = () => {
  const { user, loggedIn, isAdmin } = useUser();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid container={fullScreen}>
      {!loggedIn && (
        <Grid item>
          <ListItemButton color='inherit' component={Link} to='/login'>
            <ListItemText>Вход</ListItemText>
          </ListItemButton>
        </Grid>
      )}

      {loggedIn && (
        <Grid item>
          <ListItemButton color='inherit' component={Link} to='/inventory'>
            <ListItemText>Оборудование</ListItemText>
          </ListItemButton>
        </Grid>
      )}
      {loggedIn && isAdmin && (
        <Grid item>
          <ListItemButton color='inherit' component={Link} to='/register'>
            <ListItemText>Пользователи</ListItemText>
          </ListItemButton>
        </Grid>
      )}
    </Grid>
  );
};

export default function Appbar() {
  const { user, loggedIn, isAdmin } = useUser();

  const location = useLocation();
  const navigate = useNavigate();

  const [drawer, setDrawer] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useStateDispatch();

  const logoutUser = () => {
    removeAccessToken();
    dispatch(setUser(initialUserState));
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {location.pathname !== '/setup' && location.pathname !== '/login' && (
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

              {!fullScreen && <NavigationMenu />}
              {fullScreen && (
                <>
                  <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }}
                    onClick={(event) => setDrawer(true)}
                  >
                    <MenuIcon />
                  </IconButton>

                  <Drawer
                    anchor='left'
                    open={drawer}
                    onClose={(event: any, reason: any) => setDrawer(false)}
                  >
                    <Box
                      role='presentation'
                      onClick={() => setDrawer(false)}
                      onKeyDown={() => setDrawer(false)}
                      sx={{ width: 250 }}
                    >
                      <List>
                        <NavigationMenu />
                      </List>
                    </Box>
                  </Drawer>
                </>
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

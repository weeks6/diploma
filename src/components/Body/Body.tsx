import { useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import { useStateDispatch } from '../../features/store';
import { setUser } from '../../features/user/userSlice';
import { fetchProfile, getAccessToken } from '../../services/auth.service';
import { checkSystem } from '../../services/system.service';

import Home from '../../pages/Home';
import Inventory from '../../pages/Inventory';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import Register from '../../pages/Register';
import Setup from '../../pages/Setup';
import InventoryItem from '../../pages/InventoryItem';

const Body = () => {
  const dispatch = useStateDispatch();
  const navigate = useNavigate();

  const init = async () => {
    if (!(await checkSystem())) {
      navigate('/setup');
      return;
    }

    if (getAccessToken()) {
      try {
        const profile = await fetchProfile();
        dispatch(setUser(profile.result));
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/inventory' />} />
        <Route path='/setup' element={<Setup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/inventory/:id' element={<InventoryItem />} />
      </Routes>
    </>
  );
};

export default Body;

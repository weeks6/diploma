import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from '../../types/validation/UserSchema';

interface UserState {
  email: string;
  id: number;
  name: string;
  role: UserRole;
}

export const initialUserState: UserState = {
  email: '',
  id: -1,
  name: '',
  role: 'USER'
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { email, id, name, role } = action.payload;
      console.log({ action });

      state.email = email;
      state.id = id;
      state.name = name;
      state.role = role;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

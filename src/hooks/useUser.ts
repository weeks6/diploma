import { useStateSelector } from '../features/store';

const useUser = () => {
  const user = useStateSelector((state) => state.user);

  const loggedIn = user.id > -1;
  const isAdmin = user.role === 'ADMIN';

  return { user, isAdmin, loggedIn };
};

export default useUser;

import { Container } from '@mui/material';
import { useStateSelector } from '../features/store';
import useUser from '../hooks/useUser';

const Profile = () => {
  const { user } = useUser();

  return (
    <>
      <Container>{user.email}</Container>
    </>
  );
};

export default Profile;

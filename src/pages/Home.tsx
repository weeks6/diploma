import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10%',
        marginBottom: '10%'
      }}
    >
      <Typography variant='h3' alignSelf='center'>
        Добро пожаловать!
      </Typography>
    </Box>
  );
};

export default Home;

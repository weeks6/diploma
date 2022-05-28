import { Provider } from 'react-redux';
import Appbar from './components/Appbar/Appbar';
import store from './features/store';
import Body from './components/Body/Body';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1e5dd1'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Appbar />
        <Body />
      </Provider>
    </ThemeProvider>
  );
}

export default App;

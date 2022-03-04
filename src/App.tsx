import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Navigation } from './routes/Navigation';

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0c1322'
    },
    secondary: {
      main: '#4776e6',
    }
  },
});


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </>
  );
}

export default App;

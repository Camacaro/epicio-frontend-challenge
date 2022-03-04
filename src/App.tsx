import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { MainLayout } from './layout';
import { Navigation } from './routes/Navigation';
import { LoadingScreen } from './components/LoadingScreen';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0c1322'
    },
    secondary: {
      main: '#4776e6',
    },
    background: {
      paper: '#4e88c7',
    },
    text: {
      primary: '#ffffff',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LoadingScreen />} >
      <BrowserRouter>
        <MainLayout>
          <Navigation />
        </MainLayout>
      </BrowserRouter>
    </Suspense>
  </ThemeProvider>
  );
}

export default App;

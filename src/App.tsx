import { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';

import { LoadingScreen } from './components/LoadingScreen';
import { MainLayout } from './layout';
import { Navigation } from './routes/Navigation';
import { theme } from './theme/theme';
import { VideoProvider } from './context/VideoContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LoadingScreen />} >
        <HashRouter>
          <MainLayout>
            <VideoProvider>
              <Navigation />
            </VideoProvider>
          </MainLayout>
        </HashRouter>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;

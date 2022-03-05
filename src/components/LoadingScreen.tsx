import { useEffect } from 'react';
import { Box } from '@mui/material';

import NProgress from 'nprogress';

import { useStyle } from '../hooks/useStyle';

export const LoadingScreen = () => {
  const {styleLoading}  = useStyle();

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={styleLoading}
    />
  );
};
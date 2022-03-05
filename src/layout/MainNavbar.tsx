import {
  AppBar,
  Box,
  Toolbar,
  Link,
  Divider,
} from '@mui/material';
import { 
  Link as RouterLink,
} from 'react-router-dom';
import { useStyle } from '../hooks/useStyle';

export const MainNavbar = () => {
  const { styleDivider, styleLink } = useStyle()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ minHeight: 64 }}>

          <img width="100px" src="static/logo-epic-io-01.svg" alt='asd' />

          <Box flexGrow={1} />

          <Link
            component={RouterLink}
            to="/about"
            underline="none"
            sx={styleLink}
          >
            Sobre el Proyecto
          </Link>

          <Divider 
            sx={styleDivider}
          />

          <Link
            component={RouterLink}
            to="/video"
            underline="none"
            sx={styleLink}
            
          >
            Video
          </Link>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

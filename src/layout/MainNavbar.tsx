import {
  AppBar,
  Box,
  Toolbar,
  Link,
  Divider,
  SxProps,
  Theme
} from '@mui/material';
import { 
  Link as RouterLink,
} from 'react-router-dom';

const styleLink: SxProps<Theme> = [
  {
    color: 'white',
  },
  (theme: Theme) => ({
    '&:hover': {
      color: theme.palette.secondary.main
    },
  })
]

export const MainNavbar = () => {

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
            About Project
          </Link>

          <Divider 
            sx={{
              color: 'white',
              width: 0.001,
              backgroundColor: 'white',
              height: 15,
              marginLeft: 2,
              marginRight: 2,
            }}
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

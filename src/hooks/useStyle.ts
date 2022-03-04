import {
  SxProps,
  Theme
} from '@mui/material';

export const useStyle = () => {

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

  const styleDivider: SxProps<Theme> = {
    color: 'white',
    width: 0.001,
    backgroundColor: 'white',
    height: 15,
    marginLeft: 2,
    marginRight: 2,
  }

  const styleLoading: SxProps<Theme> = {
    minHeight: '100%',
    backgroundColor: 'background.paper',
  }

  return {
    styleLink,
    styleDivider,
    styleLoading
  }
}
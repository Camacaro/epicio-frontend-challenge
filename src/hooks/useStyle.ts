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

  const stylePage: SxProps<Theme> = [
    (theme: Theme) => ({
      backgroundColor: theme.palette.background.paper,
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    })
  ]

  const styleListCardVideo: SxProps<Theme> = [
    {
      display: 'flex', 
      maxWidth: '400px',
      width: '100%',
    },
    (theme: Theme) => ({
      '&:hover': {
        cursor: 'pointer'
      },
    })
  ]

  return {
    styleLink,
    styleDivider,
    styleLoading,
    stylePage,
    styleListCardVideo
  }
}
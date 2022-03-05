import {
  Grid,
  IconButton
} from "@mui/material";

import {
  FastRewind as FastRewindIcon
} from '@mui/icons-material';

import { useStyle } from '../../../../../hooks/useStyle';

export const Control = () => {
  const {controlIcons} = useStyle()

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={{ padding: 16 }}
    >
      <IconButton
        // onClick={onRewind}
        sx={controlIcons}
        aria-label="rewind"
      >
        <FastRewindIcon
          sx={controlIcons}
          fontSize="inherit"
        />
      </IconButton>
    </Grid>
  )
}

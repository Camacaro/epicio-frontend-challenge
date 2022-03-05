import { 
  Grid,
  IconButton
} from "@mui/material";
import {
  FastRewind as FastRewindIcon,
  FastForward as FastForwardIcon,
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';

import { useStyle } from "../../../../../hooks/useStyle";
import { IRewinPauseForwardProps } from "../../../../../ts/interfaces";


export const RewinPauseForward = ({
  playing,
  onPlayPause,
  onRewind,
  onFastForward,
}: IRewinPauseForwardProps) => {

  const {controlIcons} = useStyle()

  return (
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <IconButton
        onClick={onRewind}
        sx={controlIcons}
        aria-label="rewind"
      >
        <FastRewindIcon
          sx={controlIcons}
          fontSize="inherit"
        />
      </IconButton>
      <IconButton
        onClick={onPlayPause}
        sx={controlIcons}
        aria-label="play"
      >
        {playing ? (
          <PauseIcon fontSize="inherit" />
        ) : (
          <PlayArrowIcon fontSize="inherit" />
        )}
      </IconButton>
      <IconButton
        onClick={onFastForward}
        sx={controlIcons}
        aria-label="forward"
      >
        <FastForwardIcon fontSize="inherit" />
      </IconButton>
    </Grid>
  )
}

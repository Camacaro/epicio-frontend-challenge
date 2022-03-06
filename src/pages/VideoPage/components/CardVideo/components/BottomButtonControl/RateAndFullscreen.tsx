import { useState } from "react";

import {
  Grid,
  IconButton,
  Button,
  Typography,
  Popover
} from "@mui/material";

import {
  Fullscreen as FullscreenIcon,
} from '@mui/icons-material';

import { IRateAndFullscreenProps } from "../../../../../../ts/interfaces";

export const RateAndFullscreen = ({
  playbackRate,
  refParentContainer,
  onMutateState,
  onToggleFullScreen
}: IRateAndFullscreenProps) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const onPlaybackRateChange = (rate: number) => onMutateState({ playbackRate: rate });
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Grid item>
      <Button
        onClick={handleClick}
        aria-describedby={id}
        className={'BottomControls__BottomIcons'}
        variant="text"
      >
        <Typography>{playbackRate}X</Typography>
      </Button>

      <Popover
        container={refParentContainer.current}
        open={open}
        id={id}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid container direction="column-reverse">
          {[0.5, 1, 1.5, 2].map((rate) => (
            <Button
              key={rate}
              onClick={() => onPlaybackRateChange(rate)}
              variant="text"
            >
              <Typography
                sx={{
                  color: `${rate === playbackRate ? "red" : "white"}`,
                }}
              >
                {rate}X
              </Typography>
            </Button>
          ))}
        </Grid>
      </Popover>

      <IconButton
        onClick={onToggleFullScreen}
        className={'BottomControls__BottomIcons'}
      >
        <FullscreenIcon fontSize="large" />
      </IconButton>
    </Grid>
  )
}

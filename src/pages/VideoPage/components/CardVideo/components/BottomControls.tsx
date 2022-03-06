import { useState } from "react";

import {
  Grid,
  Slider,
  Box,
  IconButton,
  Button,
  Typography,
  Popover
} from "@mui/material";

import {
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  VolumeMute as VolumeMuteIcon,
  VolumeUp as VolumeUpIcon,
  VolumeDown as VolumeDownIcon,
  Fullscreen as FullscreenIcon,
} from '@mui/icons-material';

import { IBottomControlsProps } from "../../../../../ts/interfaces";

export const BottomControls = ({
  elapsedTime,
  played,
  playing,
  muted,
  volume,
  totalDuration,
  playbackRate,
  refParentContainer,
  onPlaybackRateChange,
  onSeek,
  onChangeDispayFormat,
  onSeekMouseDown,
  onSeekMouseUp,
  onDuration,
  onPlayPause,
  onMuted,
  onVolumeChange,
  onVolumeSeekDown,
  onToggleFullScreen,
}: IBottomControlsProps) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={{ padding: 16 }}
    >
      <Grid item xs={12}>
        <Box width={'100%'}>
          <Slider
            size="small"
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={onSeekMouseUp}
            sx={{
              color: 'white'
            }}
          />
        </Box>
      </Grid>

      <Grid item>
        <Grid container alignItems="center">
          <IconButton
            onClick={onPlayPause}
            className={'BottomControls__BottomIcons'}
          >
            {playing ? (
              <PauseIcon fontSize="large" />
            ) : (
              <PlayArrowIcon fontSize="large" />
            )}
          </IconButton>

          <IconButton
            onClick={onMuted}
            className={`BottomControls__BottomIcons`}
          >
            {muted ? (
              <VolumeMuteIcon fontSize="large" />
            ) : volume > 0.5 ? (
              <VolumeUpIcon fontSize="large" />
            ) : (
              <VolumeDownIcon fontSize="large" />
            )}
          </IconButton>

          <Slider
            min={0}
            max={100}
            value={muted ? 0 : volume * 100}
            onChange={onVolumeChange}
            onMouseDown={onSeekMouseDown}
            onChangeCommitted={onVolumeSeekDown}
            sx={{
              color: 'white',
              width: 100
            }}
          />

          <Button
            variant="text"
            onClick={onChangeDispayFormat}
          >
            <Typography
              variant="body1"
              style={{ color: "#fff", marginLeft: 16 }}
            >
              {elapsedTime}/{totalDuration}
            </Typography>
          </Button>
        </Grid>
      </Grid>

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

    </Grid>
  )
}

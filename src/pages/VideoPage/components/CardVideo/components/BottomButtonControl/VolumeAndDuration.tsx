import {
  Grid,
  Slider,
  IconButton,
  Button,
  Typography
} from "@mui/material";

import {
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
  VolumeMute as VolumeMuteIcon,
  VolumeUp as VolumeUpIcon,
  VolumeDown as VolumeDownIcon,
} from '@mui/icons-material';

import { IVolumeAndDurationProps } from "../../../../../../ts/interfaces";
import { PERCENT_100 } from "../../../../../../ts/constant";

export const VolumeAndDuration = ({ 
  playing, 
  muted, 
  volume, 
  onChangeDispayFormat, 
  onMutateState, 
  elapsedTime, 
  totalDuration 
}: IVolumeAndDurationProps) => {

  const onPlayPause = () => onMutateState({ playing: !playing, oneTimeLight: true })
  const onSeekMouseDown = (e: any) => onMutateState({ seeking: true });
  const onMuted = () => onMutateState({ muted: !muted });

  const onVolumeChange = (event: Event, value: number|number[]) => {
    if(Array.isArray(value)) return;

    const newVolume = value / PERCENT_100;

    onMutateState({
      volume: parseFloat(newVolume.toString()),
      muted: value === 0 ? true : false,
    })
  }

  const onVolumeSeekDown = (e: any, newValue: any) => {
    if(Array.isArray(newValue)) return;

    const newVolume = newValue / PERCENT_100;

    onMutateState({
      seeking: false, 
      volume: parseFloat(newVolume.toString()) 
    });
  };

  return (
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
  )
}

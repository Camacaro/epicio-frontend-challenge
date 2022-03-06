import {
  Grid,
  Slider,
  Box
} from "@mui/material";

import { PERCENT_100 } from '../../../../../../ts/constant';
import { IProgressBarProps } from '../../../../../../ts/interfaces';

export const ProgressBar = ({ played, onMutateState, onSeekMouseUp }: IProgressBarProps) => {

  const onSeekMouseDown = (e: any) => onMutateState({ seeking: true });

  const onSeek = (e: Event, value: number|number[]) => {
    if(Array.isArray(value)) return;

    const newTime = value / PERCENT_100;
    onMutateState({ played: parseFloat(newTime.toString()) })
  }

  return (
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
  )
}

import {
  Grid,
  IconButton,
  Slider,
  Tooltip,
  Box
} from "@mui/material";

import { withStyles } from '@mui/styles';

import {
  FastRewind as FastRewindIcon
} from '@mui/icons-material';

import { useStyle } from '../../../../../hooks/useStyle';

const PrettoSlider: any = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const ValueLabelComponent = (props: any) => {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

export interface IBottomControlsProps {
  elapsedTime: string;
  played: number;
  onSeek: (e: any, newValue: any) => void;
  onChangeDispayFormat: (format: string) => void;
  onSeekMouseDown: (e: any) => void;
  onSeekMouseUp: (e: any, newValue: any) => void;
  onDuration: (e: number) => void;
}

export const BottomControls = ({
  elapsedTime,
  played,
  onSeek,
  onChangeDispayFormat,
  onSeekMouseDown,
  onSeekMouseUp,
  onDuration,
}: IBottomControlsProps) => {

  const {controlIcons} = useStyle()

  console.log({played})

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={{ padding: 16 }}
    >
      
      <Grid item xs={12}>
        {/* <PrettoSlider
          min={0}
          max={100}
          valuelabelcomponent={(props: any) => (
            <ValueLabelComponent {...props} value={elapsedTime} />
          )}
          aria-label="custom thumb label"
          value={played * 100}
          onChange={onSeek}
          onMouseDown={onSeekMouseDown}
          onChangeCommitted={onSeekMouseUp}
          onDuration={onDuration}
        /> */}

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

    </Grid>
  )
}

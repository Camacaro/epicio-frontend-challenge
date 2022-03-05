import {
  Grid,
  Slider,
  Box
} from "@mui/material";
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

    </Grid>
  )
}

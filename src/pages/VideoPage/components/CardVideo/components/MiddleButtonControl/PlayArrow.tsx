import { IconButton } from "@mui/material";
import { Pause as PauseIcon, PlayArrow as PlayArrowIcon } from '@mui/icons-material';

import { useStyle } from "../../../../../../hooks/useStyle";
import { IPlayArrowProps } from "../../../../../../ts/interfaces";

export const PlayArrow = ({ playing, onMutateState }: IPlayArrowProps) => {
  const {controlIcons} = useStyle()

  const onClick = () => {
    onMutateState({ playing: !playing, oneTimeLight: true });
  }

  return (
    <IconButton
      onClick={onClick}
      sx={controlIcons}
      aria-label="play"
    >
      {playing ? (
        <PauseIcon fontSize="inherit" />
      ) : (
        <PlayArrowIcon fontSize="inherit" />
      )}
    </IconButton>
  )
}

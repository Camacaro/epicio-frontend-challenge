import { IconButton } from "@mui/material";
import { FastForward as FastForwardIcon } from '@mui/icons-material';

import { useStyle } from "../../../../../../hooks/useStyle";
import { IFastForwardProps } from "../../../../../../ts/interfaces";

export const FastForward = ({ onFastForward }: IFastForwardProps) => {
  const {controlIcons} = useStyle()

  return (
    <IconButton
      onClick={onFastForward}
      sx={controlIcons}
      aria-label="forward"
    >
      <FastForwardIcon fontSize="inherit" />
    </IconButton>
  )
}

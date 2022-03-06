import {  IconButton } from "@mui/material";
import { FastRewind as FastRewindIcon } from '@mui/icons-material';

import { useStyle } from "../../../../../../hooks/useStyle";
import { IFastRewindProps } from "../../../../../../ts/interfaces";

export const FastRewind = ({onRewind}: IFastRewindProps) => {
  const {controlIcons} = useStyle()

  return (
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
  )
}

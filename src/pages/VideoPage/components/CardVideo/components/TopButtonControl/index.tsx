import { ReactElement } from "react";

import { 
  Grid,
} from "@mui/material";

interface ITopButtonControlProps {
  children: ReactElement | ReactElement[]
}

export const TopButtonControl = ({ children }: ITopButtonControlProps) => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent={'space-between'}
      style={{ padding: 16 }}
    >
      {children}
    </Grid>
  )
}

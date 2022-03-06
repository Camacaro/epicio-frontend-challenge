import { Grid } from "@mui/material";

import { IParentProps } from "../../../../../../ts/interfaces";

export const TopButtonControl = ({ children }: IParentProps) => {
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

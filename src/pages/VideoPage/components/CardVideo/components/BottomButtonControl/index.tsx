import {  Grid } from "@mui/material";
import { IParentProps } from "../../../../../../ts/interfaces";

export const BottomButtonControl = ({ children }: IParentProps) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={{ padding: 16 }}
    >
      {children}
    </Grid>
  )
}

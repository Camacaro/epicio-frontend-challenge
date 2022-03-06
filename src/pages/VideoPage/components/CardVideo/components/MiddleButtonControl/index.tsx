
import { 
  Grid,
} from "@mui/material";

import { IParentProps } from "../../../../../../ts/interfaces";

export const MiddleButtonControl = ({ children }: IParentProps) => {
  return (
    <Grid 
      container 
      direction="row" 
      alignItems="center" 
      justifyContent="center"
    >
      {children}
    </Grid>
  )
}

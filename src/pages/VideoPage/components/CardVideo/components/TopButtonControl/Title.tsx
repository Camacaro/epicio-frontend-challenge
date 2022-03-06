import { 
  Typography,
  Grid,
} from "@mui/material";

export const Title = ({title}: {title: string}) => {
  return (
    <Grid item>
      <Typography variant="h5" sx={{ color: "#fff" }}>
        {title}
      </Typography>
    </Grid>
  )
}

import { 
  Typography, 
  Grid,
  Card,
  CardHeader,
  Divider,
  Box
} from "@mui/material";
import { Page } from "../components/Page";

const CardVideo = () => {

  return (
    <Card
    >
      <CardHeader
        title="Productos más Vendidos"
      />
      <Divider />
      
      <Box
        minWidth={700}
        pt={4}
        pr={2}
        pl={2}
      >
        <Typography> CardVideo </Typography>
      </Box>
    </Card>
  )
}

export const VideoPage = () => {
  return (
    <>
      <Page title="Video">
        <Grid
          container
          spacing={3}
        >

          <Grid item lg={8} xl={9} xs={12}>
            <CardVideo />
          </Grid>

          <Grid item lg={4} xl={3} xs={12} >
            <CardVideo />
          </Grid>
        
        </Grid>
      </Page>
    </>
  )
}

export default VideoPage;
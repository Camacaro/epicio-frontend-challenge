import {
  Grid,
  Box
} from "@mui/material";
import { Page } from "../../components/Page";
// import { CardDescriptionVideo } from "./components/CardDescriptionVideo";
import { CardVideo } from "./components/CardVideo";
import { ListCardVideo } from './components/ListCardVideo';

export const VideoPage = () => {
  return (
    <>
      <Page title="Video">
        <Grid
          container
          spacing={3}
        >

          <Grid item lg={8} xl={8} xs={12}>
            <CardVideo />
          </Grid>

          {/* <Grid item lg={8} xl={9} xs={12}>
            <CardDescriptionVideo />
          </Grid> */}

          <Grid item lg={4} xl={4} xs={12}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
              <Box key={i} sx={{
                display: 'flex',
                justifyContent: 'end',
              }}>
                <Box marginY={1}>
                  <ListCardVideo />
                </Box>
              </Box>
            ))}
          </Grid>
        
        </Grid>
      </Page>
    </>
  )
}

export default VideoPage;
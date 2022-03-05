import {
  Grid,
  Box,
} from "@mui/material";
import { Page } from "../../components/Page";
import { SkeletonVideo } from "../../components/SkeletonVideo";
import { useVideoContext } from "../../context/VideoContext";
// import { CardDescriptionVideo } from "./components/CardDescriptionVideo";
import { CardVideo } from "./components/CardVideo";
import { ListCardVideo } from './components/ListCardVideo';

export const VideoPage = () => {
  const { isLoading, videoState } = useVideoContext();
  const { videoList } = videoState;

  if(isLoading) {
    return <SkeletonVideo />
  }

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
            {videoList.map((video, index) => (
              <Box key={`${video.title}_#${index}`} sx={{
                display: 'flex',
                justifyContent: 'end',
              }}>
                <Box marginY={1}>
                  <ListCardVideo video={video} />
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
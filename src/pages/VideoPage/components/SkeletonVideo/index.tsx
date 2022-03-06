import {
  Grid,
  Box,
  Skeleton
} from "@mui/material";

import { Page } from "../../../../components/Page";

export const SkeletonVideo = () => {
  return (
    <Page title="Video Cargando">
      <Grid
        container
        spacing={3}
      >
        <Grid item lg={8} xl={8} xs={12}>
          <Skeleton variant="rectangular" width={'100%'} height={350} sx={{
            backgroundColor: '#213359',
          }} />
  
          <Skeleton width={'100%'} height={60} sx={{
            backgroundColor: '#213359',
            marginTop: '5px',
          }} />
          <Skeleton width={'100%'} height={30} sx={{
            backgroundColor: '#213359',
            marginTop: '5px'
          }} />
          <Skeleton width={'100%'} height={30} sx={{
            backgroundColor: '#213359',
            marginTop: '5px'
          }} />
        </Grid>

        <Grid item lg={4} xl={4} xs={12}>
          {[1, 2, 3, 4].map(i => (
            <Box key={i} sx={{
              display: 'flex',
              justifyContent: 'end',
            }}>
              <Box marginY={1}>
                <Skeleton variant="rectangular" width={300} height={118} sx={{
                  backgroundColor: '#213359',
                }} />
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Page>
  )
}

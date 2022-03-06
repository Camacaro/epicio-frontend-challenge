import ReactPlayer from 'react-player'

import { 
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,  
} from "@mui/material";

import { BottomButtonControl } from './components/BottomButtonControl';
import { CardVideoProps } from '../../../../ts/interfaces';
import { FastForward } from './components/MiddleButtonControl/FastForward';
import { FastRewind } from './components/MiddleButtonControl/FastRewind';
import { MAX_LENGTH_DESCRIPTION } from '../../../../ts/constant';
import { MiddleButtonControl } from './components/MiddleButtonControl';
import { PlayArrow } from './components/MiddleButtonControl/PlayArrow';
import { ProgressBar } from './components/BottomButtonControl/ProgressBar';
import { RateAndFullscreen } from './components/BottomButtonControl/RateAndFullscreen';
import { Setting } from './components/TopButtonControl/Setting';
import { Title } from './components/TopButtonControl/Title';
import { TopButtonControl } from './components/TopButtonControl';
import { useCardVideo } from './hooks/useCardVideo';
import { VolumeAndDuration } from './components/BottomButtonControl/VolumeAndDuration';

export const CardVideo = ({ video }: CardVideoProps) => {
  const {
    controlsRef,
    cutDescription,
    elapsedTime,
    handleDisplayFormat,
    handleFastForward,
    handleMouseMove,
    handleProgress,
    handleRewind,
    handleSeekMouseUp,
    hanldeMouseLeave,
    isLight,
    onClickPreview,
    onClickShowMore,
    playerContainerRef,
    playerRef,
    showMoreDescription,
    state,
    toggleFullScreen,
    totalDuration,
    updateState,
  } = useCardVideo({ video });

  const { 
    brightness, 
    contrast, 
    muted, 
    playbackRate,
    played, 
    playing, 
    volume, 
  } = state;

  const { 
    description, 
    sources, 
    title 
  } = video;

  return (
    <Card elevation={0}> 
      <CardMedia 
        ref={playerContainerRef}
        id="card-media-player"
        sx={{
          position: 'relative',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={hanldeMouseLeave}
      >
        <ReactPlayer 
          controls={false}
          height={'100%'}
          light={isLight()}
          muted={muted}
          onClickPreview={onClickPreview}
          onProgress={handleProgress}
          playbackRate={playbackRate}
          playing={playing}
          ref={playerRef}
          stopOnUnmount={true}
          style={{
            filter: `brightness(${brightness}) contrast(${contrast})`,
          }}
          url={sources[0]}
          volume={volume}
          width={'100%'}
        />
        
        <div 
          className='CardMedia__ControlsWrapper'
          ref={controlsRef}
        >
          <Grid
            container
            direction="column"
            justifyContent={'space-between'}
            style={{ flexGrow: 1 }}
          >
            <TopButtonControl>
              <Title title={title} />

              <Setting 
                refParentContainer={playerContainerRef}
                defaultBrightness={brightness}
                defaultContrast={contrast}
                onMutateState={updateState}
              />
            </TopButtonControl>

            <MiddleButtonControl>
              <FastRewind onRewind={handleRewind} />

              <PlayArrow playing={playing} onMutateState={updateState} />
              
              <FastForward onFastForward={handleFastForward} />
            </MiddleButtonControl>

            <BottomButtonControl>
              <ProgressBar
                played={played}
                onMutateState={updateState}
                onSeekMouseUp={handleSeekMouseUp}
              />

              <VolumeAndDuration 
                playing={playing}
                muted={muted}
                volume={volume}
                onChangeDispayFormat={handleDisplayFormat}
                onMutateState={updateState}
                elapsedTime={elapsedTime}
                totalDuration={totalDuration}
              />

              <RateAndFullscreen
                playbackRate={playbackRate}
                refParentContainer={playerContainerRef}
                onMutateState={updateState}
                onToggleFullScreen={toggleFullScreen}
              />
            </BottomButtonControl>
          </Grid>
        </div>
      </CardMedia>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color={"primary"}>
          {title}
        </Typography>

        <Divider />
        
        <Box mt={2} sx={{
          maxWidth: '615px'
        }}>
          <Typography variant="body2" color="text.secondary">
            {cutDescription()}
          </Typography>
        </Box>
      </CardContent>

      {description.length > MAX_LENGTH_DESCRIPTION && (
        <CardActions>
          <Button size="small" onClick={onClickShowMore}>
            {
              showMoreDescription ? 'mostrar menos' : 'mostrar más'
            }
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

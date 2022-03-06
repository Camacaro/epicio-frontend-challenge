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

import { BottomControls } from './components/BottomControls';
import { CardVideoProps } from '../../../../ts/interfaces';
import { MAX_LENGTH_DESCRIPTION } from '../../../../ts/constant';
import { RewinPauseForward } from './components/RewinPauseForward';
import { TitleSetting } from './components/TitleSetting';
import { useCardVideo } from './hooks/useCardVideo';
import { Title } from './components/TopButtonControl/Title';
import { Setting } from './components/TopButtonControl/Setting';
import { TopButtonControl } from './components/TopButtonControl';
import { MiddleButtonControl } from './components/MiddleButtonControl';
import { FastRewind } from './components/MiddleButtonControl/FastRewind';
import { PlayArrow } from './components/MiddleButtonControl/PlayArrow';
import { FastForward } from './components/MiddleButtonControl/FastForward';
import { BottomButtonControl } from './components/BottomButtonControl';
import { ProgressBar } from './components/BottomButtonControl/ProgressBar';
import { VolumeAndDuration } from './components/BottomButtonControl/VolumeAndDuration';
import { RateAndFullscreen } from './components/BottomButtonControl/RateAndFullscreen';

export const CardVideo = ({ video }: CardVideoProps) => {
  const {
    controlsRef,
    cutDescription,
    elapsedTime,
    handleDisplayFormat,
    handleDuration,
    handleFastForward,
    handleMouseMove,
    handleMuted,
    handlePlaybackRate,
    handlePlayPause,
    handleProgress,
    handleRewind,
    handleSeekChange,
    handleSeekMouseDown,
    handleSeekMouseUp,
    handleSettings,
    handleVolumeChange,
    handleVolumeSeekDown,
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

  const { playing, brightness, contrast, played, muted, volume, playbackRate } = state;
  const { description, sources, title } = video;

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
          ref={playerRef}
          url={sources[0]}
          width={'100%'}
          height={'100%'}
          controls={false}
          stopOnUnmount={true}
          light={isLight()}
          onClickPreview={onClickPreview}
          playing={playing}
          onProgress={handleProgress}
          muted={muted}
          volume={volume}
          playbackRate={playbackRate}
          style={{
            filter: `brightness(${brightness}) contrast(${contrast})`,
          }}
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

            {/* <BottomControls
              refParentContainer={playerContainerRef}
              playing={playing}
              played={played}
              elapsedTime={elapsedTime}
              muted={muted}
              volume={volume}
              totalDuration={totalDuration}
              playbackRate={playbackRate}
              onSeek={handleSeekChange}
              onSeekMouseDown={handleSeekMouseDown}
              onChangeDispayFormat={handleDisplayFormat}
              onSeekMouseUp={handleSeekMouseUp}
              onDuration={handleDuration}
              onPlayPause={handlePlayPause}
              onMuted={handleMuted}
              onVolumeChange={handleVolumeChange}
              onVolumeSeekDown={handleVolumeSeekDown}
              onPlaybackRateChange={handlePlaybackRate}
              onToggleFullScreen={toggleFullScreen}
            /> */}
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

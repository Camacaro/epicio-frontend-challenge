import ReactPlayer from 'react-player'
import { useRef, useState } from 'react';

import { 
  Typography,  
  Card,
  Divider,
  Box,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid
} from "@mui/material";

import screenful from "screenfull";

import { SECONDS_10, MAX_LENGTH_DESCRIPTION } from '../../../../ts/constant';
import { CardVideoProps, IHandleSettings, IReactPlayerOnprogress } from '../../../../ts/interfaces';
import { TitleSetting } from './components/TitleSetting';
import { RewinPauseForward } from './components/RewinPauseForward';
import { BottomControls } from './components/BottomControls';
import { format } from './utils/format';

export const TIME_DISPLAY_NORNAL = 'normal';
export const TIME_DISPLAY_REMAINING = 'remaining';
export const STYLE_VISIBLE = 'visible';
export const STYLE_HIDDEN = 'hidden';
export const PERCENT_100 = 100;

export const CardVideo = ({ video }: CardVideoProps) => {
  const playerRef = useRef<any>(null);
  const countRef = useRef<number>(0);
  const playerContainerRef = useRef<any>(null);

  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [timeDisplayFormat, setTimeDisplayFormat] = useState(TIME_DISPLAY_NORNAL);

  const controlsRef = useRef<any>(null); // HTMLDivElement

  const [state, setState] = useState({
    playing: false,
    brightness: 1,
    contrast: 1,
    oneTimeLight: false,
    played: 0,
    seeking: false,
    duration: 0,
    muted: false,
    volume: 1,
    playbackRate: 1.0,
  })

  const { playing, brightness, contrast, oneTimeLight, played, muted, volume, playbackRate } = state;
  const { description, thumb, sources, title } = video;

  const onEnded = () => {
    // TODO aGregar el siguiente video
    console.log('Termino el video - agregar el cambio de video')
  }

  const onClickPreview = () => {
    setState(prev => ({
      ...prev, 
      playing: !prev.playing,
      oneTimeLight: true
    }))
  }

  const cutDescription = () => {
    if(showMoreDescription) return description;
    return description.substring(0, MAX_LENGTH_DESCRIPTION);
  }

  const onClickShowMore = () => setShowMoreDescription(!showMoreDescription);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    controlsRef.current.style.visibility = STYLE_VISIBLE;
    countRef.current = 0;
  }

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = STYLE_HIDDEN;
    countRef.current = 0;
  };

  const handleSettings = (setting: IHandleSettings) => {
    setState(prev => ({
      ...prev,
      brightness: setting.brightness,
      contrast: setting.contrast,
    }));
  }


  const isLight = () => {
    if(playing) return false;
    if(!oneTimeLight) return thumb;
    return false;
  }

  const handlePlayPause = () => setState(prev => ({...prev, playing: !prev.playing, oneTimeLight: true}));
  const handleRewind = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() - SECONDS_10);
  const handleFastForward = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() + SECONDS_10);

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === TIME_DISPLAY_NORNAL ? TIME_DISPLAY_REMAINING : TIME_DISPLAY_NORNAL
    );
  };

  const handleSeekMouseUp = (e:any, newValue: any) => {
    setState(prev => ({ ...prev, seeking: false }));
    playerRef.current.seekTo(newValue / PERCENT_100, "fraction");
  };

  const handleSeekChange = (e: any, newValue: string) => {
    const newTime = Number(newValue) / PERCENT_100;
    setState(prev => ({ ...prev, played: parseFloat(newTime.toString()) }));
  };

  const handleVolumeChange = (e: any, newValue: any) => {
    const newVolume = Number(newValue) / PERCENT_100;
    setState(prev => ({
      ...prev,
      volume: parseFloat(newVolume.toString()),
      muted: newValue === 0 ? true : false,
    }));
  };

  const handleVolumeSeekDown = (e: any, newValue: string) => {
    const newVolume = Number(newValue) / PERCENT_100;
    setState(prev => ({ 
      ...prev, 
      seeking: false, 
      volume: parseFloat(newVolume.toString()) 
    }));
  };

  const handleSeekMouseDown = (e: any) => setState({ ...state, seeking: true });
  const handleDuration = (duration: number) => setState({ ...state, duration });
  const handleMuted = () => setState(prev => ({ ...prev, muted: !prev.muted }));
  const toggleFullScreen = () => {

    screenful.toggle(playerContainerRef.current)
  }

  const handleProgress = (changeState: IReactPlayerOnprogress) => {
    if (countRef.current > 3) {
      controlsRef.current.style.visibility = STYLE_HIDDEN;
      countRef.current = 0;
    }
    if (controlsRef.current.style.visibility === STYLE_VISIBLE) {
      countRef.current += 1;
    }
    if (!state.seeking) {
      setState(prev => ({ ...prev, ...changeState }));
    }
  };

  const handlePlaybackRate = (rate: number) => {
    setState(prev => ({ ...prev, playbackRate: rate }));
  };

  const currentTime = (playerRef && playerRef.current) ? playerRef.current.getCurrentTime() : "00:00";
  const duration = (playerRef && playerRef.current) ? playerRef.current.getDuration() : "00:00";
  const elapsedTime = (timeDisplayFormat === TIME_DISPLAY_NORNAL) ? format(currentTime) : `-${format(duration - currentTime)}`;
  const totalDuration = format(duration);

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
          onEnded={onEnded}
          onClickPreview={onClickPreview}
          playing={playing}
          onDisablePIP={() => console.log('on Disable PIP')}
          onEnablePIP={() => console.log('on Enable PIP')}
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
            <TitleSetting
              title={title}
              refParentContainer={playerContainerRef}
              handleSettings={handleSettings}
              defaultBrightness={brightness}
              defaultContrast={contrast}
            />

            <RewinPauseForward
              playing={playing}
              onPlayPause={handlePlayPause}
              onRewind={handleRewind}
              onFastForward={handleFastForward}
            />

            <BottomControls
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
            />
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

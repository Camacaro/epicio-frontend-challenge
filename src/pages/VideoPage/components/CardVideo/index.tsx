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

export const CardVideo = ({ video }: CardVideoProps) => {
  const playerRef = useRef<any>(null);
  const countRef = useRef<number>(0);
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
  })

  const { playing, brightness, contrast, oneTimeLight, played } = state;
  const { description, thumb, sources, title } = video;

  const onEnded = () => {
    // TODO aGregar el siguiente video
    console.log('Termino el video - agregar el cambio de video')
  }

  const onClickPreview = () => {
    console.log('Click en preview')
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
    setState({ ...state, seeking: false });
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleSeekChange = (e: any, newValue: string) => {
    const newTime = Number(newValue) / 100;
    setState({ ...state, played: parseFloat(newTime.toString()) });
  };

  const handleSeekMouseDown = (e: any) => setState({ ...state, seeking: true });
  const handleDuration = (duration: number) => setState({ ...state, duration });

  const handleProgress = (changeState: IReactPlayerOnprogress) => {
    console.log('handleProgress', changeState);
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

  const currentTime = (playerRef && playerRef.current) ? playerRef.current.getCurrentTime() : "00:00";
  const duration = (playerRef && playerRef.current) ? playerRef.current.getDuration() : "00:00";
  const elapsedTime = (timeDisplayFormat === TIME_DISPLAY_NORNAL) ? format(currentTime) : `-${format(duration - currentTime)}`;

  return (
    <Card elevation={0}> 

      <CardMedia 
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
              played={played}
              elapsedTime={elapsedTime}
              onSeek={handleSeekChange}
              onSeekMouseDown={handleSeekMouseDown}
              onChangeDispayFormat={handleDisplayFormat}
              onSeekMouseUp={handleSeekMouseUp}
              onDuration={handleDuration}
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

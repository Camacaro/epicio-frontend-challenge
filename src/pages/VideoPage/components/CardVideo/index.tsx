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
import { CardVideoProps, IHandleSettings } from '../../../../ts/interfaces';
import { TitleSetting } from './components/TitleSetting';
import { RewinPauseForward } from './components/RewinPauseForward';
import { BottomControls } from './components/BottomControls';

export const CardVideo = ({ video }: CardVideoProps) => {
  const playerRef = useRef<any>(null);
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const controlsRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState({
    playing: false,
    brightness: 1,
    contrast: 1,
    oneTimeLight: false,
  })

  const { playing, brightness, contrast, oneTimeLight } = state;
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
    if(!controlsRef.current) return;

    controlsRef.current.style.visibility = "visible";
  }

  const hanldeMouseLeave = () => {
    if(!controlsRef.current) return;

    controlsRef.current.style.visibility = "hidden";
    // count = 0;
  };

  const handleSettings = (setting: IHandleSettings) => {
    setState(prev => ({
      ...prev,
      brightness: setting.brightness,
      contrast: setting.contrast,
    }));
  }

  const handlePlayPause = () => setState(prev => ({...prev, playing: !prev.playing, oneTimeLight: true}));

  const isLight = () => {
    if(playing) return false;
    if(!oneTimeLight) return thumb;
    return false;
  }

  const handleRewind = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() - SECONDS_10);
  const handleFastForward = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() + SECONDS_10);;

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
          controls
          stopOnUnmount={true}
          light={isLight()}
          onEnded={onEnded}
          onClickPreview={onClickPreview}
          playing={playing}
          onDisablePIP={() => console.log('on Disable PIP')}
          onEnablePIP={() => console.log('on Enable PIP')}
          onProgress={(e) => console.log('on Progress', e)}
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

            <BottomControls />
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

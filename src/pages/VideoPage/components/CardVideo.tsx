import ReactPlayer from 'react-player'
import { useState } from 'react';

import { 
  Typography,  
  Card,
  Divider,
  Box,
  CardMedia,
  CardContent,
  CardActions,
  Button
} from "@mui/material";
import { MAX_LENGTH_DESCRIPTION } from '../../../ts/constant';
import { CardVideoProps } from '../../../ts/interfaces';

export const CardVideo = ({ video }: CardVideoProps) => {
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const [state, setState] = useState({
    playing: false
  })

  const { playing } = state;
  const { description, thumb, sources, title } = video;

  const onEnded = () => {
    // TODO aGregar el siguiente video
    console.log('Termino el video - agregar el cambio de video')
  }

  const onClickPreview = () => {
    console.log('Click en preview')
    setState(prev => ({...prev, playing: !prev.playing}))
  }

  const cutDescription = () => {
    if(showMoreDescription) return description;
    return description.substring(0, MAX_LENGTH_DESCRIPTION);
  }

  const onClickShowMore = () => setShowMoreDescription(!showMoreDescription);

  return (
    <Card elevation={0}> 

      <CardMedia>
        <ReactPlayer 
          url={sources[0]}
          width={'100%'}
          height={'100%'}
          controls
          stopOnUnmount={true}
          light={thumb}
          onEnded={onEnded}
          onClickPreview={onClickPreview}
          playing={playing}
          onDisablePIP={() => console.log('on Disable PIP')}
          onEnablePIP={() => console.log('on Enable PIP')}
          onProgress={(e) => console.log('on Progress', e)}
        />
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

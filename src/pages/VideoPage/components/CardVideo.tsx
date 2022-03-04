import ReactPlayer from 'react-player'
import { useState, useEffect } from 'react';

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

const MAX_LENGTH_DESCRIPTION = 100;

export const CardVideo = () => {
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const [state, setState] = useState({
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    playing: false,
    thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    description: "ig Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttps://www.bigbuckbunny.org"
  })

  const { url, playing, thumb, description } = state;

  useEffect(() => {
    
  }, [showMoreDescription])
  

  const onEnded = () => {
    console.log('Termino el video')
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
          url={url}
          width={'100%'}
          height={'100%'}
          controls
          stopOnUnmount={false}
          light={thumb}
          onEnded={onEnded}
          onClickPreview={onClickPreview}
          playing={playing}
        />
      </CardMedia>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color={"primary"}>
          Big Buck Bunny
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

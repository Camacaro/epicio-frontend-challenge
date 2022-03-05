import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  CardActionArea 
} from '@mui/material';
// import { useTheme } from '@mui/material/styles';
import {
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';
import { ListCardVideoProps } from '../../../ts/interfaces';
import { useStyle } from '../../../hooks/useStyle';

export const ListCardVideo = ({ video, handleChengeVideo }: ListCardVideoProps) => {
  const { styleListCardVideo } = useStyle();
  // const theme = useTheme();

  const onClick = () => {
    handleChengeVideo(video);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Card 
      elevation={0} 
      onClick={onClick} 
      sx={styleListCardVideo} 
    >

      <CardActionArea sx={{ maxWidth: 160 }}>
        <CardMedia
          component="img"
          sx={{ maxWidth: 160 }}
          image={video.thumb}
          height="150"
          alt="Live from space album cover"
        />
      </CardActionArea>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 190, width: 190 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6" color="primary">
            {video.title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" component="div">
            {video.description.substring(0, 10)}...
          </Typography>
        </CardContent>
        

        <Box sx={{ display: 'flex', justifyContent: 'center', pl: 1, pb: 1 }}>

          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>

        </Box>
      </Box>
    </Card>
  )
}

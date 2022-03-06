import { 
  Card,
  CardContent,
  Link,
  Typography,
} from "@mui/material"
import { useTheme } from '@mui/material/styles';
import { ArrowRight } from '@mui/icons-material';

import { Page } from "../../components/Page"

const Description = ({ msg }: { msg: string }) => {
  return (
    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
      <ArrowRight /> &nbsp; {msg}
    </Typography>
  )
}

export const AboutPage = () => {
  const theme = useTheme();

  return (
    <Page title="Sobre el Proyecto">

      <Typography variant="h3" gutterBottom component="div">
        Sobre el Proyecto
      </Typography>

      <Card 
        elevation={5} 
        sx={{ maxWidth: '100%', height: '400px', backgroundColor: theme.palette.primary.main  }}
      >
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            React 17.0.2
          </Typography>

          <Description
            msg={'TypeScript'}
          />

          <Description
            msg={'ReactContext con "Redux" (useReducer) lo mejor de ambos mundos.'}
          />

          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowRight /> &nbsp; Para el video usé la libreria  &nbsp; <Link href="https://www.npmjs.com/package/react-player" target={'_blank'} sx={{ color: 'white' }}> "react-player" </Link>, pero hice su controlador.
          </Typography>

          <Description
            msg={'React Router V6'}
          />

          <Description
            msg={'Diseño de UI con Material-UI V5'}
          />
        </CardContent>
      
      </Card>


    </Page>
  )
}

export default AboutPage
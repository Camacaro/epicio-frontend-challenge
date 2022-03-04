import React, {
  forwardRef,
} from 'react';
import { Fade, Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet';

import { useStyle } from '../hooks/useStyle';

// interface Props {
//   children: ReactElement | ReactElement[],
//   title: string
// }

// export const Page = ({ children, title }: Props) => {

export const Page = forwardRef(({
  children,
  title,
}: any, ref) => {
  const {stylePage} = useStyle()
  
  return (
    <Fade timeout={500} in={true}>
      <Box sx={stylePage} ref={ref} >
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <Container maxWidth="lg">
          {children}
        </Container>
      </Box >
    </Fade>
  );
});
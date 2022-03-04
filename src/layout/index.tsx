import { ReactElement } from 'react';
import { experimentalStyled } from '@mui/material';
import { Outlet } from "react-router-dom";
import { MainNavbar } from './MainNavbar';

export interface Props {
  children?: ReactElement | ReactElement[]
}

const MainLayoutRoot = experimentalStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%'
}));

export const MainLayout = ({ children }: Props) => (
  <MainLayoutRoot>
    <MainNavbar />
    {children || <Outlet />}
  </MainLayoutRoot>
);
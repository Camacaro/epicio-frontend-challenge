// import { lazy } from 'react';
import { AboutPage } from '../pages/AboutPage';
import { VideoPage } from '../pages/VideoPage';
import { Route } from '../ts/interfaces';

/**
 * Se puede usar lazy para que se cargue solo cuando se necesite
 * pero por ser un proyecto pequeño no es necesario
 * 
 * Sin embargo dejo la forma y configuracion de usarlo por si se necesita en un futuro
 */

// const VideoPageLazy = lazy(() => import('../pages/VideoPage'));
// const AboutPageLazy = lazy(() => import('../pages/AboutPage'));

export const routes: Route[] = [
  {
    to: '/about',
    path: 'about',
    Component: AboutPage,
    name: 'Sobre el Proyecto',
  },
  {
    to: '/video',
    path: 'video',
    Component: VideoPage,
    name: 'Videos',
  },
]
import { lazy, LazyExoticComponent } from 'react';

type JSXComponent = () => JSX.Element;

interface Route {
  to: string;
  path: string;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
  name: string;
}

const VideoPageLazy = lazy(() => import('../pages/VideoPage'));
const AboutPageLazy = lazy(() => import('../pages/AboutPage'));

export const routes: Route[] = [
  {
    to: '/about',
    path: 'about',
    Component: AboutPageLazy,
    name: 'About Project',
  },
  {
    to: '/video',
    path: 'video',
    Component: VideoPageLazy,
    name: 'Videos',
  },
]
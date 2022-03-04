import { ReactElement } from "react";
import { AxiosRequestHeaders, Method } from 'axios';

export interface VideoProviderProps {
  children: ReactElement | ReactElement[]
}

export interface VideoData {
  description: string,
  sources: string[],
  thumb: string,
  title: string,
}

export interface VideoInitialStateContext {
  name: string,
  videoList: VideoData[],
}

export interface IuseService {
  url: string;
  method?: Method;
  headers?: AxiosRequestHeaders;
}
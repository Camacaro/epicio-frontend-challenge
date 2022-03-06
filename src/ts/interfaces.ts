import { ReactElement } from "react";
import { AxiosRequestHeaders, Method } from 'axios';
import { TOnMutateState } from "./types";

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
  currentVideo: VideoData,
}

export interface IuseService {
  url: string;
  method?: Method;
  headers?: AxiosRequestHeaders;
}

export interface ListCardVideoProps {
  video: VideoData,
  handleChengeVideo: (video: VideoData) => void,
}

export interface CardVideoProps {
  video: VideoData
}

export interface IHandleSettings {
  brightness: number,
  contrast: number
}

export interface ITitleSettingProps {
  refParentContainer: any;
  title: string;
  handleSettings: (setting: IHandleSettings) => void;
  defaultBrightness: number;
  defaultContrast: number;
}

export interface IRewinPauseForwardProps {
  playing: boolean;
  onPlayPause: () => void;
  onRewind: () => void;
  onFastForward: () => void;
}

export interface IReactPlayerOnprogress {
  loaded: number
  loadedSeconds: number
  played: number
  playedSeconds: number
}
export interface IBottomControlsProps {
  refParentContainer: any;
  elapsedTime: string;
  totalDuration: string;
  played: number;
  playing: boolean;
  muted: boolean;
  volume: number;
  playbackRate: number;
  onPlaybackRateChange: (value: number) => void;
  onSeek: (e: any, newValue: any) => void;
  onChangeDispayFormat: () => void;
  onSeekMouseDown: (e: any) => void;
  onSeekMouseUp: (e: any, newValue: any) => void;
  onDuration: (e: number) => void;
  onPlayPause: () => void;
  onMuted: () => void;
  onVolumeChange: (e: any, newValue: any) => void;
  onVolumeSeekDown: (e: any, newValue: any) => void;
  onToggleFullScreen: () => void;
}

export interface IUseCardVideoState {
  playing: boolean;
  brightness: number;
  contrast: number;
  oneTimeLight: boolean;
  played: number; 
  seeking: boolean;
  duration: number;
  muted: boolean;
  volume: number;
  playbackRate: number;
}

export interface IMutateStateArg {
  playing?: boolean;
  brightness?: number;
  contrast?: number;
  oneTimeLight?: boolean;
  played?: number; 
  seeking?: boolean;
  duration?: number;
  muted?: boolean;
  volume?: number;
  playbackRate?: number;
}

export interface ISettingProps {
  refParentContainer: any;
  defaultBrightness: number;
  defaultContrast: number;
  onMutateState: TOnMutateState;
}

export interface IParentProps {
  children: ReactElement | ReactElement[]
}

export interface IFastRewindProps {
  onRewind: () => void;
}

export interface IPlayArrowProps {
  playing: boolean;
  onMutateState: TOnMutateState
}

export interface IFastForwardProps {
  onFastForward: () => void;
}

export interface IProgressBarProps {
  played: number;
  onMutateState: TOnMutateState; 
  onSeekMouseUp: (e: any, newValue: any) => void;
}

export interface IVolumeAndDurationProps {
  playing: boolean;
  muted: boolean;
  volume: number;
  onChangeDispayFormat: () => void;
  onMutateState: TOnMutateState;
  elapsedTime: string;
  totalDuration: string;
}

export interface IRateAndFullscreenProps {
  onMutateState: TOnMutateState;
  playbackRate: number;
  refParentContainer: any;
  onToggleFullScreen: () => void;
}
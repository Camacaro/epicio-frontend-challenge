import { VideoData } from '../ts/interfaces';
import { VideoActionReducer } from '../ts/types';

export const doSaveVideo = (video: VideoData[]): VideoActionReducer => ({
  type: 'SET_VIDEO_LIST',
  payload: video,
})

export const doSaveNameCategory = (name: string): VideoActionReducer => ({
  type: 'SET_NAME_CATEGORY',
  payload: name,
})
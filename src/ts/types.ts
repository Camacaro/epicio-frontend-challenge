import { VideoData } from "./interfaces";

export type VideoActionReducer = 
 | { type: 'SET_VIDEO_LIST', payload: VideoData[] }
 | { type: 'SET_NAME_CATEGORY', payload: string }
 | { type: 'SET_CURRENT_VIDEO', payload: VideoData }
import { IMutateStateArg, VideoData } from "./interfaces";

export type TOnMutateState = (state: IMutateStateArg) => void;

export type VideoActionReducer = 
 | { type: 'SET_VIDEO_LIST', payload: VideoData[] }
 | { type: 'SET_NAME_CATEGORY', payload: string }
 | { type: 'SET_CURRENT_VIDEO', payload: VideoData }
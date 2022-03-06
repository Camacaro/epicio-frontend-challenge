/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useReducer, useEffect } from 'react';
import { useService } from '../../hooks/useService';
import { URL_API } from '../../ts/constant';
import { VideoInitialStateContext, VideoProviderProps, VideoData } from '../../ts/interfaces';
import { doAssignVideo, doSaveNameCategory, doSaveVideo } from './actions';
import { VideoReducer } from './VideoReducer';

const initialState: VideoInitialStateContext = {
  name: '',
  videoList: [],
  currentVideo: {
    description: '',
    sources: [],
    thumb: '',
    title: ''
  }
}

const contextProps = {
  videoState: initialState,
  isLoading: true,
  assignVideo: (video: VideoData) => {},
}

const VideoContext = createContext(contextProps);
export const useVideoContext = () => useContext(VideoContext);

export const VideoProvider = ({ children }: VideoProviderProps) => {
  const [videoState, dispatch] = useReducer(VideoReducer, initialState);
  const {isLoading, data} = useService({
    url: URL_API,
  });

  useEffect(() => {
    if(data?.categories) {
      const videos: VideoData[] = data?.categories[0].videos
      const name = data?.categories[0].name

      dispatch( doSaveVideo(videos) );
      dispatch( doSaveNameCategory(name) );
      dispatch( doAssignVideo(videos[0]) );
    }
  }, [isLoading])

  const assignVideo = (video: VideoData) => dispatch( doAssignVideo(video) );

  return (
    <VideoContext.Provider value={{ 
      videoState,
      isLoading,
      assignVideo
    }}>
      {children}
    </VideoContext.Provider>
  )
}

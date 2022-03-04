/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useReducer, useEffect } from 'react';
import { useService } from '../hooks/useService';
import { URL_API } from '../ts/constant';
import { VideoInitialStateContext, VideoProviderProps } from '../ts/interfaces';
import { doSaveNameCategory, doSaveVideo } from './actions';
import { VideoReducer } from './VideoReducer';

const initialState: VideoInitialStateContext = {
  name: '',
  videoList: [],
}

const contextProps = {
  videoState: initialState,
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
      const videos = data?.categories[0].videos
      const name = data?.categories[0].name

      dispatch( doSaveVideo(videos) );
      dispatch( doSaveNameCategory(name) );
    }
  }, [isLoading])


  return (
    <VideoContext.Provider value={{ 
      videoState 
    }}>
      {children}
    </VideoContext.Provider>
  )
}

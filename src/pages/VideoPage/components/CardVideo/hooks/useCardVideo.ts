import { useRef, useState } from "react";
import screenful from "screenfull";

import { MAX_LENGTH_DESCRIPTION, STYLE_VISIBLE, TIME_DISPLAY_NORNAL, STYLE_HIDDEN, SECONDS_10, TIME_DISPLAY_REMAINING, PERCENT_100 } from "../../../../../ts/constant";
import { IHandleSettings, IMutateStateArg, IReactPlayerOnprogress, IUseCardVideoState, VideoData } from "../../../../../ts/interfaces";
import { format } from "../utils/format";

export interface IUseCardVideoProps {
  video: VideoData;
}

export const useCardVideo = ({ video }: IUseCardVideoProps) => {

  const playerRef = useRef<any>(null);
  const countRef = useRef<number>(0);
  const controlsRef = useRef<any>(null);
  const playerContainerRef = useRef<any>(null);

  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [timeDisplayFormat, setTimeDisplayFormat] = useState(TIME_DISPLAY_NORNAL);
  const [state, setState] = useState<IUseCardVideoState>({
    playing: false,
    brightness: 1,
    contrast: 1,
    oneTimeLight: false,
    played: 0,
    seeking: false,
    duration: 0,
    muted: false,
    volume: 1,
    playbackRate: 1.0,
  })

  const { playing, oneTimeLight } = state;
  const { description, thumb } = video;

  const updateState = (newState: IMutateStateArg) => {
    setState(prev => ({
      ...prev, 
      ...newState
    }))
  }

  const onClickPreview = () => {
    setState(prev => ({
      ...prev, 
      playing: !prev.playing,
      oneTimeLight: true
    }))
  }

  const cutDescription = () => {
    if(showMoreDescription) return description;
    return description.substring(0, MAX_LENGTH_DESCRIPTION);
  }

  const onClickShowMore = () => setShowMoreDescription(!showMoreDescription);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    controlsRef.current.style.visibility = STYLE_VISIBLE;
    countRef.current = 0;
  }

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = STYLE_HIDDEN;
    countRef.current = 0;
  };

  const handleSettings = (setting: IHandleSettings) => {
    setState(prev => ({
      ...prev,
      brightness: setting.brightness,
      contrast: setting.contrast,
    }));
  }

  const isLight = () => {
    if(playing) return false;
    if(!oneTimeLight) return thumb;
    return false;
  }

  const handlePlayPause = () => setState(prev => ({...prev, playing: !prev.playing, oneTimeLight: true}));
  const handleRewind = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() - SECONDS_10);
  const handleFastForward = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() + SECONDS_10);

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === TIME_DISPLAY_NORNAL ? TIME_DISPLAY_REMAINING : TIME_DISPLAY_NORNAL
    );
  };

  const handleSeekMouseUp = (e:any, newValue: any) => {
    setState(prev => ({ ...prev, seeking: false }));
    playerRef.current.seekTo(newValue / PERCENT_100, "fraction");
  };

  const handleSeekChange = (e: any, newValue: string) => {
    const newTime = Number(newValue) / PERCENT_100;
    setState(prev => ({ ...prev, played: parseFloat(newTime.toString()) }));
  };

  const handleVolumeChange = (e: any, newValue: any) => {
    const newVolume = Number(newValue) / PERCENT_100;
    setState(prev => ({
      ...prev,
      volume: parseFloat(newVolume.toString()),
      muted: newValue === 0 ? true : false,
    }));
  };

  const handleVolumeSeekDown = (e: any, newValue: string) => {
    const newVolume = Number(newValue) / PERCENT_100;
    setState(prev => ({ 
      ...prev, 
      seeking: false, 
      volume: parseFloat(newVolume.toString()) 
    }));
  };

  const handleSeekMouseDown = (e: any) => setState({ ...state, seeking: true });
  const handleDuration = (duration: number) => setState({ ...state, duration });
  const handleMuted = () => setState(prev => ({ ...prev, muted: !prev.muted }));
  const toggleFullScreen = () => {

    screenful.toggle(playerContainerRef.current)
  }

  const handleProgress = (changeState: IReactPlayerOnprogress) => {
    if (countRef.current > 3) {
      controlsRef.current.style.visibility = STYLE_HIDDEN;
      countRef.current = 0;
    }
    if (controlsRef.current.style.visibility === STYLE_VISIBLE) {
      countRef.current += 1;
    }
    if (!state.seeking) {
      setState(prev => ({ ...prev, ...changeState }));
    }
  };

  const handlePlaybackRate = (rate: number) => {
    setState(prev => ({ ...prev, playbackRate: rate }));
  };

  const currentTime = (playerRef && playerRef.current) ? playerRef.current.getCurrentTime() : "00:00";
  const duration = (playerRef && playerRef.current) ? playerRef.current.getDuration() : "00:00";
  const elapsedTime = (timeDisplayFormat === TIME_DISPLAY_NORNAL) ? format(currentTime) : `-${format(duration - currentTime)}`;
  const totalDuration = format(duration);

  return {
    controlsRef,
    cutDescription,
    elapsedTime,
    handleDisplayFormat,
    handleDuration,
    handleFastForward,
    handleMouseMove,
    handleMuted,
    handlePlaybackRate,
    handlePlayPause,
    handleProgress,
    handleRewind,
    handleSeekChange,
    handleSeekMouseDown,
    handleSeekMouseUp,
    handleSettings,
    handleVolumeChange,
    handleVolumeSeekDown,
    hanldeMouseLeave,
    isLight,
    onClickPreview,
    onClickShowMore,
    playerContainerRef,
    playerRef,
    showMoreDescription,
    state,
    toggleFullScreen,
    totalDuration,
    updateState,
  }

}
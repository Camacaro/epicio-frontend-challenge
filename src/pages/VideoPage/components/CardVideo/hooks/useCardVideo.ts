import { useRef, useState } from "react";
import screenful from "screenfull";

import {
  MAX_LENGTH_DESCRIPTION,
  STYLE_VISIBLE,
  TIME_DISPLAY_NORNAL,
  STYLE_HIDDEN,
  SECONDS_10,
  TIME_DISPLAY_REMAINING,
  PERCENT_100,
  TIME_FORMAT,
} from "../../../../../ts/constant";

import {
  IMutateStateArg,
  IReactPlayerOnprogress,
  IUseCardVideoProps,
  IUseCardVideoState,
} from "../../../../../ts/interfaces";

import { format } from "../utils/format";

export const useCardVideo = ({ video }: IUseCardVideoProps) => {
  const controlsRef = useRef<any>(null);
  const countRef = useRef<number>(0);
  const playerContainerRef = useRef<any>(null);
  const playerRef = useRef<any>(null);

  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [timeDisplayFormat, setTimeDisplayFormat] = useState(TIME_DISPLAY_NORNAL);
  const [state, setState] = useState<IUseCardVideoState>({
    brightness: 1,
    contrast: 1,
    duration: 0,
    muted: false,
    oneTimeLight: false,
    playbackRate: 1.0,
    played: 0,
    playing: false,
    seeking: false,
    volume: 1,
  });

  const { playing, oneTimeLight } = state;
  const { description, thumb } = video;

  const updateState = (newState: IMutateStateArg) =>
    setState((prev) => ({ ...prev, ...newState }));

  const cutDescription = () => {
    if (showMoreDescription) return description;
    return description.substring(0, MAX_LENGTH_DESCRIPTION);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    controlsRef.current.style.visibility = STYLE_VISIBLE;
    countRef.current = 0;
  };

  const hanldeMouseLeave = () => {
    controlsRef.current.style.visibility = STYLE_HIDDEN;
    countRef.current = 0;
  };

  const isLight = () => {
    if (playing) return false;
    if (!oneTimeLight) return thumb;
    return false;
  };

  const handleDisplayFormat = () => {
    setTimeDisplayFormat(
      timeDisplayFormat === TIME_DISPLAY_NORNAL
        ? TIME_DISPLAY_REMAINING
        : TIME_DISPLAY_NORNAL
    );
  };

  const handleSeekMouseUp = (e: any, newValue: any) => {
    updateState({ seeking: false });
    playerRef.current.seekTo(newValue / PERCENT_100, "fraction");
  };

  const handleProgress = (changeState: IReactPlayerOnprogress) => {
    if (countRef.current > 3) {
      controlsRef.current.style.visibility = STYLE_HIDDEN;
      countRef.current = 0;
    }

    if (controlsRef.current.style.visibility === STYLE_VISIBLE)
      countRef.current += 1;

    if (!state.seeking) updateState({ ...changeState });
  };

  const handleRewind = () =>
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - SECONDS_10);

  const handleFastForward = () =>
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + SECONDS_10);

  const onClickPreview = () =>
    updateState({ playing: !playing, oneTimeLight: true });

  const onClickShowMore = () => setShowMoreDescription(!showMoreDescription);
  const toggleFullScreen = () => screenful.toggle(playerContainerRef.current);

  const currentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : TIME_FORMAT;

  const duration =
    playerRef && playerRef.current
      ? playerRef.current.getDuration()
      : TIME_FORMAT;

  const elapsedTime =
    timeDisplayFormat === TIME_DISPLAY_NORNAL
      ? format(currentTime)
      : `-${format(duration - currentTime)}`;

  const totalDuration = format(duration);

  return {
    controlsRef,
    cutDescription,
    elapsedTime,
    handleDisplayFormat,
    handleFastForward,
    handleMouseMove,
    handleProgress,
    handleRewind,
    handleSeekMouseUp,
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
  };
};
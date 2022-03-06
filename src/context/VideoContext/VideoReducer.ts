import { VideoInitialStateContext } from "../../ts/interfaces";
import { VideoActionReducer } from "../../ts/types";

export const VideoReducer = (state:VideoInitialStateContext, action:VideoActionReducer) => {
  switch (action.type) {

    case "SET_VIDEO_LIST":
      return {
        ...state,
        videoList: action.payload
      }

    case "SET_NAME_CATEGORY":
      return {
        ...state,
        name: action.payload
      }

    case "SET_CURRENT_VIDEO":
      return {
        ...state,
        currentVideo: action.payload
      }
    
    default:
      return state;

  }
}
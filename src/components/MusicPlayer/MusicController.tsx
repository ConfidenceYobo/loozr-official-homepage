import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../state/store";
import {
  setIsPlaying,
  setCurrentTrackIndex
} from "../../state/track/trackReducer";
import Forward from "../../assets/svg/controls/forward.svg";
import Rewind from "../../assets/svg/controls/rewind.svg";
import Play from "../../assets/svg/controls/play.svg";
import Pause from "../../assets/svg/controls/pause.svg";
import VerifiedBadge from "../../assets/icons/verified.svg";
import { Track } from "../../types/Track";
import { Spinner } from "@chakra-ui/react";


interface MusicControllerProps {
  track: Track;
  progress: number;
  isLoading: boolean;
}

const MusicController = ({ track, progress, isLoading }: MusicControllerProps) => {

  const dispatch = useDispatch();
  const isPlaying = useSelector((state: AppState) => state.tracks.isPlaying);
  const currentTrackIndex = useSelector(
    (state: AppState) => state.tracks.currentTrackIndex
  );
  const queue = useSelector((state: AppState) => state.tracks.queue);

  const handlePlayNext = () => {
    if (queue.length > currentTrackIndex + 1) {
      dispatch(setCurrentTrackIndex({ trackIndex: currentTrackIndex + 1 }));
      dispatch(setIsPlaying(true));
    }
  }

  const handlePlayPrev = () => {
    if (currentTrackIndex > 0) {
      dispatch(setCurrentTrackIndex({ trackIndex: currentTrackIndex - 1 }));
      dispatch(setIsPlaying(true));
    }
  }

  return (
    <>
      <div className="flex w-full md:w-auto h-[60px] md:h-[70px] overflow-hidden md:rounded-[13px] md:py-0 items-center" style={{ background: "rgba(20, 25, 34, 0.65)", backdropFilter: "blur(12.5px)", }} >
        <div className="md:!ml-0 ml-3 overflow-hidden w-[55px] h-[46px] md:w-[70px] md:h-[70px]">
          <img src={track.artwork} alt="" className="object-cover rounded-full md:rounded-r-none md:rounded-l-[13px] w-[55px] h-[46px] md:w-[70px] md:h-[70px]" />
        </div>
        <div className="py-2 px-3 bg-transparent md:w-auto w-full md:rounded-r-[13px] min-w-[220px] flex justify-between items-center">
          <div className=" flex md:flex-row flex-col pr-3 md:pr-0 md:items-center ">
            <div onClick={() => { }} className="flex flex-col w-fit ">
              <p className="txt mb-px font-medium text-[12px] md:text-[13px] leading-5 text-white">
                {track.songTitle}
              </p>
              <p className="txt flex gap-2 items-center text-muted text-[10px] md:mt-0 -mt-1 md:text-[12px] font-normal md:font-normal">
                ${track.tokenName} 
                 {/* <img src={VerifiedBadge} alt="" className="w-4 h-4" /> */}
              </p>
            </div>
            <div className=" md:flex hidden relative w-[180px] mx-4">
              <div className="absolute bg-white top-0 left-0 h-[2px] rounded-lg " style={{ width: `${progress}%` }} />
              <div className="bg-slate-600 w-full h-[2px] rounded-lg " />
            </div>
            <div className=" md:hidden flex relative w-[180px] pr-3 md:pr-0 mt-2">
              <div className="absolute bg-white top-0 left-0 h-[2px] rounded-lg " style={{ width: `${progress}%` }} />
              <div className="bg-slate-600 w-full h-[2px] rounded-lg " />
            </div>
          </div>
          <div className="flex items-center mr-3">
            <img
              src={Rewind}
              alt=""
              className="cursor-pointer w-4 h-4"
              onClick={() => handlePlayPrev()}
            />
            {isLoading ? (
              <div className="mx-6 cursor-pointer w-5 h-6">
                <Spinner />
              </div>
            ) : isPlaying ? (
              <img
                src={Pause}
                alt=""
                onClick={() => dispatch(setIsPlaying(false))}
                className="mx-6 cursor-pointer w-5 h-6"
              />
            ) : (
              <img
                src={Play}
                alt=""
                onClick={() => dispatch(setIsPlaying(true))}
                className="mx-6 cursor-pointer w-5 h-7"
              />
            )}
            <img
              src={Forward}
              alt=""
              onClick={() => handlePlayNext()}
              className="cursor-pointer w-4 h-4"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicController;

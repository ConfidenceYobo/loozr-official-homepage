import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../state/store";
import {
  setIsPlaying,
  setCurrentTrackIndex,
  setQueue,
} from "../../state/track/trackReducer";
import { Track } from "../../types/Track";
import Play from "../../assets/svg/controls/play.svg";
import Pause from "../../assets/svg/controls/pause.svg";
import VerifiedBadge from "../../assets/icons/verified.svg";

interface TrackProps {
  track: Track;
}

const TrackCard = ({ track }: TrackProps) => {
  const dispatch = useDispatch();
  const tracks = useSelector((state: AppState) => state.tracks.data);
  const queue = useSelector((state: AppState) => state.tracks.queue);
  const isPlaying = useSelector((state: AppState) => state.tracks.isPlaying);
  const currentTrackIndex = useSelector(
    (state: AppState) => state.tracks.currentTrackIndex
  );
  const [isShown, setIsShown] = React.useState(null);

  const isCurrentlyPlaying = () => {
    if (isPlaying) {
      const trackIndex = queue.findIndex((v) => v.id === track.id);

      return trackIndex === currentTrackIndex;
    }
    return false;
  };

  const playTrack = () => {
    const trackIndex = tracks.findIndex((v) => v.id === track.id);
    dispatch(setQueue([...tracks]));
    dispatch(setCurrentTrackIndex({ trackIndex: trackIndex }));
    dispatch(setIsPlaying(true));
  };

  return (
    <motion.div 
    whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      className="flex flex-col h-auto relative cursor-pointer w-fit overflow-hidden max-w-[150px]"
    >
      <img src={track.artwork} alt="" className="object-cover h-[150px] w-[150px] mb-[10px] overflow-hidden rounded-[10px]" />

      <div className="w-fit">
        <Marquee speed={50} loop={isShown ? 0 : -1} gradient={false}>
          <p className="mb-[3px] font-medium text-[14px] text-white">
            {track.songTitle}
          </p>
        </Marquee>
      </div>

      <p className="flex items-center uppercase gap-[4px] text-[#536079] text-[12px] font-normal md:font-normal">
        ${track.tokenName}
        {/* <img src={VerifiedBadge} alt="" className="w-4 h-4" /> */}
      </p>
      {/* <p className="flex items-center gap-[4px] text-[#536079] text-[12px] font-normal md:font-normal">
        {track.artistName}
        <img src={VerifiedBadge} alt="" className="w-4 h-4" />
      </p> */}

      {isShown && (
        <div className="absolute grid place-items-center top-[-30px] left-0 w-full h-full">
          {isCurrentlyPlaying() ? (
            <button
              style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
              className="w-[50px] h-[50px] relative rounded-full flex justify-center items-center"
              onClick={() => dispatch(setIsPlaying(false))}
            >
              <img src={Pause} alt="" className="cursor-pointer w-4 h-5" />
            </button>
          ) : (
            <button
              style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
              className="w-[50px] h-[50px] relative z-20 rounded-full flex justify-center items-center"
              onClick={() => playTrack()}
            >
              <img src={Play} alt="" className="cursor-pointer  w-4 h-6" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TrackCard;

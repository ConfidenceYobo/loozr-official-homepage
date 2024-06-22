import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../state/store";
import { getArtists } from "../state/artist/actions";
import Photo from "../components/Photo";
import verified from "../assets/icons/verified.svg"
import FeedsCard from "./FeedsCard";
import { BsCaretUpFill } from "react-icons/bs";

const ArtisteDashboard = () => {
  const dispatch = useDispatch();
  const artists = useSelector((state: AppState) => state?.artist?.artists);
  const featuredRef: any = React.useRef(null);
  // console.log(artists);


  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getArtists(''));
  }, [dispatch]);

  const FeaturedArtistes = () => {

    const [isShownText, setIsShownText] = React.useState(-1)
    const [isShown, setIsShown] = React.useState(-1)
    const [isHover, setIsHover] = React.useState(false)
    const [hoverStates, setHoverStates] = React.useState({});

    const Checking = (item: any, text: any) => {
      setIsShown(item)
      if (text.length > 7) {
        setIsShownText(item)
      } else {
        setIsShownText(-1)
      }
    }
    const handleMouseEnter = (index) => {
      setHoverStates(prevStates => ({ ...prevStates, [index]: true }));
      setIsHover(true);
    };

    const handleMouseLeave = (index) => {
      setHoverStates(prevStates => ({ ...prevStates, [index]: false }));
      setIsHover(false);
    };

    return (
      <>
        <div className="flex items-center md:px-0 mt-[3px] justify-between mb-[14px] mx-[16px] md:mx-0">
          <p className="txt font-medium md:text-[17px] text-[14px] text-white">
            Latest Artist Coins
          </p>
          <p className="font-light text-xs text-muted">
            View more
          </p>
          {/* <SlidesButton position={featuredRef} width={200} /> */}
        </div>
        <div
          id={"carousel"}
          className="max-w-full md:px-0 px-0 md:px-6 overflow-auto scroll_event whitespace-nowrap md:mb-[2px] mb-2"
          ref={featuredRef}
        >
          <div className="flex">
            {artists.map((_, i) => (
              <div key={i} onMouseOver={() => Checking(i, _.creatorCoinId)} onMouseOut={() => Checking(-1, _.creatorCoinId)} onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={() => handleMouseLeave(i)} className="relative ml-[16px] flex flex-col items-center h-fit min-w-max w-[110px]" >
                {/* <Link to={`/${_.user.accountDomain}`} className="relative"> */}
                  <div className=" relative mb-[10px]">
                    <Photo alt="" userId={_.user.accountPrincipal} className="object-cover text-4xl h-[110px] flex justify-center items-center w-[110px] rounded-full "
                      style={{
                        border: "6px solid #141922",
                      }} />
                    {_.isVerified && (
                      <img src={verified} alt="verified" className=" absolute bottom-1 right-0 w-[32px] " />
                    )}
                  </div>
                {/* </Link> */}
                <div className=" w-[110px]">
                  <div className={isShownText === i ? "example1" : " h-[20px] w-full flex justify-center "}>
                    <p onClick={() => navigate(`/${_.user.accountDomain}`)} className=" cursor-pointer mb-[3px] font-semibold text-sm text-white" >
                      ${isShownText === i
                        ? _.creatorCoinId.toUpperCase()
                        : _.creatorCoinId.slice(0, 7).toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <BsCaretUpFill size={10} color='#31D298'/>
                  <p className="text-[#536079] text-[12px] font-medium ">4.093 LZR</p>
                </div>
                {hoverStates[i] && (
                  <>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-dark-700/20 backdrop-blur-sm">
                      <div onClick={() => navigate(`/artistes/buy/${_.user.id}`)} className="cursor-pointer bg-s-gradient px-[12px] py-[7px] rounded-full text-[12px]">Buy coin</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="w-full mb-[43px] md:mb-0 flex flex-col">
      <Carousel />
      <FeaturedArtistes />
      <div className="h-px w-full bg-[#141922] mt-4 mb-4 px-[8px] md:mx-0" />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
    </div>
  );
};

export default ArtisteDashboard;

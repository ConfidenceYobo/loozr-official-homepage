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

    const Checking = (item: any, text: any) => {
      setIsShown(item)
      if (text.length > 7) {
        setIsShownText(item)
      } else {
        setIsShownText(-1)
      }
    }

    return (
      <>
        <div className="flex items-center md:px-0 px-6 mt-[3px] justify-between mb-[14px]">
          <p className="txt font-medium text-base md:text-[17px] text-white">
            Latest Artist Coins
          </p>
          <p className="font-light text-xs text-muted">
            View more
          </p>
          {/* <SlidesButton position={featuredRef} width={200} /> */}
        </div>
        <div
          id={"carousel"}
          className="max-w-full md:px-0 px-6 overflow-auto scroll_event whitespace-nowrap md:mb-[2px] mb-2"
          ref={featuredRef}
        >
          <div className="flex ">
            {artists.map((_, i) => (
              <div key={i} onMouseOver={() => Checking(i, _.user.username)} onMouseOut={() => Checking(-1, _.user.username)} className="flex flex-col items-center mr-[22px] md:h-fit min-w-max md:w-[105px]" >
                <Link to={`/${_.user.accountDomain}`} className="relative">
                  <div className=" relative ">
                    <Photo alt="" userId={_.user.accountPrincipal} className="object-cover h-[100px] text-4xl md:h-[105px] flex justify-center items-center w-[100px] md:w-[105px] rounded-full  mb-[16px]"
                      style={{
                        border: "8.7px solid #141922",
                      }} />
                    {_.isVerified && (
                      <img src={verified} alt="verified" className=" absolute bottom-1 right-0 w-[32px] " />
                    )}
                  </div>
                </Link>
                <div className=" w-[105px]">
                  <div className={isShownText === i ? "example1" : " h-[20px] w-full flex justify-center "}>
                    <p onClick={() => navigate(`/${_.user.accountDomain}`)} className=" cursor-pointer mb-[3px] font-medium text-sm text-white" >
                      $ {isShownText === i
                        ? _.user.username.toUpperCase()
                        : _.user.username.slice(0, 7).toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className=" w-full px-[2px] ">
                  <button onClick={() => navigate(`/artistes/buy/${_.user.id}`)}
                    className={isShown === i
                      ? " bg-[#8369F4] h-[35px] md:flex justify-center items-center font-medium hidden rounded-full w-[105px] mt-[12px] text-[11.5px]  "
                      : "bg-[#141922] text-[11.5px]  h-[35px] md:flex justify-center items-center font-medium hidden rounded-full w-[105px] mt-[12px] "
                    } >
                    Buy coin
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className=" w-screen md:w-full flex flex-col ">
      <Carousel />
      <FeaturedArtistes />
      <div className="h-px w-full lg:w-full bg-muted-50 mt-4 mb-3" />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
      <FeedsCard />
    </div>
  );
};

export default ArtisteDashboard;

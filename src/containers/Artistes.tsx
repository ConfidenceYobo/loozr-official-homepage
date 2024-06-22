import React, { useEffect } from "react";
import verified from "../assets/icons/verified.svg";

import { getArtists } from "../state/artist/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../state/store";
import { Link, useNavigate } from "react-router-dom";
import Photo from "../components/Photo";
import { changePage } from "../state/artist/artistReducer";
import Pagination from "../components/Pagination";

const ArtisteRenderer = (props) => {
  const [isShownText, setIsShownText] = React.useState(-1);
  const [isShown, setIsShown] = React.useState(-1);
  const navigate = useNavigate();

  const Checking = (item: any, text: any) => {
    setIsShown(item);
    if (text.length > 7) {
      setIsShownText(item);
    } else {
      setIsShownText(-1);
    }
  };

  return (
    <div
    // onScroll={props.onScroll}
    // ref={props.listInnerRef}
    // style={{ height: "100vh", overflowY: "auto" }}
    >
      <div className="grid grid-cols-3 md:grid-cols-4 gap-y-6">
        {props.dataList.map((_, i) => (
          <div
            key={i}
            onMouseOver={() => Checking(i, _.creatorCoinId)}
            onMouseOut={() => Checking(-1, _.creatorCoinId)}
            className="flex flex-col items-center mr-2 min-w-full md:min-w-[140px]"
          >
            <Link to={`/${_.user.accountDomain}`} className="relative">
              <Photo
                // photoColor={_.user.profileColor}(`/${_.user.accountDomain}`)}
                alt=""
                userId={_.user.accountPrincipal}
                className="object-cover text-4xl flex justify-center items-center h-[90px] w-[90px] md:h-[110px] md:w-[110px] rounded-full mb-[8px]"
                style={{
                  border: "6px solid #141922",
                }}
              />
              {_.isVerified && (
                <img
                  src={verified}
                  alt="verified"
                  className=" absolute bottom-1 right-0 w-[28px] "
                />
              )}
            </Link>

            <div className=" w-[105px] mt-1">
              <div
                className={
                  isShownText === i
                    ? "example1"
                    : " h-[20px] w-full flex justify-center "
                }
              >
                <p
                  onClick={() => navigate(`/${_.user.accountDomain}`)}
                  className=" cursor-pointer mb-[3px] font-medium text-sm text-white"
                >
                  $
                  {isShownText === i
                    ? _.user.username.toUpperCase()
                    : _.user.username.slice(0, 7).toUpperCase()}
                </p>
              </div>
            </div>
            <div className=" w-full px-[2px] flex justify-center ">
              <button
                onClick={() => navigate(`/artistes/buy/${_.user.id}`)}
                className={
                  isShown === i
                    ? " bg-[#8369F4] h-[35px] md:flex justify-center items-center font-medium hidden rounded-full w-[105px] mt-[12px] text-[11.5px]  "
                    : "bg-[#141922] text-[11.5px]  h-[35px] md:flex justify-center items-center font-medium hidden rounded-full w-[105px] mt-[12px] "
                }
              >
                Buy coin
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Artistes = () => {
  const dispatch = useDispatch();
  const pagination = useSelector(
    (state: AppState) => state.artist.pagination
  );
  const artists = useSelector((state: AppState) => state.artist.artists);

  return (
    <div className="w-full mt-2 md:mt-0 pb-28">
      <p className="text-white text-[14px] leading-7 mx-[16px] font-bold mb-7">
        Artistes
      </p>
      <Pagination
        reachMaxLimit={pagination.reachMaxLimit}
        dataList={artists}
        onFetchData={() => dispatch(getArtists(pagination.nextCursor))}
        currentCursor={pagination.currentCursor}
        nextCursor={pagination.nextCursor}
        onSetCurrentCursor={() => dispatch(changePage())}
      >
        <ArtisteRenderer />
      </Pagination>
    </div>
  );
};

export default Artistes;

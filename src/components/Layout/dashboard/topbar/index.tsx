import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../state/store";
import { useBecomeArtisteCallback } from "../../../../state/artist/hooks";
import { setPageLoaderStatus } from "../../../../state/misc";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "../../../../assets/icons/search.svg";
import LoozrGradient from "../../../../assets/icons/loozr-gradient.svg";
import Notifi from "../../../../assets/svg/notifi.svg";
import PlusIcon from "../../../../assets/icons/plus.svg";
import UserIcon from "../../../../assets/icons/user.svg";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { LZR_IN_USD, MIXER_ACCOUNT } from "../../../../config/constants";
import Photo from "../../../Photo";
import { useSearchUserCallback } from "../../../../state/user/hooks/useAccount";

export const TopBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { handleBecomeArtiste } = useBecomeArtisteCallback();
  const [searchValue, setSearchValue] = React.useState("")
  const [data, setData] = React.useState([] as any)
  const user = useSelector((state: AppState) => state.user.userInfo);
  const { getSearchUser } = useSearchUserCallback();

  const OnchangeHandler = async (item: any) => {
    setSearchValue(item)
    const result = await getSearchUser(item);
    setData(result)
  }

  const becomeArtist = async () => {
    dispatch(setPageLoaderStatus(true));
    try {
      await handleBecomeArtiste({});
      window.location.reload();
    } catch (err) {
      dispatch(setPageLoaderStatus(false));
    }
  };

  const ClickHandler = (item: any) => {
    navigate(item)
    setSearchValue("")
  }

  const textMap = {
    '/feeds': 'Feeds',
    '/artistes': 'Artistes',
    '/tracks': 'Tracks',
    '/wallet': 'Wallet',
    '/airdrops': 'Airdrops',
  };

  const getText = () => {
    if (!user) {
      return '';
    }
    if (pathname === `/${user.accountDomain}`) {
      return 'Artist Profile';
    }

    return textMap[pathname] || '';
  };


  return (
    <div className="w-full mb-6">
      <div className="flex justify-between px-0 sm:px-4 md:mr-6 items-center">
        <div>
          <p className="font-bold text-base md:text-[24px] text-white">
            {getText()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex w-[300px] relative">
            <input
              type="text"
              value={searchValue}
              placeholder="Search artiste, fans… "
              onChange={(e) => OnchangeHandler(e.target.value)}
              className="placeholder:text-[#536079] w-full rounded-full h-[42px] text-xs"
              style={{
                paddingLeft: "4rem",
                paddingRight: 16,
                background: "#141922",
                color: "#536079",
              }}
            />
            <img
              src={SearchIcon}
              alt=""
              className="absolute w-4 h-4 object-contain inset-y-[12px] left-7"
            />
            {searchValue && (
              <div className=" absolute bg-[#12161F] top-[50px] overflow-y-auto max-h-[250px] z-[120] py-2 mt-2 rounded-lg px-4 w-full  ">
                {data.map((item: any, index: any) => {
                  const domainName = item.account_id + "." + MIXER_ACCOUNT;

                  return (
                    <div
                      key={index}
                      onClick={() => ClickHandler(`/${domainName}`)}
                      className=" w-full cursor-pointer relative z-[120] flex my-3 items-center "
                    >
                      <Photo
                        alt=""
                        className="object-contain w-10 h-10 rounded-full "
                        style={{ border: "3px solid #141922" }}
                      />
                      {/* <div className=' w-10 h-10 rounded-full bg-red-600 border-[3px] border-[#222A3B] ' /> */}
                      <div className=" ml-3 ">
                        <div className=" flex -mt-1 items-center ">
                          <p className=" text-[13px] font-semibold ">
                            {" "}
                            {item?.account_id}
                          </p>
                        </div>
                        <div className=" flex -mt-1 items-center ">
                          <p className=" text-[11px] font-semibold text-[#536079] ">
                            {domainName.slice(0, 30)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {searchValue && (
                  <div
                    className=" fixed inset-0 z-[90] "
                    onClick={() => setSearchValue("")}
                  />
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <img src={Notifi} alt="" />
            <p className=' rounded-full px-2 py-0.5 absolute bg-[#FF1744] top-0 right-0 text-[8px]'>3</p>
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <p className="text-white pr-0.5 font-bold">~${LZR_IN_USD}/</p>
          <img
            src={LoozrGradient}
            alt=""
            className="pointer-cursor"
            onClick={() => navigate("/feeds")}
          />
        </div>
        <div className="md:hidden flex items-center">
          {/*
          <img
            src={SearchWhiteIcon}
            alt=""
            className="ml-8"
            width={17}
            height={17}
          /> */}
          {user && !user?.isArtist ? (
            <img
              src={PlusIcon}
              onClick={becomeArtist}
              alt=""
              className="pointer-cursor"
              width={17}
              height={17}
            />
          ) : null}
          {user ? (
            <img
              src={UserIcon}
              alt=""
              className="ml-8 pointer-cursor"
              onClick={() => navigate("/" + user.accountDomain)}
              width={17}
              height={17}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

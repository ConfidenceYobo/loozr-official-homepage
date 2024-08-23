import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoozrBeta from "../../../../assets/icons/loozr-beta.svg";
import Loozr from "../../../../assets/icons/loozr.svg";
import Feeds from "../../../../assets/svg/Feeds";
import Artist from "../../../../assets/svg/Artist";
import Wallet from "../../../../assets/svg/Wallet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toastHttpError } from "../../../../utils/httpHelper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppState } from "../../../../state/store";
import { toast } from "react-toastify";
import { TOAST_OPTIONS } from "../../../../config/constants";
import { useBecomeArtisteCallback } from "../../../../state/artist/hooks";
import { setPageLoaderStatus } from "../../../../state/misc";
import SongUploadDialog from "../../../../components/SongTokenization/SongUploadDialog";
import Speaker from "../../../../assets/svg/Speaker";
import { AirdropIcon } from "../../../../assets/Airdrop";
import { useDisclosure } from "@chakra-ui/react";
import Airdrop from "../../../../containers/Airdrop";
import Help from "../../../../assets/svg/Help";

export const drawerMinWidth = 280;
export const drawerMaxWidth = 24;

const tabs = [
  {
    icon: Feeds,
    label: "Feeds",
    available: true,
    path: "/feeds",
  },
  {
    icon: Artist,
    label: "Artistes ",
    available: true,
    path: "/artistes",
  },
  {
    icon: Speaker,
    label: "Tracks",
    available: true,
    path: "/tracks",
  },
  {
    icon: Wallet,
    label: "Wallet",
    available: true,
    path: "/wallet",
  },
  {
    icon: AirdropIcon,
    label: "Airdrops",
    available: true,
    path: null,
  },
  {
    icon: Help,
    label: "Help",
    available: false,
    path: "https://docs.loozr.io/",
  },
];

export const Left = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const xl = useMediaQuery("(min-width:1280px)");
  // const lg = useMediaQuery("(min-width:1024px)");
  const md = useMediaQuery("(min-width:768px)");
  const user = useSelector((state: AppState) => state.user.userInfo);
  const { handleBecomeArtiste } = useBecomeArtisteCallback();

  const becomeArtist = async () => {
    dispatch(setPageLoaderStatus(true));
    try {
      await handleBecomeArtiste({});
      window.location.reload();
    } catch (err) {
      toastHttpError(err);
      dispatch(setPageLoaderStatus(false));
    }
  };
  const [showModal, setShowModal] = React.useState(false);
  const [showMusicModal, setShowMusicModal] = React.useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleCloseSongTokenizationModal = () => {
    setShowMusicModal(false);
  };

  return (
    <div
      className={`bg-dark-900 flex flex-col items-start hidden md:block h-screen md:pl-20 xl:pl-[150px] pr-auto md:pr-6 xl:pr-6 pt-8 pb-12 mb-5`}
      style={{ width: xl ? `${drawerMaxWidth}vw` : md ? "max-content" : 0 }}
    >
      {xl ? (
        <img src={LoozrBeta} alt="" className={`w-28 mb-7`} />
      ) : (
        <img src={Loozr} alt="" className={`mb-6 ml-[12px] h-6 w-6`} />
      )}
      {user && (
        <>
          {user?.isArtist && (
            <button
              onClick={() => setShowMusicModal((prev) => !prev)}
              className="hidden xl:block text-[6px] py-2.5 px-4 font-medium rounded-full bg-s-gradient mb-6 "
            >
              <span className="text-xs">Upload tracks</span>
            </button>
          )}
        </>
      )}
      <div className="w-[85%] mx-2 xl:h-[85%] flex flex-col items-end justify-center xl:block  overflow-y-auto overflow-x-hidden">
        {tabs.map((tab: any) => (
          <Link
            className={`${
              tab.label === "Wallet" && "pt-6 border-t-[1px] border-[#141922]"
            } hover:flex flex items-center text-[14px] font-medium relative text-[#536079] mt-2.5 xl:mt-auto mb-[22px]`}
            to={tab.path || "#!"}
            key={tab.label}
            onClick={
              () => (tab.path ? null : onOpen())
              // toast.info("Coming soon!", TOAST_OPTIONS)
            }
          >
            <tab.icon
              className={`object-contain w-4 xl:w-4 h-4 xl:h-4 mr-3 xl:mr-4 ${
                tab.path === pathname ? "text-white" : "text-[#536079]"
              } ${isOpen && "text-white"}`}
            />

            <span
              className={`${
                tab.path === pathname && "font-bold text-[14px] text-white"
              } cursor-pointer hidden xl:inline ${isOpen && "text-white"}`}
            >
              {tab.label}
            </span>

            {/* {tab.label === "Airdrops" && (
              <div className=" text-[9px] py-1 text-[#F3EC4E] bg-new-100 rounded-full md:hidden xl:flex font-medium flex justify-center items-center ml-auto px-3 w-fit ">
                New
              </div>
            )} */}
          </Link>
        ))}
        {/* <div className="h-px w-full lg:w-full bg-muted-50 mt-8 mb-7" /> */}
      </div>
      {showModal && (
        <div className=" fixed inset-0 flex justify-center items-center md:overflow-y-hidden bg-black bg-opacity-90 z-[70] ">
          <div className=" w-full h-screen flex flex-col justify-center  md:w-[360px] md:h-auto relative z-[80]  md:rounded-2xl bg-[#12161F]">
            <div className=" w-full flex justify-between items-center py-4 px-6  border-b border-[#222A3B] ">
              <p className=" font-semibold text-[17px] text-white ">
                Verify on Twitter
              </p>
              <svg
                onClick={() => setShowModal(false)}
                className=" cursor-pointer "
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  d="M15.7898 1.13965L1.13867 15.7908"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.13867 1.13965L15.7898 15.7908"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className=" w-full pt-8 flex flex-col items-center px-8 ">
              <svg
                className=" mb-6 "
                width="70"
                height="84"
                viewBox="0 0 103 84"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100.085 2.04483C95.8152 5.05638 91.0881 7.35973 86.0853 8.86618C83.4002 5.77879 79.8317 3.59052 75.8624 2.59734C71.8931 1.60417 67.7145 1.85399 63.8918 3.31304C60.0691 4.77208 56.7867 7.36994 54.4886 10.7553C52.1905 14.1406 50.9875 18.15 51.0423 22.2414V26.6997C43.2073 26.9029 35.4436 25.1652 28.4428 21.6415C21.4419 18.1177 15.4212 12.9172 10.9168 6.50323C10.9168 6.50323 -6.91679 46.6288 33.2088 64.4623C24.0268 70.695 13.0887 73.8202 2 73.3791C42.1255 95.6711 91.1679 73.3791 91.1679 22.1076C91.1638 20.8657 91.0444 19.6269 90.8112 18.4071C95.3615 13.9197 98.5725 8.25409 100.085 2.04483V2.04483Z"
                  stroke="#FFF"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className=" font-medium text-[14px] w-[230px] leading-snug ">
                Tweet your user domain name to validate your artist profile.
              </p>
              <a
                target="_blank"
                rel="noreferrer"
                href={
                  "https://twitter.com/intent/tweet?text=Verifying%20my%20artist%20profile%20on%20%40officialloozr%20%23LoozrArtist%20%E2%9A%A1%EF%B8%8F%F0%9F%8E%A7%20https://testnet.loozr.io/" +
                  user.accountDomain
                }
                className="w-full mt-9"
              >
                <div
                  onClick={() => becomeArtist()}
                  className=" h-[50px] flex justify-center items-center text-white disabled:text-muted font-medium md:text-[13px] bg-gradient-ld disabled:bg-dark-800 mb-11 w-full"
                >
                  Verify now!
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
      {user && !user?.isArtist ? (
        <div
          onClick={() => becomeArtist()}
          className=" h-[50px] rounded-[8px] px-3 flex justify-center items-center text-white disabled:text-muted font-medium md:text-[13px] bg-gradient-ld disabled:bg-dark-800 mb-11 w-full"
        >
          Become an Artist
        </div>
      ) : null}

      {showMusicModal && (
        <div className=" fixed inset-0 flex justify-center items-center md:overflow-y-hidden bg-black bg-opacity-90 z-[70] ">
          <SongUploadDialog
            handleCloseModal={handleCloseSongTokenizationModal}
          />
        </div>
      )}

      {/* Airdrop */}
      {isOpen && <Airdrop onClose={onClose} isOpen={isOpen} onOpen={onOpen} />}
    </div>
  );
};

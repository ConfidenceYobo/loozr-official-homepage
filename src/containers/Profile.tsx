import React, { useEffect, useMemo, useState } from "react";
import { transactions } from "../components/dummy/wallet";
import Arrow45Deg from "../assets/icons/arrow-45deg.svg";
import Arrow225Deg from "../assets/icons/arrow-225deg.svg";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../state/store";
import soundcloud from "../assets/icons/soundcloud.svg";
import spotify from "../assets/icons/spotify.svg";
import instagram from "../assets/icons/instagram.svg";
import twitter from "../assets/icons/twitter.svg";
import share from "../assets/icons/share.svg";
import chain from "../assets/icons/chain.png";
import copy from "../assets/icons/copy.png";
import { abbrevNumber } from "../utils/formatBalance";
import { getIndividualProfile } from "../state/user/userActions";
import User from "../config/constants/models/user";
import CreatorStatCard from "../components/CreatorStatCard";
import CoinHodlers from "../components/history/CoinHodlers";
import {
  resetCoinPrice,
  resetHoldersList,
} from "../state/artist/artistReducer";
import { decodedJWT } from "../utils";
import Photo from "../components/Photo";
import VerifiedBadge from "../assets/icons/verified.svg";
import {
  useFollowerCallback,
  useFollowingCallback,
  useCheckFollowerCallback,
} from "../state/user/hooks/useAccount";
import { MIXER_ACCOUNT } from "../config/constants";
import CoinsBought from "../components/history/CoinsBought";
import { removeSuggestedUser } from "../state/user/userReducer";
import {
  useFollowCallback,
  useUnFollowCallback,
} from "../state/user/hooks/follows";
import CheckFollower from "../components/CheckFollower";
import CheckFollowerButton from "../components/CheckFollowerButton";
import QRCode from "react-qr-code";
import QrcodeModal from "../components/QrcodeModal";
import QrcodeScanner from "../components/QrcodeScanner";
import UserTracks from "../components/Tracks/UserTracks";

const Profile = (props) => {
  const push = useNavigate();
  let { accountDomain } = useParams();
  const [active, setActive] = useState(1);
  const [isShown, setIsShown] = useState(false);
  const [checkData, setCheckData] = useState(false);
  const [checkFollower, setCheckFollower] = useState("");
  const [showBio, setShowBio] = useState(false);
  const [data, setData] = useState([] as any);
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user.userInfo);
  const errorLoadingProfile = useSelector(
    (state: AppState) => state.user.errorLoadingProfile
  );
  const currentProfileFromState = useSelector(
    (state: AppState) => state.user.currentProfile
  );  
  const [currentProfile, setCurrentProfile] = useState<User>();
  const coinInfo = useSelector((state: AppState) => state.artist.coinInfo);

  const { getFollower } = useFollowerCallback();
  const { getFollowing } = useFollowingCallback();
  const { getCheckFollower } = useCheckFollowerCallback();

  const [showModal, setShowModal] = React.useState(false);
  const [qrCodeModal, setQrCodeModal] = React.useState(false);
  const [qrCodeScanerModal, setQrCodeScannerModal] = React.useState(false);
  const [copySuccess, setCopySuccess] = React.useState("");

  const navigate = useNavigate();

  const CheckFollowers = async () => {
    if (currentProfile?.id) {
      const result: any = await getCheckFollower(currentProfile?.id);
      setCheckFollower(result);
      console.log(result);
    }
  };

  React.useEffect(() => {
    CheckFollowers();
  }, []);

  const ClickFollwer = async () => {
    const result = await getFollower(currentProfile.id);
    setData(result);
    setShowModal(true);
  };

  const ClickFollwing = async () => {
    const result = await getFollowing(currentProfile.id);
    setData(result);
    setShowModal(true);
  };

  function copyToClipboard(item: any, text: any) {
    navigator.clipboard.writeText(item);
    setCopySuccess(text);
    const t1 = setTimeout(() => {
      setCopySuccess("");
      clearTimeout(t1);
    }, 2000);
  }

  const loadProfile = () => {
    if (accountDomain) {
      if (accountDomain !== user?.accountDomain) {
        dispatch(getIndividualProfile(accountDomain));
        return;
      }
      dispatch(getIndividualProfile(accountDomain));
    }
    dispatch(getIndividualProfile(decodedJWT()["id"]));
    setCurrentProfile(user);
  };

  const CloseModal = () => {
    dispatch(getIndividualProfile(accountDomain));
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(resetCoinPrice());
    dispatch(resetHoldersList());
  }, []);

  useEffect(() => {
    dispatch(resetCoinPrice());
    dispatch(resetHoldersList());
    loadProfile();
  }, [accountDomain, user]);

  useEffect(() => {
    setCurrentProfile(currentProfileFromState);
  }, [currentProfileFromState]);

  const GotoDomain = (item) => {
    setShowModal(false);
    navigate(`/${item}`);
  };

  const Transaction = () => {
    return (
      <>
        {transactions.length === 0 ? (
          <div className=" w-full py-5 rounded-lg bg-opacity-50 bg-[#10141C] mb-32 md:mb-12 ">
            <p className=" font-medium text-[13px] text-center ">
              No information avaliable 👋
            </p>
          </div>
        ) : (
          <>
            {transactions.map((item, index) => (
              <div
                className="w-full flex items-center justify-between text-white mb-32 md:mb-6"
                key={index}
              >
                <div className="flex items-start">
                  <div className="rounded-full h-[44px] w-[44px] bg-dark-700 mr-4 flex items-center justify-center">
                    <img
                      src={item.type === "cr" ? Arrow225Deg : Arrow45Deg}
                      alt=""
                      className="object-cover w-3 h-4"
                    />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-white mb-0.5">
                      {item.type === "dr" ? "Sent" : "Received"}
                      <span className="font-extrabold px-1">{item.token}</span>
                      coin
                    </p>
                    <p className="text-[10px] md:text-xs md:font-medium font-light text-muted">
                      {item.type === "dr" ? "to" : "from"}{" "}
                      {item.type === "dr" ? item.to : item.from}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-white mb-0.5">
                    ~${item.price}
                  </p>
                  <p className="text-[10px] md:text-xs md:font-medium font-light text-muted">
                    USD value
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </>
    );
  };

  const renderHistory = useMemo(() => {
    switch (active) {
      case 1:
        return coinInfo ? (
          <CoinHodlers coin={currentProfile} user={user} />
        ) : null;
      case 2:
        return <CoinsBought user={currentProfile} />;
      case 3:
        return <UserTracks user={currentProfile} />;
      default:
        return "";
    }
  }, [active, currentProfile, coinInfo, user]);

  if (currentProfile && !currentProfile.accountPrincipal) {
    return <div className="text-center mb-32">Profile Not Found!</div>;
  }

  const qrHandler = () => {
    setQrCodeModal(true);
    setIsShown(false);
  };

  const qrScanHandler = () => {
    setQrCodeScannerModal(true);
    setIsShown(false);
  };

  return (
    <div className="w-full md:px-0 px-6 mb-20 ">
      {currentProfile ? (
        <>
          {currentProfile.isArtist && currentProfile.tokenName && (
            <CreatorStatCard user={currentProfile} />
          )}
          <div className="flex md:flex-row flex-col mt-[32px] items-start mb-7">
            <div className=" relative md:w-auto w-fit flex md:justify-start justify-start md:mb-0 mb-8 ">
              <Photo
                alt={currentProfile.accountDomain}
                userId={currentProfile.username ?? currentProfile.accountPrincipal}
                src={currentProfile?.photo}
                className="h-[170px] md:h-[130px] text-4xl w-[170px] md:w-[130px] object-cover rounded-full md:mr-3"
                style={{ border: "8px solid #141922" }}
              />

              {/* {!currentProfile && (
                <img
                  src={VerifiedBadge}
                  alt=""
                  className="absolute md:w-9 w-12 md:h-9 h-12 md:right-3 md:bottom-2 right-0 bottom-4"
                />
              )} */}
            </div>
            <div className="md:ml-10">
              <div className=" flex ">
                <p className="text-[17px] md:text-xl font-medium text-white mb-1.5">
                  {currentProfile.accountDomain}
                </p>
                <button
                  onClick={() =>
                    copyToClipboard(currentProfile.accountDomain, "Copied!")
                  }
                  className=" w-[30px] ml-2 h-[30px] rounded-full bg-[#141922] flex justify-center items-center mr-2  "
                >
                  <img src={copy} alt="copy" className=" w-[12.17px] " />
                </button>
                {copySuccess === "Copied!" && copySuccess}
              </div>
              <p className="text-muted font-medium mt-[2px] text-xs md:text-xs">
                <span>
                  {currentProfile.username ?? currentProfile.accountPrincipal}
                </span>
                {currentProfile.isArtist && currentProfile.tokenName ? (
                  <span className="pointer ml-2 pl-2 before:top-[6px]">
                    Artiste
                  </span>
                ) : (
                  ""
                )}
              </p>
              <div className=" w-full py-6 flex items-center ">
                <div className=" mx-[9px] ">
                  {currentProfile.soundCloudLink ? (
                    <a href={currentProfile.soundCloudLink}>
                      <img
                        src={soundcloud}
                        alt=""
                        className=" w-[23.93px] h-[11.43px] "
                      />
                    </a>
                  ) : (
                    <img
                      src={soundcloud}
                      alt=""
                      className=" w-[23.93px] h-[11.43px] "
                    />
                  )}
                </div>
                <div className=" mx-[9px] ">
                  {currentProfile.spotifyLink ? (
                    <a href={currentProfile.spotifyLink}>
                      <img src={spotify} alt="" className=" w-[15.24px]  " />
                    </a>
                  ) : (
                    <img src={spotify} alt="" className=" w-[15.24px]  " />
                  )}
                </div>
                <div className=" mx-[9px] ">
                  {currentProfile.instagramLink ? (
                    <a href={currentProfile.instagramLink}>
                      <img src={instagram} alt="" className=" w-[16px]  " />
                    </a>
                  ) : (
                    <img src={instagram} alt="" className=" w-[16px]  " />
                  )}
                </div>
                <div className=" mx-[9px] mt-1 ">
                  {currentProfile.twitterLink ? (
                    <a href={currentProfile.twitterLink}>
                      <img src={twitter} alt="" className=" w-[18.76px]  " />
                    </a>
                  ) : (
                    <img src={twitter} alt="" className=" w-[18.76px]  " />
                  )}
                </div>
                <div className=" relative  mx-2  ">
                  <img
                    onClick={() => setIsShown((prev) => !prev)}
                    src={share}
                    alt=""
                    className=" w-[12.67px] cursor-pointer "
                  />
                  {isShown && (
                    <div className=" absolute w-[200px] bg-[#12161F] z-20 top-7 px-4 py-3 rounded-lg  shadow-xl ">
                      {currentProfile.isArtist && currentProfile.tokenName ? (<a
                        target="_blank"
                        rel="noreferrer"
                        href={
                          "https://dashboard.internetcomputer.org/canister/" +
                          currentProfile.tokenName
                        }
                        className="font-medium text-[13px] cursor-pointer  "
                      >
                        View artist on explorer
                      </a>): null}
                      <p
                        onClick={() =>
                          copyToClipboard(window.location.href, "Copied")
                        }
                        className=" font-medium text-[13px] mt-1 cursor-pointer  "
                      >
                        {copySuccess === "Copied"
                          ? copySuccess
                          : "Copy profile link"}
                      </p>
                      {/* {currentProfile?.id === user?.id && (  */}
                      <p
                        onClick={() => qrHandler()}
                        className=" font-medium text-[13px] mt-1 cursor-pointer  "
                      >
                        My Qr Code
                      </p>
                      {/* // )} */}
                      {/* {currentProfile?.id === user?.id && ( 
                        <p
                          onClick={() => qrScanHandler()}
                          className=" font-medium text-[13px] mt-1 cursor-pointer  "
                        >
                          Scan Qr Code
                        </p>
                      )} */}
                    </div>
                  )}
                  {isShown && (
                    <div
                      onClick={() => setIsShown(false)}
                      className=" fixed cursor-pointer z-10 inset-0 "
                    />
                  )}
                </div>
                {/* <div className=" relative  mx-2  ">
                  <img
                    onClick={() => setIsShown((prev) => !prev)}
                    src={qr}
                    alt=""
                    className=" w-[12.67px] cursor-pointer "
                  />
                </div> */}
              </div>
              {/* {currentProfile?.id === user?.id && (
                <div className=" w-full py-6 flex items-center " >
                  <button
                      onClick={() => setQrCodeModal(true)}
                      className="py-[14.1px] px-3 sm:px-6 md:px-7 text-xs md:text-sm font-medium bg-loozr-purple mr-2 rounded-full"
                    >
                    Qr Code
                  </button>
                  <button
                      onClick={() => setQrCodeScannerModal(true)}
                      className="py-[14.1px] px-3 sm:px-6 md:px-7 text-xs md:text-sm font-medium bg-loozr-purple ml-2 rounded-full"
                    >
                    Scan Qr Code
                  </button>
                </div>
              )} */}
              {currentProfile?.bio && (
                <>
                  {currentProfile?.bio.length >= 100 || !showBio ? (
                    <p className="text-white max-w-[435px] leading-normal font-medium text-xs md:text-[13px] mb-[20px]">
                      {(currentProfile?.bio).slice(0, 100)}
                      <span
                        onClick={() => setShowBio(true)}
                        className=" text-[#FFCD43] cursor-pointer "
                      >
                        ...See More
                      </span>
                    </p>
                  ) : (
                    <p className="text-white max-w-[435px] font-medium text-xs md:text-[13px] mb-[20px]">
                      {currentProfile.bio}
                      {currentProfile?.bio.length <= 100 && (
                        <span
                          onClick={() => setShowBio(false)}
                          className=" text-[#FFCD43] cursor-pointer ml-2 "
                        >
                          {" "}
                          See Less
                        </span>
                      )}
                    </p>
                  )}
                </>
              )}
              <div className="flex items-center mb-6">
                <p
                  onClick={() => ClickFollwer()}
                  className="text-xs md:text-sm cursor-pointer font-bold mr-6"
                >
                  {abbrevNumber(currentProfile.followersCount)}
                  <span className="ml-2 text-sm text-muted font-medium">
                    Followers
                  </span>
                </p>
                <p
                  onClick={() => ClickFollwing()}
                  className="text-xs md:text-sm cursor-pointer font-bold mr-6"
                >
                  {abbrevNumber(currentProfile.followingsCount)}
                  <span className="ml-2 text-sm text-muted font-medium">
                    Following
                  </span>
                </p>
                {currentProfile?.isArtist && currentProfile.tokenName ? (
                  <p className="text-xs md:text-sm font-bold">
                    0
                    <span className="ml-2 text-sm text-muted font-medium">
                      Listens
                    </span>
                  </p>
                ) : null}
              </div>
              {currentProfile?.isArtist && currentProfile?.tokenName ? (
                <div className="flex items-start mb-[15px]">
                  <button
                    onClick={() => push(`/artistes/buy/${currentProfile?.id}`)}
                    className="py-[14.1px] px-3 sm:px-6 md:px-7 text-xs md:text-sm font-medium bg-loozr-purple rounded-full"
                  >
                    Buy artiste coin
                  </button>
                  <button
                    onClick={() => push(`/artistes/sell/${currentProfile?.id}`)}
                    className="py-[14.1px] px-3 sm:px-6 md:px-7 text-xs md:text-sm font-medium bg-dark-700 rounded-full ml-6"
                  >
                    Sell artiste coin
                  </button>
                </div>
              ) : null}
              <CheckFollowerButton otheruser={currentProfile} user={user} />
              {currentProfile?.website && (
                <div className=" flex items-center py-2 mb-4 ">
                  <img src={chain} alt="chain" className=" w-[12.39px] " />
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={"http://" + currentProfile?.website + ""}
                    className=" font-medium text-sm ml-2 "
                  >
                    {currentProfile?.website}
                  </a>
                </div>
              )}
              {currentProfile?.id === user?.id ? (
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => push("/profile/edit")}
                    className="py-[14.1px] px-[27px] text-sm font-medium  bg-dark-700 rounded-full"
                  >
                    Update profile
                  </button>
                  {/* <div className="w-[50px] h-[50px] rounded-full bg-dark-700 flex items-center justify-center ml-6">
                    <MoreIcon />
                  </div> */}
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-full pb-2 mb-9 border-b-2 border-muted-50 flex items-center text-sm font-medium text-muted">
            <p
              className={`mr-10 cursor-pointer ${active === 1 ? "active-tab-bottom " : "text-muted font-medium"
                }`}
              onClick={() => setActive(1)}
            >
              Coin holders
            </p>
            <p
              className={`mr-10 cursor-pointer ${active === 2 ? "active-tab-bottom " : "text-muted font-medium"
                }`}
              onClick={() => setActive(2)}
            >
              Coins bought
            </p>
            <p
              className={`cursor-pointer ${
                active === 3 ? "active-tab-bottom " : "text-muted font-medium"
              }`}
              onClick={() => setActive(3)}
            >
              My Tracks
            </p>
          </div>
          {renderHistory}
        </>
      ) : errorLoadingProfile ? (
        <div className="text-center">Profile Not Found!</div>
      ) : (
        <div className="text-center">Loading Profile...</div>
      )}
      {qrCodeModal && (
        <QrcodeModal close={setQrCodeModal} userInfo={currentProfile} />
      )}
      {/* {qrCodeScanerModal && ( 
        <QrcodeScanner close={setQrCodeScannerModal}  />
      )} */}
      {showModal && (
        <div className=" fixed inset-0 flex justify-center items-center md:overflow-y-hidden bg-black bg-opacity-40 z-[70] ">
          <div className=" w-full md:w-[360px] md:h-auto relative z-[120] h-screen rounded-2xl bg-[#12161F]">
            <div className=" w-full flex items-center border-b border-[#222A3B] justify-between py-4 px-6 ">
              <p className="  font-medium text-white">Follows</p>
              <button
                onClick={() => CloseModal()}
                className=" font-medium text-xs bg-[#8369F4] w-[65px] h-7 rounded-lg "
              >
                Done
              </button>
            </div>
            <div className=" w-full px-6 md:py-4 md:h-[60vh] h-full flex flex-1 flex-col overflow-y-auto ">
              {/* {data && ( */}
              <>
                {data.map((item: any, index: any) => {
                  const domainName = item.account_id + "." + MIXER_ACCOUNT;
                  console.log(item);

                  return (
                    <div
                      key={index}
                      className=" w-full cursor-pointer flex my-3 relative items-center "
                    >
                      <div
                        onClick={() => GotoDomain(domainName)}
                        className=" w-fit relative cursor-pointer "
                      >
                        <Photo
                          alt=""
                          userId={item.account_id}
                          src={item?.photo}
                          className="object-contain w-10 h-10 rounded-full "
                          style={{ border: "3px solid #141922" }}
                        />
                        {item?.isVerified && (
                          <img
                            src={VerifiedBadge}
                            alt=""
                            className="absolute w-4 h-4 right-0 bottom-0"
                          />
                        )}
                      </div>
                      {/* <div className=' w-10 h-10 rounded-full bg-red-600 border-[3px] border-[#222A3B] ' /> */}
                      <div
                        onClick={() => GotoDomain(domainName)}
                        className=" ml-3  cursor-pointer "
                      >
                        <div className=" flex -mt-1 items-center ">
                          <p className=" text-[13px] font-semibold ">
                            {" "}
                            {item?.account_id}
                          </p>
                        </div>
                        <div className=" flex -mt-1 items-center ">
                          <p className=" text-[11px] font-semibold text-[#536079] ">
                            {item?.email.slice(0, 7)}
                          </p>
                        </div>
                      </div>
                      <CheckFollower
                        current={currentProfile}
                        otheruser={item}
                        check={data}
                        user={user}
                      />
                    </div>
                  );
                })}
                {data.length === 0 && (
                  <p className=" mt-4 font-medium text-center ">
                    No information avaliable
                  </p>
                )}
              </>
              {/* )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

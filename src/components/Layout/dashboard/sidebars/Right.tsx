import React, { useEffect, useRef, useState } from "react";
import AppStore from "../../../../assets/img/AppStore.png";
import GooglePlay from "../../../../assets/img/GooglePlay.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";
import { LZR_IN_USD, MIXER_ACCOUNT } from "../../..//../config/constants";
import { getLZRBalanceCallback } from "../../../../state/wallet/hooks/fetchBalance";
import { useSelector } from "react-redux";
import { AppState } from "../../../../state/store";
import { formatBalanceUSD, formatNumber, getFullDisplayBalance, } from "../../../../utils/formatBalance";
import SuggestedFollows from "../../../suggestion/SuggestedFollows";
import SuggestedUser from "../../../SuggestedUser"
import Verify from "../../../../assets/svg/verify.svg";
import More from "../../../../assets/svg/More";
import userComing from "../../../../assets/svg/userComing.svg";
import { drawerMaxWidth, drawerMinWidth } from './Left'
import Marquee from "react-fast-marquee";
import Photo from "../../../Photo";
import { Input } from "@chakra-ui/react";
import { ExpandMore } from "@mui/icons-material";

export default function Right() {

  const xl = useMediaQuery("(min-width:1280px)");
  // const lg = useMediaQuery("(min-width:1024px)");
  const md = useMediaQuery("(min-width:768px)");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state: AppState) => state.user.userInfo);
  const lzrAccountPrincipal = `${user?.accountPrincipal}`;

  const [balanceInLzr, setLZRBalance] = useState('_');
  const [balanceUsd, setBalanceUSD] = useState('_.__');
  const [showModal, setShowModal] = useState(false);
  const [isShown, setIsShown] = React.useState(false)
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setProfileModal(false);
      }
    }

    // Attach the click event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, setProfileModal]);

  const Checking = (item: any) => {
    if (user) {
      if (user.accountPrincipal.length > 16) {
        setIsShown(item);
      } else {
        setIsShown(false);
      }
    }
  }



  useEffect(() => {
    const loadLZRBalance = async (accountPrincipal: string) => {
      const { handleGetLZRBalanace } = getLZRBalanceCallback();
      try {
        const result = await handleGetLZRBalanace(accountPrincipal);
        const balanceResult = result;
        const balanceBN = getFullDisplayBalance(balanceResult);

        setLZRBalance(formatNumber(Number(balanceBN)));
        setBalanceUSD(formatBalanceUSD(Number(balanceBN)));
      } catch (err) {
        console.log(err);
      }
    };

    loadLZRBalance(lzrAccountPrincipal);
  }, []);

  return (
    <>
      <div className="bg-dark-900 flex flex-col items-start h-screen gap-6 py-4 md:pr-20 md:pl-6 xl:pr-[100px] xl:pl-3 pb-12 mb-5" style={{ width: xl ? `${drawerMaxWidth}vw` : md ? "max-content" : 0, }}>
        {!user ? (
          <div className=" flex items-center justify-end gap-x-2 w-full">
            {/* <button className="rounded-full h-[40px] px-8 bg-[#141922] outline-none focus:outline-none" onClick={() => navigate("/login")}>
              Login
            </button> */}
            <button className="rounded-full h-[40px] w-full px-8 bg-white text-dark-900 text-xs hidden lg:block outline-none focus:outline-none" onClick={() => navigate("/login")}>
              Login account
            </button>
          </div>
        ) : (
          <div onClick={() => setProfileModal(true)} className="relative mt-1.5 flex w-full items-center cursor-pointer" onMouseOver={() => { Checking(true); }} onMouseOut={() => { Checking(false); }} >
            <div className="relative w-fit ">
              <div className=" w-10 h-10 flex">
                <Photo
                  alt=""
                  src={user?.photo}
                  userId={user.username ?? user?.accountPrincipal}
                  className="object-cover w-10 h-10 flex justify-center items-center rounded-full  "
                  style={{ border: "3px solid #141922" }}
                />
              </div>
              <img src={Verify} alt="" className="absolute bottom-0 right-0 w-4 " />
            </div>
            <div className="hidden xl:block w-full pl-2 ">
              {user?.accountPrincipal && (
                <>
                  {isShown ? (
                    <Marquee speed={50} gradient={false}>
                      <p className=" text-xs font-bold text-white name-tag">
                        {user?.accountPrincipal}
                      </p>
                      <div className="bg-new-100 text-[#F3EC4E] text-medium py-1 px-2 rounded-full text-[10px] w-fit">3.32$LZR</div>
                    </Marquee>
                  ) : (
                    <div className="flex items-center gap-[4px] w-full">
                      <p className=" text-xs font-bold text-white name-tag">
                        {user?.accountPrincipal.slice(0, 16)}
                      </p>
                      <ExpandMore fontSize='small' />
                          <div className="bg-new-100 text-[#F3EC4E] text-medium py-1 px-2 rounded-full text-[10px] w-fit">3.82$LZR</div>
                    </div>
                  )}
                </>
              )}
            </div>
            {
              profileModal && (
                <>
                  {/* onClick={() => (user ? navigate("/" + user.accountDomain) : null)}  */}
                    <div ref={modalRef} className="absolute top-14 w-full bg-dark-900 rounded-[12px] overflow-hidden" style={{ border: "2px solid rgba(83, 96, 121, 0.2)" }}>
                    <div className="flex items-start justify-between p-3">
                      <p className="txt text-muted font-[600]">Total Wallet:</p>
                      <div className="flex flex-col gap-1 items-right">
                        <div className="text-[#F3EC4E] text-[12px]">3.32$LZR</div>
                        <div className="text-muted text-[10px]">~$102.3232</div>
                      </div>
                    </div>
                      <div className="p-3 bg-dark-700" style={{ borderTop: "2px solid rgba(83, 96, 121, 0.2)" }} onClick={() => (user ? navigate("/" + user.accountDomain) : null)} >View my profile</div>
                      <div className="p-3 bg-dark-700" style={{ borderTop: "2px solid rgba(83, 96, 121, 0.2)" }} onClick={() => (user ? navigate("/profile/edit") : null)}>Edit profile</div>
                      <div className="p-3 bg-dark-700" style={{ borderTop: "2px solid rgba(83, 96, 121, 0.2)" }}>My wallet</div>
                      <div className="p-3 bg-dark-700" style={{ borderTop: "2px solid rgba(83, 96, 121, 0.2)" }}>Log out</div>
                  </div>
                </>
              )}
          </div>
        )}
        <div className="h-px w-full lg:w-full bg-muted-50 mt-[-10px] mb-3" />
        <div className="w-full flex flex-col mt-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-muted">Coming to Loozr! </p>
            <p className="text-xs text-white">Snoop Dogg, Burna Boy plus 15K+ Artist profiles reserved.</p>
            <div className="w-full flex items-center justify-between p-3 rounded-[18px] bg-dark-700">
              <img src={userComing} alt='' className="w-[120px]" />
              <More />
            </div>
          </div>
          <div className="h-px w-full lg:w-full bg-muted-50 mt-4 mb-3" />
          <SuggestedFollows modal={setShowModal} />
        </div>
        <div className="flex flex-col gap-[18px] h-screen justify-end w-full">
          <p className="text-[13px] font-medium leading-5 text-muted">
            Coming Soon
          </p>
          <div className="flex gap-4 items-center w-full">
            <img src={AppStore} alt="" className="w-[40%] cursor-pointer" />
            <img src={GooglePlay} alt="" className="w-[40%] cursor-pointer" />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <p className="text-[12px] font-medium leading-5 text-muted">
              Report problem
            </p>
            <p className="text-[12px] font-medium leading-5 text-muted">
              Terms & Policies
            </p>
            <p className="text-[12px] font-medium leading-5 text-muted">
              Coming Soon
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className=" fixed inset-0 flex justify-center items-center md:overflow-y-hidden bg-black bg-opacity-40 z-[70] "
        >
          <div className=" w-full md:w-[360px] md:h-auto relative z-[80] h-screen rounded-2xl bg-[#12161F]">
            <div className=" w-full flex items-center border-b border-[#222A3B] justify-between py-4 px-6 ">
              <p className="  font-medium text-white">Suggested For You</p>
              <button
                onClick={() => setShowModal(false)}
                className=" font-medium text-xs bg-[#8369F4] w-[65px] h-7 rounded-lg "
              >
                Done
              </button>
            </div>
            <SuggestedUser />
          </div>
        </div>
      )}
      {showMobileModal && (
        <div
          className=" fixed inset-0 flex justify-center items-center md:overflow-y-hidden bg-black bg-opacity-40 z-[70] "
        >
          <div className=" w-full md:w-[360px] md:h-auto relative z-[80] h-screen lg:rounded-2xl bg-[#0C0F15]">
            <div className=" w-full flex flex-col py-4 px-6 ">
              <div className=" relative h-[45px] " >
                <Input backgroundColor="#12161F" borderColor="#222A3B" focusBorderColor="#222A3B" paddingLeft="40px" borderRadius="1000px" height="45px" placeholder="Search artiste, fans… " fontSize="sm" />
                <div className=" h-[45px] flex justify-center items-center w-fit top-0 absolute left-0 px-3 z-10 " >
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00847 8.6769e-07C9.56256 -0.00072266 11.0832 0.451056 12.3849 1.30018C13.6865 2.1493 14.7127 3.35903 15.3382 4.78167C15.9638 6.20431 16.1616 7.7783 15.9075 9.31147C15.6534 10.8447 14.9584 12.2707 13.9073 13.4154L16.4815 15.9842C16.5802 16.1029 16.6311 16.2542 16.6241 16.4084C16.6172 16.5626 16.5529 16.7087 16.4439 16.818C16.3349 16.9273 16.189 16.9919 16.0348 16.9993C15.8806 17.0067 15.7292 16.9562 15.6103 16.8578L13.0051 14.2596C12.006 15.0583 10.83 15.6059 9.57573 15.8567C8.32143 16.1075 7.0253 16.0541 5.79589 15.701C4.56647 15.3479 3.43956 14.7053 2.50953 13.8271C1.5795 12.949 0.873421 11.8607 0.450428 10.6536C0.0274346 9.44642 -0.10016 8.15548 0.0783306 6.88888C0.256821 5.62227 0.7362 4.41687 1.47632 3.37362C2.21644 2.33037 3.19576 1.47964 4.33226 0.892679C5.46876 0.305719 6.72935 -0.000385526 8.00847 8.6769e-07ZM8.00847 1.23367C6.66865 1.23351 5.35887 1.63069 4.24478 2.37496C3.1307 3.11923 2.26235 4.17717 1.74955 5.41497C1.23675 6.65278 1.10254 8.01485 1.36388 9.32894C1.62523 10.643 2.2704 11.8501 3.2178 12.7975C4.1652 13.7449 5.37227 14.3901 6.68636 14.6514C8.00045 14.9128 9.36252 14.7786 10.6003 14.2658C11.8381 13.753 12.8961 12.8846 13.6403 11.7705C14.3846 10.6564 14.7818 9.34665 14.7816 8.00683C14.7796 6.2111 14.0653 4.48951 12.7956 3.21974C11.5258 1.94997 9.8042 1.23572 8.00847 1.23367Z" fill="#536079" />
                  </svg>
                </div>
              </div>
              <div className=" mt-8" >
                <div className=" w-full flex items-center justify-between " >
                  <div className=" flex items-center gap-4 " >
                    <div className=" w-[33px] h-[33px] rounded-lg flex bg-[#12161F] justify-center items-center " >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00391 1V11" stroke="#536079" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.01 6H1" stroke="#536079" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className=" text-white font-bold text-xs " >Upload song</p>
                      <p className=" mt-[2px] text-[11px] text-[#536079] font-medium " >Release your music and get crowdfunded</p>
                    </div>
                  </div>
                  <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.184239 12.8158C-0.0390811 12.5924 -0.0593829 12.243 0.123334 11.9967L0.184239 11.9262L5.61013 6.5L0.184239 1.07382C-0.0390811 0.850505 -0.0593829 0.501045 0.123334 0.25479L0.184239 0.18424C0.40756 -0.0390806 0.757019 -0.0593824 1.00327 0.123334L1.07383 0.18424L6.94479 6.05521C7.16811 6.27853 7.18841 6.62799 7.0057 6.87424L6.94479 6.94479L1.07383 12.8158C0.828173 13.0614 0.429892 13.0614 0.184239 12.8158Z" fill="#536079" />
                  </svg>
                </div>
                <div className=" w-full flex items-center mt-4 justify-between " >
                  <div className=" flex items-center gap-4 " >
                    <div className=" w-[33px] h-[33px] rounded-lg flex bg-[#12161F] justify-center items-center " >
                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.67646 14.0002C3.1544 14.0002 1 13.6187 1 12.0912C1 10.5636 3.14051 9.17432 5.67646 9.17432C8.19852 9.17432 10.3529 10.5504 10.3529 12.0773C10.3529 13.6041 8.21241 14.0002 5.67646 14.0002Z" stroke="#536079" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.67724 6.99502C7.33238 6.99502 8.67475 5.65266 8.67475 3.99751C8.67475 2.34171 7.33238 1 5.67724 1C4.02209 1 2.67971 2.34171 2.67971 3.99751C2.67378 5.6467 4.00688 6.98907 5.65608 6.99502H5.67724Z" stroke="#536079" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11.7656 4.95264V7.60431" stroke="#536079" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.1186 6.27979H10.4141" stroke="#536079" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className=" text-white font-bold text-xs " >Edit profile </p>
                      <p className=" mt-[2px] text-[11px] text-[#536079] font-medium " >Customize your account</p>
                    </div>
                  </div>
                  <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.184239 12.8158C-0.0390811 12.5924 -0.0593829 12.243 0.123334 11.9967L0.184239 11.9262L5.61013 6.5L0.184239 1.07382C-0.0390811 0.850505 -0.0593829 0.501045 0.123334 0.25479L0.184239 0.18424C0.40756 -0.0390806 0.757019 -0.0593824 1.00327 0.123334L1.07383 0.18424L6.94479 6.05521C7.16811 6.27853 7.18841 6.62799 7.0057 6.87424L6.94479 6.94479L1.07383 12.8158C0.828173 13.0614 0.429892 13.0614 0.184239 12.8158Z" fill="#536079" />
                  </svg>
                </div>
                <div className=" w-full flex items-center mt-4 justify-between " >
                  <div className=" flex items-center gap-4 " >
                    <div className=" w-[33px] h-[33px] rounded-lg flex bg-[#12161F] justify-center items-center " >
                      <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5526 0.447233C11.9563 -0.149078 10.9178 -0.149078 10.322 0.447233L3.96905 6.80022C3.70883 6.7305 3.43715 6.68983 3.15509 6.68983C1.41537 6.68983 0 8.1052 0 9.84492V12.6056C0 12.8232 0.17677 13 0.394386 13H3.15509C4.8948 13 6.31017 11.5846 6.31017 9.84492C6.31017 8.68939 5.68389 7.67967 4.75462 7.13001L9.61481 2.26983L10.1724 2.82742C10.2493 2.90436 10.3502 2.94292 10.4513 2.94292C10.5522 2.94292 10.6532 2.90418 10.7302 2.82742C10.8844 2.67319 10.8844 2.42388 10.7302 2.26983L10.1726 1.71223L10.8797 1.00513C11.1778 0.707055 11.6968 0.707055 11.995 1.00513C12.144 1.15409 12.226 1.35216 12.226 1.56273C12.226 1.7733 12.144 1.97137 11.9949 2.12032L6.47347 7.64172C6.31924 7.79595 6.31924 8.04526 6.47347 8.19931C6.55041 8.27625 6.6513 8.31481 6.75236 8.31481C6.85325 8.31481 6.95431 8.27608 7.03125 8.19931L12.5526 2.67792C12.8507 2.38036 13.0148 1.98389 13.0148 1.56273C13.0148 1.14157 12.8507 0.745065 12.5526 0.44736L12.5526 0.447233ZM5.52126 9.84488C5.52126 11.1499 4.45994 12.2112 3.15495 12.2112H0.788637V9.84488C0.788637 8.53989 1.84996 7.47857 3.15495 7.47857C4.45994 7.47857 5.52126 8.53989 5.52126 9.84488Z" fill="#536079" />
                      </svg>
                    </div>
                    <div>
                      <p className=" text-white font-bold text-xs " >LOOZRverse </p>
                      <p className=" mt-[2px] text-[11px] text-[#536079] font-medium " >The Metaverse for creators and communities</p>
                    </div>
                  </div>
                  <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.184239 12.8158C-0.0390811 12.5924 -0.0593829 12.243 0.123334 11.9967L0.184239 11.9262L5.61013 6.5L0.184239 1.07382C-0.0390811 0.850505 -0.0593829 0.501045 0.123334 0.25479L0.184239 0.18424C0.40756 -0.0390806 0.757019 -0.0593824 1.00327 0.123334L1.07383 0.18424L6.94479 6.05521C7.16811 6.27853 7.18841 6.62799 7.0057 6.87424L6.94479 6.94479L1.07383 12.8158C0.828173 13.0614 0.429892 13.0614 0.184239 12.8158Z" fill="#536079" />
                  </svg>
                </div>
              </div>
            </div>
            {/* </div> */}
            <p className=" font-bold text-sm text-white ml-6 my-2 " >Suggested for you </p>
            <SuggestedUser />
          </div>
        </div>
      )}
    </>
  )
}

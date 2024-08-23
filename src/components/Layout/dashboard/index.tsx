import React, { useEffect, useState } from "react";
import { Left } from "./sidebars";
import { TopBar } from "./topbar";
import useMediaQuery from "@mui/material/useMediaQuery";

import Explore from "../../../assets/svg/Explore";
import Artist from "../../../assets/svg/Artist";
import Wallet from "../../../assets/svg/Wallet";
import { useLocation, useNavigate } from "react-router-dom";
import { getLZRBalanceCallback } from "../../../state/wallet/hooks/fetchBalance";
import { useSelector } from "react-redux";
import { AppState } from "../../../state/store";
import {
  formatBalanceUSD,
  formatNumber,
  getFullDisplayBalance,
} from "../../../utils/formatBalance";
import Library from "../../../assets/svg/Library";
import Music from "../../../assets/svg/Music";
import Right from "./sidebars/Right";
import Feeds2 from "../../../assets/svg/Feeds2";
import Speaker from "../../../assets/svg/Speaker";
import Help from "../../../assets/svg/Help";
import { Link } from "react-router-dom";
import { AirdropIcon } from "../../../assets/Airdrop";
import { useDisclosure } from "@chakra-ui/react";
import Airdrop from "../../../containers/Airdrop";

const tabs = [
  {
    icon: Feeds2,
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
  // {
  //   icon: Help,
  //   label: "Help",
  //   available: false,
  //   path: "https://docs.loozr.io/",
  // },
];

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const xl = useMediaQuery("(min-width:1280px)");
  // const lg = useMediaQuery("(min-width:1024px)");
  const md = useMediaQuery("(min-width:768px)");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const user = useSelector((state: AppState) => state.user.userInfo);
  const lzrAccountPrincipal = `${user?.accountPrincipal}`;

  const [balanceInLzr, setLZRBalance] = useState("0.00");
  const [balanceUsd, setBalanceUSD] = useState("0.00");
  const [showModal, setShowModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

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
    <div className=" w-full flex flex-col justify-center items-center ">
      <div className="flex justify-between relative h-screen bg-[#0c0f16] w-full md:w-[768px] lg:w-full">
        <Left />
        <div className="md:flex-1 md:pt-4 mb-10 !pr-0 w-full !overflow-x-hidden">
          <div className="flex flex-col relative h-screen items-center w-full">
            <TopBar />
            <div className="w-full md:-mt-2 !px-0 ">
              <div className="w-full flex flex-col !px-0 md:flex-row md:justify-between md:items-start">
                <div className="w-screen w-full !px-0 md:px-0 md:pl-0 md:pr-7 h-screen">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Right />
        {/* {user && ( */}
        <div className="flex items-end justify-between md:hidden z-50 fixed gap-3 bottom-0 inset-x-0 py-[20px] px-[24px] bg-dark-900 w-full">
          {tabs.map((tab, index) => (
            <Link
              to={tab.path || "#!"}
              key={index}
              className={`hover:flex flex flex-col gap-[6px] items-center justify-center cursor-pointer text-[#536079] ${
                tabs.length !== index + 1 && ""
              }`}
              onClick={
                () => (tab.path ? null : onOpen())
                // toast.info("Coming soon!", TOAST_OPTIONS)
              }
            >
              <tab.icon
                className={`object-contain w-5 h-5 ${
                  tab.path === pathname ? "text-white" : "text-[#536079]"
                } ${isOpen && "text-white"}`}
              />
              <p
                className={`text-[8px] font-medium ${
                  tab.path === pathname ? "text-white" : "text-[#536079]"
                } ${isOpen && "text-white"}`}
              >
                {tab.label}
              </p>
            </Link>
          ))}
        </div>
        {/* )} */}
      </div>
      {!user && (
        <div className="hidden md:flex absolute bottom-0 w-full bg-g-gradient py-2 px-10 justify-between items-center">
          <p className="font-medium text-white text-[12px] md:text-[14px]">
            Enabling everyone to #Listen2Earn per second, trade, and invest in
            creators & music tokens.
          </p>
          <div className="flex gap-6 items-center">
            <p
              className="rounded-full px-4 py-2 text-[14px] text-white bg-white/20"
              onClick={() => navigate("/login")}
            >
              Login account
            </p>
            <p
              className="rounded-full px-4 py-2 text-[14px] text-white bg-[#141922]"
              onClick={() => navigate("/signup")}
            >
              Signup for free!
            </p>
          </div>
        </div>
      )}
      {/* Airdrop */}
      {isOpen && <Airdrop onClose={onClose} isOpen={isOpen} onOpen={onOpen} />}
      {(localStorage.getItem("userTwitterProfile") ||
        localStorage.getItem("userTiktokProfile") ||
        localStorage.getItem("userSpotifyProfile")) && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-[80]">
          <div className="bg-[#12161F] rounded-lg p-6 max-w-sm m-4 w-full flex flex-col gap-3 justify-center items-center ">
            <div className="pointer-events-none">
              <img
                src="/confetti.png"
                alt="Confetti"
                className="w-[100px] h-[100px] object-cover"
              />
            </div>
            <h2 className="text-white text-xl font-bold">
              Connection Successful!
            </h2>
            <p className="text-[#536079] text-center">
              Your social account has been successfully connected to Loozr.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("userTwitterProfile");
                localStorage.removeItem("userTiktokProfile");
                localStorage.removeItem("userSpotifyProfile");
              }}
              className="w-full bg-gradient-ld text-white font-medium py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

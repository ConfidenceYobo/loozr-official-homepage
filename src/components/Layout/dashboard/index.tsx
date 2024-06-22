import React, { useEffect, useState } from "react";
import { Left } from "./sidebars";
import { TopBar } from "./topbar";
import useMediaQuery from "@mui/material/useMediaQuery";

import Explore from "../../../assets/svg/Explore";
import Artist from "../../../assets/svg/Artist";
import Wallet from "../../../assets/svg/Wallet";
import { useNavigate } from "react-router-dom";
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

const tabs = [
  {
    icon: Explore,
    label: "Explore",
    available: true,
    path: "/explore",
  },
  {
    icon: Artist,
    label: "Artistes ",
    available: true,
    path: "/artistes",
  },
  {
    icon: Music,
    label: "Tracks",
    available: true,
    path: "/wallet",
  },
  {
    icon: Wallet,
    label: "Wallet",
    available: true,
    path: "/wallet",
  },
  {
    icon: Library,
    label: "Library",
    available: true,
  },
];

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const xl = useMediaQuery("(min-width:1280px)");
  // const lg = useMediaQuery("(min-width:1024px)");
  const md = useMediaQuery("(min-width:768px)");
  const navigate = useNavigate();

  const user = useSelector((state: AppState) => state.user.userInfo);
  const lzrAccountPrincipal = `${user?.accountPrincipal}`;

  const [balanceInLzr, setLZRBalance] = useState("_");
  const [balanceUsd, setBalanceUSD] = useState("_.__");
  const [showModal, setShowModal] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);

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
    <div className=" w-full flex md:bg-dark-800 flex-col justify-center items-center ">
      <div className="flex justify-between relative h-screen md:bg-[#0c0f16] w-full md:w-[768px] lg:w-full !overflow-hidden">
        <Left />
        <div
          className={`flex-1 pt-4 pb-10 md:px-0 md:pl-7 max-w-full lg:pr-0 !overflow-x-hidden md:mb-auto`}
        >
          <div className="flex flex-col relative h-screen overflow-y-hidden items-center w-full">
            <TopBar />
            <div className="w-full md:-mt-2 ">
              <div className="w-full flex  flex-col md:flex-row md:justify-between md:items-start">
                <div className="w-screen md:pl-0 md:pr-7 h-[90vh] overflow-y-auto ">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Right />
        {/* {isLoggedIn && (  */}
        {/* <div className="flex items-center justify-between md:hidden z-50 fixed gap-3 bottom-0 inset-x-0 px-2 py-4  bg-dark-900 w-full">
          {tabs.map((tab, index) => (
            <Link
              to={tab.path || "#!"}
              key={index}
              className={`hover:flex flex flex-col items-center justify-center ${tabs.length !== index + 1 && ""
                }`}
              onClick={() =>
                // tab.path ? null : toast.info("Coming soon!", TOAST_OPTIONS)
                setShowMobileModal(true)
              }
            >
              <tab.icon
                className={`object-contain w-3.5 h-3.5 mb-2 ${tab.path === pathname ? "text-white" : "text-[#536079]"
                  }`}
              />
              <p
                className={`text-xs font-medium ${tab.path === pathname ? "text-white" : "text-[#536079]"
                  }`}
              >
                {tab.label}
              </p>
            </Link>
          ))}
        </div> */}
      </div>
      {!user && (
        <div className="absolute bottom-0 w-full bg-g-gradient py-2 px-10 flex justify-between items-center">
          <p className="font-medium text-white">
            Enabling everyone to #Listen2Earn per second, trade, and invest in
            creators & music tokens.
          </p>
          <div className="flex gap-6 items-center">
            <p
              className="rounded-full px-4 py-2 text-white bg-white/20"
              onClick={() => navigate("/login")}
            >
              Login account
            </p>
            <p
              className="rounded-full px-4 py-2 text-white bg-[#141922]"
              onClick={() => navigate("/signup")}
            >
              Signup for free!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

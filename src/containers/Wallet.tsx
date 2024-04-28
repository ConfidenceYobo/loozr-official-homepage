import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { transactions } from "../components/dummy/wallet";
import Arrow45Deg from "../assets/icons/arrow-45deg.svg";
import Arrow225Deg from "../assets/icons/arrow-225deg.svg";
import copyimg from "../assets/icons/copy.png";
import { getLZRBalanceCallback } from "../state/wallet/hooks/fetchBalance";
import { LZR_IN_USD, MIXER_ACCOUNT } from "../config/constants";
import { AppState } from "../state/store";
import {
  formatBalanceUSD,
  formatNumber,
  getFullDisplayBalance,
} from "../utils/formatBalance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TOAST_OPTIONS } from "../config/constants";
import CoinsBought from "../components/history/CoinsBought";

const Wallet = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const user = useSelector((state: AppState) => state.user.userInfo);
  const lzrAccountPrincipal = `${user.accountPrincipal}`;
  const [balanceInLzr, setLZRBalance] = useState("_");
  const [balanceUsd, setBalanceUSD] = useState("_.__");

  const [copySuccess, setCopySuccess] = React.useState('');
  
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

  function copyToClipboard(item: any, text: any) { 
      navigator.clipboard.writeText(item)
      setCopySuccess(text);
      const t1 = setTimeout(() => {
          setCopySuccess('');
          clearTimeout(t1); 
      }, 2000); 
  }; 

  const renderHistory = useMemo(() => {
    switch (active) {
      case 1:
        return user ? <CoinsBought user={user} /> : null;
      case 2:
        return transactions.map((item, index) => (
          <div
            className="w-full flex items-center justify-between text-white mb-6"
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
                <p className="text-xs md:text-sm font-semibold text-white mb-0.5">
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
        ));
      default:
        return "";
    }
  }, [active]);

  return (
    <div className="w-full">
      <div
        style={{
          background:
            "linear-gradient(180deg, #12161F 0%, rgba(18, 22, 31, 0) 100%)",
        }}
        className="w-full  p-4 md:!py-8 rounded-t-[14px] md:!px-11 mb-7"
      >
        <div className="flex items-center rounded-t-[14px] justify-between mb-9">
          <p className="text-[17px] leading-7 font-medium md:font-medium text-white">
            My Wallet
          </p>
          <p className="text-xs md:text-xs leading-5 font-medium md:font-normal text-white">
            ~ ${LZR_IN_USD} USD per LZR coin
          </p>
        </div>
        <p className="text-muted text-sm font-normal mb-2.5">Total Balance</p>
        <p className="flex items-end text-white mb-1.5">
          <span className="text-2xl md:text-3xl font-black">
            {balanceInLzr}{" "}
          </span>
          <span className="font-medium text-base leading-7 ml-2">LZR</span>
        </p>
        <p className="font-light text-sm md:font-medium text-white mb-4 md:mb-8">
          ≈ ${balanceUsd} USD
        </p>
        <div className="flex items-center mb-8 md:mb-9">
          <button
            onClick={() => navigate("/lzr/send")}
            className="py-2.5 md:py-2.5 px-7 lg:px-auto lg:w-[130px] rounded-full bg-white text-black text-sm mr-4 font-semibold"
          >
            Send $LZR
          </button>
          <button
            onClick={() => toast.info("Coming soon!", TOAST_OPTIONS)}
            className="py-2.5 md:py-2.5 px-7 lg:px-auto lg:w-[130px] rounded-full text-white text-sm font-semibold"
            style={{ border: "1.5px solid #222A3B" }}
          >
            Buy $LZR
          </button>
        </div>
        <div className=" flex items-center ">
          <p className="text-white font-medium text-sm md:text-sm">
            <span className="text-muted">Your principal:</span> {lzrAccountPrincipal}
          </p>
          <button
            onClick={() => copyToClipboard(lzrAccountPrincipal, "Copied!")}
            className=" w-[30px] ml-2 h-[30px] rounded-full bg-[#141922] flex justify-center items-center mr-2  "
          >
            <img src={copyimg} alt="copy" className=" w-[12.17px] " />
          </button>
          {copySuccess === "Copied!" && copySuccess}
        </div>
      </div>
      <div className="w-full pb-2 mb-9 border-b-2 border-muted-50 flex items-center text-sm font-medium text-muted">
        <p
          className={`mr-10 cursor-pointer ${
            active === 1 ? "active-tab-bottom" : "text-muted font-medium"
          }`}
          onClick={() => setActive(1)}
        >
          Coins bought
        </p>
        {/* <p
          className={`cursor-pointer ${
            active === 2 ? "active-tab-bottom" : "text-muted font-medium"
          }`}
          onClick={() => setActive(2)}
        >
          Transactions
        </p> */}
      </div>
      {renderHistory}
    </div>
  );
};

export default Wallet;

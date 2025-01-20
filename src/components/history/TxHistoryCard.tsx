import { useState } from "react";
import { HodlerState } from "../../config/constants/types";
import { loadCoinPrices } from "../../utils";
import { truncateAddress } from "../../utils/textTruncate";
import Photo from "../Photo";
import more from "../../assets/icons/more.svg";

export const TXTYPES = {
  0: "COINSBOUGHT",
  1: "HOLDINGS",
};

interface TxHistoryProps {
  txType: string;
  hodler: HodlerState;
  coin: any;
  coinCanister: string;
}

export default function TxHistoryCard(props: TxHistoryProps) {
  const [isShown, setIsShown] = useState(false);
  const renderCoinName = (coinName: string) => {
    return <span className="uppercase">{coinName + " "}</span>;
  };


  return (
    <div className="w-max md:w-full flex items-center gap-6 justify-between text-white mb-8 md:mb-6">
      <div className="flex items-center w-fit">
        <div className=" w-fit ">
          <Photo
            alt=""
            userId={props.hodler.user.accountPrincipal}
            src={props.hodler.user.photo}
            className="h-12 w-12 rounded-full mr-3"
            style={{ border: "6px solid #141922" }}
          />
        </div>
        {props.txType === TXTYPES[0] ?
          <div>
            <p className="text-xs md:text-sm font-bold text-white mb-0.5">
              ${renderCoinName(props.hodler.coin)}
            </p>
            <p className="flex text-[10px] md:text-xs md:min-w-[200px] font-medium  text-muted">
              {props.hodler.balance ? (
                <>
                  {truncateAddress(props.hodler.user.accountPrincipal) + " "}
                  Owns {props.hodler.balance.balance} $
                  {props.txType === TXTYPES[1] ?
                    <>
                      {renderCoinName(props.coin)} {" "}
                    </> :
                    <>
                      {renderCoinName(props.hodler.coin)} {" "}
                    </>}
                  {" "} coins
                </>
              ) : (
                ""
              )}
            </p>
          </div>
          :
          <div>
            <p className="text-xs md:text-sm font-bold text-white mb-0.5">
              {props.hodler.user.username ?? truncateAddress(props.hodler.user.accountPrincipal)}
            </p>
            <p className="flex text-[10px] md:text-xs md:min-w-[200px] font-medium  text-muted">
              {props.hodler.balance ? (
                <>
                  Owns {props.hodler.balance.balance} $
                  {props.txType === TXTYPES[1] ?
                    <>
                      {renderCoinName(props.coin)} {" "}
                    </> :
                    <>
                      {renderCoinName(props.hodler.coin)} {" "}
                    </>}
                  {" "} coins
                </>
              ) : (
                ""
              )}
            </p>
          </div>
        }
      </div>
      {props.txType === TXTYPES[1] ? (
        <div className="flex flex-col items-center">
          <p className="text-xs md:text-sm font-semibold text-white mb-0.5">
            {props.hodler.user.accountType}
          </p>
          <p className="text-[10px] md:text-xs font-medium  text-muted">
            Type of user
          </p>
        </div>
      ) : null}
      <div className="flex flex-col items-end">
        <p className="text-xs md:text-sm font-semibold text-white mb-0.5">
          {props.hodler.balance.balance} LZR
        </p>
        <p className="text-[10px] md:text-xs font-medium  text-muted">
          {props.hodler.balance ? `~$${props.hodler.balance.balanceUSD}` : ""}
        </p>
      </div>
      
      <div className="relative mx-2">
      <div onClick={() => setIsShown((prev) => !prev)} className="px-[18px] cursor-pointer py-[20px] text-sm font-medium border-[1px] border-dark-700 rounded-full">
        <img src={more} alt="" className=" w-[12.67px]  " />
      </div>
      {isShown && (
        <div className="z-30 absolute w-[210px] bg-[#12161F] top-14 right-0 rounded-lg border-[1px] border-[#5360791A] shadow-xl ">
          <a className="py-3 px-4 text-[12px] cursor-pointer" style={{ borderTop: "1px solid rgba(83, 96, 121, 0.2)" }} target="_blank" rel="noreferrer" href={`https://ic.house/address/${props.coinCanister}/${props.hodler.user.accountPrincipal}`}>View holdings on explorer</a>
        </div>
                  )}
      </div>
    </div>
  );
} 
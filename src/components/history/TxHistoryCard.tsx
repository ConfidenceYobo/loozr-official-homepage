import { HodlerState } from "../../config/constants/types";
import { loadCoinPrices } from "../../utils";
import Photo from "../Photo";

export const TXTYPES = {
  0: "COINSBOUGHT",
  1: "HOLDINGS",
};

interface TxHistoryProps {
  txType: string;
  hodler: HodlerState;
  coin: any
}

export default function TxHistoryCard(props: TxHistoryProps) {
  const renderCoinName = (coinName: string) => {
    return <span className="uppercase">{coinName + " "}</span>;
  };


  return (
    <div className="w-max md:w-full flex items-center gap-6 justify-between text-white mb-8 md:mb-6 overflow-auto">
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
                  {props.hodler.user.accountPrincipal + " "}
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
              {props.hodler.user.username ?? props.hodler.user.accountPrincipal}
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
    </div>
  );
} 
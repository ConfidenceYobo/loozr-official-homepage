import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../../config/constants/models/user";
import { changePageForCoinsBought, resetCoinsBought } from "../../state/coinStat";
import { getCoinsBought, loadCoinsBoughtInfo } from "../../state/coinStat/actions";
import { AppState } from "../../state/store";
import Pagination from "../Pagination";
import TxHistoryCard from "./TxHistoryCard";

const RenderTxHistory = (props) => {
  return (
    <div
      onScroll={props.onScroll}
      ref={props.listInnerRef}
      style={{ height: "100vh", overflowY: "auto" }}
    >
      {props.dataList.length === 0 ? (
        <div className=" w-full py-5 rounded-lg mb-32 bg-[#10141C] bg-opacity-50 md:backdrop:mb-12 ">
          <p className=" font-medium text-[13px] text-center ">
            No information available 👋
          </p>
        </div>
      ) : (
        props.dataList.map((hodler, index) => (
          <TxHistoryCard key={index} hodler={hodler} coin="" txType="COINSBOUGHT" />
        ))
      )}
    </div>
  );
};

export default function CoinBought({ user }: { user: User }) {
  const dispatch = useDispatch();
  const coins = useSelector(
    (state: AppState) => state.coinsStat.coinsBought.coins
  );
  const pagination = useSelector(
    (state: AppState) => state.coinsStat.coinsBought.pagination
  );

  useEffect(() => {
    dispatch(resetCoinsBought());
  }, [user]);

  useEffect(() => {
    let coinsList = '';
    coins.forEach(async (coin) => {
      if (Number(coin.balance.balanceUSD) > 0) return;
      coinsList += coin.coinId + ',';
    });
    if (coinsList.length > 0) {
      dispatch(loadCoinsBoughtInfo(coinsList));
    }
  }, [coins]);

  return (
    <>
      <Pagination
        reachMaxLimit={pagination.reachMaxLimit}
        dataList={coins}
        onFetchData={() =>
          dispatch(
            getCoinsBought({ id: user.id, nextCursor: pagination.nextCursor })
          )
        }
        currentCursor={pagination.currentCursor}
        nextCursor={pagination.nextCursor}
        onSetCurrentCursor={() => dispatch(changePageForCoinsBought())}
      >
        <RenderTxHistory />
      </Pagination>
    </>
  );
}

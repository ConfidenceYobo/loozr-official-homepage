import React from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../../config/constants/models/user";
import { getHodlers } from "../../state/artist/actions";
import { changePageForCoinHodlers } from "../../state/artist/artistReducer";
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
          <TxHistoryCard key={index} hodler={hodler} coin={props.coin} txType="HOLDINGS" />
        ))
      )}
    </div>
  );
};

export default function CoinHodlers({ coin, user }: { coin: User; user: User }) {
  const dispatch = useDispatch();
  const holders = useSelector(
    (state: AppState) => state.artist.coinHodlers.hodlers
  );
  const pagination = useSelector(
    (state: AppState) => state.artist.coinHodlers.pagination
  );

  return (
    <>
      <Pagination
        reachMaxLimit={pagination.reachMaxLimit}
        dataList={holders}
        onFetchData={() =>
          dispatch(
            getHodlers({ id: coin.id, nextCursor: pagination.nextCursor })
          )
        }
        currentCursor={pagination.currentCursor}
        nextCursor={pagination.nextCursor}
        onSetCurrentCursor={() => dispatch(changePageForCoinHodlers())}
      >
        <RenderTxHistory coin={coin.username} />
      </Pagination>
    </>
  );
}

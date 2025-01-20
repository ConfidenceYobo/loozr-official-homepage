import { createSlice } from '@reduxjs/toolkit';
import { Pagination, HodlerState } from '../../config/constants/types';
import { jsonToUser } from '../../utils';
import { priceInLoozr } from '../../utils/creatorCoinFormater';
import { formatBalanceUSD, formatNumber, getFullDisplayBalance } from '../../utils/formatBalance';
import { getCoinsBought, loadCoinsBoughtInfo } from './actions';

export interface CoinStatState {
  coinsBought: {
    coins: HodlerState[],
    pagination: Pagination;
  };
}

const initialState: CoinStatState = {
  coinsBought: {
    coins: [],
    pagination: {
      nextCursor: '',
      currentCursor: '',
      reachMaxLimit: false
    }
  },
}

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    resetCoinsBought(state) {
      state.coinsBought.coins = [];
      state.coinsBought.pagination = {
        nextCursor: '',
        currentCursor: '',
        reachMaxLimit: false
      };
    },
    changePageForCoinsBought(state) {
      if (!state.coinsBought.pagination.nextCursor) return;
      state.coinsBought.pagination.currentCursor = state.coinsBought.pagination.nextCursor;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCoinsBoughtInfo.fulfilled, (state, action) => {
      action.payload.forEach((rawCoinStat: any) => {
        const coinId = rawCoinStat["id"];
        const coin = state.coinsBought.coins.find((coin) => coin.coinId === coinId);
        if (!coin) return;
        const piceInLzr = priceInLoozr(rawCoinStat["total_supply"]);
        const priceInUSD = formatBalanceUSD(piceInLzr);

        coin.balance.balanceUSD = formatNumber(Number(piceInLzr) * Number(priceInUSD), 2, 6);
        state.coinsBought.coins.find(coin => coin.coinId === coinId).balance = coin.balance;
      });
    });

    builder.addCase(getCoinsBought.fulfilled, (state, action) => {
      if (state.coinsBought.pagination.currentCursor !== state.coinsBought.pagination.nextCursor) return;

      const coins = action.payload.results.map((res: any) => {
        const user = jsonToUser(res['user']);

        const piceInLzr = getFullDisplayBalance(res.balance);
        let priceInUSD = '0';

        return {
          user, balance: {
            balance: formatNumber(Number(piceInLzr), 2, 6),
            balanceUSD: priceInUSD,
          },
          coinCanister: user.tokenName,
          coinId: res['coin']['creator']['id'],
          coin: res['coin']['creator']['username']
        };
      });

      if (!coins.length) {
        state.coinsBought.pagination.reachMaxLimit = true;
        return;
      }

      state.coinsBought.coins = [...state.coinsBought.coins, ...coins];
      state.coinsBought.pagination.nextCursor = action.payload.next_cursor;
    });
  }
});

export const { changePageForCoinsBought, resetCoinsBought } = artistSlice.actions
export default artistSlice.reducer
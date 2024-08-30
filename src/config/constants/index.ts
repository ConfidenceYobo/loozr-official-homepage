import { ToastOptions } from "react-toastify";
import BigNumber from 'bignumber.js'
import { BIG_TEN } from '../../utils/bigNumber'

export const HTTP_STATUS_CODES = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400
}

export const TOAST_OPTIONS: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const NEAR_NETWORK_DOMAINS = {
  testnet: '.testnet',
  mainnet: '.near'
}

export const LOOZR_MIXER = process.env.REACT_APP_LOOZR_MIXER;
export const NEAR_NETWORK = process.env.REACT_APP_NETWORK

export const NEAR_NETWORK_DOMAIN = NEAR_NETWORK_DOMAINS[NEAR_NETWORK]
export const MIXER_ACCOUNT = `${LOOZR_MIXER}${NEAR_NETWORK_DOMAIN}`
export const CREATOR_COIN_DOMAIN = process.env.REACT_APP_CREATOR_COIN_DOMAIN;

export const LZR_IN_USD = 16.35;
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(24)

export const PRICE_SLOPE = new BigNumber(0.003);
export const PRICE_RATE_EXPONENT = 2; // the rate at which the price of tokens go up or down

export const BASE_EXPLORER_URLS = {
  mainnet: 'https://explorer.near.org',
  testnet: 'https://explorer.testnet.near.org',
}

export const MAX_POINT = 0.015;
export const POINT_PER_SECOND = 0.000125
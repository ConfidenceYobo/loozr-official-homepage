import User from "./models/user";

export interface Track {
  title: string;
  author: string;
  isVerified: boolean;
  coinPrice: string;
  coverPhoto: string;
  trackSource: string;
}

export interface Song {
  id: number;
  author: string;
  name: string;
  listens: string;
  tokenName: string;
  duration: string;
  photo: string;
  coinValue: string;
  USDValue: string;
  url: string;
  audio?: HTMLAudioElement;
}

export interface Artist {
  name: string;
  tokenName: string;
  coinPrice: string;
  coinPriceFull: string;
  USDValue: string;
  isVerified: boolean;
  photo: string;
  songs: Song[]
}

export interface Pagination {
  currentCursor: string;
  nextCursor: string;
  reachMaxLimit: boolean;
}

export interface Balance {
  balance: string;
  balanceUSD: string;
}

export interface HodlerState {
  user: User;
  coin: string;
  coinCanister?: string;
  coinId: number;
  balance?: Balance
}

export interface UserState {
  userInfo: User;
  suggestedUsers: {
    users: User[];
    pagination: Pagination;
  }
  currentProfile: User;
  jwtToken: string;
  loading: boolean;
  success: boolean;
  errorLoadingProfile: boolean;
  signUpSuccess: boolean;
  verifySuccess: boolean;
  accountSetupSuccess: boolean;
  error: string
}

export interface Model {
  fromJson(jsonData: { [key: string]: any }): void;
  toJson(): { [key: string]: any }
}
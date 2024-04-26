import { Model } from '../types';
import { CREATOR_COIN_DOMAIN } from "..";
import User from './user';
import BigNumber from 'bignumber.js';
 
export interface ArtistJsonProps {
  id: number;
  is_verified: boolean;
  approved: string;
  creator_coin_id: string;
  founder_reward: number;
  total_listens: number;
}

export interface ArtistProps {
  id?: number;
  isVerified?: boolean;
  approved?: string;
  creatorCoinId?: string;
  totalListens?: number;
  founderReward?: number;
  user?: User
}

export interface CoinInfo {
  coinPrice: number;
  priceUSD: string;
  coinHolders: number;
  marketCap: string;
  founderReward: number;
  totalSupply: BigNumber;
}

export default class Artist implements Model {
  id: number;
  isVerified: boolean;
  approved: string;
  creatorCoinId: string;
  totalListens: number;
  founderReward: number;
  user: User;
  coinInfo: CoinInfo;

  constructor({ id, isVerified, approved, creatorCoinId, totalListens, founderReward, user }: ArtistProps) {
    this.id = id;
    this.isVerified = isVerified;
    this.approved = approved;
    this.creatorCoinId = creatorCoinId;
    this.totalListens = totalListens;
    this.founderReward = founderReward;
    this.user = user;
  }

  get accountDomain() {
    return `${this.creatorCoinId}.${CREATOR_COIN_DOMAIN}`;
  }

  set setCoinInfo(coinInfo: CoinInfo) {
    this.coinInfo = coinInfo;
  }

  fromJson(jsonData: ArtistJsonProps) {
    this.id = jsonData['id'];
    this.isVerified = jsonData['is_verified'];
    this.approved = jsonData['approved'];
    this.creatorCoinId = jsonData['artist_principal'];
    this.founderReward = jsonData['founder_reward'];
    this.totalListens = jsonData['total_listens'];
    const user = new User({});
    user.fromJson(jsonData['user']);
    this.user = user;
  }

  toJson() {
    const map = {
      'id': this.id,
      'is_verified': this.isVerified,
      'approved': this.approved,
      'creator_coin_id': this.creatorCoinId,
      'founder_reward': this.founderReward,
      'total_listens': this.totalListens,
    }

    return map;
  }
}
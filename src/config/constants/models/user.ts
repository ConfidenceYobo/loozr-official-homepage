import { Model } from "../types";

export interface UserJsonProps {
  username?: string;
  account_principal: string;
  followings_count?: number;
  id: number;
  followers_count?: number;
  token_name?: string;
  bio?: string;
  website?: string;
  soundcloud_link?: string;
  twitter_link?: string;
  spotifyLink?: string;
  country?: string;
  is_artist?: boolean;
  email?: string;
  photo?: any;
  twitter_account?: string;
  spotify_account?: string;
  tiktok_account?: string;
  twitter_photo?: any;
}

export interface UserProps {
  username?: string;
  accountPrincipal?: string;
  followingsCount?: number;
  id?: number;
  followersCount?: number;
  tokenName?: string;
  bio?: string;
  website?: string;
  soundCloudLink?: string;
  twitterLink?: string;
  instagramLink?: string;
  spotifyLink?: string;
  country?: string;
  isArtist?: boolean;
  email?: string;
  photo?: any;
  twitter_account?: string;
  spotify_account?: string;
  tiktok_account?: string;
  twitter_photo?: any;
}

export default class User implements Model {
  username: string;
  accountPrincipal: string;
  followingsCount: number;
  id: number;
  accountId: any;
  followersCount: number;
  tokenName: string;
  bio: string;
  website: string;
  soundCloudLink: string;
  twitterLink: string;
  instagramLink: string;
  spotifyLink: string;
  country: string;
  isArtist: boolean;
  email: string;
  photo: any;
  twitter_account?: string;
  spotify_account?: string;
  tiktok_account?: string;
  twitter_photo?: any;
  points?: any;

  constructor({
    username,
    accountPrincipal,
    followingsCount,
    id,
    followersCount,
    tokenName,
    bio,
    website,
    soundCloudLink,
    twitterLink,
    instagramLink,
    spotifyLink,
    country,
    isArtist,
    email,
    photo,
  }: UserProps) {
    this.username = username;
    this.accountPrincipal = accountPrincipal;
    this.followingsCount = followingsCount;
    this.id = id;
    this.followersCount = followersCount;
    this.tokenName = tokenName;
    this.bio = bio;
    this.website = website;
    this.soundCloudLink = soundCloudLink;
    this.twitterLink = twitterLink;
    this.instagramLink = instagramLink;
    this.spotifyLink = spotifyLink;
    this.country = country;
    this.isArtist = isArtist;
    this.email = email;
    this.photo = photo;
  }

  get accountType() {
    return this.isArtist ? "Artiste" : "Listener";
  }

  get accountDomain() {
    return `${this.accountPrincipal}`;
  }

  fromJson(jsonData: UserJsonProps) {
    this.username = jsonData["username"];
    this.accountPrincipal = jsonData["account_principal"];
    this.followingsCount = jsonData["followings_count"];
    this.id = jsonData["id"];
    this.followersCount = jsonData["followers_count"];
    this.tokenName = jsonData["token_name"];
    this.bio = jsonData["bio"];
    this.website = jsonData["website"];
    this.soundCloudLink = jsonData["soundcloud_link"];
    this.twitterLink = jsonData["twitter_link"];
    this.spotifyLink = jsonData["spotify_link"];
    this.instagramLink = jsonData["instagram_link"];
    this.country = jsonData["country"];
    this.isArtist = jsonData["is_artist"];
    this.email = jsonData["email"];
    this.photo = jsonData["photo"];
    this.twitter_account = jsonData["twitter_account"];
    this.spotify_account = jsonData["spotify_account"];
    this.tiktok_account = jsonData["tiktok_account"];
    this.twitter_photo = jsonData["twitter_photo"];
    this.points = jsonData["points"];
  }

  get profileColor() {
    const rndInt = Math.floor(Math.random() * 7) + 1;
    const array = [
      "#F9F871",
      "#FCB667",
      "#D8816F",
      "#995D6C",
      "#00C896",
      "#8685EF",
      "#ff1a40",
    ];
    return array[rndInt];
  }

  // spotify_link: user.spotify_link ?? "",
  toJson() {
    const map = {
      username: this.username,
      account_principal: this.accountPrincipal,
      followings_count: this.followingsCount,
      id: this.id,
      followers_count: this.followersCount,
      token_name: this.tokenName,
      bio: this.bio,
      website: this.website,
      soundcloud_link: this.soundCloudLink,
      twitter_link: this.twitterLink,
      instagram_link: this.instagramLink,
      spotify_link: this.spotifyLink,
      country: this.country,
      is_artist: this.isArtist,
      email: this.email,
      photo: this.photo,
    };

    return map;
  }
}

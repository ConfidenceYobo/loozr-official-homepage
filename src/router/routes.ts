// Auth Components
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import RecoverPassword from "../containers/RecoverPassword";
import ResetPassword from "../containers/ResetPassword";
import VerifyEmail from "../containers/VerifyEmail";
import AccountVerificationSuccess from "../containers/AccountVerificationSuccess";

// Non-auth components
import Home from "../containers/Home";
import ArtistEcosystem from "../containers/ArtistsEcosystem";
import ArtistDashboard from "../containers/ArtistDashboard";
import SongDashboard from "../containers/SongDashboard";

import Artistes from "../containers/Artistes";
import ArtisteDashboard from "../containers/ArtisteDashboard";
import Wallet from "../containers/Wallet";
import Profile from "../containers/Profile";
import LaunchToken from "../containers/LaunchToken";
import AccountSetup from "../containers/AccountSetup";
import EditProfile from "../containers/EditProfile";
import Tracks from "../containers/Tracks";
import SendLzr from "../containers/SendLzr";
import NFTs from "../containers/Nfts";
import Notifications from "../containers/Notifications";
import BuyArtistToken from "../containers/BuyArtistToken";
import SellArtistToken from "../containers/SellArtistToken";
import SelectGenres from "../containers/SelectGenres";
import SubmitTwitter from "../containers/SubmitTwitter";
import MusicInfo from "../containers/MusicInfo";
import ProfileScan from "../containers/ProfileScan";
import Product from "../containers/Product";
import SongTokenization from "../containers/SongTokenization/SongTokenization";
import SpotifyCallback from "../components/AirdropConnectSocial/SpotifyCallback";

export const authRoutes = [
  {
    name: "login",
    path: "login",
    private: false,
    component: Login,
  },
  {
    name: "select-genres",
    path: "select-genres",
    private: false,
    component: SelectGenres,
  },
  {
    name: "submit-twitter",
    path: "submit-twitter",
    private: false,
    component: SubmitTwitter,
  },
  // {
  //   name: "suggested-artistes",
  //   path: "suggested-artistes",
  //   private: false,
  //   component: SuggestedArtistes,
  // },
  {
    name: "signup",
    path: "signup",
    private: false,
    component: Signup,
  },
  {
    name: "recover password",
    path: "recover-password",
    private: false,
    component: RecoverPassword,
  },
  {
    name: "reset password",
    path: "password-reset/:id/:token",
    private: false,
    component: ResetPassword,
  },
  {
    name: "verify-email",
    path: "verify-email/:email",
    private: false,
    component: VerifyEmail,
  },
  {
    name: "complete-verification",
    path: "account-activation-success",
    private: false,
    component: AccountVerificationSuccess,
  },
  {
    name: "Complete Setup",
    path: "account-setup",
    private: true,
    component: AccountSetup,
  },
  {
    name: "add token name",
    path: "/artist-account-setup",
    private: true,
    component: LaunchToken,
  },
  {
    name: "song info",
    path: "/artists/music-info",
    private: false,
    component: MusicInfo,
  },
  {
    name: "songTokenization",
    path: "song-tokenization",
    private: false,
    component: SongTokenization,
  },
  // {
  //   name: "updateprofile",
  //   path: "updateprofile",
  //   private: true,
  //   component: UpdateProfile,
  // },
];

export const routes = [
  {
    name: "home",
    path: "/",
    private: false,
    component: Home,
  },
  {
    name: "product",
    path: "/product",
    private: false,
    component: Product,
  },
  {
    name: "artists ecosystem",
    path: "/artistes/ecosystem",
    private: false,
    component: ArtistEcosystem,
  },
  {
    name: "artist dashboard",
    path: "/artists/:id",
    private: false,
    component: ArtistDashboard,
  },
  {
    name: "song dashboard",
    path: "/artists/songs/:id",
    private: false,
    component: SongDashboard,
  },
  {
    name: "callback",
    path: "/callback",
    private: false,
    component: SpotifyCallback,
  },
];

export const dashboard = [
  {
    name: "artistes",
    path: "artistes",
    private: true,
    component: Artistes,
  },
  {
    name: "buy-artiste-coin",
    path: "artistes/buy/:id",
    private: true,
    component: BuyArtistToken,
  },
  {
    name: "sell-artiste-coin",
    path: "artistes/sell/:id",
    private: true,
    component: SellArtistToken,
  },
  {
    name: "wallet",
    path: "wallet",
    private: true,
    component: Wallet,
  },
  {
    name: "edit profile",
    path: "profile/edit",
    private: true,
    component: EditProfile,
  },
  {
    name: "tracks",
    path: "tracks",
    private: true,
    component: Tracks,
  },
  // {
  //   name: "buy lzr",
  //   path: "lzr/buy",
  //   private: true,
  //   component: BuyLzr,
  // },
  {
    name: "send lzr",
    path: "lzr/send",
    private: true,
    component: SendLzr,
  },
  {
    name: "music nfts",
    path: "nfts",
    private: true,
    component: NFTs,
  },
  {
    name: "notifications",
    path: "notifications",
    private: true,
    component: Notifications,
  },
];

export const dashboardhome = [
  {
    name: "artiste dashboard",
    path: "explore",
    private: false,
    component: ArtisteDashboard,
  },
  {
    name: "feeds",
    path: "feeds",
    private: false,
    component: ArtisteDashboard,
  },
  // {
  //   name: "airdrops",
  //   path: "airdrops",
  //   private: false,
  //   component: ArtisteDashboard,
  // },
  {
    name: "profile",
    path: "/:accountDomain",
    private: true,
    component: Profile,
  },
  {
    name: "profile",
    path: "/scan/:accountDomain",
    private: true,
    component: ProfileScan,
  },
];
